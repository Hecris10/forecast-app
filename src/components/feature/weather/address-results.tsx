import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { MapPin } from "lucide-react";

interface AddressResultsProps {
  addresses: CensusGeocodeAddressMatch[];
  selectedAddress: CensusGeocodeAddressMatch | null;
  onSelectAddress: (address: CensusGeocodeAddressMatch) => void;
}

export function AddressResults({
  addresses,
  selectedAddress,
  onSelectAddress,
}: AddressResultsProps) {
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
              onClick={() => onSelectAddress(address)}
            >
              {address.matchedAddress}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
