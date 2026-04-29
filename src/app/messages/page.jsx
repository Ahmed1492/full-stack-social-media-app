import LeftMenue from "@/components/leftMenue/LeftMenue";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import MessagesClient from "@/components/messages/MessagesClient";

export const dynamic = "force-dynamic";

export default async function MessagesPage({ searchParams }) {
  const { userId } = await auth();
  if (!userId) return null;

  const params = await searchParams;
  const activeConvId = params?.conv ? parseInt(params.conv) : null;

  // Get all conversations
  const conversations = await prisma.conversation.findMany({
    where: { participants: { some: { userId } } },
    include: {
      participants: {
        include: {
          user: { select: { id: true, username: true, avatar: true, name: true, surname: true } },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Get active conversation messages
  let activeConversation = null;
  if (activeConvId) {
    activeConversation = await prisma.conversation.findFirst({
      where: {
        id: activeConvId,
        participants: { some: { userId } },
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, username: true, avatar: true, name: true, surname: true } },
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: { select: { id: true, username: true, avatar: true } },
          },
        },
      },
    });

    // Mark messages as read
    if (activeConversation) {
      await prisma.message.updateMany({
        where: { conversationId: activeConvId, read: false, senderId: { not: userId } },
        data: { read: true },
      });
    }
  }

  // Get followings to start new conversations
  const followings = await prisma.follower.findMany({
    where: { followerId: userId },
    include: {
      following: { select: { id: true, username: true, avatar: true, name: true, surname: true } },
    },
    take: 20,
  });

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <MessagesClient
          conversations={conversations}
          activeConversation={activeConversation}
          currentUserId={userId}
          followings={followings.map((f) => f.following)}
        />
      </div>
    </div>
  );
}
