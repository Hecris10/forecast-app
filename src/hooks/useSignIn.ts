import { authClient } from "@/lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);

      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          callbackURL: "/",
          onRequest: () => {
            setLoading(true);
          },
          onResponse: (ctx) => {
            if (ctx.response.ok) {
              router.push("/");
              return;
            }
            setLoading(false);
          },
          onError: (error) => {
            if (error.response.status === 401) {
              form.setError("password", {
                message: "Invalid email or password",
              });
              return;
            }
            toast.error("An error occurred while signing in");
          },
        }
      );
    } catch (error) {
      setLoading(false);
      console.error("Sign-in error:", error);
    }
  };

  return {
    form,
    loading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
