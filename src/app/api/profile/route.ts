// src/app/api/profile/route.ts
import { getUser } from "@/lib/session";

// Define profile data type
interface ProfileData {
  rank: string;
  rankLevel: number;
  wins: number;
  winStreak: number;
  lostMoney: number;
}

const RANKS = [
  "Rookie",
  "Contender",
  "Challenger",
  "Expert",
  "Master",
  "Champion",
  "Legend"
];

// Dummy data - would come from a database in a real app
const userProfiles: Record<string, ProfileData> = {
  // Default profile for any user not explicitly defined
  default: {
    rank: RANKS[0], // Rookie
    rankLevel: 1,
    wins: 3,
    winStreak: 0,
    lostMoney: 500
  }
};

// Add some sample profiles
userProfiles["John"] = {
  rank: RANKS[3], // Expert
  rankLevel: 4,
  wins: 24,
  winStreak: 7,
  lostMoney: 15000
};

userProfiles["Sarah"] = {
  rank: RANKS[4], // Master
  rankLevel: 5,
  wins: 42,
  winStreak: 12,
  lostMoney: 8000
};

export async function GET() {
  const user = await getUser();
  
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }
  
  // Return the user's profile data, or the default if not found
  const profileData = userProfiles[user] || userProfiles.default;
  
  return Response.json(profileData);
}