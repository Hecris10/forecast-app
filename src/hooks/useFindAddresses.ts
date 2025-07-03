import { backendClient } from "@/lib/client";
import { InputAddressToCoords } from "@/server";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFindAddresses = () => {
  // Geocoding query
  const {
    mutate: findAddresses,
    data: addresses,
    isPending: isPendingFindAddresses,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (values: InputAddressToCoords) => {
      if (!values) return null;
      const res = await backendClient.geocode.addressToCoords.$get({
        ...values,
      });

      if (!res.ok) {
        // If the response is not ok, throw an error with the response data
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

      return await res.json();
    },
    onError: (error) => {
      try {
        // Parse the error message which contains the JSON response
        const errorData = JSON.parse(error.message) as { error: string };

        // Show the specific error message from the API
        toast.error("Failed to find addresses", {
          description: errorData.error,
        });
      } catch {
        // Fallback if JSON parsing fails
        toast.error("Failed to find addresses", {
          description: "Please try again",
        });
      }
    },
  });

  // Helper function to get error message
  const getErrorMessage = (): string | null => {
    if (!isError || !error) return null;

    try {
      const errorData = JSON.parse(error.message) as { error: string };
      return errorData.error;
    } catch {
      return "Failed to find addresses";
    }
  };

  return {
    findAddresses,
    isPendingFindAddresses,
    addresses,
    hasRequestedAddresses: isSuccess || isError,
    isError,
    errorMessage: getErrorMessage(),
  };
};
