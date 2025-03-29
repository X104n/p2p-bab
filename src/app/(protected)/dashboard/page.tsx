'use client';
import { removeUser } from '@/lib/session'; // Adjust the import path as necessary
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [userName, setUserName] = useState(""); // Default name, can be changed
  
  // Sample game data
  const ongoingGames = [
    { id: 1, title: "Fantasy League", players: 8, status: "Active", lastUpdated: "2 hours ago" },
    { id: 2, title: "Poker Tournament", players: 6, status: "Your turn", lastUpdated: "5 minutes ago" },
    { id: 3, title: "Chess Championship", players: 2, status: "Waiting", lastUpdated: "1 day ago" }
  ];

  // Logout function
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({ userName }),
    });
    router.refresh();
    
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Main Dashboard */}
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation Bar with Logout */}
        <div className="flex justify-between items-center mb-8">
          {/* Welcome Header - Centered */}
          <h1 className="text-3xl font-bold text-gray-800">Welcome {userName}</h1>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Main Window - Now smaller with max-width */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Ongoing Babb Games</h2>
          
          {/* Game Windows Container - Now with smaller, more square-like windows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Game Window 1 - More square-like */}
            <div className="bg-gray-50 rounded-lg shadow p-3 border border-gray-200 hover:shadow-lg transition-shadow h-48">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-blue-700">{ongoingGames[0].title}</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{ongoingGames[0].status}</span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-gray-600">Players: {ongoingGames[0].players}</p>
                <p className="text-gray-500">Last updated: {ongoingGames[0].lastUpdated}</p>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-xs">
                View Game
              </button>
            </div>
            
            {/* Game Window 2 - More square-like */}
            <div className="bg-gray-50 rounded-lg shadow p-3 border border-gray-200 hover:shadow-lg transition-shadow h-48">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-blue-700">{ongoingGames[1].title}</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">{ongoingGames[1].status}</span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-gray-600">Players: {ongoingGames[1].players}</p>
                <p className="text-gray-500">Last updated: {ongoingGames[1].lastUpdated}</p>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-xs">
                Take Your Turn
              </button>
            </div>
            
            {/* Game Window 3 - More square-like */}
            <div className="bg-gray-50 rounded-lg shadow p-3 border border-gray-200 hover:shadow-lg transition-shadow h-48">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-blue-700">{ongoingGames[2].title}</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{ongoingGames[2].status}</span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-gray-600">Players: {ongoingGames[2].players}</p>
                <p className="text-gray-500">Last updated: {ongoingGames[2].lastUpdated}</p>
              </div>
              <button className="mt-4 w-full bg-gray-400 text-white py-1 rounded hover:bg-gray-500 text-xs">
                View Game
              </button>
            </div>
          </div>
          
          {/* Create New Game Button */}
          <div className="mt-6">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium text-sm">
              Create New Babb Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;