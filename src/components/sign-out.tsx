"use client";
import { authClient } from "@/lib/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const SignOut = () => {
  const router = useRouter();
  const onSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onSignOut}
      className="flex gap-2 w-full justify-start p-2"
    >
      <LogOut />
      <span>Sign Out</span>
    </Button>
  );
};
