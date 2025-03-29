"use client";

import GameMapClient from "@/components/game-map-client";
import { useParams } from "next/navigation";

export default function GameMapPage() {
  // Use the useParams hook to get the code parameter
  const params = useParams();
  const code = params.code as string;

  return <GameMapClient code={code} />;
}
