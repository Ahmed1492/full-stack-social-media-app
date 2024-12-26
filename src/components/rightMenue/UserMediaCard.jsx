import Image from "next/image";
import React from "react";

export default function UserMediaCard({ user }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-500">User Media</span>
        <span className="font-medium text-blue-400">See All</span>
      </div>
      {/* IMAGES */}
      <div className="flex  gap-3 mt-4 flex-wrap">
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
        <Image
          src="https://images.pexels.com/photos/19560861/pexels-photo-19560861/free-photo-of-historic-tram-28-on-a-narrow-alley-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-20 h-32 rounded-lg object-cover"
          width={80}
          height={128}
        />
      </div>
    </div>
  );
}
