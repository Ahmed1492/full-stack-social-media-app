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

export default function Navbar() {
  return (
    <div className="  h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link
          className="font-bold text-xl text-blue-600 whitespace-nowrap"
          href="/"
        >
          SOCIAL APP
        </Link>
      </div>
      {/* CENTER */}
      <div className=" hidden md:flex items-center justify-between text-sm w-[50%] gap-10 ">
        {/* LINKS */}
        <div className="flex items-center gap-6 text-gray-600 ">
          <Link className="flex items-center gap-2" href="">
            <Image src="/home.png" alt="homeIcone" width={20} height={20} />
            <span>Home Page</span>
          </Link>
          <Link className="flex items-center gap-2" href="">
            <Image
              src="/Friends.png"
              alt="FriendsIcone"
              width={20}
              height={20}
            />
            <span>Friends</span>
          </Link>
          <Link className="flex items-center gap-2" href="">
            <Image
              src="/Stories.png"
              alt="StoriesIcone"
              width={20}
              height={20}
            />
            <span>Stories</span>
          </Link>
        </div>
        {/* Search Input */}
        <SearchUsers />
      </div>
      {/* RIGHT */}
      <div className="w-[30%]  flex items-center justify-end gap-4 xl:gap-8">
        <ClerkLoading>
          <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-solid  border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer ">
              <Image
                className=""
                src="/people.png"
                alt="people"
                width={24}
                height={24}
              />
            </div>
            <div className="cursor-pointer ">
              <Image
                src="/messages.png"
                alt="messages"
                width={20}
                height={20}
              />
            </div>
            <div className="cursor-pointer ">
              <Image
                src="/notifications.png"
                alt="notifications"
                width={20}
                height={20}
              />
            </div>
            <div className="cursor-pointer ">
              <Image src="/people.png" alt="people" width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="cursor-pointer flex items-center gap-2 ">
              <Image src="/noAvatar.png" alt="login" width={20} height={20} />
              <Link href="sign-in">Login / Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>

        <MobileMenue />
      </div>
    </div>
  );
}
