"use client";

import { useState, useTransition } from "react";
import AddPost from "@/components/AddPost";
import PostSkeleton from "@/components/feed/PostSkeleton";
import { useRouter } from "next/navigation";

export default function FeedSection({ feedSlot }) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePostAdded = () => {
    setShowSkeleton(true);
    startTransition(() => {
      router.refresh();
    });
  };

  // Once the router refresh completes, hide skeleton
  if (showSkeleton && !isPending) {
    // Small delay so the new post animates in nicely
    setTimeout(() => setShowSkeleton(false), 100);
  }

  return (
    <div className="flex flex-col gap-6">
      <AddPost onPostAdded={handlePostAdded} />

      {showSkeleton ? (
        <div className="flex flex-col gap-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : (
        feedSlot
      )}
    </div>
  );
}
