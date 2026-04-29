import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import PostCard from "@/components/feed/PostCard";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }) {
  const { postId } = await params;
  const { userId } = await auth();

  const post = await prisma.post.findUnique({
    where: { id: parseInt(postId) },
    include: {
      user: true,
      likes: { select: { userId: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) return notFound();

  // Check if blocked
  if (userId) {
    const blocked = await prisma.block.findFirst({
      where: { blockerId: post.user.id, blockedId: userId },
    });
    if (blocked) return notFound();
  }

  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20">
          <LeftMenue type="home" />
        </div>
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-4">
        {/* Back link */}
        <a
          href="javascript:history.back()"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors w-fit"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </a>

        <PostCard
          post={post}
          userId={userId}
          comments={comments}
          autoOpenComments
        />
      </div>

      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20">
          <RightMenue user={null} />
        </div>
      </div>
    </div>
  );
}
