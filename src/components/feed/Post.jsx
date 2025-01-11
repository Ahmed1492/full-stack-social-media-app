import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "@/components/feed/Comments";
import PostInfo from "@/components/feed/PostInfo";
import PostInteractions from "@/components/feed/PostInteractions";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
export default function Post({ post }) {
  const { userId } = auth();
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
        {userId === post.user.id && <PostInfo postId={post.id} />}
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
      <Suspense fallback="Loading...">
        <PostInteractions
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      {/* Comments */}
      <Suspense fallback="Loading...">
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
}
