"use client";

import { useState } from "react";
import ProfileStatsModal from "@/components/ProfileStatsModal";

export default function ProfileStats({ username, posts, followers, followings, counts }) {
  const [activeTab, setActiveTab] = useState(null);

  const stats = [
    { key: "posts", label: "Posts", value: counts.posts },
    { key: "followers", label: "Followers", value: counts.followers },
    { key: "following", label: "Following", value: counts.followings },
  ];

  return (
    <>
      <div className="flex gap-6 pt-4 border-t border-gray-100">
        {stats.map((stat) => (
          <button
            key={stat.key}
            onClick={() => setActiveTab(stat.key)}
            className="flex flex-col items-center gap-0.5 group cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <span className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {stat.value}
            </span>
            <span className="text-xs text-gray-400 font-medium group-hover:text-blue-500 transition-colors">
              {stat.label}
            </span>
          </button>
        ))}
      </div>

      {activeTab && (
        <ProfileStatsModal
          username={username}
          initialTab={activeTab}
          posts={posts}
          followers={followers}
          followings={followings}
          onClose={() => setActiveTab(null)}
        />
      )}
    </>
  );
}
