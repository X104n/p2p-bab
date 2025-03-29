import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-black/40 bg-opacity-0 p-8 rounded-xl">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Bable Royal
          </h1>
          <p className="mt-4 text-lg text-gray-400">Get that bab!</p>
          <Link href="/login" className="mt-4 text-white underline">
            Log inn
          </Link>
        </div>
      </div>
    </div>
  );
}
