import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/client";

export const dynamic = "force-dynamic";

const trendingPosts = [
  { id: 1, img: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 124 },
  { id: 2, img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 89 },
  { id: 3, img: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 203 },
  { id: 4, img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 67 },
  { id: 5, img: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 156 },
  { id: 6, img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400", likes: 92 },
];

export default async function SearchPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q || "";

  // Real DB search when query exists
  let users = [];
  if (q) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q } },
          { name: { contains: q } },
          { surname: { contains: q } },
        ],
      },
      take: 20,
    });
  }

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5 pb-10">

        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <form method="GET" action="/search">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white rounded-xl px-4 py-3 transition-all duration-200">
              <span className="text-gray-400 text-lg flex-shrink-0">🔍</span>
              <input
                name="q"
                defaultValue={q}
                className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                placeholder="Search people, posts, topics..."
                autoFocus
              />
              {q && (
                <Link href="/search" className="text-gray-400 hover:text-gray-600 text-lg font-light">×</Link>
              )}
            </div>
          </form>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["All", "People", "Posts", "Groups", "Events"].map((tab, i) => (
              <button key={tab} className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${i === 0 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search results */}
        {q && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">
              {users.length > 0 ? `${users.length} result${users.length !== 1 ? "s" : ""} for "${q}"` : `No results for "${q}"`}
            </h3>
            {users.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">😕</p>
                <p className="text-gray-500 font-medium">No users found</p>
                <p className="text-gray-400 text-sm mt-1">Try searching with a different name</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                {users.map((user) => (
                  <Link
                    key={user.id}
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <Image
                      src={user.avatar || "/noAvatar.png"}
                      alt=""
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                        {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
                      </p>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 group-hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
                      View Profile →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trending — shown when no query */}
        {!q && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-1">Trending Topics</h3>
              <p className="text-xs text-gray-400 mb-4">What people are talking about</p>
              <div className="flex flex-wrap gap-2">
                {["#Photography", "#Travel", "#Technology", "#Food", "#Fitness", "#Music", "#Art", "#Gaming", "#Fashion", "#Nature"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Trending Posts</h3>
              <div className="grid grid-cols-3 gap-2">
                {trendingPosts.map((post) => (
                  <div key={post.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                    <Image src={post.img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                      <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">❤️ {post.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="hidden lg:block w-[33%]">
        <div className="sticky top-20"><RightMenue user={null} /></div>
      </div>
    </div>
  );
}
