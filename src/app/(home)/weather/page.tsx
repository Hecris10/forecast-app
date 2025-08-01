import { Weather } from "@/components/feature/weather";
import { MotionDiv } from "@/components/ui/motion";

export default function WeatherPage() {
  return (
    <MotionDiv
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MotionDiv
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Weather />
      </MotionDiv>
    </MotionDiv>
  );
}
