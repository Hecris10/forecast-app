import { j, publicProcedure } from "../jstack";

interface CountryResponse {
  name: { common: string };
  cca2: string;
}

interface Country {
  name: string;
  code: string;
}

export const countriesRouter = j.router({
  countries: publicProcedure.query(async ({ c }) => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );
    try {
      const data = (await response.json()) as CountryResponse[];
      const countries = data
        .map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      return c.superjson(countries);
    } catch  {
      return c.json({ error: "Failed to fetch countries" }, 500);
    }
  }),
});
