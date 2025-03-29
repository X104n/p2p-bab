"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  user: string;
  rankLevel?: number;
  wins?: number;
  lostMoney?: number;
}

export default function Navbar({ user, rankLevel = 5, wins = 3, lostMoney = 500 }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md py-6 px-8 h-24">
      <div className="flex justify-between items-center">
        {/* Left side - Brand and navigation */}
        <div className="flex items-center space-x-4">
          <span className="font-bold text-2xl text-black">Bable Royal</span>
          <Link href="/dashboard" className="hover:text-blue-500 text-lg text-black font-medium">
            Dashboard
          </Link>
          <Link href="/map" className="hover:text-blue-500 text-lg text-black font-medium">
            Map
          </Link>
        </div>

        {/* Center - Logout button */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium text-lg"
          >
            Give Up
          </button>
        </div>

        {/* Right side - Metrics and Profile */}
        <div className="flex items-center space-x-4">
          {/* Metrics container: rank, wins, and money displayed side by side */}
          <div className="flex items-center space-x-4">
          <span className="text-black font-medium text-sm">Your Rank {rankLevel}</span>
            <div className="flex items-center space-x-1">
              <Image 
              src="/chall_rank.png" 
              alt="Rank Icon" 
              width={50} 
              height={50} 
              className="object-contain"
              />
              <span className="text-black font-medium text-sm pl-10">Wins {wins}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image 
              src="/crown.png" 
              alt="Wins Icon" 
              width={50} 
              height={50} 
              className="object-contain"
              />
              <span className="text-black font-medium text-sm pl-10"> Cash lost 
                ${lostMoney.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-1 pr-10">
              <Image 
                src="/money.png" 
                alt="Money Icon" 
                width={50} 
                height={50} 
                className="object-contain"
              />
              
            </div>
          </div>
          <span className="text-black font-medium text-lg">Hi, {user}</span>
          <Link 
            href="/profile" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
