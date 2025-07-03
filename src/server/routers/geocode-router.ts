import { addressSchema } from "@/lib/schemas";
import { j, publicProcedure } from "../jstack";
import {
  CensusGeocodeAddressMatch,
  CensusGeocodeResponse,
} from "../services/geocode";

// Types for Census Geocoding API

export const geocodeRouter = j.router({
  addressToCoords: publicProcedure
    .input(addressSchema)
    .query(async ({ c, input }) => {
      try {
        const { street, city, state, zip } = input;

        const address = `${street}, ${city}, ${state}, ${zip}`;

        // Encode the address for URL
        const encodedAddress = encodeURIComponent(address);
        const url = `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=${encodedAddress}&benchmark=2020&vintage=2020&format=json`;

        console.log("Geocoding URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          return c.json(
            { error: `Geocoding API error: ${response.status}` },
            response.status as any
          );
        }

        const data: CensusGeocodeResponse = await response.json();

        console.log("Geocoding response:", JSON.stringify(data, null, 2));

        if (
          !data.result.addressMatches ||
          data.result.addressMatches.length === 0
        ) {
          // Try with a more generic search if no exact match found
          const suggestions = [];

          console.log({ data });

          // If the address doesn't contain city/state, suggest adding them
          if (
            !address.toLowerCase().includes(",") &&
            !address.toLowerCase().includes("state")
          ) {
            suggestions.push(
              "Try adding city and state (e.g., '650 W South Temple ST, Salt Lake City, UT')"
            );
          }

          return c.json(
            {
              error: `No address matches found. ${suggestions.join(
                " "
              )} Please provide a complete address with city and state.`,
            },
            400
          );
        }

        const match = data.result.addressMatches;

        if (!match) {
          return c.json("No address matches found", 400);
        }

        const addressesList: CensusGeocodeAddressMatch[] = match.map((m) => ({
          coordinates: {
            x: m.coordinates.x,
            y: m.coordinates.y,
          },
          matchedAddress: m.matchedAddress,
        }));

        return c.superjson({
          success: true,
          addressesList,
          addressComponents: data.result.addressComponents,
        });
      } catch (error) {
        console.error("Geocoding error:", error);
        return c.json(
          {
            error: `Geocoding failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          },
          500
        );
      }
    }),

  // validateAddress: publicProcedure
  //   .input(
  //     z.object({
  //       street: z.string().min(1, "Street is required"),
  //     })
  //   )
  //   .query(async ({ c, input }) => {
  //     try {
  //       const { address } = input;

  //       const geocodeResponse = await getGeocode(address);

  //       if (!geocodeResponse.ok) {
  //         return c.superjson({
  //           valid: false,
  //           error: `API error: ${geocodeResponse.status}`,
  //         });
  //       }

  //       const geocodeData = (await geocodeResponse.json()) as CensusGeocodeResponse;

  //       const addressMatches = geocodeData.result.addressMatches || [];
  //       const isValid = addressMatches.length > 0;

  //       if (isValid) {
  //         throw new Error("Address is not valid");
  //       }

  //       return c.superjson({
  //         valid: isValid,
  //         suggestions: isValid
  //           ? addressMatches.slice(0, 3).map((match) => match.matchedAddress)
  //           : [],
  //       });
  //     } catch (error) {
  //       return c.superjson({
  //         valid: false,
  //         error: error instanceof Error ? error.message : "Unknown error",
  //       });
  //     }
  //   }),
});
