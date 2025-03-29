"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Overlay.css"; // Import the CSS for animations
import FlyingImage from "@/components/FlyingImage";

const Overlay = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true once the component is mounted
  }, []);

  if (!isMounted) {
    return null; // Don't render anything if not mounted or not visible
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      {/* Your animated content goes here */}
      <div className="content">
        <FlyingImage imageSrc="/drunk.gif"></FlyingImage>
        <FlyingImage imageSrc="/bab.png"></FlyingImage>
        <FlyingImage imageSrc="/drunk.gif"></FlyingImage>
        <FlyingImage imageSrc="/bab.png"></FlyingImage>
        <FlyingImage imageSrc="/drunk.gif"></FlyingImage>
        <FlyingImage imageSrc="/bab.png"></FlyingImage>
        <FlyingImage imageSrc="/drunk.gif"></FlyingImage>
        <FlyingImage imageSrc="/bab.png"></FlyingImage>
        <FlyingImage imageSrc="/drunk.gif"></FlyingImage>
        <FlyingImage imageSrc="/bab.png"></FlyingImage>
      </div>
    </div>,
    document.body, // Use the body element as the portal destination
  );
};

export default Overlay;
