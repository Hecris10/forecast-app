import { backendClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

interface UseForecastParams {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

export function useForecast({
  address,
  latitude,
  longitude,
}: UseForecastParams) {
  return useQuery({
    queryKey: ["forecast", address, latitude, longitude],
    queryFn: async () => {
      if (!address || latitude === null || longitude === null) {
        throw new Error("Missing required parameters");
      }

      const res = await backendClient.weather.getForecast.$get({
        latitude,
        longitude,
        address,
      });
      return await res.json();
    },
    enabled: !!(address && latitude !== null && longitude !== null),
  });
}
