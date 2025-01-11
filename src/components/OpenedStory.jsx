"use client";
import Image from "next/image";
import React from "react";

export default function OpenedStory({ openStory, setOpenStroy }) {
  console.log(openStory);
  if (!openStory.img) return;
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-85  z-50 left-0 right-0 top-0 flex items-center   justify-center">
      <div className="w-1/4 h-4/5 relative">
        <Image
          src={openStory?.img}
          alt="openStory"
          fill
          className="object-cover ring-2 ring-white rounded-md"
        />
        <span
          onClick={() => setOpenStroy(null)}
          className="text-whiete border  border-black px-2 py-1 cursor-pointer  text-lg absolute right-1 top-1 "
        >
          X
        </span>
      </div>
    </div>
  );
}
