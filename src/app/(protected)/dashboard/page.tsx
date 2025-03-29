'use client';
import { removeUser } from '@/lib/session'; // Adjust the import path as necessary
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(""); // Default name, can be changed
  
  // Sample game data with one removed (only two games now)
  const ongoingGames = [
    { id: 1, title: "Fantasy League", players: 8, status: "Active", lastUpdated: "2 hours ago" },
    { id: 2, title: "Poker Tournament", players: 6, status: "Your turn", lastUpdated: "5 minutes ago" }
  ];

  return (
    <div 
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/alfababb.jpg')" }}
    >
      <div className="max-w-4xl mx-auto mt-20">
        {/* Ongoing Babb Games Section */}
        <div className="bg-black bg-opacity-60 rounded-lg shadow-md p-4 mb-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-white flex justify-center pt-4">
            Ongoing Babb Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ongoingGames.map((game) => (
              <div
                key={game.id}
                className="bg-black bg-opacity-60 rounded-lg shadow p-2 border border-gray-600 hover:shadow-lg transition-shadow h-40"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xs font-medium text-blue-400">{game.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      game.status === "Active"
                        ? "bg-green-600 text-green-200"
                        : game.status === "Your turn"
                        ? "bg-yellow-600 text-yellow-200"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="text-gray-300">Players: {game.players}</p>
                  <p className="text-gray-400">Last updated: {game.lastUpdated}</p>
                </div>
                <button
                  className={`mt-2 w-full py-1 rounded text-xs ${
                    game.status === "Your turn"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : game.status === "Active"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  {game.status === "Your turn" ? "Take Turn" : "View"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Available Babb Lobbies Section */}
        <div className="bg-black bg-opacity-60 rounded-lg shadow-md p-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-white flex justify-center pt-4">
            Available Babb Lobbies
          </h2>
          {/* Added extra bottom margin to the button container */}
          <div className="mt-4 mb-4">
            <button className="w-full bg-green-600 p-4 text-white py-1 rounded-lg hover:bg-green-700 font-medium text-xs">
              Create New Babb Lobby
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Lobby Window 1 */}
            <div className="relative bg-black bg-opacity-60 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-40 flex items-center justify-center">
              <img
                src="/babbis1.jpg"
                alt="Lobby 1"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Lobby Window 2 */}
            <div className="relative bg-black bg-opacity-60 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-40 flex items-center justify-center">
              <img
                src="/babbis2.jpg"
                alt="Lobby 2"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Lobby Window 3 */}
            <div className="relative bg-black bg-opacity-60 rounded-lg shadow border border-gray-600 transition-transform duration-300 hover:scale-105 overflow-hidden h-40 flex items-center justify-center">
              <img
                src="/babbis3.jpg"
                alt="Lobby 3"
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
