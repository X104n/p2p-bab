"use client";
import { useEffect, useId, useState, useRef } from "react";
import "./style.css";

const initial_time = 600000;
const step_size = 10;

const positions = [
  { x: 50, y: 50 },
  { x: 50, y: 10 },
  { x: 10, y: 80 },
];

export default function Grapher() {
  const [nxtUpdate, setNxtUpdate] = useState<number>(initial_time);
  const [globalX, setGlobalX] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

  // Effect to update the width and height of the window
  useEffect(() => {
        // Function to update the dimensions
        const updateDimensions = () => {
            const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
            const containerLeft = containerRef.current ? containerRef.current.offsetLeft : 0;
            setGlobalX(() => positions.length > 0  ? (positions[positions.length - 1].x / 100) * containerWidth + containerLeft + 30: 0);
        };

        const int = setInterval(() => {
            setNxtUpdate((prev) => prev - step_size);
          }, 10);

        const int2 = setInterval(() => {
            setShow(() => true);
            setTimeout(() => {
                setShow(() => false);
            }, 5000);
        }, 10000);

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearInterval(int);
            clearInterval(int2);
        };
    }, []);



  return (
    <div className="container">
      <div className="body">
        <div className="direction_container">
            <p style={{transform:'rotate(-90deg)'}}>NORTH</p>
        </div>
        <div className="map_container" ref={containerRef}>
            <svg width="100%" height="100%" viewBox="0 0 100% 100%">
                {positions.map((pos, i) => {
                    if (i == positions.length - 1) return;
                    return (
                    <line
                        key={useId()}
                        strokeWidth={1}
                        stroke="black"
                        x1={pos.x + "%"}
                        x2={positions[(i + 1) % positions.length].x + "%"}
                        y1={pos.y + "%"}
                        y2={positions[(i + 1) % positions.length].y + "%"}
                    ></line>
                    );
                })}
                {positions.map((pos) => (
                    <circle
                    key={useId()}
                    fill="black"
                    r={2}
                    cx={pos.x + "%"}
                    cy={pos.y + "%"}
                    ></circle>
                ))}
                    {<image
                        href="/drunk.gif" // Path to your image in the public directory
                        x={positions[positions.length - 1].x - 5 + "%"}
                        y={positions[positions.length - 1].y - 5 + "%"}
                        width="10%"
                        height="10%"
                    />}
            </svg>
        </div>
        <div className="direction_container">
                <p style={{transform:'rotate(90deg)'}}>SOUTH</p>
         </div>

        <div className="chat_bubble" hidden={!show} style={{
            left: globalX + 'px', 
            bottom: 35 +  positions[positions.length - 1].y * 0.1 + "%"}}> user_123 just got warmer... </div>       
      </div>

      <div className="header" suppressHydrationWarning>
        <p className="status_text">I would'nt walk in that direction...</p>
        <p className="small_text">I’ll check again in {nxtUpdate} ms</p>
      </div>
    </div>
  );
}
