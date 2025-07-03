import { MotionDiv } from "@/components/ui/motion";
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
    <MotionDiv
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-4">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search for Weather
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter an address to get detailed weather information. Works best
            with US addresses.
          </p>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AddressForm
            isPendingFindAddresses={isPendingFindAddresses}
            onSubmit={onSubmit}
          />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
