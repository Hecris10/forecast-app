import { HistoryIcon } from "lucide-react";
import { itemVariants, MotionDiv } from "../ui/motion";

export const HistoryHeader = () => {
  return (
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
  );
};
