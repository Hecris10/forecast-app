import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
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

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            7-Day Forecast for {selectedAddress?.matchedAddress}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <span className="text-sm">Units:</span>
            <Button
              variant={unit === "F" ? "default" : "outline"}
              size="sm"
              onClick={() => onUnitChange("F")}
            >
              °F
            </Button>
            <Button
              variant={unit === "C" ? "default" : "outline"}
              size="sm"
              onClick={() => onUnitChange("C")}
            >
              °C
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {periods.map((period: WeatherPeriod, idx: number) => (
            <WeatherCard
              key={period.number}
              period={period}
              dayIndex={idx}
              unit={unit}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
