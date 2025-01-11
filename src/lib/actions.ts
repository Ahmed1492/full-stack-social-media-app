"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { object, z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUser } = auth();
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
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Went Wrong");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();
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
  const { userId: currentUser } = auth();
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
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing went Wrong !");
  }
};

export const rejectFollowRequest = async (userId: string) => {
  const { userId: currentUser } = auth();
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
    const { userId: currentUser } = auth();
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
  const { userId } = auth();
  if (!userId) throw new Error("you Are Not Authenticateted");

  try {
    // Check if liked post Before
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some Thing Wnt Wrong");
  }
};

export const addComment = async (postId: number, description: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not Authenticated");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        description,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });
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
  const { userId } = auth();
  if (!userId) throw new Error("You Are Not Authanticated");

  if (!validatedDesc.success) {
    return "description is not valid  ";
  }
  try {
    await prisma.post.create({
      data: {
        description: validatedDesc.data,
        userId,
        img,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("some thing went wrong!");
  }
};

export const addStory = async (img: string) => {
  const { userId } = auth();
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

export const deletePost = async (postId: number) => {
  const { userId: currentUser } = auth();
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
  const { userId } = auth();
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
    // Query the Prisma database
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: validatedQuery.data,
        },
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        name: true,
      },
    });

    return users; // Return matched users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Something went wrong while fetching users!");
  }
};
