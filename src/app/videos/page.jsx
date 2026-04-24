import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockVideos = [
  { id: 1, title: "Amazing Sunset Timelapse", views: "124K", duration: "3:45", img: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400", user: "Sarah J.", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100", time: "2 days ago" },
  { id: 2, title: "Street Photography Tips", views: "89K", duration: "12:20", img: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400", user: "John D.", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100", time: "5 days ago" },
  { id: 3, title: "Morning Workout Routine", views: "203K", duration: "8:15", img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400", user: "Mike R.", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100", time: "1 week ago" },
  { id: 4, title: "Cooking Italian Pasta", views: "67K", duration: "15:30", img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", user: "Emma W.", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100", time: "3 days ago" },
  { id: 5, title: "Travel Vlog: Tokyo", views: "456K", duration: "22:10", img: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400", user: "Lisa C.", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100", time: "2 weeks ago" },
  { id: 6, title: "DIY Home Decor Ideas", views: "92K", duration: "9:45", img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400", user: "Tom B.", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100", time: "4 days ago" },
];

export default function VideosPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h1 className="font-bold text-gray-900 text-xl">🎬 Videos</h1>
          <p className="text-sm text-gray-400 mt-1">Watch and share videos</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-40">
                <Image src={video.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-blue-600 text-xl ml-1">▶</span>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">{video.duration}</span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{video.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Image src={video.avatar} alt="" width={20} height={20} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-xs text-gray-500">{video.user}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{video.views} views · {video.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}
