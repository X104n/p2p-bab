'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useId, useState} from 'react';
import './style.css';

const initial_time = 600; //600000
const step_size = 10;

const positions = [
    {x: 50, y: 50},
    {x: 50, y: 10},
    {x: 10, y: 80},
]


export default function Grapher() {

    const [nxtUpdate, setNxtUpdate] = useState<number>(initial_time);
    const [prvUpdate, setPrvUpdate] = useState<number>(Date.now());
    const [state, setState] = useState<string>("I would'nt walk in that direction...");

    useEffect(() => {
        const int = setInterval(() => {
            setNxtUpdate((prev) => {
                if (prev - step_size <= 0) {
                    setPrvUpdate(prev => Date.now());
                    return initial_time;
                }
                return prev - step_size;
            });
        },10);

    }, [])



    return (
        <div className="container">
            <Image className='img'
                src="/map.jpeg"
                alt="A map of middle earth?"
                width={1500}
                height={1300}
            />
            <div className="header" suppressHydrationWarning>
                {prvUpdate}
                <p className='status_text'>I would'nt walk in that direction...</p>
                <p className='small_text'>I’ll check again in {nxtUpdate} ms</p>
            </div>
            <div className="body">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    
                    {positions.map((pos,i) => {
                            if (i == positions.length-1) return;
                            return <line key={useId()} strokeWidth={1} stroke='red' x1={pos.x} x2={positions[(i+1)%positions.length].x} y1={pos.y} y2={positions[(i+1)%positions.length].y} ></line>
                        })
                    }
                    {positions.map((pos) => <circle key={useId()} fill='red' r={2} cx={pos.x} cy={pos.y}></circle> )}
                </svg>
               
            </div>
            <div className="footer">
                <p className='small_text' >user_123 just got warmer...</p>
                <p className='small_text'>One of you just made an amazing deal!</p>
                <p className='small_text'>11 of you did not... hurry up!</p>
            </div>
        </div>
    );
}
