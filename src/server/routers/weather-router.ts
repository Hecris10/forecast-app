import { z } from "zod";
import { j, privateProcedure } from "../jstack";

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
  address: z.string().optional(),
});

export const weatherRouter = j.router({
  getForecast: privateProcedure
    .input(latLngSchema)
    .query(async ({ c, input, ctx }) => {
      try {
        const { latitude, longitude, address } = input;

        // Get weather data from National Weather Service API
        const url = `https://api.weather.gov/points/${latitude},${longitude}`;

        const pointsResponse = await fetch(url);

        if (!pointsResponse.ok) {
          throw new Error(`Weather API error: ${pointsResponse.status}`);
        }

        const pointsData = (await pointsResponse.json()) as PointsResponse;
        const forecastUrl = pointsData.properties.forecast;

        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
          throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }

        const weatherData = (await forecastResponse.json()) as WeatherResponse;

        // Save to history if address is provided
        if (address) {
          try {
            await ctx.db.weatherHistory.create({
              data: {
                userId: ctx.auth.session.user.id,
                address,
                latitude,
                longitude,
                unit: "F", // Default unit
              },
            });
          } catch (historyError) {
            console.error("Error saving history:", historyError);
            // Don't fail the weather request if history saving fails
          }
        }

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

  getHistory: privateProcedure.query(async ({ c, ctx }) => {
    try {
      const history = await ctx.db.weatherHistory.findMany({
        where: {
          userId: ctx.auth.session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 50, // Limit to last 50 searches
      });

      return c.superjson({
        success: true,
        data: history,
      });
    } catch (error) {
      console.error("Error fetching history:", error);
      throw new Error(
        `Failed to fetch history: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }),

  deleteHistory: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ c, input, ctx }) => {
      try {
        const { id } = input;

        // Ensure the user owns this history entry
        const historyEntry = await ctx.db.weatherHistory.findFirst({
          where: {
            id,
            userId: ctx.auth.session.user.id,
          },
        });

        if (!historyEntry) {
          return c.json({ error: "History entry not found" }, 404);
        }

        await ctx.db.weatherHistory.delete({
          where: {
            id,
          },
        });

        return c.superjson({
          success: true,
        });
      } catch (error) {
        console.error("Error deleting history:", error);
        throw new Error(
          `Failed to delete history: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),
});
