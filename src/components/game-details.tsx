"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/lib/game-store";

interface GameDetailsProps {
  code: string;
}

interface GameResponse {
  game: Game;
  isParticipant: boolean;
}

export default function GameDetails({ code }: GameDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GameResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/game-details?code=${code}`);
        
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Game not found"
              : "Failed to load game details"
          );
        }
        
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error("Error fetching game:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    if (code) {
      fetchGameDetails();
    }
  }, [code]);

  const handleJoinGame = async () => {
    if (!data?.game) return;
    
    try {
      const response = await fetch("/api/games/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId: data.game.id }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join game");
      }
      
      // Refresh the page to show updated game status
      window.location.reload();
    } catch (err) {
      console.error("Error joining game:", err);
      alert(err instanceof Error ? err.message : "Failed to join game");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold text-black">Loading game...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-2xl font-bold text-red-600 mb-4">{error}</div>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (!data || !data.game) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold text-black">Game not found</div>
      </div>
    );
  }

  const { game, isParticipant } = data;

  return (
    <div className="min-h-screen p-8 bg-cover bg-center" style={{ backgroundImage: "url('/alfababb.jpg')" }}>
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">{game.title}</h1>
          <p className="text-lg text-black">Game Code: <span className="font-bold">{game.code}</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3 text-black">Game Status</h2>
            <div className="space-y-2 text-black">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span 
                  className={`px-2 py-1 rounded-full text-sm ${
                    game.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : game.status === "Your turn" 
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {game.status}
                </span>
              </p>
              <p><span className="font-medium">Players:</span> {game.currentPlayers}/{game.players}</p>
              <p><span className="font-medium">Created by:</span> {game.createdBy}</p>
              <p><span className="font-medium">Created at:</span> {new Date(game.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Last activity:</span> {new Date(game.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3 text-black">Players</h2>
            <ul className="space-y-2 text-black">
              {game.participants.map((player, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium">{player}</span>
                  {player === game.createdBy && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Host
                    </span>
                  )}
                </li>
              ))}
              
              {Array.from({ length: game.players - game.currentPlayers }).map((_, index) => (
                <li key={`empty-${index}`} className="flex items-center opacity-50">
                  <span className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center mr-3 text-sm">
                    {game.currentPlayers + index + 1}
                  </span>
                  <span className="font-medium">Waiting for player...</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Return to Dashboard
          </button>
          
          {!isParticipant && game.currentPlayers < game.players && (
            <button
              onClick={handleJoinGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Join Game
            </button>
          )}
          
          {isParticipant && game.status === "Active" && (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Play Game
            </button>
          )}
          
          {isParticipant && game.status === "Your turn" && (
            <button
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Take Your Turn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}