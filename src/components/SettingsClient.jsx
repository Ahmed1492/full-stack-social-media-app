"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { useState } from "react";

const settingsSections = [
  {
    title: "Account", icon: "👤",
    items: [
      { label: "Personal Information", desc: "Name, email, phone number", icon: "📝" },
      { label: "Username & Password", desc: "Change your login credentials", icon: "🔑" },
      { label: "Email Notifications", desc: "Manage email preferences", icon: "📧" },
    ],
  },
  {
    title: "Privacy", icon: "🔒",
    items: [
      { label: "Profile Visibility", desc: "Control who can see your profile", icon: "👁️" },
      { label: "Blocked Users", desc: "Manage your blocked list", icon: "🚫" },
      { label: "Story Privacy", desc: "Who can see your stories", icon: "📖" },
    ],
  },
  {
    title: "Notifications", icon: "🔔",
    items: [
      { label: "Push Notifications", desc: "Likes, comments, follows", icon: "📱" },
      { label: "Email Alerts", desc: "Weekly digest and updates", icon: "📨" },
      { label: "SMS Notifications", desc: "Important account alerts", icon: "💬" },
    ],
  },
  {
    title: "Security", icon: "🛡️",
    items: [
      { label: "Two-Factor Authentication", desc: "Add extra security to your account", icon: "🔐" },
      { label: "Login Activity", desc: "See where you're logged in", icon: "📍" },
      { label: "Connected Apps", desc: "Manage third-party access", icon: "🔗" },
    ],
  },
  {
    title: "Support", icon: "💡",
    items: [
      { label: "Help Center", desc: "Find answers to common questions", icon: "❓" },
      { label: "Report a Problem", desc: "Let us know about issues", icon: "⚠️" },
      { label: "Delete Account", desc: "Permanently remove your account", icon: "🗑️", danger: true },
    ],
  },
];

const initialToggles = [
  { key: "online",   label: "Show online status",     desc: "Let friends see when you're active",  on: true  },
  { key: "requests", label: "Allow friend requests",  desc: "Anyone can send you a request",        on: true  },
  { key: "search",   label: "Show in search results", desc: "People can find you by name",          on: true  },
  { key: "receipts", label: "Read receipts",          desc: "Show when you've read messages",       on: false },
];

export default function SettingsClient() {
  const [toggles, setToggles] = useState(initialToggles);
  const flip = (key) =>
    setToggles((prev) => prev.map((t) => (t.key === key ? { ...t, on: !t.on } : t)));

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h1 className="font-bold text-gray-900 dark:text-white text-xl mb-1">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span>🎨</span> Appearance
        </h2>
        <DarkModeToggle />
        <div className="mt-3 flex flex-col gap-1">
          {[
            { label: "Language", desc: "Choose your language", icon: "🌍" },
            { label: "Font Size", desc: "Adjust text size", icon: "🔤" },
          ].map((item) => (
            <button key={item.label} className="flex items-center gap-3 p-3 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group w-full">
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center text-lg flex-shrink-0 transition-colors">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <span className="text-gray-300 group-hover:text-gray-500 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick toggles */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span>⚡</span> Quick Settings
        </h2>
        <div className="flex flex-col gap-2">
          {toggles.map((setting) => (
            <div
              key={setting.key}
              onClick={() => flip(setting.key)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{setting.label}</p>
                <p className="text-xs text-gray-400">{setting.desc}</p>
              </div>
              <div className={`w-11 h-6 rounded-full relative transition-all duration-300 flex-shrink-0 ${
                setting.on
                  ? "bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md shadow-blue-300/30"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  setting.on ? "translate-x-5" : "translate-x-0.5"
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other sections */}
      {settingsSections.map((section) => (
        <div key={section.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span>{section.icon}</span> {section.title}
          </h2>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group w-full ${
                  item.danger ? "hover:bg-red-50 dark:hover:bg-red-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-colors ${
                  item.danger ? "bg-red-100 dark:bg-red-900/30" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${item.danger ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 text-lg">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
