import { Button } from "@/components/ui/button";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddressResultsProps {
  addresses: CensusGeocodeAddressMatch[];
  selectedAddress: CensusGeocodeAddressMatch | null;
}

export function AddressResults({
  addresses,
  selectedAddress,
}: AddressResultsProps) {
  const router = useRouter();

  const handleSelectAddress = (address: CensusGeocodeAddressMatch) => {
    // Navigate to forecast page with address parameters
    const url = `/weather/forecast?address=${encodeURIComponent(
      address.matchedAddress
    )}&lat=${address.coordinates.y}&lng=${address.coordinates.x}`;
    router.push(url);
  };

  if (!addresses || addresses.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <p className="text-red-500 text-center">
          No addresses found. Please try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium">
            Select an address:
          </span>
        </div>
        <div className="space-y-2">
          {addresses.map((address: CensusGeocodeAddressMatch) => (
            <Button
              key={address.matchedAddress}
              variant={
                selectedAddress?.matchedAddress === address.matchedAddress
                  ? "default"
                  : "outline"
              }
              className="justify-start w-full text-left h-auto py-3 px-4"
              onClick={() => handleSelectAddress(address)}
            >
              {address.matchedAddress}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
