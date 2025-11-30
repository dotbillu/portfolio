"use client";
import React from "react";

interface Card2DProps {
  imageUrl: string;
  onClick?: () => void;
}

export const Card2D = ({ imageUrl, onClick }: Card2DProps) => {
  return (
    <div
      className="relative aspect-square w-full cursor-pointer group will-change-transform bg-white rounded-2xl overflow-hidden flex items-center justify-center"
      onClick={onClick}
      onMouseEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "default";
      }}
      style={{
        transform: "translateZ(0)",
      }}
    >
      <img
        src={imageUrl}
        alt="Project screenshot"
        className="w-full h-full object-contain"
          style={{
            transform: "translateZ(0)",
          }}
      />
    </div>
  );
};
