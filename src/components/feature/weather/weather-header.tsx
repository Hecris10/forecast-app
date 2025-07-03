import { ForecastAppLogo } from "@/components/forecast-app-logo";
import { MotionDiv } from "@/components/ui/motion";

export function WeatherHeader() {
  return (
    <MotionDiv
      className="text-center flex flex-col items-center gap-2 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MotionDiv
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ForecastAppLogo className="mx-auto" size="lg" />
      </MotionDiv>
      <MotionDiv
        className="text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Get detailed weather information for any address worldwide
      </MotionDiv>
    </MotionDiv>
  );
}
