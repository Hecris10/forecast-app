import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignInForm } from "@/components/feature/auth/sigin-form";
import { ForecastAppLogo } from "@/components/forecast-app-logo";
import Link from "next/link";

export default function SignIn() {
  return (
    <Card className="w-screen rounded-none min-h-screen flex flex-col items-center justify-center">
      <CardHeader className="w-full max-w-xl">
        <ForecastAppLogo className="mx-auto my-4" />
        <CardTitle className="text-lg md:text-lg">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full max-w-xl">
        <SignInForm />
      </CardContent>
      <CardFooter className="w-full max-w-xl mx-auto">
        <Link
          className="text-sm text-muted-foreground text-center mx-auto"
          href="/sign-up"
        >
          <p>Don&apos;t have an account? Sign up</p>
        </Link>
      </CardFooter>
    </Card>
  );
}
