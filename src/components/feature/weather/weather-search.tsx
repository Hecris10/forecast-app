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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <Search className="h-5 w-5" />
            Search Address
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter an address to get the 7-day weather forecast. Works best with
            US addresses.
          </p>
        </div>
        <div>
          <AddressForm
            isPendingFindAddresses={isPendingFindAddresses}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
