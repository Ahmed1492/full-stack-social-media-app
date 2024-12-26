import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

export default function AddPost() {
  const { userId } = auth(); // get User Id

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-8 items-center justify-between text-sm">
      {/* Avatar */}
      <Image
        src="https://images.pexels.com/photos/29254310/pexels-photo-29254310/free-photo-of-mystical-autumn-landscape-in-foggy-hamburg.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        className="w-12 h-12 rounded-full object-cover "
        width={48}
        height={48}
      />
      {/* Post */}
      <div className="flex-1 ">
        {/* Text Area */}
        <form action="" className="flex items-center gap-4">
          <textarea
            className=" flex-1 p-2 rounded-lg outline-none bg-slate-100"
            placeholder="whats on your mind"
            name="desc"
          ></textarea>
          <Image
            className="w-5 h-5 cursor-pointer self-end"
            src="/emoji.png"
            width={20}
            height={20}
            alt=""
          />
          <button>Send</button>
        </form>
        {/* Post Options */}
        <div className="flex items-center justify-start gap-6 flex-wrap">
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/addimage.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Photo</span>
          </div>
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/addvideo.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Vidoe</span>
          </div>
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/poll.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Poll</span>
          </div>
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/addevent.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Event</span>
          </div>
        </div>
      </div>
    </div>
  );
}
