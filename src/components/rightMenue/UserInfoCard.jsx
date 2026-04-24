import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import UserInfoInteractions from "@/components/rightMenue/UserInfoCardInteractions";
import UpdateUser from "@/components/rightMenue/UpdateUser";

export default async function UserInfoCard({ user }) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  let isUserBlocked = false, isFollowing = false, isFollowingSent = false;
  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const [blockRes, followRes, followReqRes] = await Promise.all([
      prisma.block.findFirst({ where: { blockerId: currentUserId, blockedId: user.id } }),
      prisma.follower.findFirst({ where: { followerId: currentUserId, followingId: user.id } }),
      prisma.followerRequest.findFirst({ where: { senderId: currentUserId, receiverId: user.id } }),
    ]);
    isUserBlocked = !!blockRes;
    isFollowing = !!followRes;
    isFollowingSent = !!followReqRes;
  }

  const infoItems = [
    { icon: "/map.png", label: "Living in", value: user.city },
    { icon: "/school.png", label: "Went to", value: user.school },
    { icon: "/work.png", label: "Works at", value: user.work },
  ].filter((item) => item.value);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm">About</h3>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <span className="text-xs font-medium text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">See All</span>
        )}
      </div>

      <div>
        <p className="font-bold text-gray-900 text-lg">
          {user.name && user.surname ? user.name + " " + user.surname : user.username}
        </p>
        <p className="text-sm text-gray-400">@{user.username}</p>
      </div>

      {user.description && (
        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 italic">
          "{user.description}"
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        {infoItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 flex items-center justify-center bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Image src={item.icon} alt="" width={14} height={14} />
            </div>
            <span className="text-xs text-gray-400">{item.label}</span>
            <span className="text-xs font-semibold text-gray-700">{item.value}</span>
          </div>
        ))}

        {user.website && (
          <div className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 flex items-center justify-center bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Image src="/link.png" alt="" width={14} height={14} />
            </div>
            <a href={user.website} target="_blank" className="text-xs font-semibold text-blue-500 hover:underline truncate">
              {user.website}
            </a>
          </div>
        )}

        <div className="flex items-center gap-2.5 pt-1 border-t border-gray-100">
          <div className="w-7 h-7 flex items-center justify-center bg-gray-50 rounded-lg">
            <Image src="/date.png" alt="" width={14} height={14} />
          </div>
          <span className="text-xs text-gray-400">Joined {formattedDate}</span>
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
