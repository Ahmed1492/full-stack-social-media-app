import LeftMenue from "@/components/leftMenue/LeftMenue";
import RightMenue from "@/components/rightMenue/RightMenue";
import Image from "next/image";

export const dynamic = "force-dynamic";

const mockItems = [
  { id: 1, title: "iPhone 14 Pro", price: "$850", category: "Electronics", img: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "John D.", location: "New York", condition: "Like New" },
  { id: 2, title: "Vintage Leather Sofa", price: "$320", category: "Furniture", img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Sarah K.", location: "Los Angeles", condition: "Good" },
  { id: 3, title: "Mountain Bike", price: "$450", category: "Sports", img: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Mike R.", location: "Chicago", condition: "Excellent" },
  { id: 4, title: "Canon DSLR Camera", price: "$600", category: "Electronics", img: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Emma W.", location: "Houston", condition: "Like New" },
  { id: 5, title: "Wooden Dining Table", price: "$280", category: "Furniture", img: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Tom B.", location: "Phoenix", condition: "Good" },
  { id: 6, title: "Gaming Console PS5", price: "$420", category: "Electronics", img: "https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=400", seller: "Lisa C.", location: "Seattle", condition: "Like New" },
];

const categories = ["All", "Electronics", "Furniture", "Sports", "Clothing", "Books", "Vehicles"];

export default function MarketplacePage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[30%]">
        <div className="sticky top-20"><LeftMenue type="home" /></div>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-5 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h1 className="font-bold text-gray-900 text-xl mb-3">🛍️ Marketplace</h1>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 mb-4">
            <span className="text-gray-400">🔍</span>
            <input className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400" placeholder="Search marketplace..." />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat, i) => (
              <button key={cat} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${i === 0 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group">
              <div className="relative h-44 overflow-hidden">
                <Image src={item.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg text-gray-700">{item.condition}</span>
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-900 text-sm truncate">{item.title}</p>
                <p className="text-blue-600 font-bold text-lg">{item.price}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {item.location} · {item.seller}</p>
                <button className="mt-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold py-1.5 rounded-xl transition-colors">View Item</button>
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
