"use client";

import { useFindAddresses } from "@/hooks/useFindAddresses";
import { InputAddressToCoords } from "@/server";
import { AddressResults } from "./address-results";
import { ErrorDisplay } from "./error-display";
import { WeatherHeader } from "./weather-header";
import { WeatherSearch } from "./weather-search";

export function Weather() {
  const {
    findAddresses,
    isPendingFindAddresses,
    addresses,
    hasRequestedAddresses,
    isError: isErrorFindAddresses,
    errorMessage: addressErrorMessage,
  } = useFindAddresses();

  const handleAddressSearch = (values: InputAddressToCoords) => {
    findAddresses(values);
  };

  return (
    <>
      {/* Header - Always visible */}
      <WeatherHeader />

      {/* Search Form - Always visible */}
      <WeatherSearch
        isPendingFindAddresses={isPendingFindAddresses}
        onSubmit={handleAddressSearch}
      />

      {/* Error State - Address Search Error */}
      {isErrorFindAddresses && (
        <div className="mt-8">
          <ErrorDisplay
            error={
              addressErrorMessage ||
              "An error occurred while searching for addresses."
            }
          />
        </div>
      )}

      {/* Success State - Address Results Found */}
      {hasRequestedAddresses &&
        !isErrorFindAddresses &&
        addresses &&
        typeof addresses === "object" &&
        "success" in addresses &&
        addresses.success &&
        addresses.addressesList &&
        addresses.addressesList.length > 0 && (
          <div className="mt-8">
            <AddressResults
              addresses={addresses.addressesList}
              selectedAddress={null}
              isLoading={false}
            />
          </div>
        )}

      {/* No Results State - Search succeeded but no addresses found */}
      {hasRequestedAddresses &&
        !isErrorFindAddresses &&
        addresses &&
        typeof addresses === "object" &&
        "success" in addresses &&
        addresses.success &&
        addresses.addressesList &&
        addresses.addressesList.length === 0 && (
          <div className="mt-8">
            <ErrorDisplay error="No addresses found for this search. Please try a different address." />
          </div>
        )}

      {/* Initial State - No search performed yet */}
      {!hasRequestedAddresses && !isErrorFindAddresses && (
        <div className="mt-8 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Enter an address above to get started with your weather forecast.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
