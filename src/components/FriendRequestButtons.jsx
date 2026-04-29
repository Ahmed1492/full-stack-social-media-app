"use client";

import { acceptFollowRequest, rejectFollowRequest } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FriendRequestButtons({ requestId, senderId }) {
  const [loading, setLoading] = useState(null); // "accept" | "reject" | null
  const [done, setDone] = useState(false);
  const router = useRouter();

  if (done) return null;

  const handle = async (type) => {
    setLoading(type);
    try {
      if (type === "accept") await acceptFollowRequest(senderId);
      else await rejectFollowRequest(senderId);
      setDone(true);
      router.refresh();
    } catch (e) {
      console.error(e);
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 flex-shrink-0">
      <button
        onClick={() => handle("accept")}
        disabled={!!loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center justify-center gap-1 min-w-[64px]"
      >
        {loading === "accept" ? (
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : "Accept"}
      </button>
      <button
        onClick={() => handle("reject")}
        disabled={!!loading}
        className="bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 flex items-center justify-center gap-1 min-w-[64px]"
      >
        {loading === "reject" ? (
          <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : "Decline"}
      </button>
    </div>
  );
}
