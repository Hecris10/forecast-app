import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { MapPin, Thermometer } from "lucide-react";
import { TemperatureUnit, WeatherForecastData, WeatherPeriod } from "./types";
import { WeatherCard } from "./weather-card";

interface WeatherForecastProps {
  forecastData: WeatherForecastData;
  selectedAddress: CensusGeocodeAddressMatch | null;
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

export function WeatherForecast({
  forecastData,
  selectedAddress,
  unit,
  onUnitChange,
}: WeatherForecastProps) {
  if (!forecastData?.success || !forecastData.data?.properties?.periods) {
    return null;
  }

  const periods = forecastData.data.properties.periods.slice(0, 7);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <MotionDiv
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <MotionDiv
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Location and Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                7-Day Weather Forecast
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {selectedAddress?.matchedAddress}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Thermometer className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Temperature Units
              </span>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg gap-1 p-1">
              <Button
                variant={unit === "F" ? "default" : "ghost"}
                size="sm"
                onClick={() => onUnitChange("F")}
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  unit === "F"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                °F
              </Button>
              <Button
                variant={unit === "C" ? "default" : "ghost"}
                size="sm"
                onClick={() => onUnitChange("C")}
                className={`px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  unit === "C"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-600"
                }`}
              >
                °C
              </Button>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Weather Cards Grid */}
      <MotionDiv
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-stretch"
        variants={itemVariants}
      >
        {periods.map((period: WeatherPeriod, idx: number) => (
          <MotionDiv key={period.number} variants={cardVariants} custom={idx}>
            <WeatherCard period={period} dayIndex={idx} unit={unit} />
          </MotionDiv>
        ))}
      </MotionDiv>

      {/* Footer Info */}
      <MotionDiv
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30 dark:border-gray-600/30"
        variants={itemVariants}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Weather data provided by National Weather Service API
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Forecast updates every hour • Last updated:{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}
