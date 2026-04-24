"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function MobileMenue() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        className="flex flex-col gap-[5px] cursor-pointer p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <div className={`w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
        <div className={`w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-16 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 flex flex-col gap-1 p-4 z-50 animate-slide-up shadow-lg">
          {[
            { href: "/", label: "🏠 Home" },
            { href: "/", label: "👥 Friends" },
            { href: "/", label: "📖 Stories" },
            { href: "/", label: "🔔 Notifications" },
            { href: "/sign-in", label: "🔑 Login" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
