import { backendClient } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCountries = () => {
  // Fetch countries
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        const response = await backendClient.countries.countries.$get();

        const countries = await response.json();

        return countries;
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch countries");
        return [];
      }
    },
  });

  return {
    data: countriesQuery.data || [],
    isLoading: countriesQuery.isLoading,
  };
};
