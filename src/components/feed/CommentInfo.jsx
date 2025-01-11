"use client";

import { deleteComment } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

export default function CommentInfo({
  id,
  postId,
  onDelete,
  setIsDeleteComment,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteComment(id, postId); // Call the server function
      setIsDeleteComment(id);
      if (onDelete) onDelete(id); // Notify parent to update state
    } catch (error) {
      console.error("Failed to delete the comment:", error);
    } finally {
      setIsLoading(false);
      setIsDeleteComment(null);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <Image
        onClick={() => setOpen(!open)}
        src="/more.png"
        className="cursor-pointer"
        width={18}
        height={18}
        alt="More options"
      />
      {open && (
        <div className="absolute top-4 right-0 p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-50 bg-white">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Repost</span>
          <button
            onClick={handleDelete}
            className="text-red-500 cursor-pointer"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
