import Image from "next/image";

export default function BirthDays() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Birthdays</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src="https://images.pexels.com/photos/29822694/pexels-photo-29822694/free-photo-of-stylish-man-posing-outdoors-in-kaduna.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-9 h-9 rounded-full object-cover ring-2 ring-yellow-200"
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 text-sm">Ahmed</span>
            <span className="text-gray-400 text-xs">Today 🎂</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 py-1.5 px-3 text-white rounded-xl text-xs font-semibold transition-all duration-200 hover:shadow-md hover:shadow-blue-200 hover:scale-105">
          Celebrate 🎉
        </button>
      </div>
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-xl flex gap-3 mt-4 items-center p-3">
        <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-xl flex-shrink-0">
          <Image src="/gift.png" alt="" className="w-5 h-5 object-cover" width={20} height={20} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-gray-800 text-sm">Upcoming Birthdays</span>
          <span className="text-gray-500 text-xs">16 friends have upcoming birthdays</span>
        </div>
      </div>
    </div>
  );
}
