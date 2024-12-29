import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import FriendRequestList from "@/components/rightMenue/FriendRequestList";
export default async function FriendRequests() {
  const { userId } = auth();

  const requests = await prisma.followerRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (!userId) return null;
  if (requests.length === 0) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-600  text-sm">Friend Request</span>
        <span className="text-blue-500  text-xs">See All</span>
      </div>
      {/* All REQUESTS */}
      <div className="flex flex-col gap-4 mt-5">
        <FriendRequestList requests={requests} />
      </div>
    </div>
  );
}
