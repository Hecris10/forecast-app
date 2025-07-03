"use client";
import { Search } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const HistorySearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search by address, coordinates, temperature, or date..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Button
        className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2"
        onClick={onFocus}
        variant="ghost"
        size="icon"
        aria-label="Search"
        aria-describedby="search-button"
      >
        <Search className="h-4 w-4 text-gray-400 " />
      </Button>
    </div>
  );
};
