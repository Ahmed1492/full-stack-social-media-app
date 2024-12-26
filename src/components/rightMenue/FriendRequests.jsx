import Image from "next/image";

export default function FriendRequests() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-600  text-sm">Friend Request</span>
        <span className="text-blue-500  text-xs">See All</span>
      </div>
      {/* All REQUESTS */}
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-2  text-sm items-center">
            <Image
              src="https://images.pexels.com/photos/29822694/pexels-photo-29822694/free-photo-of-stylish-man-posing-outdoors-in-kaduna.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-bold text-gray-800 ">Lama Dev</span>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Image
              src="/accept.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
            <Image
              src="/reject.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-2  text-sm items-center">
            <Image
              src="https://images.pexels.com/photos/29822694/pexels-photo-29822694/free-photo-of-stylish-man-posing-outdoors-in-kaduna.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-bold text-gray-800 ">Lama Dev</span>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Image
              src="/accept.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
            <Image
              src="/reject.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-2  text-sm items-center">
            <Image
              src="https://images.pexels.com/photos/29822694/pexels-photo-29822694/free-photo-of-stylish-man-posing-outdoors-in-kaduna.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-bold text-gray-800 ">Lama Dev</span>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Image
              src="/accept.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
            <Image
              src="/reject.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-2  text-sm items-center">
            <Image
              src="https://images.pexels.com/photos/29822694/pexels-photo-29822694/free-photo-of-stylish-man-posing-outdoors-in-kaduna.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-bold text-gray-800 ">Lama Dev</span>
          </div>
          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <Image
              src="/accept.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
            <Image
              src="/reject.png"
              alt=""
              className="w-5 h-5 rounded-full object-cover cursor-pointer"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
