import { addressSchema } from "@/lib/schemas";
import { InputAddressToCoords } from "@/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAddressForm = (
  onSubmit: (values: InputAddressToCoords) => void
) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InputAddressToCoords>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const onSubmitForm = handleSubmit(async (values) => {
    onSubmit(values);
  });

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmitForm,
  };
};
