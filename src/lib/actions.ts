"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { object, z } from "zod";

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

export const updateProfile = async (formData: FormData) => {
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

  const validatedFileds = Profile.safeParse(filteredFields);
  if (!validatedFileds.success) {
    console.log(validatedFileds.error.flatten().fieldErrors);
    return "error";
  }
  try {
    const { userId: currentUser } = auth();
    if (!currentUser) throw new Error("You Are not Authenticated ! ");
    await prisma.user.update({
      where: {
        id: currentUser,
      },
      data: validatedFileds.data,
    });
  } catch (error) {
    console.log(error);
  }
};
