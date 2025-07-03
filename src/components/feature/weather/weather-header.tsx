import { ForecastAppLogo } from "@/components/forecast-app-logo";

export function WeatherHeader() {
  return (
    <div className="text-center flex flex-col items-center gap-2 mb-8">
      <ForecastAppLogo className="mx-auto" size="lg" />
      <p className="text-gray-600 dark:text-gray-400">
        Get detailed weather information for any address worldwide
      </p>
    </div>
  );
}
