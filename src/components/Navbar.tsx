"use client";
import React from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

export function Navbar() {
  const activeSection = useActiveSection();
  const navItems = [
    { name: "HOME", href: "#home", id: "home" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Connect", href: "#connect", id: "connect" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (targetId === "home") {
       window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (element) {
       const y = element.getBoundingClientRect().top + window.scrollY;
       window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-1 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 20, damping: 10, duration: 3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto overflow-hidden"
      >
        <div className="flex items-center justify-between h-16 whitespace-nowrap">
          <NavItem
            item={navItems[0]}
            handleScroll={handleScrollTo}
            isHome={true}
            isActive={activeSection === navItems[0].id}
          />
          <div className="flex items-center space-x-6">
            {navItems.slice(1).map((item) => (
              <NavItem
                key={item.name}
                item={item}
                handleScroll={handleScrollTo}
                isActive={activeSection === item.id}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavItem({ item, handleScroll, isHome, isActive }: any) {
  return (
    <motion.a
      href={item.href}
      onClick={(e) => handleScroll(e, item.href)}
      className={`relative group transition-colors duration-200 p-1 ${
        isHome ? "font-bold text-xl text-gray-800" : "text-sm font-medium text-gray-700"
      } hover:text-black`}
      initial="initial"
      whileHover="hover"
    >
      <span className="relative z-10">{item.name}</span>
      <motion.span
        animate={{ scaleX: isActive ? 1 : 0, originX: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
      />
      <motion.span
        variants={{
          initial: { scaleX: 0, originX: 0.5 },
          hover: { scaleX: isActive ? 0 : 1, originX: 0.5 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black opacity-60"
      />
    </motion.a>
  );
}
