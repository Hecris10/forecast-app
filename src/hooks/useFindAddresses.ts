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
  } = useMutation({
    mutationFn: async (values: InputAddressToCoords) => {
      if (!values) return null;
      const res = await backendClient.geocode.addressToCoords.$get({
        ...values,
      });
      return await res.json();
    },
    onError: (error) => {
      toast.error("Failed to find addressess", {
        description: "Please try again",
      });
      console.error(error);
    },
  });

  return {
    findAddresses,
    isPendingFindAddresses,
    addresses,
    hasRequestedAddresses: isSuccess || isError,
  };
};
