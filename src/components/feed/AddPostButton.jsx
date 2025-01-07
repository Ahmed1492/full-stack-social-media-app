"use client";

import { useFormStatus } from "react-dom";

export default function AddPostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-2 px-4 font-medium rounded-lg"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></span>
          Sending...
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
}
