import LeftMenue from "@/components/leftMenue/LeftMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockConversations = [
  { id: 1, name: "Sarah Johnson", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200", last: "Hey! Are you coming tonight?", time: "2m", unread: 3, online: true },
  { id: 2, name: "John Davis", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200", last: "That was a great photo 📸", time: "15m", unread: 0, online: true },
  { id: 3, name: "Emma Wilson", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200", last: "Thanks for the help!", time: "1h", unread: 1, online: false },
  { id: 4, name: "Mike Roberts", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200", last: "See you tomorrow 👋", time: "3h", unread: 0, online: false },
  { id: 5, name: "Lisa Chen", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200", last: "Loved your story!", time: "5h", unread: 0, online: true },
  { id: 6, name: "Tom Brown", avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200", last: "Can we meet up?", time: "1d", unread: 0, online: false },
];

const mockMessages = [
  { id: 1, from: "them", text: "Hey! Are you coming tonight?", time: "2:30 PM" },
  { id: 2, from: "me", text: "Yes! What time does it start?", time: "2:31 PM" },
  { id: 3, from: "them", text: "Around 8pm. Bring some snacks 😄", time: "2:32 PM" },
  { id: 4, from: "me", text: "Sure! I'll bring chips and drinks 🎉", time: "2:33 PM" },
  { id: 5, from: "them", text: "Perfect! See you then!", time: "2:34 PM" },
];

export default function MessagesPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-100 flex flex-col">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-3">Messages</h2>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <span className="text-gray-400 text-sm">🔍</span>
                  <input className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400" placeholder="Search messages..." />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mockConversations.map((conv, i) => (
                  <div key={conv.id} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${i === 0 ? "bg-blue-50" : ""}`}>
                    <div className="relative flex-shrink-0">
                      <Image src={conv.avatar} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                      {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-gray-800 truncate">{conv.name}</p>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{conv.last}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="relative">
                  <Image src={mockConversations[0].avatar} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{mockConversations[0].name}</p>
                  <p className="text-xs text-green-500 font-medium">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.from === "me"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.from === "me" ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
                  <input className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400" placeholder="Write a message..." />
                  <button className="text-lg hover:scale-110 transition-transform">😊</button>
                  <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors">
                    <span className="text-white text-sm">➤</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
