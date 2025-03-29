"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/lib/game-store";

export default function Dashboard() {
  const router = useRouter();
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch games from our API
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/games");

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setUserGames(data.userGames);
        setAvailableGames(data.availableGames);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Could not load games");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleJoinGame = async (gameId: number) => {
    try {
      const response = await fetch(`/api/games/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId }),
      });

      if (!response.ok) {
        throw new Error("Failed to join game");
      }

      // Refresh the page to show updated games
      router.refresh();
    } catch (error) {
      console.error("Error joining game:", error);
      alert("Failed to join game");
    }
  };

  // Helper function to determine button text based on game status
  const getButtonText = (status: string) => {
    switch (status) {
      case "Your turn":
        return "Play Now";
      case "Active":
        return "Play Now";
      case "Waiting":
      case "Open":
        return "View";
      default:
        return "View";
    }
  };

  // Helper function to format the time "X time ago"
  const formatLastUpdated = (lastUpdatedStr: string) => {
    const lastUpdated = new Date(lastUpdatedStr);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - lastUpdated.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div
      className="min-h-screen p-4 bg-cover bg-top"
      style={{ backgroundImage: "url('/alfababb.jpg')" }}
    >
      <div className="max-w-4xl mx-auto mt-50">
        {/* Your Babb Lobbies Section */}
        <div className="bg-white/70 rounded-lg shadow-md p-4 mb-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-black flex justify-center pt-4">
            Your Babb Lobbies
          </h2>

          {loading ? (
            <p className="text-center py-4 text-black">Loading games...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-4">{error}</p>
          ) : userGames.length === 0 ? (
            <p className="text-center py-4 text-black">
              You are not part of any games yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {userGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white/70 rounded-lg shadow p-2 border border-gray-600 hover:shadow-lg transition-shadow h-32"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-medium text-blue-400">
                      {game.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        game.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : game.status === "Your turn"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-black"
                      }`}
                    >
                      {game.status}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="text-black">
                      Code: <span className="font-bold">{game.code}</span>
                    </p>
                    <p className="text-black">
                      Players: {game.currentPlayers}/{game.players}
                    </p>
                    <p className="text-black">
                      Last updated: {formatLastUpdated(game.lastUpdated)}
                    </p>
                  </div>
                  <Link
                    href={`/game?code=${game.code}`}
                    className={`mt-2 block w-full py-1 rounded text-xs text-center ${
                      game.status === "Your turn" || game.status === "Active"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-white hover:bg-gray-500"
                    }`}
                  >
                    {getButtonText(game.status)}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/create-game"
              className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium text-sm text-center"
            >
              Create New Babb Game
            </Link>
          </div>
        </div>

        {/* Available Babb Lobbies Section */}
        <div className="bg-white/70 bg-opacity-20 rounded-lg shadow-md p-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-black flex justify-center pt-4">
            Available Babb Lobbies
          </h2>

          {loading ? (
            <p className="text-center py-4 text-black">
              Loading available games...
            </p>
          ) : availableGames.length === 0 ? (
            <p className="text-center py-4 text-black">
              No available games to join at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {availableGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-black rounded-lg shadow p-2 border border-gray-600 hover:shadow-lg transition-shadow h-36"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-medium text-blue-400">
                      {game.title}
                    </h3>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                      Open
                    </span>
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="text-white">
                      Code: <span className="font-bold">{game.code}</span>
                    </p>
                    <p className="text-white">
                      Players: {game.currentPlayers}/{game.players}
                    </p>
                    <p className="text-white">Created by: {game.createdBy}</p>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Link
                      href={`/game?code=${game.code}`}
                      className="flex-1 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleJoinGame(game.id)}
                      className="flex-1 py-1 rounded text-xs bg-green-600 text-white hover:bg-green-700"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Store images section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Store Window 1 */}
            <div className="relative bg-black bg-opacity-20 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <Image
                src="/babbis1.jpg"
                alt="Store 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Store Window 2 */}
            <div className="relative bg-black bg-opacity-20 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <Image
                src="/babbis2.jpg"
                alt="Store 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Store Window 3 */}
            <div className="relative bg-black bg-opacity-20 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <Image
                src="/babbis3.jpg"
                alt="Store 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
