import React from "react";

export default function Loading() {
  return (
    <div className="bg-white w-full h-40 flex items-center justify-center shadow-lg rounded-lg">
      <div
        class="inline-block h-8 w-8 animate-spin border-gray-800 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
