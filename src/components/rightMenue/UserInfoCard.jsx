import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import UserInfoInteractions from "@/components/rightMenue/UserInfoCardInteractions";
import UpdateUser from "@/components/rightMenue/UpdateUser";
export default async function UserInfoCard({ user }) {
  const rawDate = new Date(user.createdAt); // Current date
  const formattedDate = rawDate.toLocaleDateString("en-US", {
    month: "long", // Short month name (e.g., Jun)
    day: "numeric", // Day of the month (e.g., 18)
    year: "numeric", // Full year (e.g., 2024)
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const follwingRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    follwingRes ? (isFollowing = true) : (isFollowing = false);

    const isFollowingSentRes = await prisma.followerRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    isFollowingSentRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg  flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser />
        ) : (
          <span className="font-medium text-blue-400">See All</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl text-gray-800 font-medium">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <span className="text-base text-gray-500 font-medium">
          @ {user.name ? user.name : user.username}
        </span>
      </div>
      {user.description && (
        <p className="font-medium text-base text-gray-600">
          {user.description}
        </p>
      )}
      <div className="flex flex-col gap-4 ">
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={20} height={20} />
            <span className=" text-gray-500">Living in</span>
            <span className="font-semibold text-gray-700">{user.city}</span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={20} height={20} />
            <span className=" text-gray-500">Went To </span>
            <span className="font-semibold text-gray-700">{user.school}</span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={20} height={20} />
            <span className=" text-gray-500">Works At</span>
            <span className="font-semibold text-gray-700">{user.work}.</span>
          </div>
        )}
        {/*  */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/link.png" alt="" width={20} height={20} />
            <span className=" text-blue-500  font-medium">Ahmed.Dev</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/date.png" alt="" width={20} height={20} />

            <span className="text-gray-500 font-medium text-sm">
              joined {formattedDate}
            </span>
          </div>
        </div>
      </div>
      {currentUserId && currentUserId !== user.id && (
        <UserInfoInteractions
          userId={user.id}
          currentUserId={currentUserId}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
      )}
    </div>
  );
}
