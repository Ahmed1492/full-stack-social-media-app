import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockEvents = [
  { id: 1, title: "Tech Conference 2026", date: "May 15, 2026", time: "9:00 AM", location: "San Francisco, CA", img: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400", attendees: 342, category: "Technology", going: true },
  { id: 2, title: "Summer Music Festival", date: "Jun 20, 2026", time: "4:00 PM", location: "Austin, TX", img: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400", attendees: 1200, category: "Music", going: false },
  { id: 3, title: "Photography Workshop", date: "May 28, 2026", time: "2:00 PM", location: "New York, NY", img: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400", attendees: 45, category: "Art", going: true },
  { id: 4, title: "Marathon 2026", date: "Jun 5, 2026", time: "7:00 AM", location: "Chicago, IL", img: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400", attendees: 890, category: "Sports", going: false },
];

export default function EventsPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h1 className="font-bold text-gray-900 text-xl">📅 Events</h1>
          <p className="text-sm text-gray-400 mt-1">Discover events near you</p>
        </div>
        <div className="flex flex-col gap-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group">
              <div className="flex">
                <div className="relative w-36 flex-shrink-0">
                  <Image src={event.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 flex-1">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{event.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1.5 text-sm">{event.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">📅 {event.date} · {event.time}</p>
                  <p className="text-xs text-gray-500">📍 {event.location}</p>
                  <p className="text-xs text-gray-400 mt-1">👥 {event.attendees} attending</p>
                  <div className="flex gap-2 mt-3">
                    <button className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${event.going ? "bg-green-100 text-green-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                      {event.going ? "✓ Going" : "Attend"}
                    </button>
                    <button className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">Share</button>
                  </div>
                </div>
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
