"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    lostMoney: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Fetch profile data
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

  // Trigger slide-in animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-white">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/corndog.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Transparent Overlay Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div
          className={`bg-white/10 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-2xl transform transition-all duration-6000 ${
            showProfile
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Player Profile
          </h1>

          <div className="grid gap-6 mb-8">
            {/* Rank */}
            <div className="bg-blue-50 p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl text-gray-500 mb-3">Current Rank</h2>
                  <div className="flex items-center">
                    <div className="text-5xl font-bold text-blue-600">
                      {profileData.rank}
                    </div>
                    <div className="ml-6 px-4 py-2 bg-blue-600 text-white text-base rounded-full">
                      Level {profileData.rankLevel}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 relative w-24 h-24">
                  <Image
                    src={`/ranks/${profileData.rank.toLowerCase()}.png`}
                    alt={`${profileData.rank} rank`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/ranks/placeholder.png";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wins */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md h-40 flex flex-col justify-center">
                <h2 className="text-lg text-gray-500 mb-2">Total Wins</h2>
                <div className="text-5xl font-bold text-green-600">
                  {profileData.wins}
                </div>
              </div>

              {/* Win Streak */}
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md h-40 flex flex-col justify-center">
                <h2 className="text-lg text-gray-500 mb-2">Win Streak</h2>
                <div className="text-5xl font-bold text-yellow-600">
                  {profileData.winStreak}
                </div>
              </div>

              {/* Lost Money */}
              <div className="bg-red-50 p-6 rounded-lg shadow-md h-40 flex flex-col justify-center">
                <h2 className="text-lg text-gray-500 mb-2">Lost Money</h2>
                <div className="text-5xl font-bold text-red-600">
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
    </div>
  );
}
