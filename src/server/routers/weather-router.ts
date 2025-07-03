import { z } from "zod";
import { j, publicProcedure } from "../jstack";

// Types for National Weather Service API
interface WeatherResponse {
  properties: {
    periods: Array<{
      number: number;
      name: string;
      startTime: string;
      endTime: string;
      isDaytime: boolean;
      temperature: number;
      temperatureUnit: string;
      temperatureTrend: string | null;
      windSpeed: string;
      windDirection: string;
      icon: string;
      shortForecast: string;
      detailedForecast: string;
    }>;
  };
}

interface PointsResponse {
  properties: {
    forecast: string;
    observationStations: string;
  };
}

// Schema for latitude/longitude that accepts numbers directly
const latLngSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const weatherRouter = j.router({
  getForecast: publicProcedure
    .input(latLngSchema)
    .mutation(async ({ c, input }) => {
      try {
        const { latitude, longitude } = input;

        console.log("Weather request for:", { latitude, longitude });

        // Get weather data from National Weather Service API
        const url = `https://api.weather.gov/points/${latitude},${longitude}`;
        console.log("Weather API URL:", url);

        const pointsResponse = await fetch(url);

        if (!pointsResponse.ok) {
          throw new Error(`Weather API error: ${pointsResponse.status}`);
        }

        const pointsData = (await pointsResponse.json()) as PointsResponse;
        const forecastUrl = pointsData.properties.forecast;

        console.log("Forecast URL:", forecastUrl);

        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
          throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }

        const weatherData = (await forecastResponse.json()) as WeatherResponse;

        return c.superjson({
          success: true,
          data: weatherData,
          cached: false,
        });
      } catch (error) {
        console.error("Weather forecast error:", error);
        throw new Error(
          `Weather forecast failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),
});
