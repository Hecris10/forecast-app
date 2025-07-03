import { Calendar, Wind } from "lucide-react";
import { TemperatureUnit, WeatherPeriod } from "./types";

interface WeatherCardProps {
  period: WeatherPeriod;
  dayIndex: number;
  unit: TemperatureUnit;
}

export function WeatherCard({ period, dayIndex, unit }: WeatherCardProps) {
  // Convert temperature if needed
  const temp =
    unit === "C"
      ? Math.round(((period.temperature - 32) * 5) / 9)
      : period.temperature;
  const tempUnit = unit === "C" ? "C" : period.temperatureUnit;

  // Get day name from period name or create one
  const getDayName = (name: string, index: number) => {
    if (name.includes("Today")) return "Today";
    if (name.includes("Tonight")) return "Tonight";

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + index);
    return days[targetDate.getDay()];
  };

  const dayName = getDayName(period.name, dayIndex);

  return (
    <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
      {/* Day Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-md">
            <Calendar className="h-3 w-3 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {dayName}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          Day {dayIndex + 1}
        </span>
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center mb-3">
        <div className="relative">
          <img
            src={period.icon}
            alt={period.shortForecast}
            className="h-16 w-16 object-contain drop-shadow-sm"
          />
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-blue-400/10 dark:bg-blue-300/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Temperature */}
      <div className="text-center mb-3">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {temp}°{tempUnit}
        </div>
      </div>

      {/* Weather Description */}
      <div className="text-center mb-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-tight">
          {period.shortForecast}
        </p>
      </div>

      {/* Wind Information */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <Wind className="h-3 w-3" />
        <span>
          {period.windSpeed} {period.windDirection}
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
