import SevenDaysForecast from "@/components/feature/forecast/seven-days-forecast";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import { Suspense } from "react";

export default function ForecastPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <LoadingSpinner message="Loading weather forecast..." />
            </div>
          }
        >
          <SevenDaysForecast />
        </Suspense>
      </div>
    </div>
  );
}
