"use client";

import { useState } from "react";
 import Image from "next/image";
import { useRouter } from "next/navigation";
 
 // Login Form Component
 export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
     
      // Simple validation
      if (email) {
        console.log(email)

        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ email }),
        })

        router.refresh();
      } else {
        setError('Please enter a name');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
        <Image src="/babb_epic.jpg" alt="Logo" width={2000} height={1000} className="absolute width-100% height-100%" />
        <div className="bg-white/10 p-4 rounded-xl shadow-xl w-72 transform transition-all hover:scale-105 backdrop-blur-sm translate-y-32">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">May the babb be ever in your favor</h2>
         
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}
         
          <form onSubmit={handleLogin} className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Babb contendors name
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Finn meg en BABB!
            </button>
          </form>
        </div>
      </div>
    );
  };