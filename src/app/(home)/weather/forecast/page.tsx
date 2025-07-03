"use client";

import { ErrorDisplay } from "@/components/feature/weather/error-display";
import { LoadingSpinner } from "@/components/feature/weather/loading-spinner";
import { TemperatureUnit } from "@/components/feature/weather/types";
import { WeatherForecast } from "@/components/feature/weather/weather-forecast";
import { useForecast } from "@/hooks/use-forecast";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ForecastPage() {
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

  // Show error if missing parameters
  if (!address || !latitude || !longitude) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <ErrorDisplay
          message="Missing address parameters. Please search for an address first."
          showRetry={false}
        />
      </div>
    );
  }

  // Show loading state
  if (isPendingForecast) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <LoadingSpinner message="Loading weather forecast..." />
      </div>
    );
  }

  // Show error state
  if (isForecastError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <ErrorDisplay
          message={
            forecastError instanceof Error
              ? `Failed to load weather forecast: ${forecastError.message}`
              : "Failed to load weather forecast. Please try again."
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  // Show forecast
  return (
    <div className="max-w-6xl mx-auto p-8">
      {forecastData && selectedAddress && (
        <WeatherForecast
          forecastData={forecastData}
          selectedAddress={selectedAddress}
          unit={unit}
          onUnitChange={setUnit}
        />
      )}
    </div>
  );
}
