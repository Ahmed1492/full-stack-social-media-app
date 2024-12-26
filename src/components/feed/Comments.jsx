import Image from "next/image";
import React from "react";

export default function Comments() {
  return (
    <div className="flex flex-col gap-4">
      {/* add Comment */}
      <div className="flex justify-between items-center gap-6 text-sm">
        <Image
          src="https://images.pexels.com/photos/29579097/pexels-photo-29579097/free-photo-of-young-woman-photographer-in-istanbul-archway.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-7 h-7 rounded-full object-cover"
          width={28}
          height={28}
        />
        <div className="w-full flex-1 flex justify-between items-center bg-slate-100 py-2 px-6 rounded-lg ">
          <input
            type="text"
            className="flex-1 outline-none bg-transparent"
            placeholder="Write A Comment"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className=" w-5 h-5  cursor-pointer"
          />
        </div>
      </div>
      {/* All Comments */}
      <div className="flex flex-col gap-4">
        {/* USER */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-medium text-slate-600">Ahmed Mohamed</span>
          </div>
          <Image
            src="/more.png"
            className="cursor-pointer"
            width={18}
            height={18}
            alt=""
          />
        </div>
        {/* Comment */}
        <p className="text-slate-900">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quidem
          dolore nam obcaecati id enim. Asperiores molestiae ducimus, magnam
          saepe veritatis incidunt, accusamus aperiam optio, totam dolorem
          pariatur laudantium doloribus!
        </p>
        <div className="flex items-center gap-5 text-sm">
          <Image
            src="/like.png"
            className="cursor-pointer"
            width={18}
            height={18}
            alt=""
          />
          <span className="text-gray-300 ">|</span>
          <div className="flex items-center gap-5">
            <span className="text-gray-500 font-medium">123 Likes</span>
            <span className="text-gray-500 font-medium">Replay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
