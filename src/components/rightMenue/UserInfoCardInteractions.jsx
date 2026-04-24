"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

export default function UserInfoCardInteractions({
  userId, currentUserId, isUserBlocked, isFollowing, isFollowingSent,
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

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
      <form action={block}>
        <button className="w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-1.5 rounded-xl transition-all duration-200 font-medium">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </div>
  );
}
