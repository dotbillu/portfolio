"use client";
import React, { useState, useEffect } from "react";
import { motion, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { Card2D } from "./Card2D";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CardData } from "./PortfolioDeck";
import { Lightbox } from "./Lightbox";
import { useFullScreen } from "../context/FullScreenContext";

interface StackingCardProps {
  card: CardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}
const crossfadeVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1},
  exit: { opacity: 1, zIndex: 1 },
};

export const StackingCard = ({
  card,
  index,
  totalCards,
  scrollYProgress,
}: StackingCardProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const { setFullScreen } = useFullScreen();

  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
    setFullScreen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setFullScreen(false);
  };

  useEffect(() => {
    const img = new Image();
    img.src = card.imgs[imgIndex];
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
  }, [imgIndex, card.imgs]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev + 1) % card.imgs.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev - 1 + card.imgs.length) % card.imgs.length);
  };

  const y = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = index - activeCardIndex;
    const offset = 45;
    return `${distance * offset}%`;
  });

  const scale = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = Math.abs(index - activeCardIndex);
    return Math.max(1 - distance * 0.1, 0.5);
  });

  const zIndex = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = Math.abs(index - activeCardIndex);
    return (totalCards - distance) + 20; 
  });

  return (
    <>
      <motion.div
        className="absolute w-full h-full flex items-center justify-center p-4 md:p-8 will-change-transform"
        style={{ zIndex, y, scale }}
      >
        <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-gray-900/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-6 md:px-12 md:py-8 h-full">
            <div className="flex flex-col justify-center items-start text-left">
              <div className="flex items-center gap-1 mb-6">
                {card.logo && (
                  <img
                    src={card.logo}
                    alt={`${card.title} logo`}
                    className="w-15 h-15 rounded-xl object-cover"
                  />
                )}
                <h2
                  className="text-4xl lg:text-5xl font-extrabold tracking-tight"
                  style={{ color: card.titleColor || "#0f172a" }}
                >
                  {card.title}
                </h2>
              </div>

              <div className="w-full">
                {Array.isArray(card.text) ? (
                  <>
                    <p className="text-lg text-slate-700 font-light leading-relaxed mb-4">
                      {card.text[0]}
                    </p>
                    {card.text.length > 1 && (
                      <ul className="space-y-3">
                        {card.text.slice(1).map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-[9px] min-w-1.5 h-1.5 rounded-full bg-slate-800 shadow-sm" />
                            <span className="text-base text-zinc-600 font-medium leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <p className="text-lg text-slate-700 font-light leading-relaxed">
                    {card.text}
                  </p>
                )}
              </div>

              {card.links && (
                <div className="mt-8 flex items-center gap-4">
                  {card.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex mt-25 items-center justify-center w-full h-full relative">
              <div className="w-full h-full relative group">

                {card.imgs.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute top-[45%] -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-slate-800 hover:bg-white transition-all scale-75 hover:scale-100 left-2"
                    >
                      <FaChevronLeft size={14} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute top-[45%] -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-slate-800 hover:bg-white transition-all scale-75 hover:scale-100 right-2"
                    >
                      <FaChevronRight size={14} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {card.imgs.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setImgIndex(idx);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${
                            idx === imgIndex
                              ? "bg-slate-900 scale-125"
                              : "bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="w-full h-full relative overflow-visible">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={imgIndex}
                      variants={crossfadeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Card2D
                        imageUrl={card.imgs[imgIndex]}
                        onClick={handleOpenLightbox}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        images={card.imgs}
        currentIndex={imgIndex}
        setIndex={setImgIndex}
      />
    </>
  );
};
