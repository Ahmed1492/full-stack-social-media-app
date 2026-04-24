import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import MediaGrid from "@/components/rightMenue/MediaGrid";

export default async function UserMediaCard({ user }) {
  const { userId: currentUser } = await auth();
  if (!currentUser) return null;

  const posts = await prisma.post.findMany({
    where: { userId: user.id, img: { not: null } },
    take: 9,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 animate-slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-gray-900 text-sm">Media</span>
        <span className="text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
          {posts.length} photos
        </span>
      </div>
      <MediaGrid posts={posts} />
    </div>
  );
}
