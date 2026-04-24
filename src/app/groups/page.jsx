import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const myGroups = [
  { id: 1, name: "React Developers", members: 12400, img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200", lastPost: "2h ago", private: false },
  { id: 2, name: "Photography Lovers", members: 8900, img: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=200", lastPost: "5h ago", private: false },
  { id: 3, name: "Fitness & Health", members: 23000, img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=200", lastPost: "1d ago", private: true },
];

const suggestedGroups = [
  { id: 4, name: "UI/UX Designers", members: 15600, img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 8 },
  { id: 5, name: "Travel Enthusiasts", members: 45000, img: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 12 },
  { id: 6, name: "Book Club", members: 3200, img: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 5 },
  { id: 7, name: "Cooking & Recipes", members: 28000, img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 3 },
];

export default function GroupsPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h1 className="font-bold text-gray-900 text-xl">👥 Groups</h1>
          <p className="text-sm text-gray-400 mt-1">Connect with communities</p>
          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">+ Create Group</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">Your Groups</h2>
          <div className="flex flex-col gap-3">
            {myGroups.map((group) => (
              <div key={group.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <Image src={group.img} alt="" width={52} height={52} className="w-13 h-13 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">{group.name}</p>
                    {group.private && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">🔒 Private</span>}
                  </div>
                  <p className="text-xs text-gray-400">{group.members.toLocaleString()} members · {group.lastPost}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">Suggested for You</h2>
          <div className="grid grid-cols-2 gap-3">
            {suggestedGroups.map((group) => (
              <div key={group.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="relative h-24">
                  <Image src={group.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-800 truncate">{group.name}</p>
                  <p className="text-xs text-gray-400">{group.members.toLocaleString()} members</p>
                  <p className="text-xs text-gray-400">{group.mutual} mutual friends</p>
                  <button className="mt-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-1.5 rounded-xl transition-colors">Join Group</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}
