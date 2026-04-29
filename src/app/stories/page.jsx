import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import LeftMenue from "@/components/leftMenue/LeftMenue";
import StoriesPageClient from "@/components/StoriesPageClient";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const followings = await prisma.follower.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const ids = [userId, ...followings.map((f) => f.followingId)];

  const stories = await prisma.story.findMany({
    where: {
      expirseAt: { gt: new Date() },
      userId: { in: ids },
    },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  // Group by user
  const grouped = stories.reduce((acc, story) => {
    const uid = story.user.id;
    if (!acc[uid]) acc[uid] = { user: story.user, stories: [] };
    acc[uid].stories.push(story);
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <StoriesPageClient groups={groups} currentUserId={userId} />
      </div>
    </div>
  );
}
