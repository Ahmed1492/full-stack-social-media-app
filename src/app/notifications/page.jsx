import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockNotifications = [
  { id: 1, type: "like", user: "Sarah Johnson", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200", text: "liked your post", time: "2 minutes ago", read: false, emoji: "❤️" },
  { id: 2, type: "comment", user: "John Davis", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200", text: 'commented: "Great photo!"', time: "15 minutes ago", read: false, emoji: "💬" },
  { id: 3, type: "follow", user: "Emma Wilson", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200", text: "started following you", time: "1 hour ago", read: false, emoji: "👤" },
  { id: 4, type: "like", user: "Mike Roberts", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200", text: "liked your comment", time: "3 hours ago", read: true, emoji: "👍" },
  { id: 5, type: "birthday", user: "Lisa Chen", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200", text: "has a birthday today 🎂", time: "5 hours ago", read: true, emoji: "🎉" },
  { id: 6, type: "follow", user: "Tom Brown", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200", text: "sent you a friend request", time: "1 day ago", read: true, emoji: "🤝" },
  { id: 7, type: "mention", user: "Anna Smith", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200", text: "mentioned you in a post", time: "2 days ago", read: true, emoji: "📢" },
];

const typeColors = {
  like: "bg-red-100",
  comment: "bg-blue-100",
  follow: "bg-green-100",
  birthday: "bg-yellow-100",
  mention: "bg-purple-100",
};

export default function NotificationsPage() {
  const unread = mockNotifications.filter((n) => !n.read);
  const read = mockNotifications.filter((n) => n.read);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 text-xl">Notifications</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold transition-colors">Mark all as read</button>
          </div>

          {/* Unread */}
          {unread.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">New · {unread.length}</p>
              <div className="flex flex-col gap-2">
                {unread.map((notif) => (
                  <div key={notif.id} className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      <Image src={notif.avatar} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${typeColors[notif.type]} rounded-full flex items-center justify-center text-xs border-2 border-white`}>
                        {notif.emoji}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-bold">{notif.user}</span>{" "}
                        <span>{notif.text}</span>
                      </p>
                      <p className="text-xs text-blue-500 font-medium mt-0.5">{notif.time}</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Read */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Earlier</p>
            <div className="flex flex-col gap-2">
              {read.map((notif) => (
                <div key={notif.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <Image src={notif.avatar} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover opacity-80" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${typeColors[notif.type]} rounded-full flex items-center justify-center text-xs border-2 border-white`}>
                      {notif.emoji}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{notif.user}</span>{" "}
                      <span>{notif.text}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}
