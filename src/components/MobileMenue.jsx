"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function MobileMenue() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="flex flex-col gap-[4.5] cursor-pointer md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`w-6 h-1 bg-blue-500 rounded-sm ${
          isOpen ? "rotate-45" : ""
        } origin-left ease-in-out duration-500`}
      />
      <div
        className={`w-6 h-1 bg-blue-500 rounded-sm ${
          isOpen ? "opacity-0" : ""
        } ease-in-out duration-500`}
      />
      <div
        className={`w-6 h-1 bg-blue-500 rounded-sm ${
          isOpen ? "-rotate-45" : ""
        } origin-left ease-in-out duration-500`}
      />
      {isOpen && ( //  96px = 24
        <div className=" absolute left-0 top-24 w-full mobileMenueHeight bg-white flex flex-col gap-8  items-center justify-center font-medium text-xl z-10 ">
          <Link href="/">Home</Link>
          <Link href="/">Frinds</Link>
          <Link href="/">Groups</Link>
          <Link href="/">Stories</Link>
          <Link href="/">Login</Link>
        </div>
      )}
    </div>
  );
}
