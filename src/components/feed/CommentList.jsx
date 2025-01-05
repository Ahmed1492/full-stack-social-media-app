"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

export default function CommentList({ comments, postId }) {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value) => [value, ...state]
  );
  const add = async () => {
    if (!user || !desc) return;
    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        descrition: "",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  if (user)
    return (
      <>
        {/* add Comment */}
        <form
          action={add}
          className="flex justify-between items-center gap-6 text-sm"
        >
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt=""
            className="w-7 h-7 rounded-full object-cover"
            width={28}
            height={28}
          />
          <div className="w-full flex-1 flex justify-between items-center bg-slate-100 py-2 px-6 rounded-lg ">
            <input
              type="text"
              className="flex-1 outline-none bg-transparent"
              placeholder="Write A Comment"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className=" w-5 h-5  cursor-pointer"
            />
          </div>
        </form>
        {optimisticComment.map((comment) => (
          <>
            {/* All Comments */}
            <div key={comment.id} className="flex flex-col gap-4">
              {/* USER */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Image
                    src={comment?.user?.avatar || "/noAvatar.png"}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover"
                    width={36}
                    height={36}
                  />
                  <span className="font-medium text-slate-600">
                    {comment?.user?.name && comment.user.surname
                      ? comment.user.name + " " + comment.user.surname
                      : comment.user.username}
                  </span>
                </div>
                <Image
                  src="/more.png"
                  className="cursor-pointer"
                  width={18}
                  height={18}
                  alt=""
                />
              </div>
              {/* Comment */}
              <p className="text-slate-900">{comment.description}</p>
              <div className="flex items-center gap-5 text-sm">
                <Image
                  src="/like.png"
                  className="cursor-pointer"
                  width={18}
                  height={18}
                  alt=""
                />
                <span className="text-gray-300 ">|</span>
                <div className="flex items-center gap-5">
                  <span className="text-gray-500 font-medium">123 Likes</span>
                  <span className="text-gray-500 font-medium">Replay</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    );
}
