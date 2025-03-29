"use client";

import GameDetails from "@/components/game-details";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get the code from the query parameter
  const code = searchParams.get("code");
  
  // If no code is provided, redirect to dashboard
  useEffect(() => {
    if (!code) {
      router.push("/dashboard");
    }
  }, [code, router]);
  
  if (!code) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold text-black">No game code provided. Redirecting...</div>
      </div>
    );
  }
  
  return <GameDetails code={code} />;
}