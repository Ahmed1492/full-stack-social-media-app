import React from "react";
import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Feed from "@/components/feed/Feed";
import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage({ params }) {
  const { username } = params;

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });
  // console.log(user);
  if (!user) return notFound();

  const { userId: currentUserId } = auth();
  let isBloked;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) isBloked = true;
    else isBloked = false;
  }
  if (isBloked) return notFound();

  let x = 2;
  console.log;
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenue />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 items-center">
            {/* BG IMAGE */}
            <div className="w-full min-h-56 relative">
              <Image
                src={user.cover || "/noCover.jpg"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={80}
                height={80}
                className="object-cover w-20 h-20 ring-2 ring-white absolute rounded-full left-0 right-0 m-auto -bottom-10"
              />
            </div>
            {/* DESC */}
            <div className="flex flex-col items-center justify-center mt-7 mb-5 gap-4">
              <span className=" text-2xl font-medium ">
                {" "}
                {user.name && user.surname
                  ? user.name + " " + user.surname
                  : user.username}
              </span>
              <div className="flex gap-9">
                <div className="font-medium  text-gray-800 flex flex-col items-center justify-center">
                  <span className="">{user._count.posts} </span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="font-medium  text-gray-800 flex flex-col items-center justify-center">
                  <span className="">{user._count.followings} </span>
                  <span className="text-sm">followers</span>
                </div>
                <div className="font-medium  text-gray-800 flex flex-col items-center justify-center">
                  <span className="">{user._count.followers} </span>
                  <span className="text-sm">following</span>
                </div>
              </div>
            </div>
          </div>
          <Feed username={user?.username} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenue user={user} />
      </div>
    </div>
  );
}
