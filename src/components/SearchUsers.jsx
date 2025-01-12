"use client";
import { searchUsers } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import debounce from "lodash.debounce";

export default function SearchUsers() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedUser, setSearchedUser] = useState("");
  const inputRef = useRef(null);
  const handleSearch = debounce(async (e) => {
    const value = e.target.value.trim(); // Trim input to avoid unnecessary spaces
    if (!value) {
      setIsSearchMode(false);
      setIsLoading(false);
      setSearchResult([]);
      return;
    }

    setIsSearchMode(true);

    try {
      setIsLoading(true);
      const users = await searchUsers(value);
      setSearchResult(users);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, 300); // Adjust debounce delay as needed (300ms is common)
  const handleRemoveSearch = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
    setSearchedUser(null); // Reset the searched user state
    setSearchResult([]); // Clear the search results
    setIsSearchMode(false); // Exit search mode
  };
  return (
    <div>
      <div className=" hidden xl:flex items-center relative">
        <input
          className="outline-none py-2 px-2 rounded-xl bg-gray-100"
          placeholder="Search..."
          type="text"
          onChange={handleSearch}
          ref={inputRef}
          // (e) => setSearchedUser(e.target.value)
        />
        {!isSearchMode ? (
          <Image
            src="/search.png"
            alt="search"
            width={16}
            height={16}
            className="absolute right-2 top-2"
          />
        ) : (
          <Image
            src="/remove.png"
            alt="search"
            width={16}
            height={16}
            className="absolute right-2 top-2 cursor-pointer "
            onClick={() => handleRemoveSearch(inputRef)}
          />
        )}
      </div>
      {isSearchMode && (
        <div className="absolute bg-white p-2 shadow-lg rounded-md z-30 flex flex-col gap-5 min-w-60">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p> // Loading indicator
          ) : searchResult.length > 0 ? (
            searchResult.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                className="flex items-center hover:bg-slate-100 cursor-pointer gap-5 p-2 rounded-md"
              >
                <Image
                  src={user?.avatar || "/default-avatar.png"} // Use default avatar
                  alt={`${user.username}'s avatar`}
                  className="w-11 h-11 object-cover rounded-full"
                  width={44}
                  height={44}
                />
                <span className="font-medium text-lg">{user.username}</span>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p> // Fallback for no results
          )}
        </div>
      )}
    </div>
  );
}
