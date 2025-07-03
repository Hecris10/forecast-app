"use client";

import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  containerVariants,
  itemVariants,
  MotionDiv,
} from "@/components/ui/motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistory } from "@/hooks/use-history";
import { History } from "@/server";
import { formatDistanceToNow } from "date-fns";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { DeleteHistoryDialog } from "./delete-history-dialog";
import { HistoryEmpty } from "./history-empty";
import { HistoryError } from "./history-error";
import { HistoryHeader } from "./history-header";
import { HistoryItem } from "./history-item";
import { HistorySearchBar } from "./history-search-bar";

export default function SearchHistory() {
  const {
    history,
    isLoadingHistory,
    historyError,
    deleteHistoryItem,
    isDeleting,
  } = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState<History | null>(null);

  const filterHistory = () => {
    if (!searchQuery.trim()) {
      return history;
    }

    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return history.filter((item: History) => {
      return (
        item.address.toLowerCase().includes(lowerCaseQuery) ||
        item.latitude.toString().includes(lowerCaseQuery) ||
        item.longitude.toString().includes(lowerCaseQuery) ||
        (item.temperature &&
          item.temperature.toString().includes(lowerCaseQuery)) ||
        formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
          .toLowerCase()
          .includes(lowerCaseQuery)
      );
    });
  };

  const filteredHistory = filterHistory();

  const handleDeleteClick = (item: History) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteHistoryItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  return (
    <MotionDiv
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HistoryHeader />

      {/* Loading State */}
      {isLoadingHistory && (
        <MotionDiv
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner message="Loading your search history..." />
        </MotionDiv>
      )}

      {/* Error State */}
      {historyError && <HistoryError />}

      {/* Empty State */}
      {!isLoadingHistory && !historyError && history.length === 0 && (
        <HistoryEmpty />
      )}

      {/* History Items */}
      {!isLoadingHistory && !historyError && history.length > 0 && (
        <MotionDiv className="space-y-4" variants={itemVariants}>
          <MotionDiv className="relative" variants={itemVariants}>
            <HistorySearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {searchQuery && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  ×
                </Button>
              </div>
            )}
          </MotionDiv>

          {/* Results Header */}
          <MotionDiv
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {searchQuery
                  ? `Search Results (${filteredHistory.length})`
                  : `Recent Searches (${history.length})`}
              </h2>
            </div>
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Filtered
              </Badge>
            )}
          </MotionDiv>

          {/* No Search Results */}
          {searchQuery && filteredHistory.length === 0 && (
            <MotionDiv
              className="text-center py-8 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-gray-600 dark:text-gray-400">
                {` No results found for "${searchQuery}"`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </MotionDiv>
          )}

          {filteredHistory.length > 0 && (
            <MotionDiv variants={containerVariants}>
              <ScrollArea className="h-[600px] w-full rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="space-y-3 p-4">
                  {filteredHistory.map((item: History, index: number) => (
                    <HistoryItem
                      historyItem={item}
                      index={index}
                      handleDeleteClick={() => handleDeleteClick(item)}
                      isDeleting={isDeleting}
                    />
                  ))}
                </div>
              </ScrollArea>
            </MotionDiv>
          )}
        </MotionDiv>
      )}

      {/* Alert Dialog for Deletion Confirmation */}
      <DeleteHistoryDialog
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </MotionDiv>
  );
}
