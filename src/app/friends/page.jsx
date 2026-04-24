import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockFriends = [
  { id: 1, name: "Sarah Johnson", username: "sarah_j", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 12, status: "Active now" },
  { id: 2, name: "John Davis", username: "john_d", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 8, status: "2h ago" },
  { id: 3, name: "Emma Wilson", username: "emma_w", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 5, status: "Active now" },
  { id: 4, name: "Mike Roberts", username: "mike_r", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 3, status: "1d ago" },
  { id: 5, name: "Lisa Chen", username: "lisa_c", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 15, status: "Active now" },
  { id: 6, name: "Tom Brown", username: "tom_b", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 7, status: "3h ago" },
];

const mockRequests = [
  { id: 7, name: "Anna Smith", username: "anna_s", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 4 },
  { id: 8, name: "Chris Lee", username: "chris_l", avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200", mutual: 9 },
];

export default function FriendsPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-6">
        {/* Friend Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-lg">Friend Requests</h2>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{mockRequests.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockRequests.map((req) => (
              <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200">
                <Image src={req.avatar} alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{req.name}</p>
                  <p className="text-xs text-gray-400">{req.mutual} mutual friends</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Accept</button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Friends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-lg">All Friends</h2>
            <span className="text-sm text-gray-400">{mockFriends.length} friends</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockFriends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                <div className="relative flex-shrink-0">
                  <Image src={friend.avatar} alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all" />
                  {friend.status === "Active now" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors truncate">{friend.name}</p>
                  <p className="text-xs text-gray-400">{friend.status}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Message
                </button>
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
