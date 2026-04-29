"use client";

import Image from "next/image";
import { useState } from "react";
import OpenedStory from "@/components/OpenedStory";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function StoriesPageClient({ groups, currentUserId }) {
  const [openedGroup, setOpenedGroup] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const { user } = useUser();
  const router = useRouter();

  const uploadAndPost = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
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
      await addStory(data.secure_url);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-xl">Stories</h2>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            {isUploading ? (
              <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Posting...</>
            ) : (
              <><span className="text-base">+</span> Add Story</>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadAndPost(e.target.files[0])} />
        </div>

        {/* Story grid */}
        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-3xl">📸</span>
            </div>
            <p className="text-gray-500 font-semibold">No stories yet</p>
            <p className="text-gray-400 text-sm mt-1">Be the first to share a story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {groups.map((group) => (
              <button
                key={group.user.id}
                onClick={() => setOpenedGroup(group)}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={group.stories[0].img || group.user.avatar || "/noAvatar.png"}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                {/* User avatar top */}
                <div className="absolute top-3 left-3">
                  <div className="w-9 h-9 rounded-full ring-2 ring-blue-500 overflow-hidden">
                    <Image src={group.user.avatar || "/noAvatar.png"} alt="" width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Story count badge */}
                {group.stories.length > 1 && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {group.stories.length}
                  </div>
                )}

                {/* Name bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs font-semibold truncate drop-shadow">
                    {group.user.id === currentUserId ? "Your Story" : (group.user.name || group.user.username)}
                  </p>
                  <p className="text-white/70 text-[10px]">
                    {new Date(group.stories[0].createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Story viewer */}
      {openedGroup && (
        <OpenedStory
          stories={openedGroup.stories}
          startIndex={0}
          onClose={() => setOpenedGroup(null)}
        />
      )}
    </div>
  );
}
