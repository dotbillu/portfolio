"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { chatbotOpenAtom, chatbotMessageAtom } from "../atoms/chatbotAtom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  isFullScreen?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isFullScreen = false }) => {
  const [isOpen, setIsOpen] = useAtom(chatbotOpenAtom);
  const [triggerMessage, setTriggerMessage] = useAtom(chatbotMessageAtom);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const [showContactTooltip, setShowContactTooltip] = useState(false);
  const [isCollectingEmail, setIsCollectingEmail] = useState(false);
  const [isCollectingExplanation, setIsCollectingExplanation] = useState(false);
  const [collectedEmail, setCollectedEmail] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (text: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  useEffect(() => {
    if (isOpen && triggerMessage) {
      addMessage(triggerMessage, "bot");
      setTriggerMessage(null);
    }
  }, [isOpen, triggerMessage, setTriggerMessage]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = "Hey, welcome to my website!\n\nI'm Abhay, a software engineer.\n\nAsk about me or contact me!";
      addMessage(welcomeMessage, "bot");
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const connectSection = document.getElementById('connect');
      if (connectSection) {
        const rect = connectSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !isOpen) {
          setShowContactTooltip(true);
        } else {
          setShowContactTooltip(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleContactTooltipClick = () => {
    setIsOpen(true);
    setShowContactTooltip(false);
    const emailMessage = "Email is abhaayjha@gmail.com, but you can just mention your email here and I will attend to you ASAP.";
    setTriggerMessage(emailMessage);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    addMessage(userMessage, "user");

    if (isCollectingExplanation) {
      setIsTyping(true);
      setTimeout(() => {
        handleExplanationSubmit(userMessage);
        setIsTyping(false);
      }, 500);
      return;
    }

    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage.toLowerCase());
      addMessage(response, "bot");
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateResponse = (message: string): string => {
    const msg = message.toLowerCase();

    if (msg.includes("contact") || msg.includes("email") || msg.includes("reach") || msg.includes("connect") ||
        msg.includes("get in touch") || msg.includes("message") || msg.includes("talk to")) {
      setIsCollectingEmail(true);
      return "I'd be happy to help you connect with Abhay! Could you please share your email address so he can reach out to you?";
    }
    if ((msg.includes("how") && msg.includes("abhay")) || msg.includes("how is abhay") || msg.includes("how's abhay")) {
      const responses = [
        "Abhay is doing great! He's passionate about building software that solves real problems and is always excited to work on new challenges.",
        "Abhay is fantastic! He's currently focused on creating innovative web applications and loves exploring new technologies.",
        "Abhay is doing well and staying productive. He's always learning new things and working on projects that matter to him."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("what does abhay do") || (msg.includes("what") && msg.includes("do") && msg.includes("abhay"))) {
      const responses = [
        "Abhay is a software engineer who specializes in building full-stack web applications. He creates everything from social platforms to developer tools, with a focus on clean code and great user experiences.",
        "Abhay develops web applications and tools that solve real-world problems. From collaborative platforms to productivity tools, he enjoys crafting software that makes a difference.",
        "As a software engineer, Abhay builds modern web applications using cutting-edge technologies. He's passionate about creating solutions that are both technically sound and user-friendly."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("experience") || msg.includes("background") || msg.includes("work history")) {
      return "Abhay has solid experience in software development, having built multiple production-ready applications. He's currently open to work and would love to book an interview to discuss opportunities! He's particularly experienced in React, Next.js, Node.js, and various other technologies.";
    }

    if (msg.includes("open to work") || msg.includes("looking for job") || msg.includes("hiring") || msg.includes("available")) {
      return "Yes! Abhay is currently open to work and actively looking for exciting opportunities. He would love to book an interview to discuss how he can contribute to your team. Would you like me to help you get in touch with him?";
    }

    if (msg.includes("interview") || msg.includes("schedule") || msg.includes("meet")) {
      return "Absolutely! Abhay would be thrilled to schedule an interview. He has experience in full-stack development and is eager to discuss opportunities. Would you like to share your contact information so he can reach out to arrange a time?";
    }

    if ((msg.includes("who") && msg.includes("abhay")) || msg.includes("tell me about abhay") || msg.includes("about abhay")) {
      const responses = [
        "Abhay is a passionate software engineer who focuses on building projects that actually matter. He's skilled in full-stack development with expertise in React, Next.js, Node.js, and various other technologies. He's currently working on innovative projects in web development and enjoys solving complex problems.",
        "Meet Abhay - a dedicated software engineer who believes in creating software that makes a real impact. With strong skills in modern web technologies and a passion for clean, efficient code, he's always excited to take on new challenges.",
        "Abhay is a software engineer who loves building things that matter. He specializes in creating full-stack web applications and has experience with everything from social platforms to developer productivity tools. He's always learning and growing as a developer."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("skills") || msg.includes("technologies") || msg.includes("tech stack") || msg.includes("expertise")) {
      const responses = [
        "Abhay specializes in: Frontend (React, Next.js, TypeScript, Tailwind CSS), Backend (Node.js, Express.js, PostgreSQL, MongoDB), Languages (JavaScript, TypeScript, C++, Rust, Lua), and Tools (Git, Docker, Neovim, Arch Linux). He also has experience with Web3 development using Solana.",
        "Abhay's tech stack includes modern web technologies: React/Next.js for frontend, Node.js/Express for backend, databases like PostgreSQL and MongoDB, and languages including TypeScript, C++, and Rust. He's also proficient with development tools and Linux environments.",
        "Abhay is proficient in: React, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, MongoDB, Tailwind CSS, Framer Motion, and various other modern web technologies. He also has experience with systems programming in C++ and Rust."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (msg.includes("frontend") || msg.includes("ui") || msg.includes("interface")) {
      return "Abhay excels at frontend development! He builds beautiful, responsive user interfaces using React, Next.js, TypeScript, and Tailwind CSS. He also loves creating smooth animations with Framer Motion and has experience with 3D graphics using React Three Fiber.";
    }

    if (msg.includes("backend") || msg.includes("server") || msg.includes("api")) {
      return "On the backend, Abhay works with Node.js and Express.js to build robust APIs. He has experience with databases including PostgreSQL and MongoDB, and knows how to create efficient, scalable server-side applications.";
    }

    if (msg.includes("full stack") || msg.includes("fullstack")) {
      return "Yes, Abhay is a full-stack developer! He can handle everything from beautiful user interfaces to robust backend systems. He loves the challenge of building complete applications end-to-end.";
    }

    if ((msg.includes("what") && msg.includes("projects")) || msg.includes("his projects") || msg.includes("portfolio")) {
      return "Abhay has worked on several exciting projects! Here they are:\n\n1) **Slyme** - Hyperlocal social platform with geolocation-based community rooms\n2) **Scrib-Draw** - Real-time collaborative whiteboard for system design\n3) **Caelivisio** - Astronomical dashboard monitoring Near-Earth Objects\n4) **KeyBlast** - CLI typing trainer for developers\n\nWould you like me to elaborate on any of these projects? Just let me know which one interests you!";
    }

    if (msg.includes("how good") || msg.includes("quality") || msg.includes("level") || msg.includes("skill level")) {
      return "Abhay is a highly skilled developer who consistently delivers high-quality work. His projects demonstrate strong technical expertise, clean code practices, and attention to user experience. He's received positive feedback from users and has built production-ready applications that handle real-world use cases.";
    }

    if (msg.includes("best project") || msg.includes("favorite project")) {
      return "That's tough to pick just one! Abhay is particularly proud of Slyme for its innovative approach to community building and Scrib-Draw for its technical complexity. But he loves all his projects equally. Which one would you like to hear more about?";
    }

    if (msg.includes("slyme") && !msg.includes("elaborate")) {
      return "Slyme is Abhay's flagship project - a hyperlocal social platform that gamifies community action through geolocation-based 'Rooms' and shared feeds. It includes a marketplace for local tasks and uses real-time geospatial technology. Built with Next.js, Tailwind, Jotai, and a Node.js backend with WebSockets. Would you like me to elaborate on any specific aspect of Slyme?";
    }

    if (msg.includes("scrib") || msg.includes("draw") && !msg.includes("elaborate")) {
      return "Scrib-Draw is a real-time collaborative whiteboard for system design diagrams and brainstorming. It features vector tools, WebSocket synchronization, and complex canvas interactions using Konva.js. Built with Next.js, React, Tailwind, and Socket.io. Would you like me to elaborate on the technical implementation or features?";
    }

    if (msg.includes("caelivisio") && !msg.includes("elaborate")) {
      return "Caelivisio is an astronomical dashboard that monitors Near-Earth Objects (NEOs) using NASA's API. It visualizes asteroid data, flags potentially hazardous objects, and provides accessible celestial information. Built with Next.js and efficient API routes. Would you like me to elaborate on the data visualization or NASA API integration?";
    }

    if (msg.includes("keyblast") && !msg.includes("elaborate")) {
      return "KeyBlast is a high-performance CLI typing trainer for developers, built in pure Bash/Zsh. It offers multiple training modes including JavaScript and C++ drills, with real-time WPM tracking and accuracy measurement. Would you like me to elaborate on the performance optimizations or training features?";
    }

    if (msg.includes("elaborate") || msg.includes("more about") || msg.includes("tell me more") || msg.includes("explain")) {
      if (msg.includes("slyme")) {
        return "Slyme is incredibly innovative! It's a location-based social platform where users can create and join 'Rooms' based on their geographic location. The app gamifies community participation with points and badges, and includes a gig marketplace for local tasks. Technically, it uses advanced geolocation APIs, WebSocket connections for real-time updates, and has a sophisticated matching algorithm for connecting people in the same area. The frontend is built with Next.js and features beautiful animations, while the backend handles real-time geospatial queries efficiently.";
      }
      if (msg.includes("scrib") || msg.includes("draw")) {
        return "Scrib-Draw is technically impressive! It features a custom canvas implementation using Konva.js that supports vector graphics, layers, and complex object manipulation. The real-time collaboration is powered by Socket.io with operational transforms to handle concurrent edits smoothly. It includes advanced features like object snapping, multiple export formats, and undo/redo functionality. The UI is built with React and features a modern design that doesn't compromise on functionality.";
      }
      if (msg.includes("caelivisio")) {
        return "Caelivisio integrates with NASA's NeoWs API to fetch real-time asteroid data. It processes velocity, diameter, and miss distance information to classify potentially hazardous objects using NASA's collision probability algorithms. The visualization uses D3.js-inspired charts with a space-themed dark mode interface. It includes features like date range filtering, search functionality, and detailed object information displays. The app handles API rate limiting and caching for optimal performance.";
      }
      if (msg.includes("keyblast")) {
        return "KeyBlast is a masterpiece of shell scripting! Written entirely in Bash/Zsh without any external dependencies, it achieves impressive performance through Unix pipe optimization and efficient text processing. It features multiple training modes (vocabulary, language-specific drills), real-time WPM calculation using bc for precision, and ANSI escape codes for rich terminal UI. The app uses nerd fonts for special characters and includes accuracy tracking, progress saving, and customizable difficulty levels.";
      }
    }

    if (msg.includes("github") || msg.includes("linkedin") || msg.includes("leetcode") || msg.includes("twitter") ||
        msg.includes("social") || msg.includes("profiles") || msg.includes("handles")) {
      return "You can find Abhay on: GitHub (@dotbillu), LinkedIn (Abhay Jha), LeetCode (@notbillu - 250+ problems solved), Codeforces (@notbillu - Expert rating 1600+), Twitter (@notbillu), Hashnode (@notbillu), and Chess.com (@sinnofwrath). His Discord is @aubama420.";
    }

    if (msg.includes("coding") || msg.includes("competitive") || msg.includes("contest")) {
      return "Abhay is quite active in competitive programming! He has an Expert rating on Codeforces (1600+) and has solved over 250 problems on LeetCode. He enjoys algorithmic challenges and regularly participates in coding contests to keep his problem-solving skills sharp.";
    }

    if (msg.includes("how are you") || msg.includes("how are u") || (msg.includes("how") && msg.includes("are"))) {
      return "Thanks for asking, I'm fine. You need help with something?";
    }

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings")) {
      const greetings = [
        "Hello! I'm dotbillu Assistant. I can tell you about Abhay's background, skills, projects, or help you get in touch with him. What would you like to know?",
        "Hi there! Welcome to Abhay's portfolio. I'm here to help you learn about his work and connect with him. What interests you most?",
        "Hey! Great to see you're checking out Abhay's portfolio. I can share details about his projects, skills, experience, or help you reach out. What's on your mind?",
        "Greetings! I'm Abhay's AI assistant. Whether you want to know about his projects, skills, or get in touch, I'm here to help. What would you like to explore?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (msg.includes("haha") || msg.includes("hahaha") || msg.includes("hehe") || msg.includes("hehehe")) {
      const hahaResponses = [
        "What else would you like to know about Abhay?",
        "Ask me anything about Abhay's work or projects.",
        "Want to know more about his skills or projects?",
        "What's next on your mind?"
      ];
      return hahaResponses[Math.floor(Math.random() * hahaResponses.length)];
    }

    if (msg.includes("lol") || msg.includes("lmao") || msg.includes("rofl")) {
      const lolResponses = [
        "Anything else you'd like to ask?",
        "Want to know more about Abhay's projects?",
        "What else can I tell you about?",
        "Have any questions about Abhay's work or experience?"
      ];
      return lolResponses[Math.floor(Math.random() * lolResponses.length)];
    }

    if (msg.includes("dude") || msg.includes("bro") || msg.includes("man")) {
      const dudeResponses = [
        "What would you like to know about Abhay?",
        "Ask me anything about Abhay's projects or skills.",
        "What interests you most?",
        "What do you want to know?"
      ];
      return dudeResponses[Math.floor(Math.random() * dudeResponses.length)];
    }

    if (msg.includes("cool") || msg.includes("nice") || msg.includes("awesome") || msg.includes("sick")) {
      const coolResponses = [
        "Want to know more about Abhay's projects or skills?",
        "I can tell you about Abhay's work. What interests you?",
        "Ask me anything about Abhay's portfolio or experience.",
        "What would you like to explore about his work?"
      ];
      return coolResponses[Math.floor(Math.random() * coolResponses.length)];
    }

    if (msg.includes("thank") || msg.includes("thanks") || msg.includes("appreciate")) {
      const thanks = [
        "You're welcome! Feel free to ask me anything else about Abhay or his work.",
        "Happy to help! Don't hesitate to ask if you have more questions about Abhay's portfolio.",
        "My pleasure! Abhay would love to hear from you if you're interested in his work.",
        "Glad I could help! Feel free to explore more or ask about anything else."
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }

    if (msg.includes("what can you") || msg.includes("help me") || msg.includes("what do you")) {
      return "I can tell you all about Abhay! Ask me about his background, skills, experience, projects, or how to get in touch with him. I know details about all his work including Slyme, Scrib-Draw, Caelivisio, and KeyBlast. What would you like to know?";
    }

    if (msg.includes("where") && (msg.includes("abhay") || msg.includes("live") || msg.includes("located"))) {
      return "Abhay is based in India and works remotely. He's available for remote work opportunities and international collaborations. He's currently open to work and excited about new opportunities!";
    }

    if (msg.includes("remote") || msg.includes("location") || msg.includes("timezone")) {
      return "Abhay works remotely and is comfortable with different time zones. He's based in India (IST timezone) but has experience collaborating with international teams across various time zones.";
    }

    if (msg.includes("learn") || msg.includes("learning") || msg.includes("improve") || msg.includes("grow")) {
      return "Abhay is passionate about continuous learning! He's always exploring new technologies and frameworks. Currently, he's deepening his knowledge in systems programming, Web3 technologies, and advanced frontend patterns. He's also an avid competitive programmer and enjoys algorithmic challenges.";
    }

    if (msg.includes("work style") || msg.includes("how does he work") || msg.includes("collaboration")) {
      return "Abhay thrives in collaborative environments and enjoys working with cross-functional teams. He values clear communication, clean code practices, and iterative development. He's adaptable and enjoys both independent work and team collaboration.";
    }

    if (msg.includes("interest") || msg.includes("hobby") || msg.includes("outside work") || msg.includes("chess")) {
      return "Outside of coding, Abhay enjoys playing chess (he's active on Chess.com), reading about technology, and exploring new programming paradigms. He also enjoys problem-solving challenges and occasionally contributes to open-source projects.";
    }

    return "Sorry, I can't help with that. Do you have anything else in mind?";
  };

  const handleEmailSubmit = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      addMessage(`At the moment, your contact info seems to not work. Please check your email format and try again.`, "bot");
      return;
    }

    setCollectedEmail(email);
    setIsCollectingEmail(false);
    setIsCollectingExplanation(true);
    addMessage(`Great! I've noted your email: ${email}. Can you please explain the motive behind meeting? A little bit of explanation would be nice too!`, "bot");
  };

  const handleExplanationSubmit = async (explanation: string) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: collectedEmail,
          message: explanation || 'User wants to connect from portfolio chatbot',
          explanation: explanation
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', contentType);
        const text = await response.text();
        console.error('Response text:', text);
        addMessage(`Something went wrong.`, "bot");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setIsCollectingExplanation(false);
        setCollectedEmail("");
        addMessage(`Email sent, Abhay will contact you soon.`, "bot");
      } else {
        addMessage(`Something went wrong.`, "bot");
      }
    } catch (error) {
      console.error('Error submitting explanation:', error);
      addMessage(`Something went wrong.`, "bot");
    }
  };

  if (isFullScreen) return null;

  return (
    <>
      <AnimatePresence>
        {showWelcomeTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 bg-[#4D2D9A] text-white px-4 py-3 rounded-lg shadow-lg max-w-xs"
          >
            <div className="text-sm font-medium mb-1">Hey, welcome to my website!</div>
            <div className="text-xs opacity-90">I'm Abhay, a software engineer.</div>
            <div className="text-xs opacity-90 mt-1">Ask about me or contact me! ↓</div>
            <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#4D2D9A]"></div>
          </motion.div>
        )}

        {showContactTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 bg-[#4D2D9A] text-white px-4 py-3 rounded-lg shadow-lg max-w-xs cursor-pointer hover:bg-[#3D1F8A] transition-colors"
            onClick={handleContactTooltipClick}
          >
            <div className="text-sm font-medium">Looking for email? Click here</div>
            <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#4D2D9A]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#4D2D9A] hover:bg-[#3D1F8A] text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#4D2D9A] text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <span className="font-medium">dotbillu Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div 
              ref={messagesContainerRef}
              onMouseEnter={handleMouseEnter}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Hi! I'm here to help you learn about Abhay and his work.</p>
                  <p className="text-xs mt-2">Ask me anything about his skills, projects, or how to get in touch!</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-[#4D2D9A] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {isCollectingEmail && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4D2D9A]"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEmailSubmit((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                      if (emailInput?.value) {
                        handleEmailSubmit(emailInput.value);
                      }
                    }}
                    className="bg-[#4D2D9A] text-white p-2 rounded-md hover:bg-[#3D1F8A] transition-colors"
                  >
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            )}

            {isCollectingExplanation && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Tell us why you'd like to connect..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4D2D9A]"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleExplanationSubmit(inputValue);
                        setInputValue("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        handleExplanationSubmit(inputValue);
                        setInputValue("");
                      }
                    }}
                    className="bg-[#4D2D9A] text-white p-2 rounded-md hover:bg-[#3D1F8A] transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {!isCollectingEmail && !isCollectingExplanation && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Abhay's work..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4D2D9A]"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-[#4D2D9A] text-white p-2 rounded-md hover:bg-[#3D1F8A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
