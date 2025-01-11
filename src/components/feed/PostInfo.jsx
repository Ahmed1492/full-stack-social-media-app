"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

export default function PostInfo({ postId }) {
  const [open, setOpen] = useState(false);
  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        onClick={() => setOpen(!open)}
        src="/more.png"
        className="cursor-pointer"
        width={18}
        height={18}
        alt=""
      />
      {open && (
        <div className="absolute top-4 right-0 p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-50 bg-white">
          <span className="cursor-pointer ">View</span>
          <span className="cursor-pointer ">Repost</span>
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
}
