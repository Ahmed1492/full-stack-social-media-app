import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProfileCart() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      _count: { select: { followers: true, followings: true, posts: true } },
    },
  });
  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
      {/* Cover */}
      <div className="h-28 relative group/cover overflow-hidden">
        {user.cover && user.cover !== "/noCover.jpg" ? (
          <Image src={user.cover} alt="" fill className="object-cover group-hover/cover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <div className="px-4 pb-5">
        {/* Avatar */}
        <div className="flex justify-center -mt-7 mb-3">
          <div className="relative hover-lift">
            <Image
              src={user.avatar || "/noAvatar.png"}
              alt=""
              className="rounded-full object-cover ring-4 ring-white shadow-lg w-14 h-14"
              width={56}
              height={56}
            />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>

        {/* Name */}
        <Link
          href={`/profile/${user?.username}`}
          className="block text-center font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 text-sm mb-0.5"
        >
          {user.name && user.surname ? user.name + " " + user.surname : user.username}
        </Link>
        <p className="text-center text-xs text-gray-400 mb-4">@{user.username}</p>

        {/* Stats */}
        <div className="flex items-center justify-around py-3 border-y border-gray-100">
          {[
            { label: "Posts", value: user._count.posts },
            { label: "Followers", value: user._count.followers },
            { label: "Following", value: user._count.followings },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 group/stat cursor-pointer">
              <span className="font-bold text-gray-900 text-sm group-hover/stat:text-blue-600 transition-colors">{stat.value}</span>
              <span className="text-gray-400 text-[11px]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/profile/${user?.username}`}
          className="mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/60 hover:-translate-y-0.5"
        >
          View My Profile →
        </Link>
      </div>
    </div>
  );
}
