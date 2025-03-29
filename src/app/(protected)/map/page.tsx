"use client";
import { useEffect, useId, useState, useRef } from "react";
import "./style.css";

const step_size = 1000;


interface MapData {
    hate: string,
    feedback: string,
    coordinates: {x:number,y:number}
      
}

export default function Grapher() {
    const [mapdata, setMapdata] = useState<MapData>({
        hate: "",
        feedback: "Start walking!",
        coordinates:{x:50,y:50}
    });

    const [nxtUpdate, setNxtUpdate] = useState<number>(step_size * 10);
    const [globalpos, setGlobalpos] = useState<{x:number, y:number}>({x:0,y:0});
    const [show, setShow] = useState<boolean>(false);
    const [theFeedback, setTheFeedback] = useState<string>("Start walking!");
    const [positions, setPositions] = useState<{x:number,y:number}[]>([{x:50,y:50}]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const fetchMapData = async () => {
        try {
        const response = await fetch("/api/map");
        
        if (!response.ok) {
            throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log(data);
        setMapdata(() => data);
        } catch (err) {
            console.error("Error fetching map data:", err);
        } 
    };

    const updateDimensions = () => {
        if (!containerRef.current) return;

        setGlobalpos({
            x:  (mapdata.coordinates.x / 100) * containerRef.current.offsetWidth + containerRef.current.offsetLeft + 30,
            y:  (mapdata.coordinates.y / 100) * containerRef.current.offsetHeight + containerRef.current.offsetTop - 60,
        })
    };

    // Effect to update the width and height of the window
    useEffect(() => {
        fetchMapData();
        // Function to update the dimensions

        const int = setInterval(() => {
            setNxtUpdate((prev) => prev - step_size);
        }, step_size);


        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearInterval(int);
        };
    }, []);

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    useEffect(() => {
        if (nxtUpdate > 0) return;
        fetchMapData().then(() => {
            setPositions((prev) => [...prev, mapdata.coordinates]);
            setTheFeedback(prev => mapdata.feedback);
            setNxtUpdate(step_size * 10);
            updateDimensions();
            setTimeout(() => {
                setShow(() => true);
                setTimeout(() => {
                    setShow(() => false);
                }, step_size * 3);
            }, step_size );
        });
    }, [nxtUpdate])

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
                            key={`${i}-${pos.x}-${pos.y}`}
                            strokeWidth={1}
                            stroke="black"
                            x1={pos.x + "%"}
                            x2={positions[(i + 1) % positions.length].x + "%"}
                            y1={pos.y + "%"}
                            y2={positions[(i + 1) % positions.length].y + "%"}
                        ></line>
                        );
                    })}
                    {positions.map((pos,i) => (
                        <circle
                            key={`${i}l${pos.x}-${pos.y}`}
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
                left: globalpos.x + 'px', 
                top: globalpos.y + 'px'}}> {mapdata.hate} </div>       
        </div>

        <div className="header" suppressHydrationWarning>
            <p className="status_text">{theFeedback}</p>
            <p className="small_text">I’ll check again in {nxtUpdate/1000} seconds..</p>
        </div>
        </div>
    );
}
