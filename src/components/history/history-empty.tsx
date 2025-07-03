import { Clock } from "lucide-react";
import { itemVariants, MotionDiv } from "../ui/motion";

export const HistoryEmpty = () => {
  return (
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
  );
};
