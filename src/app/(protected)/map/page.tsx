"use client";
import { useEffect, useState, useRef } from "react";
import "./style.css";

const step_size = 1000;

interface MapData {
  hate: string;
  feedback: string;
  coordinates: { x: number; y: number };
}

export default function Map() {
  const [mapdata, setMapdata] = useState<MapData>({
    hate: "",
    feedback: "Start walking!",
    coordinates: { x: 50, y: 50 },
  });

  const [nxtUpdate, setNxtUpdate] = useState<number>(step_size * 10);
  const [globalpos, setGlobalpos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const [theFeedback, setTheFeedback] = useState<string>("Start walking!");
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([
    { x: 50, y: 50 },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchMapData = async () => {
    try {
      const response = await fetch("/api/map");
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setMapdata(data);
    } catch (err) {
      console.error("Error fetching map data:", err);
    }
  };

  const updateDimensions = () => {
    if (!containerRef.current) return;

    setGlobalpos({
      x:
        (mapdata.coordinates.x / 100) * containerRef.current.offsetWidth +
        containerRef.current.offsetLeft +
        30,
      y:
        (mapdata.coordinates.y / 100) * containerRef.current.offsetHeight +
        containerRef.current.offsetTop -
        60,
    });
  };

  // Effect to fetch map data and set up the interval
  useEffect(() => {
    fetchMapData();

    const int = setInterval(() => {
      setNxtUpdate((prev) => {
        if (prev <= 0) {
          clearInterval(int);
          return 0; // Prevent negative time
        }
        return prev - step_size;
      });
    }, step_size);

    const handleResize = () => updateDimensions();
    window.addEventListener("resize", handleResize);

    updateDimensions(); // Set initial dimensions

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(int);
    };
  }, []); // Empty dependency array to run once on mount

  // Effect to manage the map data updates based on the timer
  useEffect(() => {
    if (nxtUpdate > 0) return;

    fetchMapData().then(() => {
      setPositions((prev) => [...prev, mapdata.coordinates]);
      setTheFeedback(mapdata.feedback);
      setNxtUpdate(step_size * 10); // Resetting the timer
      updateDimensions();

      setShow(true);
      setTimeout(() => setShow(false), step_size * 3); // Show feedback for 3 seconds
    });
  }, [nxtUpdate, mapdata.coordinates, mapdata.feedback]);

  return (
    <div className="container">
      {/* Background Video */}
      <video
        className="absolute flex top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/jesus_dance.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="body">
        <div className="direction_container">
          <p
            style={{
              transform: "rotate(-90deg)",
              color: "white",
              fontSize: "x-large",
            }}
          >
            NORTH
          </p>
        </div>
        <div className="map_container" ref={containerRef}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {positions.map((pos, i) => {
              if (i === positions.length - 1) return null; // Skip rendering the last position's line

              return (
                <line
                  key={`${i}-${pos.x}-${pos.y}`} // Use a combination of index and coordinates as the key
                  strokeWidth={1}
                  stroke="black"
                  x1={`${pos.x}%`} // Set the starting x position
                  x2={`${positions[i + 1].x}%`} // Set the ending x position
                  y1={`${pos.y}%`} // Set the starting y position
                  y2={`${positions[i + 1].y}%`} // Set the ending y position
                />
              );
            })}

            {positions.map((pos, i) => (
              <circle
                key={`circle-${i}-${pos.x}-${pos.y}`} // Key for each circle
                fill="black"
                r={2} // Radius of the circles
                cx={`${pos.x}%`} // X position in percentage
                cy={`${pos.y}%`} // Y position in percentage
              />
            ))}

            <image
              href="/drunk.gif" // Path to your image in the public directory
              x={`${positions[positions.length - 1].x - 5}%`}
              y={`${positions[positions.length - 1].y - 5}%`}
              width="10%"
              height="10%"
            />

            <text
              x="50%"
              y="5%"
              fontSize={2}
              textAnchor="middle"
              dominantBaseline="middle"
              opacity={0.5}
            >
              [code]
            </text>
          </svg>
        </div>
        <div className="direction_container">
          <p
            style={{
              transform: "rotate(90deg)",
              color: "white",
              fontSize: "x-large",
            }}
          >
            SOUTH
          </p>
        </div>

        {show && (
          <div
            className="chat_bubble"
            style={{
              left: `${globalpos.x}px`,
              top: `${globalpos.y}px`,
            }}
          >
            {mapdata.hate}
          </div>
        )}
      </div>

      <div className="header" suppressHydrationWarning>
        <div className="status_container">
          <p className="status_text">{theFeedback}</p>
          <p className="small_text">
            I’ll check again in {nxtUpdate / 1000} seconds..
          </p>
        </div>
      </div>
    </div>
  );
}
