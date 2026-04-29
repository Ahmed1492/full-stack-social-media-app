"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { markNotificationsRead, fetchNotifications } from "@/lib/actions";

const typeConfig = {
  like:           { emoji: "❤️", color: "bg-red-100",    text: "liked your post" },
  comment:        { emoji: "💬", color: "bg-blue-100",   text: "commented on your post" },
  follow_request: { emoji: "👤", color: "bg-green-100",  text: "sent you a friend request" },
  follow_accept:  { emoji: "✓",  color: "bg-green-100",  text: "accepted your friend request" },
  message:        { emoji: "✉️", color: "bg-purple-100", text: "sent you a message" },
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

export default function NotificationPopup({ notifications: initialNotifications }) {
  const [open, setOpen]                   = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading]             = useState(false);
  const popupRef                          = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Refresh notifications from server
  const refresh = useCallback(async () => {
    try {
      const fresh = await fetchNotifications();
      setNotifications(fresh);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Poll every 30s for badge count
  useEffect(() => {
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = async () => {
    const opening = !open;
    setOpen(opening);

    if (opening) {
      // Fetch fresh notifications every time popup opens
      setLoading(true);
      try {
        const fresh = await fetchNotifications();
        setNotifications(fresh);
        // Mark as read
        if (fresh.some((n) => !n.read)) {
          await markNotificationsRead();
          setNotifications(fresh.map((n) => ({ ...n, read: true })));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const getHref = (notif) => {
    if (notif.type === "follow_request")                    return "/friends";
    if (notif.type === "message" && notif.conversationId)  return `/messages?conv=${notif.conversationId}`;
    if (notif.type === "follow_accept")                    return `/profile/${notif.sender.username}`;
    if (notif.postId)                                      return `/post/${notif.postId}`;
    return `/profile/${notif.sender.username}`;
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Bell button */}
      <button
        onClick={handleOpen}
        className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 ${
          open ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50/80"
        }`}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-12 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl w-80 max-h-[32rem] flex flex-col z-50 animate-scale-in origin-top-right">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
            <h3 className="font-bold text-gray-900 text-base">Notifications</h3>
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="text-xs text-blue-500 hover:text-blue-600 font-semibold transition-colors"
            >
              See All
            </Link>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              /* Skeleton */
              <div className="flex flex-col gap-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="h-3 bg-gray-200 rounded-full animate-pulse w-3/4" />
                      <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-400 font-medium">No notifications yet</p>
                <p className="text-xs text-gray-300 mt-1">Likes, comments and requests will show here</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notif) => {
                  const config = typeConfig[notif.type] || typeConfig.like;
                  const name = notif.sender.name && notif.sender.surname
                    ? `${notif.sender.name} ${notif.sender.surname}`
                    : notif.sender.username;

                  return (
                    <Link
                      key={notif.id}
                      href={getHref(notif)}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors border-b border-gray-50 last:border-0 ${
                        !notif.read ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <Image
                          src={notif.sender.avatar || "/noAvatar.png"}
                          alt=""
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.color} rounded-full flex items-center justify-center text-xs border-2 border-white`}>
                          {config.emoji}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-snug">
                          <span className="font-bold">{name}</span>{" "}
                          <span className="text-gray-600">{config.text}</span>
                        </p>
                        <p className={`text-xs mt-0.5 font-medium ${!notif.read ? "text-blue-500" : "text-gray-400"}`}>
                          {timeAgo(notif.createdAt)}
                        </p>
                      </div>
                      {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
