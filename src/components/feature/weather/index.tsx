"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFindAddresses } from "@/hooks/useFindAddresses";
import { backendClient } from "@/lib/client";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import AddressForm from "./address-form";

export default function Weather() {
  const {
    findAddresses,
    isPendingFindAddresses,
    addresses,
    hasRequestedAddresses,
  } = useFindAddresses();

  // State for selected address
  const [selectedAddress, setSelectedAddress] =
    useState<null | CensusGeocodeAddressMatch>(null);
  // State for temperature unit
  const [unit, setUnit] = useState<"F" | "C">("F");

  // Weather forecast mutation
  const {
    mutate: fetchForecast,
    data: forecastData,
    isPending: isPendingForecast,
    isError: isForecastError,
    error: forecastError,
  } = useMutation({
    mutationFn: async (coords: { latitude: number; longitude: number }) => {
      const res = await backendClient.weather.getForecast.$post({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      return await res.json();
    },
  });

  // Handler for selecting an address
  const handleSelectAddress = (address: CensusGeocodeAddressMatch) => {
    setSelectedAddress(address);
    fetchForecast({
      latitude: address.coordinates.y,
      longitude: address.coordinates.x,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          7-Day Weather Forecast
        </h1>
        <p className="text-gray-600">
          Get detailed weather information for any address worldwide
        </p>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Address
          </CardTitle>
          <CardDescription>
            Enter an address to get the 7-day weather forecast. Works best with
            US addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddressForm
            isPendingFindAddresses={isPendingFindAddresses}
            onSubmit={findAddresses}
          />
        </CardContent>
      </Card>

      {/* Current Location */}

      {hasRequestedAddresses &&
        (addresses?.success &&
        "addressesList" in addresses &&
        addresses.addressesList.length > 0 ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2 text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Select an address:</span>
                </div>
                {addresses.addressesList.map(
                  (address: CensusGeocodeAddressMatch) => (
                    <Button
                      key={address.matchedAddress}
                      variant={
                        selectedAddress?.matchedAddress ===
                        address.matchedAddress
                          ? "default"
                          : "outline"
                      }
                      className="justify-start w-full text-left"
                      onClick={() => handleSelectAddress(address)}
                    >
                      {address.matchedAddress}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-red-500 text-center">
                Failed to find addresses. Please try again.
              </p>
            </CardContent>
          </Card>
        ))}

      {/* Weather Forecast */}
      {isPendingForecast && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weather forecast...</p>
        </div>
      )}
      {isForecastError && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-red-500 text-center">
              Failed to load weather forecast. Please try again.
              <br />
              {forecastError instanceof Error ? forecastError.message : null}
            </p>
          </CardContent>
        </Card>
      )}
      {forecastData?.success && forecastData.data?.properties?.periods && (
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
                  onClick={() => setUnit("F")}
                >
                  °F
                </Button>
                <Button
                  variant={unit === "C" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUnit("C")}
                >
                  °C
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {forecastData.data.properties.periods
                .slice(0, 7)
                .map((period: any, idx: number) => {
                  // Convert temperature if needed
                  const temp =
                    unit === "C"
                      ? Math.round(((period.temperature - 32) * 5) / 9)
                      : period.temperature;
                  const tempUnit = unit === "C" ? "C" : period.temperatureUnit;
                  // Format date as DD/MM
                  const dateObj = new Date(period.startTime);
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                  const formattedDate = `${day}/${month}`;
                  return (
                    <div
                      key={period.number}
                      className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                    >
                      <div className="text-xs text-gray-400 mb-1">
                        Day {idx + 1} • {formattedDate}
                      </div>
                      <img
                        src={period.icon}
                        alt={period.shortForecast}
                        className="h-12 w-12 mb-2"
                      />
                      <div className="font-semibold">{period.name}</div>
                      <div className="text-2xl font-bold">
                        {temp}&deg;{tempUnit}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">
                        {period.shortForecast}
                      </div>
                      <div className="text-xs text-gray-400">
                        {period.windSpeed} {period.windDirection}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
