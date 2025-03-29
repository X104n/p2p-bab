// src/app/api/map/route.ts
import { getUser } from "@/lib/session";
import { gameStore } from "@/lib/game-store";
import { NextResponse } from "next/server";

const HATE = [
  "user_123 just got warmer..",
  "Maybe you should give up?",
  "You're not very good at this",
  "Get that babb!",
  "You suck!",
  "Eat shit!",
  "Go home, you're drunk af",
  "I bet user_42 will get there first",
];

const FEEDBACK = [
  "Getting colder..",
  "I would'nt walk in that direction..",
  "Try the the correct direction",
  "What are you doing over here?",
  "No babb this way!",
  "Warmer..",
  "Correct direction, finally",
  "You're getting there..",
  "Keep going..",
  "Keep it going!",
];

// Seed generator based on game code
const getSeededRandom = (code: string, index: number = 0) => {
  // Simple hash function for the game code
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Add the index to get different values for different calls
  hash = hash + index;

  // Create a pseudo-random number between 0 and 1
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

const getRandomElement = (array: string[], code: string, index: number = 0) => {
  const seededRandom = getSeededRandom(code, index);
  const randomIndex = Math.floor(seededRandom * array.length);
  return array[randomIndex];
};

// Generate coordinates based on game code and time
const getGameCoordinates = (code: string, index: number = 0) => {
  const seededRandom1 = getSeededRandom(code, index);
  const seededRandom2 = getSeededRandom(code, index + 1000);

  // Generate new coordinates based on the seed
  return {
    x: Math.floor(seededRandom1 * 101),
    y: Math.floor(seededRandom2 * 101),
  };
};

// Store game-specific target coordinates
const gameTargets: Record<string, { x: number; y: number }> = {};

export async function GET(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get the code from the URL search params
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // Fallback to random data if no code provided
    return NextResponse.json({
      hate: getRandomElement(HATE, "default"),
      feedback: getRandomElement(FEEDBACK, "default"),
      coordinates: getGameCoordinates("default"),
    });
  }

  // Check if the game exists
  const game = gameStore.getGameByCode(code);
  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  // Check if the user is a participant in the game
  if (!game.participants.includes(user)) {
    return NextResponse.json(
      { error: "You are not a participant in this game" },
      { status: 403 },
    );
  }

  // Generate or get the target coordinates for this specific game
  if (!gameTargets[code]) {
    // First time this game is accessed, set a target
    gameTargets[code] = {
      x: Math.floor(getSeededRandom(code, 9999) * 101),
      y: Math.floor(getSeededRandom(code, 8888) * 101),
    };
  }

  const target = gameTargets[code];

  // Generate new coordinates based on the seed and time
  const now = Date.now();
  const newCoords = getGameCoordinates(code + user, now);

  // Calculate distance to target to determine feedback
  const distance = Math.sqrt(
    Math.pow(newCoords.x - target.x, 2) + Math.pow(newCoords.y - target.y, 2),
  );

  // Choose feedback based on distance
  let feedback;
  if (distance < 10) {
    feedback = "Very hot! You're so close!";
  } else if (distance < 20) {
    feedback = "Getting warmer! Keep going!";
  } else if (distance < 40) {
    feedback = "You're on the right track.";
  } else if (distance < 60) {
    feedback = "Keep searching, the babb is out there!";
  } else {
    feedback = "Cold... try a different direction.";
  }

  // Check if player has found the babb (very close to target)
  if (distance < 5) {
    feedback = "CONGRATULATIONS! You found the babb!";
    // Update game status in store if needed
    // This is where you could update the game status to "Completed" for this player
  }

  return NextResponse.json({
    hate: getRandomElement(HATE, code + now),
    feedback: feedback,
    coordinates: newCoords,
    // Don't send the target coordinates to the client!
  });
}
