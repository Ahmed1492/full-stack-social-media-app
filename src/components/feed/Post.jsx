import Image from "next/image";
import React from "react";
import Comments from "@/components/feed/Comments";
import PostInteractions from "@/components/feed/PostInteractions";
import Link from "next/link";
export default function Post({ post }) {
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
          <Link
            href={`/profile/${post.user.username}`}
            className="text-slate-700 font-medium"
          >
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </Link>
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
      <PostInteractions
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />
      {/* Comments */}
      <Comments postId={post.id} />
    </div>
  );
}
