"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

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
