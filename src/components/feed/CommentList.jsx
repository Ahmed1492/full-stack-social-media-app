"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import CommentInfo from "@/components/feed/CommentInfo";

const EMOJIS = ["😀", "😂", "❤️", "👍", "🔥", "😍", "🎉", "😢", "😮", "🙏"];

export default function CommentList({ comments, postId }) {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value) => [value, ...state]
  );

  const add = async () => {
    if (!user || !desc.trim()) return;
    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        username: "Sending...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "", name: "", surname: "", city: "", work: "", school: "", website: "",
        createdAt: new Date(),
      },
    });
    try {
      const created = await addComment(postId, desc);
      setCommentState((prev) => [created, ...prev]);
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetDelete = (id) => {
    setCommentState((prev) => prev.filter((c) => c.id !== id));
    setDeletedId(id);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Add Comment */}
      <form action={add} className="flex items-center gap-2">
        <Image
          src={user.imageUrl || "/noAvatar.png"}
          alt=""
          className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 flex-shrink-0"
          width={32}
          height={32}
        />
        <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white rounded-xl px-3 py-2 gap-2 transition-all duration-200">
          <input
            type="text"
            value={desc}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
            placeholder="Write a comment..."
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojis(!showEmojis)}
              className="text-lg hover:scale-110 transition-transform duration-200"
            >
              😊
            </button>
            {showEmojis && (
              <div className="absolute bottom-8 right-0 bg-white border border-gray-100 rounded-xl shadow-lg p-2 flex flex-wrap gap-1 w-[14rem] z-50 animate-scale-in">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => { setDesc((d) => d + emoji); setShowEmojis(false); }}
                    className="text-xl hover:scale-125 transition-transform duration-150 p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1"
          >
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="flex flex-col gap-3">
        {optimisticComment
          .filter((c) => c.id !== deletedId)
          .map((comment) => (
            <div key={comment.id} className="flex gap-2 group animate-fade-in">
              <Image
                src={comment?.user?.avatar || "/noAvatar.png"}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                width={32}
                height={32}
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-none px-3 py-2">
                  <Link
                    href={`/profile/${comment.user.username}`}
                    className="text-xs font-bold text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {comment?.user?.name && comment.user.surname
                      ? comment.user.name + " " + comment.user.surname
                      : comment.user.username}
                  </Link>
                  <p className="text-sm text-gray-700 mt-0.5">{comment.description}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-1">
                  <button className="text-xs text-gray-400 hover:text-blue-500 transition-colors font-medium">Like</button>
                  <button className="text-xs text-gray-400 hover:text-blue-500 transition-colors font-medium">Reply</button>
                  <span className="text-xs text-gray-300">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
              {user?.id === comment.userId && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-start mt-1">
                  <CommentInfo
                    setIsDeleteComment={handleSetDelete}
                    postId={comment.postId}
                    id={comment.id}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
