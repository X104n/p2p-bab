// Define the Game interface
export interface Game {
    id: number;
    title: string;
    players: number; // Total number of players allowed
    currentPlayers: number; // Current number of players
    participants: string[]; // User names of participants
    status: "Open" | "Active" | "Completed" | "Your turn";
    createdBy: string;
    createdAt: string;
    lastUpdated: string;
  }
  
  // Create a simple store to hold the games
  // This is a server-side singleton that will persist between requests
  // but will reset when the server restarts (not for production use)
  export const gameStore = {
    games: [
      // Initial sample games
      {
        id: 1,
        title: "Fantasy League",
        players: 8,
        currentPlayers: 8,
        participants: ["John", "Sarah", "User3", "User4", "User5", "User6", "User7", "User8"],
        status: "Active",
        createdBy: "John",
        createdAt: "2025-03-25T12:00:00Z",
        lastUpdated: "2025-03-29T08:00:00Z",
      },
      {
        id: 2,
        title: "Poker Tournament",
        players: 6,
        currentPlayers: 4,
        participants: ["John", "Sarah", "User3", "User4"],
        status: "Your turn",
        createdBy: "Sarah",
        createdAt: "2025-03-28T14:00:00Z",
        lastUpdated: "2025-03-29T11:55:00Z",
      },
      {
        id: 3,
        title: "Chess Championship",
        players: 2,
        currentPlayers: 2,
        participants: ["John", "Sarah"],
        status: "Waiting",
        createdBy: "John",
        createdAt: "2025-03-28T08:00:00Z",
        lastUpdated: "2025-03-28T08:00:00Z",
      },
    ] as Game[],
  };