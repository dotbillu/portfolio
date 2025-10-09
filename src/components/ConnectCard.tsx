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
}: ConnectCardProps) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute p-8 rounded-3xl shadow-lg flex flex-col justify-end overflow-hidden ${className}`}
      style={motionStyle}
    >
      <div className="absolute -top-4 -right-4 text-white/10">{icon}</div>
      <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
      <p className={`mt-1 text-lg ${subTextColor}`}>{id}</p>
    </motion.a>
  );
};