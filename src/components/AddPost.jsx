"use client";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import AddPostButton from "@/components/feed/AddPostButton";
import { addPost } from "@/lib/actions";
import Loading from "@/components/Loading";

export default function AddPost() {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-8 items-center justify-between text-sm">
      {/* Avatar */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        className="w-12 h-12 rounded-full object-cover "
        width={48}
        height={48}
      />
      {/* Post */}
      <div className="flex-1 ">
        {/* Text Area */}
        <form
          action={(formData) => addPost(formData, img.secure_url || "")}
          className="flex items-center gap-4"
        >
          <textarea
            className=" flex-1 p-2 rounded-lg outline-none bg-slate-100"
            placeholder="whats on your mind"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <Image
            className="w-5 h-5 cursor-pointer self-end"
            src="/emoji.png"
            width={20}
            height={20}
            alt=""
          />
          <AddPostButton />
        </form>
        {/* Post Options */}
        <div className="flex items-center justify-start gap-6 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  onClick={open ? () => open() : console.log("not Allowed")}
                  className="flex items-center gap-2 mt-5 cursor-pointer"
                >
                  <Image
                    src="/addimage.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span className="font-medium text-slate-500">Photo</span>
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/addvideo.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Vidoe</span>
          </div>
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/poll.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Poll</span>
          </div>
          <div className="flex items-center gap-2 mt-5 cursor-pointer">
            <Image
              src="/addevent.png"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-cover"
            />
            <span className="font-medium text-slate-500">Event</span>
          </div>
        </div>
      </div>
    </div>
  );
}
