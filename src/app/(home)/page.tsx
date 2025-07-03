import { ForecastAppLogo } from "@/components/forecast-app-logo";
import { Button } from "@/components/ui/button";
import { Cloud, MapPin } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex w-full min-h-screen  flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="text-center flex flex-col gap-2 ">
          <ForecastAppLogo className="mx-auto" size="lg" />

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            Get detailed 7-day weather forecasts for any US address using the
            National Weather Service API and US Census Geocoding service.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/weather">
            <Button size="lg" className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              View Weather Forecast
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <MapPin className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>2025</p>
        </div>
      </div>
    </div>
  );
}
