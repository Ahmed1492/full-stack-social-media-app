import Image from "next/image";

export default function Ads({ size }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* TOP */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 font-semibold">Sponsered Ads</span>
        <Image
          src="/more.png"
          alt=""
          className="cursor-pointer"
          width={16}
          height={16}
        />
      </div>
      {/* BOTTOM */}
      <div className={`flex flex-col mt-4 ${size == "sm" ? "gap-2" : "gap-4"}`}>
        {/* Image */}
        <div
          className={`w-full relative ${
            size == "sm" ? "min-h-28" : "min-h-44"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/23731974/pexels-photo-23731974/free-photo-of-a-stony-seashore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        {/* ADS NAME */}
        <div className="flex items-center gap-3">
          <Image
            src="https://images.pexels.com/photos/10004365/pexels-photo-10004365.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="w-7 h-7 object-cover rounded-full"
            width={28}
            height={28}
          />
          <span className="text-sm font-medium text-blue-500">
            Big Chef London
          </span>
        </div>
        {/* Desc */}
        <p className="text-sm font-medium text-gray-600">
          {size == "sm"
            ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea
          doloribus cum.`
            : ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea
          doloribus cum. Laudantium doloremque iure debitis esse, quae libero
          voluptates! Voluptatibus, placeat. `}
        </p>
      </div>
    </div>
  );
}
