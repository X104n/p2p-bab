"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  // Define the type for profile data
  interface ProfileData {
    rank: string;
    rankLevel: number;
    wins: number;
    winStreak: number;
    lostMoney: number;
  }
  
  const [profileData, setProfileData] = useState<ProfileData>({
    rank: "",
    rankLevel: 0,
    wins: 0,
    winStreak: 0,
    lostMoney: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/profile");
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Could not load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Player Profile</h1>
        
        <div className="grid gap-6 mb-8">
          {/* Rank */}
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h2 className="text-lg text-gray-500 mb-2">Current Rank</h2>
            <div className="flex items-center">
              <div className="text-4xl font-bold text-blue-600">{profileData.rank}</div>
              <div className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                Level {profileData.rankLevel}
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wins */}
            <div className="bg-green-50 p-4 rounded-lg shadow">
              <h2 className="text-gray-500 mb-1">Total Wins</h2>
              <div className="text-3xl font-bold text-green-600">{profileData.wins}</div>
            </div>
            
            {/* Win Streak */}
            <div className="bg-yellow-50 p-4 rounded-lg shadow">
              <h2 className="text-gray-500 mb-1">Win Streak</h2>
              <div className="text-3xl font-bold text-yellow-600">{profileData.winStreak}</div>
            </div>
            
            {/* Lost Money */}
            <div className="bg-red-50 p-4 rounded-lg shadow">
              <h2 className="text-gray-500 mb-1">Lost Money</h2>
              <div className="text-3xl font-bold text-red-600">
                ${profileData.lostMoney.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          Stats last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}