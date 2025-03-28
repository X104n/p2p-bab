  "use client";

import { useRouter } from "next/navigation";

  
  
  // Dashboard Component remains the same
  export const Dashboard = ({ user}: { user: string}) => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            });

        router.push("/");
    }

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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user}!</h2>
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
