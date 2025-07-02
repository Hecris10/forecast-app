import { ThermometerSnowflake } from "lucide-react";

export const ForecastAppLogo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold">
      Forecast App
      <ThermometerSnowflake className="w-6 h-6" />
    </div>
  );
};
