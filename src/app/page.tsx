import { Button } from "@/components/ui/button";
import { Cloud, MapPin } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex-col items-center justify-center relative isolate">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Forecast App
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
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
          <p>Built with Next.js, JStack, Prisma, and ShadCN UI</p>
        </div>
      </div>
    </main>
  );
}
