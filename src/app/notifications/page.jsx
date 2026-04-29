import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const typeConfig = {
  like: { emoji: "❤️", color: "bg-red-100", text: "liked your post" },
  comment: { emoji: "💬", color: "bg-blue-100", text: "commented on your post" },
  follow_request: { emoji: "👤", color: "bg-green-100", text: "sent you a friend request" },
  follow_accept: { emoji: "✓", color: "bg-green-100", text: "accepted your friend request" },
  message: { emoji: "✉️", color: "bg-purple-100", text: "sent you a message" },
};

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function NotificationsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const notifications = await prisma.notification.findMany({
    where: { receiverId: userId },
    include: {
      sender: { select: { username: true, avatar: true, name: true, surname: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Mark all as read
  await prisma.notification.updateMany({
    where: { receiverId: userId, read: false },
    data: { read: true },
  });

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 text-xl">Notifications</h2>
            {unread.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unread.length} new
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <p className="text-gray-500 font-semibold">No notifications yet</p>
              <p className="text-gray-400 text-sm mt-1">When someone likes or comments on your posts, you'll see it here.</p>
            </div>
          ) : (
            <>
              {/* Unread */}
              {unread.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">New · {unread.length}</p>
                  <NotifList notifications={unread} />
                </div>
              )}
              {/* Read */}
              {read.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Earlier</p>
                  <NotifList notifications={read} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}

function NotifList({ notifications }) {
  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notif) => {
        const config = typeConfig[notif.type] || typeConfig.like;
        const name =
          notif.sender.name && notif.sender.surname
            ? `${notif.sender.name} ${notif.sender.surname}`
            : notif.sender.username;

        return (
          <Link
            key={notif.id}
            href={
              notif.type === "follow_request"
                ? "/friends"
                : notif.type === "message" && notif.conversationId
                ? `/messages?conv=${notif.conversationId}`
                : notif.type === "follow_accept"
                ? `/profile/${notif.sender.username}`
                : notif.postId
                ? `/post/${notif.postId}`
                : `/profile/${notif.sender.username}`
            }
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
              !notif.read ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={notif.sender.avatar || "/noAvatar.png"}
                alt=""
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.color} rounded-full flex items-center justify-center text-xs border-2 border-white`}>
                {config.emoji}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">
                <span className="font-bold">{name}</span>{" "}
                <span>{config.text}</span>
              </p>
              <p className={`text-xs mt-0.5 font-medium ${!notif.read ? "text-blue-500" : "text-gray-400"}`}>
                {timeAgo(notif.createdAt)}
              </p>
            </div>
            {!notif.read && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full flex-shrink-0" />}
          </Link>
        );
      })}
    </div>
  );
}
