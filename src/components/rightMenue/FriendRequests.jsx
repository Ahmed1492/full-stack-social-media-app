import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import FriendRequestList from "@/components/rightMenue/FriendRequestList";

export default async function FriendRequests() {
  const { userId } = await auth();
  if (!userId) return null;

  const requests = await prisma.followerRequest.findMany({
    where: { receiverId: userId },
    include: { sender: true },
  });

  if (requests.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 animate-slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-sm">Friend Requests</span>
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce-in">
            {requests.length}
          </span>
        </div>
        <span className="text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">See All</span>
      </div>
      <div className="flex flex-col gap-3">
        <FriendRequestList requests={requests} />
      </div>
    </div>
  );
}
