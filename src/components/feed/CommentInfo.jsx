"use client";

import { deleteComment } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

export default function CommentInfo({ id, postId, setIsDeleteComment }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteComment(id, postId);
      setIsDeleteComment(id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <Image src="/more.png" className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity" width={14} height={14} alt="" />
      </button>
      {open && (
        <div className="absolute top-7 right-0 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5 w-28 flex flex-col z-50 animate-scale-in">
          <button className="text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">View</button>
          <button className="text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Reply</button>
          <hr className="border-gray-100 my-1" />
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
