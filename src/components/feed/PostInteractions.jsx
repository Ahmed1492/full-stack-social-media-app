"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

export default function PostInteractions({ postId, likes, commentNumber, onCommentClick }) {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state) => ({
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    })
  );

  const likeAction = async () => {
    switchOptimisticLike();
    try {
      await switchLike(postId);
      setLikeState((s) => ({
        likeCount: s.isLiked ? s.likeCount - 1 : s.likeCount + 1,
        isLiked: !s.isLiked,
      }));
    } catch (e) { console.log(e); }
  };

  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center gap-1">
        {/* Like */}
        <form action={likeAction}>
          <button
            type="submit"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
              optimisticLike.isLiked
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <span className={`text-base transition-transform duration-200 ${optimisticLike.isLiked ? "scale-125" : "hover:scale-110"}`}>
              {optimisticLike.isLiked ? "❤️" : "🤍"}
            </span>
            <span>{optimisticLike.likeCount}</span>
            <span className="hidden md:inline text-xs">Likes</span>
          </button>
        </form>

        {/* Comment */}
        <button
          onClick={onCommentClick}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 active:scale-95"
        >
          <span className="text-base hover:scale-110 transition-transform duration-200">💬</span>
          <span>{commentNumber}</span>
          <span className="hidden md:inline text-xs">Comments</span>
        </button>
      </div>

      {/* Share */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-200 active:scale-95">
        <span className="text-base hover:scale-110 transition-transform duration-200">↗️</span>
        <span className="hidden md:inline text-xs">Share</span>
      </button>
    </div>
  );
}
