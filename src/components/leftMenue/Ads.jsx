import Image from "next/image";

export default function Ads({ size }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sponsored</span>
        <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Image src="/more.png" alt="" className="cursor-pointer" width={14} height={14} />
        </button>
      </div>
      <div className={`flex flex-col ${size === "sm" ? "gap-2" : "gap-3"}`}>
        <div className={`w-full relative rounded-xl overflow-hidden ${size === "sm" ? "min-h-28" : "min-h-44"}`}>
          <Image
            src="https://images.pexels.com/photos/23731974/pexels-photo-23731974/free-photo-of-a-stony-seashore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="https://images.pexels.com/photos/10004365/pexels-photo-10004365.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-7 h-7 object-cover rounded-full ring-2 ring-blue-100"
            width={28}
            height={28}
          />
          <span className="text-sm font-semibold text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
            Big Chef London
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea doloribus cum. Laudantium doloremque iure debitis esse, quae libero voluptates!"}
        </p>
        <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-1.5 rounded-lg transition-all duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
}
