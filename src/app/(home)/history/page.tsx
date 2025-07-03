"use client";

import SearchHistory from "@/components/history/search-history";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl">
        <SearchHistory />
      </div>
    </div>
  );
}
