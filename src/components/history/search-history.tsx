"use client";

import { ErrorDisplay } from "@/components/feature/weather/error-display";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistory } from "@/hooks/use-history";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Clock,
  History,
  MapPin,
  Search,
  Thermometer,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchHistory() {
  const {
    history,
    isLoadingHistory,
    historyError,
    deleteHistoryItem,
    isDeleting,
  } = useHistory();
  const router = useRouter();

  const handleHistoryItemClick = (item: any) => {
    const url = `/weather/forecast?address=${encodeURIComponent(
      item.address
    )}&lat=${item.latitude}&lng=${item.longitude}`;
    router.push(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Search History
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Your recent weather searches and forecasts
        </p>
      </div>

      {/* Loading State */}
      {isLoadingHistory && (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner message="Loading your search history..." />
        </div>
      )}

      {/* Error State */}
      {historyError && (
        <div className="flex flex-col items-center justify-center py-16">
          <ErrorDisplay
            message="Failed to load history. Please try again."
            onRetry={() => window.location.reload()}
          />
        </div>
      )}

      {/* Empty State */}
      {!isLoadingHistory && !historyError && history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Clock className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              No searches yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Start searching for weather forecasts and your history will appear
              here
            </p>
          </div>
        </div>
      )}

      {/* History Items */}
      {!isLoadingHistory && !historyError && history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Searches ({history.length})
            </h2>
          </div>

          <ScrollArea className="h-[600px] w-full rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-3 p-4">
              {history.map((item: any) => (
                <div
                  key={item.id}
                  className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
                  onClick={() => handleHistoryItemClick(item)}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      disabled={isDeleting}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 p-2 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
