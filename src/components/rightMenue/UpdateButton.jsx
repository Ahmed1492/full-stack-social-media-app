"use client";

import { useFormStatus } from "react-dom";

export default function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full py-2 text-sm mt-7 bg-blue-500 text-white rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
}
