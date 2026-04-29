import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import FriendRequestButtons from "@/components/FriendRequestButtons";

export const dynamic = "force-dynamic";

export default async function FriendsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  // Incoming friend requests
  const requests = await prisma.followerRequest.findMany({
    where: { receiverId: userId },
    include: { sender: true },
    orderBy: { createdAt: "desc" },
  });

  // All followers (people following me)
  const followers = await prisma.follower.findMany({
    where: { followingId: userId },
    include: { follower: true },
    orderBy: { createdAt: "desc" },
  });

  // All followings (people I follow)
  const followings = await prisma.follower.findMany({
    where: { followerId: userId },
    include: { following: true },
    orderBy: { createdAt: "desc" },
  });

  // Mutual friends = people who follow me AND I follow them
  const followerIds = new Set(followers.map((f) => f.followerId));
  const followingIds = new Set(followings.map((f) => f.followingId));
  const mutualIds = [...followerIds].filter((id) => followingIds.has(id));

  const mutualFriends = followers
    .filter((f) => mutualIds.includes(f.followerId))
    .map((f) => f.follower);

  // People I follow (not mutual)
  const followingOnly = followings
    .filter((f) => !followerIds.has(f.followingId))
    .map((f) => f.following);

  // People following me (not mutual)
  const followersOnly = followers
    .filter((f) => !followingIds.has(f.followerId))
    .map((f) => f.follower);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-6">

        {/* Friend Requests */}
        {requests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Friend Requests</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {requests.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requests.map((req) => (
                <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200">
                  <Link href={`/profile/${req.sender.username}`}>
                    <Image
                      src={req.sender.avatar || "/noAvatar.png"}
                      alt=""
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-blue-400 transition-all"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${req.sender.username}`}>
                      <p className="font-semibold text-sm text-gray-800 truncate hover:text-blue-600 transition-colors">
                        {req.sender.name && req.sender.surname
                          ? `${req.sender.name} ${req.sender.surname}`
                          : req.sender.username}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400">@{req.sender.username}</p>
                  </div>
                  <FriendRequestButtons requestId={req.id} senderId={req.sender.id} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mutual Friends */}
        <FriendSection
          title="Mutual Friends"
          count={mutualFriends.length}
          users={mutualFriends}
          emptyText="No mutual friends yet."
          badge="mutual"
        />

        {/* Following */}
        {followingOnly.length > 0 && (
          <FriendSection
            title="Following"
            count={followingOnly.length}
            users={followingOnly}
            emptyText=""
            badge="following"
          />
        )}

        {/* Followers */}
        {followersOnly.length > 0 && (
          <FriendSection
            title="Followers"
            count={followersOnly.length}
            users={followersOnly}
            emptyText=""
            badge="follower"
          />
        )}

        {/* Empty state */}
        {mutualFriends.length === 0 && followingOnly.length === 0 && followersOnly.length === 0 && requests.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image src="/friends.png" alt="" width={32} height={32} className="opacity-40" />
            </div>
            <p className="text-gray-500 font-semibold mb-1">No connections yet</p>
            <p className="text-gray-400 text-sm">Start following people to build your network.</p>
          </div>
        )}
      </div>

      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}

function FriendSection({ title, count, users, emptyText, badge }) {
  if (users.length === 0 && !emptyText) return null;

  const badgeColors = {
    mutual: "bg-blue-100 text-blue-700",
    following: "bg-green-100 text-green-700",
    follower: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
        <span className="text-sm text-gray-400">{count}</span>
      </div>
      {users.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.username}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="relative flex-shrink-0">
                <Image
                  src={user.avatar || "/noAvatar.png"}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                  {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
                </p>
                <p className="text-xs text-gray-400 truncate">@{user.username}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${badgeColors[badge]}`}>
                {badge === "mutual" ? "Friends" : badge === "following" ? "Following" : "Follower"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
