import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./FlyingImage.css"; // Ensure you create this CSS file

interface FlyingImageProps {
  imageSrc: string; // Image source passed as a prop
}

const FlyingImage: React.FC<FlyingImageProps> = ({ imageSrc }) => {
  const [position, setPosition] = useState<{ top: string; left: string }>({
    top: "-20%", // Default starting position
    left: "-20%",
  });

  // Generate random position outside the viewport for start and end
  const generateRandomPositionOutside = () => {
    const topDown = Math.random() > 0.5;
    const reversed = Math.random() > 0.5;

    const startY = topDown
      ? reversed
        ? "-20%"
        : "120%"
      : Math.random() * 100 + "%";
    const endY = topDown
      ? reversed
        ? "120%"
        : "-20%"
      : Math.random() * 100 + "%";

    const startX = !topDown
      ? reversed
        ? "-20%"
        : "120%"
      : Math.random() * 100 + "%";
    const endX = !topDown
      ? reversed
        ? "120%"
        : "-20%"
      : Math.random() * 100 + "%";

    return { startX, startY, endX, endY };
  };

  const flyImage = () => {
    const startPosition = generateRandomPositionOutside();
    setPosition({ top: startPosition.startY, left: startPosition.startX });

    setTimeout(
      () => {
        setPosition({ top: startPosition.endY, left: startPosition.endX });
      },
      3000 + Math.random() * 1000,
    ); // Start moving after 1 second

    // Fly again after 6 seconds
    setTimeout(flyImage, 5000 + Math.random() * 3000);
  };

  useEffect(() => {
    const randomDelay = Math.random() * 2000; // Random initial delay
    const timer = setTimeout(() => {
      flyImage();
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Image
      src={imageSrc} // Replace with your image path
      alt="Flying"
      className="flying-image rotating"
      style={{
        ...position,
        transition: "top 5s ease-in-out, left 5s ease-in-out",
      }}
      width={100} // Replace with appropriate width
      height={100} // Replace with appropriate height
    />
  );
};

export default FlyingImage;
