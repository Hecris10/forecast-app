import { Weather } from "@/components/feature/weather";

export default function WeatherPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl">
        <Weather />
      </div>
    </div>
  );
}
