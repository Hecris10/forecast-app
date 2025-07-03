import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion";
import { History } from "@/server";
import { formatDistanceToNow } from "date-fns";
import { Calendar, MapPin, Search, Thermometer, Trash2 } from "lucide-react";
import Link from "next/link";

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

export const HistoryItem = ({
  historyItem,
  index,

  isDeleting,
  handleDeleteClick,
}: {
  historyItem: History;
  index: number;

  handleDeleteClick: () => void;
  isDeleting: boolean;
}) => {
  const url = `/weather/forecast?address=${encodeURIComponent(
    historyItem.address
  )}&lat=${historyItem.latitude}&lng=${historyItem.longitude}`;
  return (
    <MotionDiv
      className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
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
            <Link
              href={url}
              prefetch
              className="font-medium text-gray-900 dark:text-white text-sm hover:underline active:underline cursor-pointer"
            >
              {historyItem.address}
            </Link>
            <Search className="h-3 w-3 text-gray-400" />
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(historyItem.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {historyItem.temperature && (
              <div className="flex items-center gap-1.5">
                <Thermometer className="h-3 w-3" />
                <span>
                  {historyItem.temperature}°{historyItem.unit}
                </span>
              </div>
            )}

            <Badge
              variant="secondary"
              className="text-xs bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border-0"
            >
              {historyItem.latitude.toFixed(4)},{" "}
              {historyItem.longitude.toFixed(4)}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 p-2 h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </MotionDiv>
  );
};
