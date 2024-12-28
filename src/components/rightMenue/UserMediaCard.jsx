import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

export default async function UserMediaCard({ user }) {
  const { userId: currentUser } = auth();
  if (!currentUser) throw new Error("you Are Not Authenticated");
  const userMediaRes = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log(":: > >>", userMediaRes);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">User Media</span>
        <span className="font-medium text-blue-400">See All</span>
      </div>
      {/* IMAGES */}
      <div className="flex  gap-3 mt-4 flex-wrap">
        {userMediaRes.length ? (
          userMediaRes.map((post) => (
            <Image
              key={post.id}
              src={post.img}
              alt=""
              className="w-20 h-32 rounded-lg object-cover"
              width={80}
              height={128}
            />
          ))
        ) : (
          <p className="text-center m-auto font-medium text-gray-600">
            No Media Found !
          </p>
        )}
      </div>
    </div>
  );
}
