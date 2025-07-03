"use client";

import { ErrorDisplay } from "@/components/feature/weather/error-display";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHistory } from "@/hooks/use-history";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  History,
  MapPin,
  Search,
  Thermometer,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const {
    history,
    isLoadingHistory,
    historyError,
    deleteHistoryItem,
    isDeleting,
  } = useHistory();
  const router = useRouter();

  const handleHistoryItemClick = (item: any) => {
    // Navigate to forecast page with the coordinates as URL parameters
    const url = `/weather/forecast?address=${encodeURIComponent(
      item.address
    )}&lat=${item.latitude}&lng=${item.longitude}`;
    router.push(url);
  };

  if (isLoadingHistory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <LoadingSpinner message="Loading history..." />
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <ErrorDisplay
          message="Failed to load history. Please try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-4xl shadow-lg border-none bg-white/80 dark:bg-sidebar/80 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <History className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl font-bold">Weather History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-muted-foreground text-lg text-center py-8">
              No history to display yet.
              <br />
              <span className="text-sm text-gray-400">
                Your recent weather lookups will appear here.
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item: any) => (
                <Card
                  key={item.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{item.address}</span>
                        <Search className="h-3 w-3 text-muted-foreground" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>

                        {item.temperature && (
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            <span>
                              {item.temperature}°{item.unit}
                            </span>
                          </div>
                        )}

                        <Badge variant="secondary" className="text-xs">
                          {item.latitude.toFixed(4)},{" "}
                          {item.longitude.toFixed(4)}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      disabled={isDeleting}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
