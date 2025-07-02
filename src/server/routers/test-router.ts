import { z } from "zod";
import { j, publicProcedure } from "../jstack";

// Schema for latitude/longitude that accepts strings and transforms to numbers
const latLngSchema = z.object({
  latitude: z.string().transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num < -90 || num > 90) {
      throw new Error("Invalid latitude: must be a number between -90 and 90");
    }
    return num;
  }),
  longitude: z.string().transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num < -180 || num > 180) {
      throw new Error(
        "Invalid longitude: must be a number between -180 and 180"
      );
    }
    return num;
  }),
});

// Simple string schema for debugging
const simpleLatLngSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

// Number schema for mutations
const numberLatLngSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const testRouter = j.router({
  simple: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query(async ({ c, input }) => {
      return c.superjson({
        success: true,
        message: input.message,
        timestamp: new Date().toISOString(),
      });
    }),

  weatherTest: publicProcedure
    .input(latLngSchema)
    .query(async ({ c, input }) => {
      try {
        const { latitude, longitude } = input;

        console.log("Test coordinates:", { latitude, longitude });

        // Test without external API call first
        return c.superjson({
          success: true,
          coordinates: { latitude, longitude },
          test: "weather-test-no-fetch",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error in weatherTest:", error);
        throw new Error(
          `Test failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),

  weatherTestSimple: publicProcedure
    .input(simpleLatLngSchema)
    .query(async ({ c, input }) => {
      try {
        const { latitude, longitude } = input;

        console.log("Simple test coordinates:", { latitude, longitude });

        return c.superjson({
          success: true,
          coordinates: { latitude, longitude },
          test: "weather-test-simple-strings",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error in weatherTestSimple:", error);
        throw new Error(
          `Test failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),

  weatherTestMutation: publicProcedure
    .input(numberLatLngSchema)
    .mutation(async ({ c, input }) => {
      try {
        const { latitude, longitude } = input;

        console.log("Mutation test coordinates:", { latitude, longitude });

        return c.superjson({
          success: true,
          coordinates: { latitude, longitude },
          test: "weather-test-mutation",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error in weatherTestMutation:", error);
        throw new Error(
          `Test failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),

  weatherTestWithFetch: publicProcedure
    .input(latLngSchema)
    .query(async ({ c, input }) => {
      try {
        const { latitude, longitude } = input;

        // Test the external API call
        const url = `https://api.weather.gov/points/${latitude},${longitude}`;
        console.log("Fetching:", url);

        const response = await fetch(url);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", typeof data);

        return c.superjson({
          success: true,
          data: data,
          test: "weather-test-with-fetch",
        });
      } catch (error) {
        console.error("Error in weatherTestWithFetch:", error);
        throw new Error(
          `Test failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),
});
