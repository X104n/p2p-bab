import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { gameStore } from "@/lib/game-store";

// Handle POST requests for creating a new game
export async function POST(request: Request) {
  try {
    // Get the current user
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body - added error handling for JSON parsing
    let title, playerCount;
    try {
      const body = await request.json();
      title = body.title;
      playerCount = body.playerCount;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    // Validate the input
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { message: "Game title is required" },
        { status: 400 },
      );
    }

    const numberOfPlayers = Number(playerCount);
    if (isNaN(numberOfPlayers) || numberOfPlayers < 2 || numberOfPlayers > 10) {
      return NextResponse.json(
        { message: "Player count must be between 2 and 10" },
        { status: 400 },
      );
    }

    // Create a new game using our helper function
    const newGame = gameStore.createGame(title, numberOfPlayers, user);

    return NextResponse.json({
      message: "Game created successfully",
      game: newGame,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { message: "Failed to create game" },
      { status: 500 },
    );
  }
}

// Handle GET requests for fetching games
export async function GET() {
  try {
    // Get the current user
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get all games the user is participating in
    const userGames = gameStore.games.filter((game) =>
      game.participants.includes(user),
    );

    // Get other available games the user can join
    const availableGames = gameStore.games.filter(
      (game) =>
        !game.participants.includes(user) &&
        game.currentPlayers < game.players &&
        game.status === "Open",
    );

    return NextResponse.json({
      userGames,
      availableGames,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { message: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
