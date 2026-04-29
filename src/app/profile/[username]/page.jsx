import React from "react";
import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Feed from "@/components/feed/Feed";
import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ProfileStats from "@/components/ProfileStats";

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

  // Fetch full data for modal
  const [posts, followers, followings] = await Promise.all([
    prisma.post.findMany({
      where: { userId: user.id },
      select: { id: true, img: true, description: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.follower.findMany({
      where: { followingId: user.id },
      include: { follower: { select: { id: true, username: true, avatar: true, name: true, surname: true } } },
    }),
    prisma.follower.findMany({
      where: { followerId: user.id },
      include: { following: { select: { id: true, username: true, avatar: true, name: true, surname: true } } },
    }),
  ]);

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
              {user.cover && user.cover !== "/noCover.jpg" ? (
                <Image src={user.cover} alt="" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600" />
              )}
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
              <ProfileStats
                username={user.username}
                posts={posts}
                followers={followers}
                followings={followings}
                counts={user._count}
              />
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
