import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion";
import { Clock, Cloud } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <MotionDiv
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionDiv className="w-full max-w-2xl text-center space-y-8">
        {/* Header Section */}
        <MotionDiv className="space-y-4" variants={itemVariants}>
          <MotionDiv
            className="text-4xl font-bold text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Welcome to Forecast App
          </MotionDiv>
          <MotionDiv
            className="text-lg text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Get accurate weather forecasts for any location around the world.
          </MotionDiv>
        </MotionDiv>

        {/* Action Buttons */}
        <MotionDiv
          className="grid gap-6 md:grid-cols-2"
          variants={itemVariants}
        >
          <MotionDiv
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
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
          </MotionDiv>

          <MotionDiv
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
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
          </MotionDiv>
        </MotionDiv>

        {/* Footer */}
        <MotionDiv
          className="pt-8 border-t border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by National Weather Service API
          </p>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
