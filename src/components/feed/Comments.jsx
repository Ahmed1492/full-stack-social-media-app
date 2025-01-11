import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import CommentList from "@/components/feed/CommentList";
export default async function Comments({ postId }) {
  const { userId } = auth();
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });


  return (
    <div className="flex flex-col gap-8">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
}
