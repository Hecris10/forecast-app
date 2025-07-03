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

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <div className="text-xs text-gray-400 mb-1">Day {dayIndex + 1}</div>
      <img
        src={period.icon}
        alt={period.shortForecast}
        className="h-12 w-12 mb-2"
      />
      <div className="font-semibold">{period.name}</div>
      <div className="text-2xl font-bold">
        {temp}&deg;{tempUnit}
      </div>
      <div className="text-sm text-gray-500 mb-1">{period.shortForecast}</div>
      <div className="text-xs text-gray-400">
        {period.windSpeed} {period.windDirection}
      </div>
    </div>
  );
}
