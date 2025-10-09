"use client";
import React from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  variant: "hero" | "island";
}

export function Navbar({ variant }: NavbarProps) {
  const links = [
    { name: "Projects", href: "#projects" },
    { name: "Connect", href: "#connect" },
  ];

  const variants = {
    hero: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    island:
      "max-w-sm mx-auto bg-white/80 backdrop-blur-lg rounded-full shadow-lg",
  };

  const linkVariants = {
    hero: "text-sm font-medium text-gray-600 hover:text-black",
    island:
      "text-sm font-medium text-gray-700 hover:text-black px-4 py-2 rounded-full hover:bg-gray-100",
  };

  return (
    <motion.div
      key={variant}
      initial={{ y: "-150%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-150%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-4 left-0 right-0 z-50`}
    >
      <div className={variants[variant]}>
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-bold text-xl text-gray-800">
            HOME
          </a>
          <div className="flex items-center space-x-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={linkVariants[variant]}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}