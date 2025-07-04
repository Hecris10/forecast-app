import { InferRouterInputs, InferRouterOutputs } from "jstack";
import { j } from "./jstack";
import { countriesRouter } from "./routers/countries-router";
import { geocodeRouter } from "./routers/geocode-router";
import { weatherRouter } from "./routers/weather-router";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  geocode: geocodeRouter,
  weather: weatherRouter,
  countries: countriesRouter,
});

type InferInput = InferRouterInputs<AppRouter>;
type InferOutput = InferRouterOutputs<AppRouter>;

export type InputAddressToCoords = InferInput["geocode"]["addressToCoords"];
export type OutputAddressToCoords = InferOutput["geocode"]["addressToCoords"];

export type InputGetHistory = InferInput["weather"]["getHistory"];
export type OutputGetHistory = InferOutput["weather"]["getHistory"];
export type History = OutputGetHistory["data"][number];

export type AppRouter = typeof appRouter;

export default appRouter;
