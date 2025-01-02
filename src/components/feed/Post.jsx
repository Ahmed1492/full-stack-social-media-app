import Image from "next/image";
import React from "react";
import Comments from "@/components/feed/Comments";
export default function Post({ post }) {
  // console.log(post);
  console.log(">>>>", post, "<<<<");

  return (
    <div className="flex flex-col gap-3">
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover cursor-pointer "
            width={40}
            height={40}
          />
          <span className="text-slate-700 font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        <Image
          src="/more.png"
          className="cursor-pointer"
          width={18}
          height={18}
          alt=""
        />
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative ">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p className=" text-slate-700 font-medium">{post?.description}</p>
      </div>
      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src="/like.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123 <span className=" hidden md:inline">Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src="/comment.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123 <span className=" hidden md:inline">Comments</span>
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src="/share.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123 <span className=" hidden md:inline">Shares</span>
            </span>
          </div>
        </div>
      </div>
      {/* Comments */}
      <Comments />
    </div>
  );
}
