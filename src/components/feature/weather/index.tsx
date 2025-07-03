"use client";

import { useFindAddresses } from "@/hooks/useFindAddresses";
import { InputAddressToCoords } from "@/server";
import { AddressResults } from "./address-results";
import { ErrorDisplay } from "./error-display";
import { LoadingSpinner } from "./loading-spinner";
import { useWeather } from "./use-weather";
import { WeatherForecast } from "./weather-forecast";
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

  const {
    selectedAddress,
    unit,
    setUnit,
    forecastData,
    isPendingForecast,
    isForecastError,
    forecastError,
    handleSelectAddress,
  } = useWeather();

  const handleAddressSearch = (values: InputAddressToCoords) => {
    findAddresses(values);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <WeatherHeader />

      <WeatherSearch
        isPendingFindAddresses={isPendingFindAddresses}
        onSubmit={handleAddressSearch}
      />

      {/* Error Display for Address Search */}
      {isErrorFindAddresses && (
        <ErrorDisplay
          message={addressErrorMessage || undefined}
          onRetry={() => {
            // Retry the last search if we have the form data
            // This would need to be implemented with form state management
          }}
          showRetry={false}
        />
      )}

      {/* Address Results */}
      {hasRequestedAddresses &&
        !isErrorFindAddresses &&
        addresses &&
        typeof addresses === "object" &&
        "success" in addresses &&
        addresses.success &&
        addresses.addressesList &&
        addresses.addressesList.length > 0 && (
          <AddressResults
            addresses={addresses.addressesList}
            selectedAddress={selectedAddress}
            onSelectAddress={handleSelectAddress}
          />
        )}

      {/* No Results - when search succeeds but no addresses found */}
      {hasRequestedAddresses &&
        !isErrorFindAddresses &&
        addresses &&
        typeof addresses === "object" &&
        "success" in addresses &&
        addresses.success &&
        addresses.addressesList &&
        addresses.addressesList.length === 0 && (
          <ErrorDisplay
            message="No addresses found for this search. Please try a different address."
            showRetry={false}
          />
        )}

      {/* Loading State for Weather Forecast */}
      {isPendingForecast && (
        <LoadingSpinner message="Loading weather forecast..." />
      )}

      {/* Error Display for Weather Forecast */}
      {isForecastError && (
        <ErrorDisplay
          message={
            forecastError instanceof Error
              ? `Failed to load weather forecast: ${forecastError.message}`
              : "Failed to load weather forecast. Please try again."
          }
          onRetry={() => {
            // Retry the weather forecast for the selected address
            if (selectedAddress) {
              handleSelectAddress(selectedAddress);
            }
          }}
        />
      )}

      {/* Weather Forecast Display */}
      {forecastData && (
        <WeatherForecast
          forecastData={forecastData}
          selectedAddress={selectedAddress}
          unit={unit}
          onUnitChange={setUnit}
        />
      )}
    </div>
  );
}
