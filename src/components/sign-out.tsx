"use client";
import { authClient } from "@/lib/client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export const SignOut = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => authClient.signOut()}
      className="flex gap-2 w-full justify-start p-2"
    >
      <LogOut />
      <span>Sign Out</span>
    </Button>
  );
};
