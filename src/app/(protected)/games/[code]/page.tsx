"use client";

import GameDetails from "@/components/game-details";
import { useParams } from "next/navigation";

export default function GamePage() {
  // Use the useParams hook to get the code parameter
  const params = useParams();
  const code = params.code as string;
  
  return <GameDetails code={code} />;
}