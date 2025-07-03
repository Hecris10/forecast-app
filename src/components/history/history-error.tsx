import { ErrorDisplay } from "../feature/weather/error-display";
import { MotionDiv } from "../ui/motion";

export const HistoryError = () => {
  return (
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
  );
};
