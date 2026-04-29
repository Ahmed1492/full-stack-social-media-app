import Link from "next/link";
import React from "react";
import MobileMenue from "@/components/MobileMenue";
import SearchUsers from "@/components/SearchUsers";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import NotificationPopup from "@/components/NotificationPopup";

const navLinks = [
  { href: "/", src: "/home.png", label: "Home" },
  { href: "/friends", src: "/friends.png", label: "Friends" },
  { href: "/messages", src: "/messages.png", label: "Messages" },
];

const GearIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export default async function Navbar() {
  const { userId } = await auth();

  let notifications = [];
  if (userId) {
    notifications = await prisma.notification.findMany({
      where: { receiverId: userId },
      include: {
        sender: { select: { username: true, avatar: true, name: true, surname: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  return (
    <nav className="h-16 flex items-center justify-between gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/60 group-hover:shadow-blue-300/80 group-hover:scale-110 transition-all duration-300">
          <span className="text-white font-black text-base select-none">C</span>
        </div>
        <span className="hidden lg:block font-extrabold text-xl gradient-text tracking-tight">
          Connectly
        </span>
      </Link>

      {/* Nav links - only when signed in */}
      <SignedIn>
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 group font-semibold text-sm"
            >
              <Image
                src={link.src}
                alt=""
                width={17}
                height={17}
                className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
              />
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          ))}
        </div>
      </SignedIn>

      {/* Right side */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <SearchUsers />

        <ClerkLoading>
          <div className="w-8 h-8 rounded-full skeleton" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="flex items-center gap-0.5 ml-1">
              {/* Notification popup */}
              <NotificationPopup notifications={notifications} />

              {/* Settings */}
              <Link
                href="/settings"
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 hover:scale-110"
              >
                <GearIcon />
              </Link>
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            <div className="hover-lift rounded-full">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-blue-100 hover:ring-blue-400 transition-all duration-300",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5 hover:scale-105"
            >
              Sign In
            </Link>
          </SignedOut>
        </ClerkLoaded>

        <MobileMenue />
      </div>
    </nav>
  );
}
