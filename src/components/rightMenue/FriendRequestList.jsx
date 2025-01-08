"use client";
import { acceptFollowRequest, rejectFollowRequest } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useOptimistic, useState } from "react";

export default function FriendRequestList({ requests }) {
  const [requestsState, setRequestsState] = useState(requests);
  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestsState,
    (state, value) => state.filter((newState) => newState.id !== value)
  );

  const accept = async (requestId, userId) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestsState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async (requestId, userId) => {
    removeOptimisticRequest(requestId);
    try {
      await rejectFollowRequest(userId);
      setRequestsState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };
  if (requests.length === 0) return null;
  return (
    <div>
      {optimisticRequests.map((req) => (
        <div key={req.id} className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-2  text-sm items-center">
            <Image
              src={req.sender.avatar || "/noAvatar.png"}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <Link
              href={`/profile/${req.sender.username}`}
              className="font-bold text-gray-800 "
            >
              {req.sender.name && req.sender.surname
                ? req.sender.name + " " + req.sender.surname
                : req.sender.username}
            </Link>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <form action={() => accept(req.id, req.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  className="w-5 h-5 rounded-full object-cover cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={() => reject(req.id, req.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  className="w-5 h-5 rounded-full object-cover cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
