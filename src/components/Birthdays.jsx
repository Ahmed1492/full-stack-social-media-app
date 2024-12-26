import Image from "next/image";

export default function BirthDays() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <span className="font-medium text-sm text-gray-600 ">Birthdays</span>
      <div className="flex justify-between items-center mt-5">
        {/* LEFT */}
        <div className="flex gap-2   text-sm items-center">
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
          <button className="bg-blue-500 py-1 px-2  text-white rounded-md text-xs font-medium">
            Celebrate
          </button>
        </div>
      </div>
      {/* COMMING BIRTHDAY */}
      <div className="bg-slate-100 rounded-lg flex gap-4 mt-5 items-center p-4 font-medium text-sm">
        {/* LEFT */}
        <Image
          src="/gift.png"
          alt=""
          className="w-6 h-6 object-cover"
          width={24}
          height={24}
        />
        {/* RIGHT */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800">
            Upcamming Birthday
          </span>
          <span className="text-gray-500 text-xs ">
            See Other 16 have Upcamming Birthday
          </span>
        </div>
      </div>
    </div>
  );
}
