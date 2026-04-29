"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

export default function ProfileStatsModal({ username, initialTab, posts, followers, followings, onClose }) {
  const [tab, setTab] = useState(initialTab || "posts");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  // Reset scroll when switching tabs
  const handleTabChange = (key) => {
    setTab(key);
  };

  const tabs = [
    { key: "posts", label: "Posts", count: posts.length },
    { key: "followers", label: "Followers", count: followers.length },
    { key: "following", label: "Following", count: followings.length },
  ];

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-scale-in"
        style={{ maxHeight: "80vh", zIndex: 10000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-bold text-gray-900 text-base">@{username}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all text-xl font-light"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTabChange(t.key)}
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                tab === t.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.count} {t.label}
            </button>
          ))}
        </div>

        {/* Content — key forces remount on tab change to reset scroll */}
        <div key={tab} className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {tab === "posts" && (
            posts.length === 0 ? (
              <EmptyState text="No posts yet" />
            ) : (
              <div className="grid grid-cols-3 gap-0.5 p-0.5">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/profile/${username}`}
                    onClick={onClose}
                    className="aspect-square relative group overflow-hidden bg-gray-100"
                  >
                    {post.img ? (
                      <Image
                        src={post.img}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 p-2">
                        <p className="text-xs text-gray-400 text-center line-clamp-3">{post.description}</p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )
          )}

          {tab === "followers" && (
            followers.length === 0 ? (
              <EmptyState text="No followers yet" />
            ) : (
              <div className="flex flex-col divide-y divide-gray-50">
                {followers.map((f) => (
                  <UserRow key={f.id} user={f.follower} onClose={onClose} />
                ))}
              </div>
            )
          )}

          {tab === "following" && (
            followings.length === 0 ? (
              <EmptyState text="Not following anyone yet" />
            ) : (
              <div className="flex flex-col divide-y divide-gray-50">
                {followings.map((f) => (
                  <UserRow key={f.id} user={f.following} onClose={onClose} />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function UserRow({ user, onClose }) {
  return (
    <Link
      href={`/profile/${user.username}`}
      onClick={onClose}
      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors group"
    >
      <Image
        src={user.avatar || "/noAvatar.png"}
        alt=""
        width={44}
        height={44}
        className="w-11 h-11 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors truncate">
          {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
        </p>
        <p className="text-xs text-gray-400">@{user.username}</p>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </Link>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-gray-400 font-medium text-sm">{text}</p>
    </div>
  );
}
