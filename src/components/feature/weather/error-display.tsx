import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  message?: string;
  fallbackMessage?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorDisplay({
  message,
  fallbackMessage = "An error occurred. Please try again.",
  onRetry,
  showRetry = true,
}: ErrorDisplayProps) {
  const displayMessage = message || fallbackMessage;

  return (
    <Card className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Error Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Oops! Something went wrong
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 max-w-md">
              {displayMessage}
            </p>
          </div>

          {/* Retry Button */}
          {showRetry && onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
