"use client";

import { switchBlock, switchFollow, getOrCreateConversation } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserInfoCardInteractions({
  userId, currentUserId, isUserBlocked, isFollowing, isFollowingSent,
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  const [messaging, setMessaging] = useState(false);
  const router = useRouter();

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value) =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent: !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) { console.log(error); }
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({ ...prev, blocked: !prev.blocked }));
    } catch (error) { console.log(error); }
  };

  const message = async () => {
    setMessaging(true);
    try {
      const conv = await getOrCreateConversation(userId);
      router.push(`/messages?conv=${conv.id}`);
    } catch (e) {
      console.error(e);
      setMessaging(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
      <form action={follow}>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md hover:shadow-blue-200">
          {optimisticState.following
            ? "✓ Following"
            : optimisticState.followingRequestSent
            ? "Request Sent"
            : "+ Follow"}
        </button>
      </form>

      <button
        onClick={message}
        disabled={messaging}
        className="w-full bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-700 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
      >
        {messaging ? (
          <><span className="w-3.5 h-3.5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" /> Opening...</>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Message
          </>
        )}
      </button>

      <form action={block}>
        <button className="w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-1.5 rounded-xl transition-all duration-200 font-medium">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </div>
  );
}
