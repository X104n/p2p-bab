"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGame() {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [title, setTitle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || title.trim() === "") {
      setError("Please enter a game title");
      return;
    }

    if (playerCount < 2 || playerCount > 10) {
      setError("Player count must be between 2 and 10");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Log the data being sent
      console.log("Sending data:", { title, playerCount });

      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          playerCount
        }),
      });

      // Log the response status
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        
        let errorMessage = "Failed to create game";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        
        throw new Error(errorMessage);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-cover bg-center" style={{ backgroundImage: "url('/alfababb.jpg')" }}>
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-semibold mb-6 text-center text-black">Create New Bab Game</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-medium mb-2" htmlFor="title">
              Game Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your game title"
              required
            />
          </div>
          
          <div>
            <label className="block text-black font-medium mb-2" htmlFor="playerCount">
              Number of Players (2-10)
            </label>
            <input
              id="playerCount"
              type="number"
              min="2"
              max="10"
              value={playerCount}
              onChange={(e) => setPlayerCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Game"}
          </button>
          
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full bg-gray-300 text-black py-2 rounded-lg font-medium text-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}