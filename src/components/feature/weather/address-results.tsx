import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-red-500 text-center">
            No addresses found. Please try a different search.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2 text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <span>Select an address:</span>
          </div>
          {addresses.map((address: CensusGeocodeAddressMatch) => (
            <Button
              key={address.matchedAddress}
              variant={
                selectedAddress?.matchedAddress === address.matchedAddress
                  ? "default"
                  : "outline"
              }
              className="justify-start w-full text-left"
              onClick={() => handleSelectAddress(address)}
            >
              {address.matchedAddress}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
