"use client";
import { removeUser } from "@/lib/session"; // Adjust the import path as necessary
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(""); // Default name, can be changed

  // Sample game data
  const ongoingGames = [
    {
      id: 1,
      title: "Fantasy League",
      players: 8,
      status: "Active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Poker Tournament",
      players: 6,
      status: "Your turn",
      lastUpdated: "5 minutes ago",
    },
    {
      id: 3,
      title: "Chess Championship",
      players: 2,
      status: "Waiting",
      lastUpdated: "1 day ago",
    },
  ];

  return (
    <div
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/alfababb.jpg')" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Ongoing Babb Games Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex justify-center pt-4">
            Ongoing Babb Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ongoingGames.map((game) => (
              <div
                key={game.id}
                className="bg-gray-50 rounded-lg shadow p-2 border border-gray-200 hover:shadow-lg transition-shadow h-32"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xs font-medium text-blue-700">
                    {game.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      game.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : game.status === "Your turn"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="text-gray-600">Players: {game.players}</p>
                  <p className="text-gray-500">
                    Last updated: {game.lastUpdated}
                  </p>
                </div>
                <button
                  className={`mt-2 w-full py-1 rounded text-xs ${
                    game.status === "Your turn"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : game.status === "Active"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-white hover:bg-gray-500"
                  }`}
                >
                  {game.status === "Your turn" ? "Take Turn" : "View"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="w-full bg-green-600 text-white py-1 rounded-lg hover:bg-green-700 font-medium text-xs">
              Create New Babb Game
            </button>
          </div>
        </div>

        {/* Available Babb Stores Section */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex justify-center pt-4">
            Available Babb Stores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Store Window 1 */}
            <div className="relative bg-gray-50 rounded-lg shadow border border-gray-200 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <img
                src="/babbis1.jpg"
                alt="Store 1"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Store Window 2 */}
            <div className="relative bg-gray-50 rounded-lg shadow border border-gray-200 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <img
                src="/babbis2.jpg"
                alt="Store 2"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Store Window 3 */}
            <div className="relative bg-gray-50 rounded-lg shadow border border-gray-200 transition-transform duration-300 hover:scale-105 overflow-hidden h-32 flex items-center justify-center">
              <img
                src="/babbis3.jpg"
                alt="Store 3"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
