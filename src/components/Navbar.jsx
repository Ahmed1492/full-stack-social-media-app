import Link from "next/link";
import React from "react";
import MobileMenue from "@/components/MobileMenue";
import SearchUsers from "@/components/SearchUsers";
import Image from "next/image";
// import NavbarThemeToggle from "@/components/NavbarThemeToggle"; // TODO: dark mode
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { href: "/", src: "/home.png", label: "Home" },
  { href: "/friends", src: "/friends.png", label: "Friends" },
  { href: "/messages", src: "/messages.png", label: "Messages" },
];

const BellIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const GearIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const iconButtons = [
  { alt: "notifications", href: "/notifications", badge: 5, Icon: BellIcon },
  { alt: "settings", href: "/settings", badge: null, Icon: GearIcon },
];

export default function Navbar() {
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

      {/* Nav links */}
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
            {/* Active dot */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <SearchUsers />

        <ClerkLoading>
          <div className="w-8 h-8 rounded-full skeleton" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            {/* <NavbarThemeToggle /> TODO: dark mode */}
            <div className="flex items-center gap-0.5 ml-1">
              {iconButtons.map(({ alt, href, badge, Icon }) => (
                <Link
                  key={alt}
                  href={href}
                  className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 hover:scale-110 group"
                >
                  <Icon />
                  {badge && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-sm">
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </Link>
              ))}
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
