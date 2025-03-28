'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// Main App Component
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Login Form Component
  const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
     
      // Simple validation
      if (email) {
        setIsLoggedIn(true);
        setUsername(email);
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

  // Dashboard Component remains the same
  const Dashboard: React.FC = () => {
    const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
    };

    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'thebabbgames.jpg',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-white/100 p-8 rounded-2xl shadow-2xl w-96 text-center backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {username}!</h2>
          <p className="mb-6 text-gray-600">You are now logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  // Render logic
  return (
    <div className="app">
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
};

export default App;