import { atom } from "jotai";

// Project bubble
export const showProjectBubbleAtom = atom(false);

// Chatbot
export const chatbotOpenAtom = atom(false);
export const chatbotMessageAtom = atom<string | null>(null);

// Theme
export type Theme = "light" | "dark";
export const themeAtom = atom<Theme>("light");
