"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState, useRef } from "react";
import AddPostButton from "@/components/feed/AddPostButton";
import { addPost } from "@/lib/actions";
import Loading from "@/components/Loading";
import PostSkeleton from "@/components/feed/PostSkeleton";

const EMOJIS = ["😀","😂","❤️","👍","🔥","😍","🎉","😢","😮","🙏","✨","💯"];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function AddPost({ onPostAdded }) {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileRef = useRef(null);

  if (!isLoaded) return <Loading />;

  const uploadToCloudinary = async (file) => {
    if (!file) return;

    // Type check
    if (!file.type.startsWith("image/")) {
      setImgError("Only image files are supported (PNG, JPG, GIF, WebP).");
      return;
    }

    // Size check
    if (file.size > MAX_SIZE_BYTES) {
      setImgError(
        `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please choose an image under ${MAX_SIZE_MB} MB.`
      );
      return;
    }

    setImgError(null);
    const localUrl = URL.createObjectURL(file);
    setImgPreview(localUrl);
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
      if (data.secure_url) {
        setImg(data.secure_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      setImgPreview(null);
      setImgError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => uploadToCloudinary(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadToCloudinary(e.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setImg(null);
    setImgPreview(null);
    setImgError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (formData) => {
    setIsPosting(true);
    try {
      await addPost(formData, img || "");
      setImg(null);
      setImgPreview(null);
      setDesc("");
      setImgError(null);
      onPostAdded?.();
    } finally {
      setIsPosting(false);
    }
  };

  // Show skeleton while waiting for feed to refresh
  if (isPosting) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 opacity-50 pointer-events-none">
          <p className="text-sm text-gray-400 text-center">Publishing your post...</p>
        </div>
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-fade-in">
      <div className="flex gap-3 items-start">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100 flex-shrink-0"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <form action={handleSubmit} className="flex flex-col gap-3">
            {/* Textarea */}
            <div className="relative">
              <textarea
                className="w-full p-3 pr-10 rounded-xl outline-none bg-gray-50 border border-gray-200 focus:border-blue-400 focus:bg-white transition-all duration-200 resize-none text-sm text-gray-700 placeholder-gray-400 min-h-[80px]"
                placeholder="What's on your mind?"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="absolute bottom-3 right-3">
                <button
                  type="button"
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="text-lg hover:scale-110 transition-transform duration-200"
                >
                  😊
                </button>
                {showEmojis && (
                  <div className="absolute bottom-8 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 flex flex-wrap gap-1.5 w-52 z-50 animate-scale-in">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => { setDesc((d) => d + emoji); setShowEmojis(false); }}
                        className="text-xl hover:scale-125 transition-transform duration-150 p-1 rounded-lg hover:bg-gray-50"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image error banner */}
            {imgError && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-scale-in">
                <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-sm text-red-600 font-medium flex-1">{imgError}</p>
                <button type="button" onClick={() => setImgError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Image area */}
            {imgPreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 animate-scale-in group">
                <Image
                  src={imgPreview}
                  alt="preview"
                  width={600}
                  height={400}
                  className="w-full max-h-72 object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-white text-sm font-semibold">Uploading...</span>
                  </div>
                )}
                {!isUploading && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>✓</span> Ready
                  </div>
                )}
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-110"
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 py-6 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50 scale-[1.01]"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isDragging ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <span className="text-xl">🖼️</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    {isDragging ? "Drop your image here!" : "Add a photo"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Click or drag & drop · PNG, JPG · Max {MAX_SIZE_MB} MB
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Bottom bar */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-100">
              <div className="flex items-center gap-1">
                {[
                  { src: "/addVideo.png", label: "Video" },
                  { src: "/poll.png", label: "Poll" },
                  { src: "/addevent.png", label: "Event" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-105"
                  >
                    <Image src={item.src} alt="" width={16} height={16} />
                    {item.label}
                  </button>
                ))}
              </div>
              <AddPostButton disabled={isUploading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
