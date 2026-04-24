"use client";

import { updateProfile } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useActionState, useState, useRef } from "react";
import UpdateButton from "@/components/rightMenue/UpdateButton";

const fields = [
  { name: "name", label: "First Name", placeholder: "Ahmed" },
  { name: "surname", label: "Last Name", placeholder: "Mohamed" },
  { name: "description", label: "Bio", placeholder: "Life is beautiful..." },
  { name: "city", label: "City", placeholder: "Cairo" },
  { name: "school", label: "School", placeholder: "High School" },
  { name: "work", label: "Work", placeholder: "Software Engineer" },
  { name: "website", label: "Website", placeholder: "ahmed.dev" },
];

function CoverUploader({ currentCover, onUpload }) {
  const [preview, setPreview] = useState(currentCover || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef(null);

  const uploadToCloudinary = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
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
      setPreview(data.secure_url);
      onUpload(data.secure_url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    uploadToCloudinary(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadToCloudinary(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover Photo</p>
      <div
        onClick={() => !isUploading && fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
          isDragging
            ? "border-blue-500 scale-[1.01]"
            : "border-dashed border-gray-200 hover:border-blue-400"
        }`}
      >
        {preview ? (
          <>
            <Image src={preview} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-2">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-lg">📷</span>
                </div>
                <span className="text-white text-xs font-semibold bg-black/50 px-2 py-0.5 rounded-full">
                  Change Cover
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center gap-2 transition-colors duration-200 ${
            isDragging ? "bg-blue-50" : "bg-gray-50"
          }`}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🖼️</span>
            </div>
            <p className="text-sm font-medium text-gray-500">
              {isDragging ? "Drop it here!" : "Click or drag to upload"}
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-white text-xs font-medium">Uploading...</span>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default function UpdateUser({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverUrl, setCoverUrl] = useState(null);
  const router = useRouter();
  const [state, formAction] = useActionState(updateProfile, { sucess: false, error: false });

  const handleClose = () => {
    setIsOpen(false);
    router.refresh();
  };

  React.useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs font-semibold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all duration-200"
      >
        Edit Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all duration-200 text-xl font-light"
              >
                ×
              </button>
            </div>

            <form
              className="p-5 flex flex-col gap-5"
              action={(formData) => formAction({ formData, cover: coverUrl })}
            >
              {/* Cover uploader */}
              <CoverUploader
                currentCover={user.cover}
                onUpload={(url) => setCoverUrl(url)}
              />

              <p className="text-xs text-gray-400 bg-blue-50 rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span>💡</span>
                To change your avatar or username, use the account settings in the navbar.
              </p>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-3">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`flex flex-col gap-1 ${field.name === "description" ? "col-span-2" : ""}`}
                  >
                    <label className="text-xs font-semibold text-gray-500">{field.label}</label>
                    {field.name === "description" ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        defaultValue={user[field.name] || ""}
                        rows={2}
                        className="border border-gray-200 text-sm py-2 px-3 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200 resize-none"
                      />
                    ) : (
                      <input
                        name={field.name}
                        type="text"
                        placeholder={field.placeholder}
                        defaultValue={user[field.name] || ""}
                        className="border border-gray-200 text-sm py-2 px-3 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all duration-200"
                      />
                    )}
                  </div>
                ))}
              </div>

              {state.success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl font-medium flex items-center gap-2">
                  <span>✓</span> Profile updated successfully!
                </div>
              )}
              {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl font-medium flex items-center gap-2">
                  <span>✗</span> Something went wrong. Please try again.
                </div>
              )}

              <UpdateButton />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
