"use client";
import { searchUsers } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import debounce from "lodash.debounce";

export default function SearchUsers() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  const handleSearch = debounce(async (value) => {
    if (!value.trim()) {
      setIsSearchMode(false);
      setSearchResult([]);
      return;
    }
    setIsSearchMode(true);
    setIsLoading(true);
    try {
      const users = await searchUsers(value.trim());
      setSearchResult(users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      handleClear();
    }
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    setQuery("");
    setSearchResult([]);
    setIsSearchMode(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsSearchMode(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative hidden xl:block">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
        isFocused
          ? "bg-white border-blue-400 shadow-sm shadow-blue-100 w-60"
          : "bg-gray-100 border-transparent w-44"
      }`}>
        <Image src="/search.png" alt="" width={14} height={14} className="opacity-40 flex-shrink-0" />
        <input
          ref={inputRef}
          className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
          placeholder="Search Connectly..."
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
        />
        {isSearchMode && (
          <button onClick={handleClear} className="flex-shrink-0 hover:scale-110 transition-transform">
            <Image src="/remove.png" alt="clear" width={14} height={14} className="opacity-50 hover:opacity-100" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isSearchMode && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 w-72 overflow-hidden animate-scale-in">
          {isLoading ? (
            <div className="p-4 flex flex-col gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchResult.length > 0 ? (
            <div className="py-1.5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">People</p>
              {searchResult.slice(0, 5).map((user) => (
                <Link
                  key={user.id}
                  href={`/profile/${user.username}`}
                  onClick={handleClear}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors duration-150 group"
                >
                  <Image
                    src={user?.avatar || "/noAvatar.png"}
                    alt=""
                    className="w-9 h-9 object-cover rounded-full ring-2 ring-transparent group-hover:ring-blue-200 transition-all flex-shrink-0"
                    width={36}
                    height={36}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                      {user.name || user.username}
                    </span>
                    <span className="text-xs text-gray-400">@{user.username}</span>
                  </div>
                </Link>
              ))}
              {/* See all results */}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={handleClear}
                className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-100 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                See all results for "{query}" →
              </Link>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm font-semibold text-gray-700">No results for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try a different name</p>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={handleClear}
                className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:underline"
              >
                Search all of Connectly →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
