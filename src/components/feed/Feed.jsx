import React from "react";
import Post from "@/components/feed/Post";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
export default async function Feed({ username = null }) {
  const { userId: currentUserID } = await auth();
  let posts;
  //  posts in Profile Page
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  // Posts in home page [Friends Posts ]
  if (!username && currentUserID) {
    const followings = await prisma.follower.findMany({
      where: {
        followerId: currentUserID,
      },
      select: {
        followingId: true,
      },
    });
    const followingsId = followings.map((f) => f.followingId);
    const { userId } = await auth();
    const ids = [userId, ...followingsId];
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  if (!posts) return null;
  return (
    <div className="flex flex-col gap-4">
      {posts.length !== 0 ? (
        posts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 font-medium">No posts yet. Be the first to share something!</p>
        </div>
      )}
    </div>
  );
}
