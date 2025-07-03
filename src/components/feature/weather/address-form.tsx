import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddressForm } from "@/hooks/useAddressForm";
import { useCountries } from "@/hooks/useCountries";
import { InputAddressToCoords } from "@/server";

export default function AddressForm({
  isPendingFindAddresses,
  onSubmit,
}: {
  isPendingFindAddresses: boolean;
  onSubmit: (values: InputAddressToCoords) => void;
}) {
  const { data: countries, isLoading: isLoadingCountries } = useCountries();

  const { register, onSubmitForm, errors, setValue } = useAddressForm(onSubmit);

  return (
    <form onSubmit={onSubmitForm} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            {...register("street", {
              required: "Street address is required",
            })}
            placeholder="Street address (required)"
          />
          {errors.street && (
            <p className="text-red-500 text-xs mt-1">
              {errors.street.message as string}
            </p>
          )}
        </div>
        <div>
          <Input {...register("city")} placeholder="City (optional)" />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">
              {errors.city.message as string}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("state")}
            placeholder="State/Province/Region (optional)"
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">
              {errors.state.message as string}
            </p>
          )}
        </div>
        <div>
          <Input {...register("zip")} placeholder="Postal code (optional)" />
          {errors.zip && (
            <p className="text-red-500 text-xs mt-1">
              {errors.zip.message as string}
            </p>
          )}
        </div>

        <div>
          <Select
            disabled={isLoadingCountries}
            {...register("country", {
              required: "Country is required",
            })}
            onValueChange={(value) => {
              setValue("country", value);
            }}
          >
            <SelectTrigger
              name="country"
              className="w-full h-9 rounded-md border px-3 py-1 text-base bg-white"
            >
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(countries)
                ? countries.map((country: { name: string; code: string }) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.country.message as string}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-2"
        disabled={isPendingFindAddresses}
      >
        {isPendingFindAddresses ? "Searching..." : "Search"}
      </Button>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-1">Address Format Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Street address and country are required</li>
          <li>
            City, state/province, and postal code are optional but improve
            accuracy
          </li>
          <li>
            <strong>Best results with US addresses:</strong>{" "}
            {`"123 Main St, New
            York, NY, 10001"`}
          </li>
          <li>
            <strong>International addresses:</strong> May work but results vary
            by region
          </li>
          <li>
            {`Example: "1600 Pennsylvania Ave NW, Washington, DC, United States"`}
          </li>
          <li>{`Example: "123 Main St, Toronto, ON, Canada"`}</li>
        </ul>
      </div>
    </form>
  );
}
