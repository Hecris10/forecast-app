import { InputAddressToCoords } from "@/server";
import { Search } from "lucide-react";
import AddressForm from "./address-form";

interface WeatherSearchProps {
  isPendingFindAddresses: boolean;
  onSubmit: (values: InputAddressToCoords) => void;
}

export function WeatherSearch({
  isPendingFindAddresses,
  onSubmit,
}: WeatherSearchProps) {
  return (
    <section className="mb-8 p-4 space-y-4">
      <div>
        <h2 className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Address
        </h2>
        <h3>
          Enter an address to get the 7-day weather forecast. Works best with US
          addresses.
        </h3>
      </div>
      <div>
        <AddressForm
          isPendingFindAddresses={isPendingFindAddresses}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
