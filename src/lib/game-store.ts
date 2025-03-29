// Define the Game interface
export interface Game {
  id: number;
  code: string;
  title: string;
  players: number; // Total number of players allowed
  currentPlayers: number; // Current number of players
  participants: string[]; // User names of participants
  status: "Open" | "Active" | "Completed" | "Your turn";
  createdBy: string;
  createdAt: string;
  lastUpdated: string;
}

// Helper to generate a unique game code
const generateGameCode = (id: number): string => {
  // Convert the ID to a string and take the first 4 characters
  // If the ID is short, we pad it with random letters
  const idStr = id.toString();

  // Generate random characters if needed
  const generateRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  let code = "";
  for (let i = 0; i < 4; i++) {
    if (i < idStr.length) {
      code += idStr[i];
    } else {
      code += generateRandomChar();
    }
  }

  // Add a prefix to make it look nicer
  return `BAB-${code.toUpperCase()}`;
};

// Create a simple store to hold the games
// This is a server-side singleton that will persist between requests
// but will reset when the server restarts (not for production use)
export const gameStore = {
  games: [
    // Initial sample games
    {
      id: 1,
      code: "BAB-1ABC",
      title: "Fantasy League",
      players: 8,
      currentPlayers: 8,
      participants: [
        "John",
        "Sarah",
        "User3",
        "User4",
        "User5",
        "User6",
        "User7",
        "User8",
      ],
      status: "Active",
      createdBy: "John",
      createdAt: "2025-03-25T12:00:00Z",
      lastUpdated: "2025-03-29T08:00:00Z",
    },
    {
      id: 2,
      code: "BAB-2DEF",
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
      code: "BAB-3GHI",
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

  // Helper function to create a new game
  createGame(title: string, playerCount: number, creator: string): Game {
    const id = Date.now();
    const game: Game = {
      id,
      code: generateGameCode(id),
      title,
      players: playerCount,
      currentPlayers: 1,
      participants: [creator],
      status: "Open",
      createdBy: creator,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    this.games.push(game);
    return game;
  },

  // Helper function to get a game by ID
  getGameById(id: number): Game | undefined {
    return this.games.find((game) => game.id === id);
  },

  // Helper function to get a game by code
  getGameByCode(code: string): Game | undefined {
    return this.games.find((game) => game.code === code);
  },
};
