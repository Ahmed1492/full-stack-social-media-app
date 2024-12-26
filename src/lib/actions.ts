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
