"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-sidebar p-8">
      <Card className="w-full max-w-2xl shadow-lg border-none bg-white/80 dark:bg-sidebar/80 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <History className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl font-bold">History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-lg text-center py-8">
            No history to display yet.
            <br />
            <span className="text-sm text-gray-400">
              Your recent weather lookups will appear here.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
