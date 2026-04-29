import React, { Suspense } from "react";
import ProfileCart from "@/components/leftMenue/ProfileCart";
import Ads from "@/components/leftMenue/Ads";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const exploreLinks = [
  { href: "/marketplace", src: "/market.png", label: "MarketPlace", color: "bg-orange-100 text-orange-600", desc: "Buy & sell items" },
  { href: "/events", src: "/events.png", label: "Events", color: "bg-pink-100 text-pink-600", desc: "Upcoming events" },
  { href: "/groups", src: "/groups.png", label: "Groups", color: "bg-indigo-100 text-indigo-600", desc: "Join communities" },
  { href: "/videos", src: "/videos.png", label: "Videos", color: "bg-red-100 text-red-600", desc: "Watch & share" },
  { href: "/search", src: "/news.png", label: "News Feed", color: "bg-teal-100 text-teal-600", desc: "Latest updates" },
  { href: "/", src: "/courses.png", label: "Courses", color: "bg-cyan-100 text-cyan-600", desc: "Learn something new" },
];

const shortcutLinks = [
  { href: "/", src: "/posts.png", label: "My Posts" },
  { href: "/", src: "/albums.png", label: "Albums" },
  { href: "/", src: "/activity.png", label: "Activity" },
  { href: "/settings", src: "/settings.png", label: "Settings" },
  { href: "/search", src: "/search.png", label: "Search" },
];

export default async function LeftMenue({ type }) {
  const { userId } = await auth();

  let friendRequestCount = 0;
  let unreadNotifCount = 0;
  let onlineFriends = [];

  if (userId) {
    const [requests, notifs, followings] = await Promise.all([
      prisma.followerRequest.count({ where: { receiverId: userId } }),
      prisma.notification.count({ where: { receiverId: userId, read: false } }),
      prisma.follower.findMany({
        where: { followerId: userId },
        include: { following: { select: { id: true, username: true, avatar: true, name: true } } },
        take: 6,
      }),
    ]);
    friendRequestCount = requests;
    unreadNotifCount = notifs;
    onlineFriends = followings.map((f) => f.following);
  }

  const mainLinks = [
    { href: "/", src: "/home.png", label: "Home", color: "bg-blue-100 text-blue-600", badge: null },
    { href: "/friends", src: "/friends.png", label: "Friends", color: "bg-green-100 text-green-600", badge: friendRequestCount || null },
    { href: "/messages", src: "/messages.png", label: "Messages", color: "bg-purple-100 text-purple-600", badge: null },
    { href: "/notifications", src: "/notifications.png", label: "Notifications", color: "bg-red-100 text-red-600", badge: unreadNotifCount || null },
    { href: "/stories", src: "/stories.png", label: "Stories", color: "bg-yellow-100 text-yellow-600", badge: null },
  ];

  return (
    <div className="flex flex-col gap-4">
      {type === "home" && (
        <Suspense fallback={
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="h-28 skeleton" />
            <div className="p-4 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full skeleton -mt-7" />
              <div className="h-4 w-28 rounded skeleton" />
              <div className="h-3 w-20 rounded skeleton" />
              <div className="h-8 w-full rounded-xl skeleton mt-2" />
            </div>
          </div>
        }>
          <ProfileCart />
        </Suspense>
      )}

      {/* Main Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Navigation</p>
        {mainLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200 group"
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
              <Image src={item.src} width={18} height={18} alt="" className="object-contain" />
            </div>
            <span className="font-semibold text-sm flex-1">{item.label}</span>
            {item.badge ? (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge > 9 ? "9+" : item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      {/* Explore */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Explore</p>
        {exploreLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition-all duration-200 group"
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
              <Image src={item.src} width={18} height={18} alt="" className="object-contain" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold text-sm leading-tight">{item.label}</span>
              <span className="text-[11px] text-gray-400 truncate">{item.desc}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Shortcuts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Shortcuts</p>
        <div className="grid grid-cols-2 gap-1.5">
          {shortcutLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-all duration-200 group"
            >
              <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200 flex-shrink-0">
                <Image src={item.src} width={14} height={14} alt="" className="object-contain" />
              </div>
              <span className="font-medium text-xs truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Online Friends */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <div className="flex items-center justify-between px-2 mb-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Following</p>
          <Link href="/friends" className="text-[10px] font-semibold text-blue-500 cursor-pointer hover:text-blue-600">See All</Link>
        </div>
        {onlineFriends.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-3">Follow people to see them here</p>
        ) : (
          <div className="flex flex-col gap-1">
            {onlineFriends.map((friend) => (
              <Link
                key={friend.id}
                href={`/profile/${friend.username}`}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={friend.avatar || "/noAvatar.png"}
                    alt={friend.username}
                    width={34}
                    height={34}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {friend.name || friend.username}
                  </span>
                  <span className="text-[10px] text-gray-400">@{friend.username}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Ads size="sm" />
    </div>
  );
}
