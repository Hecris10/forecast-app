import { SignUpForm } from "@/components/feature/auth/sign-up-form";
import { ForecastAppLogo } from "@/components/forecast-app-logo";
import { MotionDiv } from "@/components/ui/motion";
import Link from "next/link";

export default function SignUp() {
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
      className="z-50 min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionDiv
        className="rounded-none flex flex-col items-center justify-center w-full max-w-xl"
        variants={cardVariants}
      >
        <MotionDiv variants={itemVariants}>
          <ForecastAppLogo className="mx-auto my-4" />
        </MotionDiv>
        <MotionDiv variants={itemVariants}>
          <div className="text-lg md:text-xl font-semibold text-center">
            Sign Up
          </div>
        </MotionDiv>
        <MotionDiv variants={itemVariants}>
          <div className="text-xs md:text-sm text-muted-foreground text-center mb-2">
            Enter your information to create an account
          </div>
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="w-full">
          <SignUpForm />
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="w-full mt-4">
          <Link
            className="text-muted-foreground text-sm mx-auto text-center block"
            href="/sign-in"
          >
            <p>Already have an account? Sign in</p>
          </Link>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}
