"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PostInteractions from "@/components/feed/PostInteractions";
import PostInfo from "@/components/feed/PostInfo";
import PostModal from "@/components/feed/PostModal";
import CommentList from "@/components/feed/CommentList";

export default function PostCard({ post, userId, comments, autoOpenComments = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(autoOpenComments);

  return (
    <>
      <article className="group flex flex-col gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:shadow-blue-50/60 hover:-translate-y-0.5 transition-all duration-300 animate-slide-up">

        {/* Header */}
        <div className="flex justify-between items-center">
          <Link href={`/profile/${post.user.username}`} className="flex items-center gap-3 group/user">
            <div className="relative">
              <Image
                src={post.user.avatar || "/noAvatar.png"}
                alt=""
                className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover/user:ring-blue-400 group-hover/user:scale-105 transition-all duration-300"
                width={40}
                height={40}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 font-bold text-sm group-hover/user:text-blue-600 transition-colors duration-200">
                {post.user.name && post.user.surname
                  ? post.user.name + " " + post.user.surname
                  : post.user.username}
              </span>
              <span className="text-gray-400 text-xs">
                {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </Link>
          {userId === post.user.id && <PostInfo post={post} onView={() => setModalOpen(true)} />}
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-gray-700 leading-relaxed text-sm">{post.description}</p>
        )}

        {/* Image */}
        {post.img && (
          <div
            className="w-full min-h-64 relative rounded-2xl overflow-hidden cursor-pointer group/img"
            onClick={() => setModalOpen(true)}
          >
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover group-hover/img:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-2.5 shadow-xl flex items-center gap-2 translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <span className="text-sm font-bold text-gray-800">View Post</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactions */}
        <PostInteractions
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
          onCommentClick={() => setShowComments((v) => !v)}
        />

        {/* Inline comments */}
        {showComments && (
          <div className="border-t border-gray-100 pt-4 animate-slide-up">
            <CommentList comments={comments} postId={post.id} />
          </div>
        )}
      </article>

      {modalOpen && (
        <PostModal
          post={post}
          userId={userId}
          comments={comments}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
