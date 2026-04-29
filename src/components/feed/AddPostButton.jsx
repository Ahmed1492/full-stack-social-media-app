"use client";

import { useFormStatus } from "react-dom";

export default function AddPostButton({ disabled = false }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-2 px-5 font-semibold rounded-xl text-sm transition-all duration-200 hover:shadow-md hover:shadow-blue-200 hover:scale-105 flex items-center gap-2"
      disabled={isDisabled}
      title={disabled ? "Please wait for image to finish uploading" : undefined}
    >
      {pending ? (
        <>
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent" />
          Posting...
        </>
      ) : disabled ? (
        <>
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent" />
          Uploading...
        </>
      ) : (
        "Post"
      )}
    </button>
  );
}
