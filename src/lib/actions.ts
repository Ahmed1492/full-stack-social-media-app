"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { object, z } from "zod";
import { revalidatePath } from "next/cache";

export const syncUser = async () => {
  const { userId } = await auth();
  if (!userId) return;
  const { currentUser } = await import("@clerk/nextjs/server");
  const clerkUser = await currentUser();
  if (!clerkUser) return;
  const username =
    clerkUser.username ||
    clerkUser.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    userId;
  await prisma.user.upsert({
    where: { id: userId },
    update: {
      avatar: clerkUser.imageUrl || "/noAvatar.png",
      name: clerkUser.firstName || null,
      surname: clerkUser.lastName || null,
    },
    create: {
      id: userId,
      username,
      avatar: clerkUser.imageUrl || "/noAvatar.png",
      cover: null,
      name: clerkUser.firstName || null,
      surname: clerkUser.lastName || null,
    },
  });
};

export const switchFollow = async (userId: string) => {
  const { userId: currentUser } = await auth();
  if (!currentUser) throw new Error("User not Authenticated");

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUser,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const isSentFollowRequest = await prisma.followerRequest.findFirst({
        where: {
          senderId: currentUser,
          receiverId: userId,
        },
      });
      if (isSentFollowRequest) {
        await prisma.followerRequest.delete({
          where: {
            id: isSentFollowRequest.id,
          },
        });
      } else {
        await prisma.followerRequest.create({
          data: {
            senderId: currentUser,
            receiverId: userId,
          },
        });
        // Notify receiver of follow request
        await prisma.notification.create({
          data: { type: "follow_request", senderId: currentUser, receiverId: userId },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) throw new Error("User Is Not Authenticated");
  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUser } = await auth();
  if (!currentUser) throw new Error("You Are Not Authenticated");
  try {
    const existingFollowReques = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUser,
      },
    });
    if (existingFollowReques) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowReques.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUser,
        },
      });
      // Notify the accepted user
      await prisma.notification.create({
        data: { type: "follow_accept", senderId: currentUser, receiverId: userId },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing went Wrong !");
  }
};

export const rejectFollowRequest = async (userId: string) => {
  const { userId: currentUser } = await auth();
  if (!currentUser) throw new Error("You Are Not Authenticated");
  try {
    const existingFollowReques = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUser,
      },
    });
    if (existingFollowReques) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowReques.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing went Wrong !");
  }
};

