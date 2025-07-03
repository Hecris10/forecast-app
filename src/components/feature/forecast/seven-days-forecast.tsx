"use client";

import { WeatherForecast } from "@/components/feature/forecast/weather-forecast";
import { ErrorDisplay } from "@/components/feature/weather/error-display";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import {
  TemperatureUnit,
  WeatherForecastData,
} from "@/components/feature/weather/types";
import { useForecast } from "@/hooks/use-forecast";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SevenDaysForecast() {
  const searchParams = useSearchParams();
  const [unit, setUnit] = useState<TemperatureUnit>("F");

  // Get parameters from URL
  const address = searchParams.get("address");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  // Parse coordinates
  const lat = latitude ? parseFloat(latitude) : null;
  const lng = longitude ? parseFloat(longitude) : null;

  // Use the forecast hook
  const {
    data: forecastData,
    isLoading: isPendingForecast,
    isError: isForecastError,
    error: forecastError,
    refetch,
  } = useForecast({
    address,
    latitude: lat,
    longitude: lng,
  });

  // Create address match object for the forecast component
  const selectedAddress: CensusGeocodeAddressMatch | null =
    address && lat && lng
      ? {
          matchedAddress: address,
          coordinates: {
            x: lng,
            y: lat,
          },
        }
      : null;

  return (
    <>
      {/* Missing Parameters State */}
      {(!address || !latitude || !longitude) && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <ErrorDisplay error="Missing address parameters. Please search for an address first." />
        </div>
      )}

      {/* Loading State */}
      {address && latitude && longitude && isPendingForecast && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner message="Loading weather forecast..." />
        </div>
      )}

      {/* Error State */}
      {address && latitude && longitude && isForecastError && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <ErrorDisplay
            error={
              forecastError instanceof Error
                ? `Failed to load weather forecast: ${forecastError.message}`
                : "Failed to load weather forecast. Please try again."
            }
            onRetry={() => refetch()}
          />
        </div>
      )}

      {/* Success State - Show Forecast */}
      {address &&
        latitude &&
        longitude &&
        forecastData &&
        selectedAddress &&
        !isPendingForecast &&
        !isForecastError && (
          <WeatherForecast
            forecastData={forecastData as WeatherForecastData}
            selectedAddress={selectedAddress}
            unit={unit}
            onUnitChange={setUnit}
          />
        )}
    </>
  );
}
