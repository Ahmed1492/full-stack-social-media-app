"use client";

import { switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

export default function UserInfoCardInteractions({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  const follow = async () => {
    try {
      switchOptimisticFollow();
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    userState,
    (state) => ({
      ...state,
      following: state.following && false,
      followingRequestSent:
        !state.following && !state.followingRequestSent ? true : false,
    })
  );

  return (
    <div className="flex flex-col gap-3">
      <form action={follow}>
        <button className=" w-full bg-blue-500 text-white p-2 rounded-lg text-sm m-auto">
          {optimisticFollow.following
            ? "Following"
            : optimisticFollow.followingRequestSent
            ? "Frient Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action="">
        <div className="flex items-center justify-end">
          <button className="text-sm text-red-600 cursor-pointer font-medium">
            {optimisticFollow.blocked ? "Unblock User" : "Block User"}
          </button>
        </div>
      </form>
    </div>
  );
}
