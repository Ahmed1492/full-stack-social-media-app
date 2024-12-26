import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

export default async function ProfileCart() {
  const { userId } = auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  console.log(user);
  if (!user) return null;
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 text-sm flex flex-col gap-2">
      <div className=" h-24 relative ">
        <Image
          src={user.cover || "/noCover.jpg"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          className="rounded-full object-cover ring-1 ring-white z-10 w-12 h-12 absolute left-0 right-0 m-auto -bottom-6" // > height : 12
          width={48}
          height={48}
        />
      </div>
      <span className="font-bold mt-4  text-lg text-center">
        {user.name && user.surname
          ? user.name + " " + user.surname
          : user.username}
      </span>
      <div className="flex items-center justify-center gap-3">
        {/* IMAGES */}
        <div className="flex items-center gap-1">
          <Image
            src="https://images.pexels.com/photos/19975991/pexels-photo-19975991/free-photo-of-laughing-woman-in-fur-hat-sitting-on-mans-back-under-snowfall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-4 h-4 object-cover rounded-full"
            width={16}
            height={16}
          />
          <Image
            src="https://images.pexels.com/photos/19975991/pexels-photo-19975991/free-photo-of-laughing-woman-in-fur-hat-sitting-on-mans-back-under-snowfall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-4 h-4 object-cover rounded-full"
            width={16}
            height={16}
          />
          <Image
            src="https://images.pexels.com/photos/19975991/pexels-photo-19975991/free-photo-of-laughing-woman-in-fur-hat-sitting-on-mans-back-under-snowfall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-4 h-4 object-cover rounded-full"
            width={16}
            height={16}
          />
        </div>
        {/* FOLLWOERS NUMBER */}
        <span className="font-light text-gray-500 text-base">
          {user._count.followers} Follwers
        </span>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-blue-500 text-white py-2 px-2 rounded-lg text-base ">
          My Profile
        </button>
      </div>
    </div>
  );
}
