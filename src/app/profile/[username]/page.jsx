import React from "react";
import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Feed from "@/components/feed/Feed";
import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }) {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: {
        select: { followers: true, followings: true, posts: true },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: { blockerId: user.id, blockedId: currentUserId },
    });
    if (res) return notFound();
  }

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <div className="sticky top-20">
          <LeftMenue />
        </div>
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-4">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            {/* Cover */}
            <div className="w-full h-48 relative">
              <Image
                src={user.cover || "/noCover.jpg"}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Avatar + Info */}
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-4">
                <div className="relative">
                  <Image
                    src={user.avatar || "/noAvatar.png"}
                    alt=""
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                  {user.name && user.surname ? user.name + " " + user.surname : user.username}
                </h1>
                <p className="text-sm text-gray-400">@{user.username}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-4 border-t border-gray-100">
                {[
                  { label: "Posts", value: user._count.posts },
                  { label: "Followers", value: user._count.followers },
                  { label: "Following", value: user._count.followings },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-0.5">
                    <span className="font-bold text-gray-900 text-lg">{stat.value}</span>
                    <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Feed username={user?.username} />
        </div>
      </div>

      <div className="hidden lg:block w-[34%]">
        <div className="sticky top-20">
          <RightMenue user={user} />
        </div>
      </div>
    </div>
  );
}
