// src/app/api/validate-game/route.ts
import { getUser } from "@/lib/session";
import { gameStore } from "@/lib/game-store";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Not authenticated",
        redirect: "/login",
      },
      { status: 401 },
    );
  }

  // Get the code from the URL search params
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        error: "Game code is required",
        redirect: "/dashboard",
      },
      { status: 400 },
    );
  }

  // Check if the game exists
  const game = gameStore.getGameByCode(code);
  if (!game) {
    return NextResponse.json(
      {
        error: "Game not found",
        redirect: "/dashboard?error=game-not-found",
      },
      { status: 404 },
    );
  }

  // Check if the user is a participant
  if (!game.participants.includes(user)) {
    return NextResponse.json(
      {
        error: "Not a participant",
        redirect: "/dashboard?error=not-participant",
      },
      { status: 403 },
    );
  }

  // Check if the game is active
  if (game.status !== "Active" && game.status !== "Your turn") {
    return NextResponse.json(
      {
        error: "Game not active",
        redirect: `/game?code=${code}&error=game-not-active`,
      },
      { status: 403 },
    );
  }

  // If all checks pass, return success
  return NextResponse.json({
    success: true,
    user,
    game,
  });
}
