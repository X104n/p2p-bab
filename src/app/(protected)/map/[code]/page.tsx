// src/app/(protected)/map/[code]/page.tsx
import GameMapClient from "@/components/game-map-client";

// Simplest possible server component that just passes through the code
export default function GameMapPage({ params }: { params: { code: string } }) {
  return <GameMapClient code={params.code} />;
}
