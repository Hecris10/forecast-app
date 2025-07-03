import { cn } from "@/lib/utils";
import { ThermometerSnowflake } from "lucide-react";

export const ForecastAppLogo = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <div
      className={cn("flex items-center gap-2 text-2xl font-bold", className)}
    >
      <h1
        className={cn(
          "text-4xl font-bold text-gray-900 dark:text-gray-50 my-auto",
          size === "sm" && "text-2xl",
          size === "md" && "text-4xl",
          size === "lg" && "text-6xl"
        )}
      >
        Forecast App
      </h1>
      <ThermometerSnowflake
        className={cn(
          "w-6 h-6 my-auto animate-pulse",
          size === "sm" && "w-4 h-4",
          size === "md" && "w-6 h-6",
          size === "lg" && "w-12 h-12"
        )}
      />
    </div>
  );
};
