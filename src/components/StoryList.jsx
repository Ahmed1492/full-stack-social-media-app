"use client";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useOptimistic, useState, useRef } from "react";
import OpenedStory from "@/components/OpenedStory";

export default function StoryList({ stories, userId }) {
  const { user, isLoaded } = useUser();
  const [storyList, setStoryList] = useState(stories);
  const [openedGroup, setOpenedGroup] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const [optimisticStory, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value) => [value, ...state]
  );

  if (!isLoaded) return null;
  if (!userId) return null;

  // Group stories by user — one circle per user
  const grouped = optimisticStory.reduce((acc, story) => {
    const uid = story.user.id;
    if (!acc[uid]) acc[uid] = { user: story.user, stories: [] };
    acc[uid].stories.push(story);
    return acc;
  }, {});
  const groups = Object.values(grouped);

  const uploadAndPost = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      addOptimisticStory({
        id: Math.random(),
        img: data.secure_url,
        createdAt: new Date(),
        expirseAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userId,
        user: {
          id: userId,
          username: user?.username || "You",
          avatar: user?.imageUrl || "/noAvatar.png",
          name: user?.firstName || "",
          surname: user?.lastName || "",
        },
      });

      const created = await addStory(data.secure_url);
      setStoryList((prev) => [created, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      {/* Add story button */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <button
          onClick={() => fileRef.current?.click()}
          className="relative w-16 h-16 rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src={preview || user?.imageUrl || "/noAvatar.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
            {isUploading ? (
              <div className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-white text-xs font-bold leading-none">+</span>
            )}
          </div>
        </button>
        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
          {isUploading ? "Posting..." : "Add Story"}
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => uploadAndPost(e.target.files[0])}
        />
      </div>

      {/* One circle per user */}
      {groups.map((group) => (
        <div
          key={group.user.id}
          className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 group"
          onClick={() => setOpenedGroup({ stories: group.stories, startIndex: 0 })}
        >
          <div className="relative w-16 h-16 rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 p-0.5 group-hover:from-pink-600 group-hover:to-yellow-500 transition-all duration-200">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={group.stories[0].img || group.user.avatar || "/noAvatar.png"}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            {group.stories.length > 1 && (
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">{group.stories.length}</span>
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors whitespace-nowrap max-w-[72px] truncate">
            {group.user.name || group.user.username}
          </span>
        </div>
      ))}

      {/* Story viewer */}
      {openedGroup && (
        <OpenedStory
          stories={openedGroup.stories}
          startIndex={openedGroup.startIndex}
          onClose={() => setOpenedGroup(null)}
        />
      )}
    </>
  );
}
