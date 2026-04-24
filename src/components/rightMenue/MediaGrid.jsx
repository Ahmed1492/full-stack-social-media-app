"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function Lightbox({ images, current, setCurrent, onClose }) {
  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [current]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/92 backdrop-blur-md z-[9999] flex items-center justify-center animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full">
        {current + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 text-whitea rounded-full flex items-center justify-center text-2xl font-light transition-all duration-200 hover:scale-110 hover:rotate-90 shadow-lg"
      >
        ×
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-3xl font-light transition-all duration-200 hover:scale-110 shadow-lg"
        >
          ‹
        </button>
      )}

      {/* Main image — full screen center */}
      <div className="w-full h-full flex items-center justify-center px-20 py-20 animate-scale-in">
        <div className="relative w-full h-full">
          <Image
            key={images[current]}
            src={images[current]}
            alt=""
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-3xl font-light transition-all duration-200 hover:scale-110 shadow-lg"
        >
          ›
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-2xl max-w-[90vw] overflow-x-auto scrollbar-hidden">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-white scale-110 shadow-lg"
                  : "opacity-50 hover:opacity-90 hover:scale-105"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

export default function MediaGrid({ posts }) {
  const [current, setCurrent] = useState(null);
  const images = posts.filter((p) => p.img).map((p) => p.img);

  if (!images.length) {
    return (
      <div className="text-center py-8">
        <p className="text-3xl mb-2">🖼️</p>
        <p className="text-sm text-gray-400 font-medium">No media yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative rounded-xl overflow-hidden group cursor-pointer animate-scale-in stagger-${Math.min(i + 1, 5)}`}
            style={{ aspectRatio: "1" }}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {current !== null && (
        <Lightbox
          images={images}
          current={current}
          setCurrent={setCurrent}
          onClose={() => setCurrent(null)}
        />
      )}
    </>
  );
}
