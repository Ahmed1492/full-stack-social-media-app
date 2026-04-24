"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function OpenedStory({ stories, startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const story = stories[current];

  // Auto-advance every 5s
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          if (current < stories.length - 1) {
            setCurrent((c) => c + 1);
          } else {
            onClose();
          }
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [current, stories.length, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && current < stories.length - 1) setCurrent((c) => c + 1);
      if (e.key === "ArrowLeft" && current > 0) setCurrent((c) => c - 1);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [current, stories.length, onClose]);

  if (!story?.img) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Story card */}
      <div className="relative w-[360px] h-[640px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* User info */}
        <div className="absolute top-7 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <Image
              src={story.user.avatar || "/noAvatar.png"}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
            />
            <div>
              <p className="text-white text-xs font-semibold drop-shadow">
                {story.user.name || story.user.username}
              </p>
              <p className="text-white/70 text-[10px]">
                {new Date(story.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors text-lg font-light"
          >
            ×
          </button>
        </div>

        {/* Story image */}
        <Image src={story.img} alt="" fill className="object-cover" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Tap areas */}
        <button
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          onClick={() => current > 0 && setCurrent((c) => c - 1)}
        />
        <button
          className="absolute right-0 top-0 w-1/3 h-full z-10"
          onClick={() => current < stories.length - 1 ? setCurrent((c) => c + 1) : onClose()}
        />
      </div>

      {/* Prev/Next arrows */}
      {current > 0 && (
        <button
          onClick={() => setCurrent((c) => c - 1)}
          className="absolute left-4 md:left-8 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          ‹
        </button>
      )}
      {current < stories.length - 1 && (
        <button
          onClick={() => setCurrent((c) => c + 1)}
          className="absolute right-4 md:right-8 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          ›
        </button>
      )}
    </div>
  );
}