export const updateProfile = async (
  prevState: { sucess: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );
  console.log(fields);

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFileds = Profile.safeParse({ cover, ...filteredFields });
  if (!validatedFileds.success) {
    console.log(validatedFileds.error.flatten().fieldErrors);
    return { success: false, error: true };
  }
  try {
    const { userId: currentUser } = await auth();
    if (!currentUser) return { success: false, error: true };
    await prisma.user.update({
      where: {
        id: currentUser,
      },
      data: validatedFileds.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("you Are Not Authenticateted");

  try {
    const existingLike = await prisma.like.findFirst({
      where: { userId, postId },
    });
    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({ data: { postId, userId } });
      // Notify post owner (not self)
      const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
      if (post && post.userId !== userId) {
        await prisma.notification.create({
          data: { type: "like", senderId: userId, receiverId: post.userId, postId },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Wnt Wrong");
  }
};

export const addComment = async (postId: number, description: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not Authenticated");

  try {
    const createdComment = await prisma.comment.create({
      data: { description, userId, postId },
      include: { user: true },
    });
    // Notify post owner (not self)
    const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
    if (post && post.userId !== userId) {
      await prisma.notification.create({
        data: { type: "comment", senderId: userId, receiverId: post.userId, postId, commentId: createdComment.id },
      });
    }
    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;
  const Desc = z.string().min(1).max(255);
  const validatedDesc = Desc.safeParse(desc);
  const { userId } = await auth();
  if (!userId) throw new Error("You Are Not Authanticated");

  if (!validatedDesc.success) {
    return "description is not valid  ";
  }
  try {
    console.log("addPost userId:", userId);
    await prisma.post.create({
      data: {
        description: validatedDesc.data,
        userId,
        img,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("addPost error:", JSON.stringify(error, null, 2));
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const addStory = async (img: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("You Are Not Authanticated");
  try {
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expirseAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });
    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("some thing went wrong!");
  }
};

export const updatePost = async (postId: number, description: string) => {
  const { userId: currentUser } = await auth();
  if (!currentUser) throw new Error("User not Authenticated");
  const Desc = z.string().min(1).max(255);
  const validated = Desc.safeParse(description);
  if (!validated.success) throw new Error("Invalid description");
  try {
    await prisma.post.update({
      where: { id: postId, userId: currentUser },
      data: { description: validated.data },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const deletePost = async (postId: number) => {
  const { userId: currentUser } = await auth();
  if (!currentUser) throw new Error("User not Authenticated");
  try {
    await prisma.post.delete({
      where: {
        userId: currentUser,
        id: postId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const deleteComment = async (commentId: number, postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not Authenticated");
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
        postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const searchUsers = async (query: string) => {
  // Validate query with zod
  const QuerySchema = z.string().min(1).max(50); // Query must be between 1 and 50 characters
  const validatedQuery = QuerySchema.safeParse(query);

  if (!validatedQuery.success) {
    throw new Error("Invalid query string"); // Throw error if validation fails
  }

  try {
    // Query the Prisma database for usernames before "_"
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: validatedQuery.data, // Match the query as a substring
        },
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        name: true,
      },
    });

    // Filter results: Only match portion of username before "_"
    const filteredUsers = users.filter((user) => {
      const usernameBeforeUnderscore = user.username.split("_")[0]; // Extract part before "_"
      return usernameBeforeUnderscore.includes(validatedQuery.data); // Check match
    });

    return filteredUsers; // Return filtered users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Something went wrong while fetching users!");
  }
};

export const markNotificationsRead = async () => {
  const { userId } = await auth();
  if (!userId) return;
  await prisma.notification.updateMany({
    where: { receiverId: userId, read: false },
    data: { read: true },
  });
};

export const getNotifications = async () => {
  const { userId } = await auth();
  if (!userId) return [];
  return prisma.notification.findMany({
    where: { receiverId: userId },
    include: { sender: { select: { username: true, avatar: true, name: true, surname: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};

export const getOrCreateConversation = async (otherUserId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // Find existing conversation between the two users
  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId } } },
        { participants: { some: { userId: otherUserId } } },
      ],
    },
    include: {
      participants: { include: { user: { select: { id: true, username: true, avatar: true, name: true, surname: true } } } },
      messages: { orderBy: { createdAt: "asc" }, include: { sender: { select: { id: true, username: true, avatar: true } } } },
    },
  });

  if (existing) return existing;

  // Create new conversation
  return prisma.conversation.create({
    data: {
      participants: {
        create: [{ userId }, { userId: otherUserId }],
      },
    },
    include: {
      participants: { include: { user: { select: { id: true, username: true, avatar: true, name: true, surname: true } } } },
      messages: { orderBy: { createdAt: "asc" }, include: { sender: { select: { id: true, username: true, avatar: true } } } },
    },
  });
};

export const sendMessage = async (conversationId: number, text: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const TextSchema = z.string().min(1).max(1000);
  const validated = TextSchema.safeParse(text);
  if (!validated.success) throw new Error("Invalid message");

  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: { text: validated.data, senderId: userId, conversationId },
      include: { sender: { select: { id: true, username: true, avatar: true } } },
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    }),
  ]);

  // Notify the other participant
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { participants: true },
  });
  const receiver = conversation?.participants.find((p) => p.userId !== userId);
  if (receiver) {
    await prisma.notification.create({
      data: { type: "message", senderId: userId, receiverId: receiver.userId, conversationId },
    });
  }

  return message;
};

export const getConversations = async () => {
  const { userId } = await auth();
  if (!userId) return [];

  return prisma.conversation.findMany({
    where: { participants: { some: { userId } } },
    include: {
      participants: {
        include: { user: { select: { id: true, username: true, avatar: true, name: true, surname: true } } },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { sender: { select: { id: true, username: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
};

export const markMessagesRead = async (conversationId: number) => {
  const { userId } = await auth();
  if (!userId) return;
  await prisma.message.updateMany({
    where: { conversationId, read: false, senderId: { not: userId } },
    data: { read: true },
  });
};

export const fetchNotifications = async () => {
  "use server";
  const { userId } = await auth();
  if (!userId) return [];
  return prisma.notification.findMany({
    where: { receiverId: userId },
    include: {
      sender: { select: { username: true, avatar: true, name: true, surname: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};
