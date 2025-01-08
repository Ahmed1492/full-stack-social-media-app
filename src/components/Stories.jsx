import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import StoryList from "@/components/StoryList";
export default async function Stories() {
  const { userId: currentUserId } = auth();
  console.log("currentUserI222d", currentUserId);

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

  console.log("followingsId mm >> ", followingsId);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-hidden">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
}
