import React from "react";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import PostCard from "@/components/feed/PostCard";

export default async function Post({ post }) {
  const { userId } = await auth();

  // Fetch comments server-side to pass to modal
  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PostCard
      post={post}
      userId={userId}
      comments={comments}
    />
  );
}
