import { backendClient } from "@/lib/client";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TemperatureUnit } from "./types";

export function useWeather() {
  // State for selected address
  const [selectedAddress, setSelectedAddress] =
    useState<null | CensusGeocodeAddressMatch>(null);

  // State for temperature unit
  const [unit, setUnit] = useState<TemperatureUnit>("F");

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

  return {
    selectedAddress,
    unit,
    setUnit,
    forecastData,
    isPendingForecast,
    isForecastError,
    forecastError,
    handleSelectAddress,
  };
}
