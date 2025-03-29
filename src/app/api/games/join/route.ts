import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { gameStore } from "@/lib/game-store";

export async function POST(request: Request) {
  try {
    // Get the current user
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    let gameId;
    try {
      const body = await request.json();
      gameId = body.gameId;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    if (!gameId) {
      return NextResponse.json(
        { message: "Game ID is required" },
        { status: 400 },
      );
    }

    // Find the game
    const gameIndex = gameStore.games.findIndex((g) => g.id === gameId);

    if (gameIndex === -1) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    const game = gameStore.games[gameIndex];

    // Check if the user is already in the game
    if (game.participants.includes(user)) {
      return NextResponse.json(
        { message: "You are already part of this game" },
        { status: 400 },
      );
    }

    // Check if the game is full
    if (game.currentPlayers >= game.players) {
      return NextResponse.json({ message: "Game is full" }, { status: 400 });
    }

    // Add the user to the game
    game.participants.push(user);
    game.currentPlayers += 1;
    game.lastUpdated = new Date().toISOString();

    // Update the game status if it's now full
    if (game.currentPlayers === game.players) {
      game.status = "Active";
    }

    // Update the game in the store
    gameStore.games[gameIndex] = game;

    return NextResponse.json({ message: "Joined game successfully", game });
  } catch (error) {
    console.error("Error joining game:", error);
    return NextResponse.json(
      { message: "Failed to join game" },
      { status: 500 },
    );
  }
}
