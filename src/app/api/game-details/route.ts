import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { gameStore } from "@/lib/game-store";

// GET /api/game-details?code=BAB-1234
export async function GET(request: Request) {
  try {
    // Get the current user
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // Get the code from the URL search params
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json({ message: "Game code is required" }, { status: 400 });
    }
    
    // Find the game
    const game = gameStore.getGameByCode(code);
    
    if (!game) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }
    
    // Check if user is a participant
    const isParticipant = game.participants.includes(user);
    
    // Return game details along with participation status
    return NextResponse.json({
      game,
      isParticipant
    });
  } catch (error) {
    console.error("Error fetching game:", error);
    return NextResponse.json({ message: "Failed to fetch game" }, { status: 500 });
  }
}