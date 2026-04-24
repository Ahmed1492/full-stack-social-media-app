"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function DarkModeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-100 dark:border-gray-600">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-xl">
          {dark ? "🌙" : "☀️"}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900 dark:text-white">
            {dark ? "Dark Mode" : "Light Mode"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {dark ? "Switch to light theme" : "Switch to dark theme"}
          </p>
        </div>
      </div>

      {/* Toggle switch */}
      <button
        onClick={toggle}
        className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          dark
            ? "bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30"
            : "bg-gray-200"
        }`}
        aria-label="Toggle dark mode"
      >
        <div
          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center text-xs ${
            dark ? "translate-x-7" : "translate-x-0.5"
          }`}
        >
          {dark ? "🌙" : "☀️"}
        </div>
      </button>
    </div>
  );
}
