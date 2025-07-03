import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion";
import { CensusGeocodeAddressMatch } from "@/server/services/geocode";
import { Check, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddressResultsProps {
  addresses: CensusGeocodeAddressMatch[];
  isLoading: boolean;
}

export function AddressResults({
  addresses,

  isLoading,
}: AddressResultsProps) {
  const router = useRouter();

  const handleSelectAddress = (address: CensusGeocodeAddressMatch) => {
    // Navigate to forecast page with address parameters
    const url = `/weather/forecast?address=${encodeURIComponent(
      address.matchedAddress
    )}&lat=${address.coordinates.y}&lng=${address.coordinates.x}`;
    router.push(url);
  };

  if (isLoading) {
    return (
      <MotionDiv
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Finding addresses...
          </span>
        </div>
      </MotionDiv>
    );
  }

  if (addresses.length === 0) {
    return (
      <MotionDiv
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No addresses found. Please try a different search.
          </p>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Found {addresses.length} address{addresses.length !== 1 ? "es" : ""}
        </span>
      </div>

      {addresses.map((address, index) => (
        <MotionDiv
          key={address.matchedAddress}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelectAddress(address)}
        >
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {address.matchedAddress}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Coordinates: {address.coordinates.x.toFixed(4)},{" "}
                {address.coordinates.y.toFixed(4)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Select
            </Button>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}
