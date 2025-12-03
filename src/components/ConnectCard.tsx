"use client";
import React from "react";
import { motion, MotionStyle } from "framer-motion";

interface ConnectCardProps {
  title: string;
  id: string;
  link: string;
  className: string;
  motionStyle: MotionStyle;
  icon: React.ReactNode;
  textColor?: string;
  subTextColor?: string;
  benchmark?: string[];
  iconColor?: string;
}

export const ConnectCard = ({
  title,
  id,
  link,
  className,
  motionStyle,
  icon,
  textColor = "text-gray-800",
  subTextColor = "text-gray-600",
  benchmark,
  iconColor,
}: ConnectCardProps) => {
  const isMobile = className.includes("w-full");

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isMobile ? 'relative' : 'absolute'} p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-lg flex items-center justify-between overflow-hidden ${className}`}
      style={motionStyle}
    >
      <div className="flex flex-col flex-1">
        <h3 className={`text-lg md:text-2xl font-bold ${textColor}`}>{title}</h3>
        <p className={`mt-1 text-sm md:text-lg ${subTextColor}`}>{id}</p>
      </div>
      {isMobile && benchmark && (
        <div className="flex flex-col items-end mr-3">
          {benchmark.map((line, index) => (
            <span key={index} className={`text-xs font-medium ${textColor} opacity-75 text-right leading-tight block`}>
              {line}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="w-px h-8 bg-gray-400"></div>
        <div className={iconColor || "text-current"}>
          {icon}
        </div>
      </div>
    </motion.a>
  );
};