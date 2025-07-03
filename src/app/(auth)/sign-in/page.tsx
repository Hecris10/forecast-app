import { SignInForm } from "@/components/feature/auth/sigin-in-form";
import { ForecastAppLogo } from "@/components/forecast-app-logo";
import { MotionDiv } from "@/components/ui/motion";
import Link from "next/link";

export default function SignIn() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring" as const, bounce: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <MotionDiv
      className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionDiv
        className="rounded-none flex flex-col items-center justify-center z-50 w-full max-w-xl"
        variants={cardVariants}
      >
        <MotionDiv variants={itemVariants}>
          <ForecastAppLogo className="mx-auto my-4" />
        </MotionDiv>
        <MotionDiv variants={itemVariants}>
          <div className="text-lg md:text-lg font-semibold text-center">
            Sign In
          </div>
        </MotionDiv>
        <MotionDiv variants={itemVariants}>
          <div className="text-xs md:text-sm text-muted-foreground text-center mb-2">
            Enter your email below to login to your account
          </div>
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="w-full">
          <SignInForm />
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="w-full mt-4">
          <Link
            className="text-sm text-muted-foreground text-center mx-auto block"
            href="/sign-up"
          >
            <p>Don&apos;t have an account? Sign up</p>
          </Link>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
