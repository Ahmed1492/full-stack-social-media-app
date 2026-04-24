"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import PostInteractions from "@/components/feed/PostInteractions";
import CommentList from "@/components/feed/CommentList";

export default function PostModal({ post, userId, comments, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-scale-in min-h-[70vh] min-w-[70vw]">
        {/* LEFT — Image or placeholder */}
        {post.img ? (
          <div className="relative w-full md:w-1/2 min-h-64 bg-black flex-shrink-0">
            <Image src={post.img} alt="" fill className="object-contain" />
          </div>
        ) : (
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center flex-shrink-0">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-400 text-sm font-medium">No image</p>
            </div>
          </div>
        )}

        {/* RIGHT — Content */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
            <Link
              href={`/profile/${post.user.username}`}
              onClick={onClose}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative">
                <Image
                  src={post.user.avatar || "/noAvatar.png"}
                  alt=""
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-400 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {post.user.name && post.user.surname
                    ? post.user.name + " " + post.user.surname
                    : post.user.username}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all text-xl font-light"
            >
              ×
            </button>
          </div>

          {/* Description */}
          {post.description && (
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <p className="text-sm text-gray-700 leading-relaxed">
                {post.description}
              </p>
            </div>
          )}

          {/* Comments — scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hidden">
            <CommentList comments={comments} postId={post.id} />
          </div>

          {/* Interactions */}
          <div className="px-4 border-t border-gray-100 flex-shrink-0">
            <PostInteractions
              postId={post.id}
              likes={post.likes.map((l) => l.userId)}
              commentNumber={post._count.comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
