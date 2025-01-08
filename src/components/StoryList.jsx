"use client";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

export default function StoryList({ stories, userId }) {
  const { user } = useUser();
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState("");
  const { isLoaded } = useUser();
  const [optimisticStory, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value) => [value, ...state]
  );
  if (!userId && !isLoaded) return "Loading...";
  if (!userId && isLoaded) return null;
  const add = async () => {
    if (!img?.secure_url) return;
    addOptimisticStory({
      id: Math.random(),
      img: img?.secure_url,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now() + 25 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...",
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
      const createdStory = await addStory(img?.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="bg-blue-500 text-sm text-white rounded-lg py-1 px-3">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
              <div className="absolute text-xl font-medium top-8 text-gray-200">
                Add
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      {optimisticStory.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => console.log(story.img)}
        >
          <Image
            src={story.img || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2 object-cover"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
}
