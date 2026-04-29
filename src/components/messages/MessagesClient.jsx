"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendMessage, getOrCreateConversation } from "@/lib/actions";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function MessagesClient({ conversations: initialConvs, activeConversation: initialActive, currentUserId, followings }) {
  const [conversations, setConversations] = useState(initialConvs);
  const [active, setActive] = useState(initialActive);
  const [messages, setMessages] = useState(initialActive?.messages || []);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [search, setSearch] = useState("");
  const [startingChat, setStartingChat] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  const openConversation = (conv) => {
    setActive(conv);
    setMessages(conv.messages || []);
    router.push(`/messages?conv=${conv.id}`, { scroll: false });
  };

  const startNewChat = async (user) => {
    setStartingChat(user.id);
    try {
      const conv = await getOrCreateConversation(user.id);
      setConversations((prev) => {
        const exists = prev.find((c) => c.id === conv.id);
        return exists ? prev : [conv, ...prev];
      });
      setActive(conv);
      setMessages(conv.messages || []);
      setShowNewChat(false);
      router.push(`/messages?conv=${conv.id}`, { scroll: false });
    } catch (e) {
      console.error(e);
    } finally {
      setStartingChat(null);
    }
  };

  const handleSend = async () => {
    if (!text.trim() || !active || sending) return;
    const msgText = text.trim();
    setText("");
    setSending(true);

    // Optimistic
    const optimistic = {
      id: Date.now(),
      text: msgText,
      createdAt: new Date(),
      read: false,
      senderId: currentUserId,
      sender: { id: currentUserId, username: "me", avatar: null },
      optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const created = await sendMessage(active.id, msgText);
      setMessages((prev) => prev.map((m) => m.id === optimistic.id ? created : m));
      // Update conversation last message
      setConversations((prev) =>
        prev.map((c) =>
          c.id === active.id
            ? { ...c, messages: [created], updatedAt: new Date() }
            : c
        ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
      startTransition(() => router.refresh());
    } catch (e) {
      console.error(e);
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setText(msgText);
    } finally {
      setSending(false);
    }
  };

  const getOtherUser = (conv) =>
    conv.participants?.find((p) => p.user.id !== currentUserId)?.user;

  const unreadCount = (conv) =>
    conv.messages?.filter((m) => !m.read && m.senderId !== currentUserId).length || 0;

  const filteredConvs = conversations.filter((c) => {
    const other = getOtherUser(c);
    if (!other) return false;
    const name = other.name && other.surname ? `${other.name} ${other.surname}` : other.username;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredFollowings = followings.filter((u) => {
    const name = u.name && u.surname ? `${u.name} ${u.surname}` : u.username;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const otherUser = active ? getOtherUser(active) : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
      <div className="flex h-full">

        {/* ── Sidebar ── */}
        <div className="w-72 border-r border-gray-100 flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-lg">Messages</h2>
              <button
                onClick={() => setShowNewChat((v) => !v)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${showNewChat ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600"}`}
                title="New message"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400"
                placeholder={showNewChat ? "Search people..." : "Search messages..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* New chat — people to message */}
          {showNewChat ? (
            <div className="flex-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2">People you follow</p>
              {filteredFollowings.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No one found</p>
              ) : (
                filteredFollowings.map((u) => {
                  const name = u.name && u.surname ? `${u.name} ${u.surname}` : u.username;
                  return (
                    <button
                      key={u.id}
                      onClick={() => startNewChat(u)}
                      disabled={startingChat === u.id}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <Image src={u.avatar || "/noAvatar.png"} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{name}</p>
                        <p className="text-xs text-gray-400">@{u.username}</p>
                      </div>
                      {startingChat === u.id ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            /* Conversation list */
            <div className="flex-1 overflow-y-auto">
              {filteredConvs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full pb-8 px-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 font-medium text-center">No conversations yet</p>
                  <button onClick={() => setShowNewChat(true)} className="mt-2 text-xs text-blue-500 font-semibold hover:text-blue-600">
                    Start a new chat
                  </button>
                </div>
              ) : (
                filteredConvs.map((conv) => {
                  const other = getOtherUser(conv);
                  if (!other) return null;
                  const name = other.name && other.surname ? `${other.name} ${other.surname}` : other.username;
                  const lastMsg = conv.messages?.[0];
                  const unread = unreadCount(conv);
                  const isActive = active?.id === conv.id;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => openConversation(conv)}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    >
                      <div className="relative flex-shrink-0">
                        <Image src={other.avatar || "/noAvatar.png"} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${unread > 0 ? "font-bold text-gray-900" : "font-semibold text-gray-700"}`}>{name}</p>
                          {lastMsg && <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{timeAgo(lastMsg.createdAt)}</span>}
                        </div>
                        <p className={`text-xs truncate ${unread > 0 ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                          {lastMsg ? (lastMsg.senderId === currentUserId ? `You: ${lastMsg.text}` : lastMsg.text) : "No messages yet"}
                        </p>
                      </div>
                      {unread > 0 && (
                        <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* ── Chat area ── */}
        {active && otherUser ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <Link href={`/profile/${otherUser.username}`} className="flex items-center gap-3 group flex-1 min-w-0">
                <Image src={otherUser.avatar || "/noAvatar.png"} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-300 transition-all flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                    {otherUser.name && otherUser.surname ? `${otherUser.name} ${otherUser.surname}` : otherUser.username}
                  </p>
                  <p className="text-xs text-gray-400">@{otherUser.username}</p>
                </div>
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <Image src={otherUser.avatar || "/noAvatar.png"} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {otherUser.name && otherUser.surname ? `${otherUser.name} ${otherUser.surname}` : otherUser.username}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Say hello 👋</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => {
                    const isMe = msg.senderId === currentUserId;
                    const showAvatar = !isMe && (i === 0 || messages[i - 1]?.senderId !== msg.senderId);
                    return (
                      <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && (
                          <div className="w-7 flex-shrink-0">
                            {showAvatar && (
                              <Image src={otherUser.avatar || "/noAvatar.png"} alt="" width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                            )}
                          </div>
                        )}
                        <div className={`max-w-[65%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                            isMe
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-800 rounded-bl-sm"
                          } ${msg.optimistic ? "opacity-70" : ""}`}>
                            <p className="leading-relaxed">{msg.text}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-0.5 px-1">
                            {formatTime(msg.createdAt)}
                            {isMe && !msg.optimistic && (
                              <span className="ml-1">{msg.read ? "✓✓" : "✓"}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white rounded-2xl px-4 py-2.5 transition-all duration-200">
                <input
                  ref={inputRef}
                  className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400"
                  placeholder={`Message ${otherUser.name || otherUser.username}...`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  maxLength={1000}
                />
                <button
                  onClick={handleSend}
                  disabled={!text.trim() || sending}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
                >
                  {sending ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Your Messages</h3>
            <p className="text-gray-400 text-sm mb-4">Select a conversation or start a new one</p>
            <button
              onClick={() => setShowNewChat(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md hover:shadow-blue-200"
            >
              New Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
