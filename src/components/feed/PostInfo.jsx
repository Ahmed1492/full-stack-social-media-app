"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

export default function PostInfo({ postId }) {
  const [open, setOpen] = useState(false);
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <Image src="/more.png" className="cursor-pointer" width={18} height={18} alt="" />
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-white border border-gray-100 rounded-xl shadow-lg p-2 w-36 flex flex-col gap-1 z-50 animate-scale-in">
          <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150">
            View
          </button>
          <button className="text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150">
            Repost
          </button>
          <hr className="border-gray-100" />
          <form action={deletePostWithId}>
            <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 font-medium">
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
