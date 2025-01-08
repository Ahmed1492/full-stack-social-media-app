import React from "react";
import ProfileCart from "@/components/leftMenue/ProfileCart";
import Ads from "@/components/leftMenue/Ads";
import Image from "next/image";
import Link from "next/link";
export default function LeftMenue({ type }) {
  return (
    <div className=" flex flex-col gap-6  ">
      {type == "home" && <ProfileCart />}
      <div className="bg-white shadow-lg rounded-lg p-4 text-sm text-gray-500 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/posts.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/activity.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/market.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">MarketPlace</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/events.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Events</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/albums.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/videos.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/news.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">News</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/courses.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/lists.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Lists</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image
            src="/settings.png"
            className="object-cover"
            width={20}
            height={20}
            alt=""
          />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
      <Ads size="sm" />
    </div>
  );
}
