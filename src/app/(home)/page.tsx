import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Cloud } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl shadow-lg border-none bg-white/80 dark:bg-sidebar/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-4">
            Welcome to Forecast App
          </CardTitle>
          <p className="text-muted-foreground">
            Get accurate weather forecasts for any location around the world.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/weather">
              <Button className="w-full h-24 flex flex-col gap-2" size="lg">
                <Cloud className="h-8 w-8" />
                <span className="text-lg">Search Weather</span>
                <span className="text-sm text-muted-foreground">
                  Find weather for any address
                </span>
              </Button>
            </Link>

            <Link href="/history">
              <Button
                variant="outline"
                className="w-full h-24 flex flex-col gap-2"
                size="lg"
              >
                <Clock className="h-8 w-8" />
                <span className="text-lg">View History</span>
                <span className="text-sm text-muted-foreground">
                  Your recent searches
                </span>
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by National Weather Service API</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
