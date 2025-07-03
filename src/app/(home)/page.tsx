import { Button } from "@/components/ui/button";
import { Clock, Cloud } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Forecast App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get accurate weather forecasts for any location around the world.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/weather">
            <Button
              className="w-full h-28 flex flex-col gap-3 bg-slate-600 hover:bg-slate-700 text-white"
              size="lg"
            >
              <Cloud className="h-10 w-10" />
              <span className="text-xl font-semibold">Search Weather</span>
              <span className="text-sm opacity-90">
                Find weather for any address
              </span>
            </Button>
          </Link>

          <Link href="/history">
            <Button
              variant="outline"
              className="w-full h-28 flex flex-col gap-3 border-2 border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              size="lg"
            >
              <Clock className="h-10 w-10" />
              <span className="text-xl font-semibold">View History</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Your recent searches
              </span>
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by National Weather Service API
          </p>
        </div>
      </div>
    </div>
  );
}
