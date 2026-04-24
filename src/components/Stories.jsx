import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import StoryList from "@/components/StoryList";
export default async function Stories() {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) return null;

  const followings = await prisma.follower.findMany({
    where: {
      followerId: currentUserId,
    },
    select: {
      followingId: true,
    },
  });
  const followingsId = followings.map((f) => f.followingId);

  const ids = [currentUserId, ...followingsId];
  const stories = await prisma.story.findMany({
    where: {
      expirseAt: {
        // Grather This Date
        gt: new Date(),
      },
      OR: [
        // Story >> User >> Followers >> FollowerId
        {
          user: {
            followers: {
              some: {
                followerId: {
                  in: ids,
                },
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 overflow-x-auto scrollbar-hidden">
      <div className="flex gap-4 w-max">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
}
