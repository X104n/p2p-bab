export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#0a192f] to-[#0a192f]">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome to Bable Royal
        </h1>
        <p className="mt-4 text-lg text-gray-400">Get that bab!</p>
        <a href="/login">
          <div>Click here to login</div>
        </a>
      </div>
    </div>
  );
}
