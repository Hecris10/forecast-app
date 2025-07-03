"use client";

import { ErrorDisplay } from "@/components/feature/weather/error-display";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionDiv } from "@/components/ui/motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistory } from "@/hooks/use-history";
import { History } from "@/server";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Clock,
  Filter,
  HistoryIcon,
  MapPin,
  Search,
  Thermometer,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchHistory() {
  const {
    history,
    isLoadingHistory,
    historyError,
    deleteHistoryItem,
    isDeleting,
  } = useHistory();
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState<History | null>(null);

  const handleHistoryItemClick = (item: History) => {
    const url = `/weather/forecast?address=${encodeURIComponent(
      item.address
    )}&lat=${item.latitude}&lng=${item.longitude}`;
    router.push(url);
  };

  // Filter history items based on search query
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

  const handleDeleteClick = (e: React.MouseEvent, item: History) => {
    e.stopPropagation();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const historyItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <MotionDiv
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <MotionDiv className="text-center space-y-2" variants={itemVariants}>
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <HistoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Search History
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Your recent weather searches and forecasts
        </p>
      </MotionDiv>

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
      {historyError && (
        <MotionDiv
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorDisplay
            error="Failed to load history. Please try again."
            onRetry={() => window.location.reload()}
          />
        </MotionDiv>
      )}

      {/* Empty State */}
      {!isLoadingHistory && !historyError && history.length === 0 && (
        <MotionDiv
          className="flex flex-col items-center justify-center py-16 space-y-4"
          variants={itemVariants}
        >
          <MotionDiv
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Clock className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </MotionDiv>
          <MotionDiv
            className="text-center space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              No searches yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Start searching for weather forecasts and your history will appear
              here
            </p>
          </MotionDiv>
        </MotionDiv>
      )}

      {/* History Items */}
      {!isLoadingHistory && !historyError && history.length > 0 && (
        <MotionDiv className="space-y-4" variants={itemVariants}>
          {/* Search Filter */}
          <MotionDiv className="relative" variants={itemVariants}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by address, coordinates, temperature, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* History List */}
          {filteredHistory.length > 0 && (
            <MotionDiv variants={containerVariants}>
              <ScrollArea className="h-[600px] w-full rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="space-y-3 p-4">
                  {filteredHistory.map((item: History, index: number) => (
                    <MotionDiv
                      key={item.id}
                      className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
                      onClick={() => handleHistoryItemClick(item)}
                      variants={historyItemVariants}
                      custom={index}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 },
                      }}
                    >
                      {/* Main Content */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* Address */}
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.address}
                            </span>
                            <Search className="h-3 w-3 text-gray-400" />
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDistanceToNow(new Date(item.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>

                            {item.temperature && (
                              <div className="flex items-center gap-1.5">
                                <Thermometer className="h-3 w-3" />
                                <span>
                                  {item.temperature}°{item.unit}
                                </span>
                              </div>
                            )}

                            <Badge
                              variant="secondary"
                              className="text-xs bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border-0"
                            >
                              {item.latitude.toFixed(4)},{" "}
                              {item.longitude.toFixed(4)}
                            </Badge>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <AlertDialog
                          open={!!itemToDelete}
                          onOpenChange={() => setItemToDelete(null)}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteClick(e, item)}
                              disabled={isDeleting}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 p-2 h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Search History
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {`Are you sure you want to delete the search for "
                                ${item.address}"? This action cannot be undone.`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={handleCancelDelete}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleConfirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                    </MotionDiv>
                  ))}
                </div>
              </ScrollArea>
            </MotionDiv>
          )}
        </MotionDiv>
      )}

      {/* Alert Dialog for Deletion Confirmation */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Search History</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete the search for "${itemToDelete?.address}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MotionDiv>
  );
}
