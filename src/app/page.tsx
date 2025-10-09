"use client"
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

// --- Navbar Component with Smooth Scroll ---
function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between h-20">
        <motion.div 
          className="font-bold text-xl text-gray-800 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('home')}
        >
          John Doe
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          {['projects', 'tech-stack', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`hover:text-black transition-colors capitalize ${
                activeSection === section ? 'text-black' : ''
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.replace('-', ' ')}
            </motion.button>
          ))}
        </div>
        
        <motion.button 
          className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
        >
          GET IN TOUCH
        </motion.button>
      </div>
    </motion.div>
  );
}

// --- Hero Section ---
export function HeroSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -100]);

  return (
    <section 
      id="home"
      ref={targetRef} 
      className="relative h-[150vh] bg-gradient-to-br from-[#FAF4F0] to-[#F5E6DD]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
          <Navbar />
        </div>
        
        <div className="h-full flex flex-col items-center justify-center p-8">
          <motion.div 
            className="flex flex-col items-center text-center"
            style={{ scale, opacity, y }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 
                className="text-[10vw] md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none bg-gradient-to-r from-[#4D2D9A] to-[#8B5CF6] bg-clip-text text-transparent"
                style={{ lineHeight: '0.85' }}
              >
                CREATIVE
                <br />
                DEVELOPER
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl"
            >
              Crafting exceptional digital experiences with modern web technologies
            </motion.p>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 bg-black text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW MY WORK
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Projects Section ---
const cardsData = [
    { 
      id: "card-1", 
      title: "E-Commerce Platform", 
      text: "A full-stack e-commerce solution with advanced cart management, payment integration, and real-time inventory tracking.", 
      img: "https://assets.codepen.io/210284/flower-9.jpg" 
    },
    { 
      id: "card-2", 
      title: "AI Dashboard", 
      text: "Interactive analytics dashboard powered by machine learning algorithms for data visualization and predictive insights.", 
      img: "https://assets.codepen.io/210284/flower-8.jpg" 
    },
    { 
      id: "card-3", 
      title: "Social Media App", 
      text: "Real-time social networking platform with live messaging, content sharing, and community engagement features.", 
      img: "https://assets.codepen.io/210284/flower-7.jpg" 
    },
    { 
      id: "card-4", 
      title: "Fitness Tracker", 
      text: "Mobile-first fitness application with workout planning, progress tracking, and personalized health recommendations.", 
      img: "https://assets.codepen.io/210284/flower-6.jpg" 
    },
];

const Card3D = ({ imageUrl }) => {
    const meshRef = useRef();
    const texture = useTexture(imageUrl);
    const aspect = texture.image.width / texture.image.height;
    const width = 4.5;
    const height = width / aspect;
    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>
    );
};

const StackingCard = ({ card, index, totalCards, scrollYProgress }) => {
    const y = useTransform(scrollYProgress, (progress) => {
        const activeCardIndex = progress * (totalCards - 1);
        const distance = index - activeCardIndex;
        return `${distance * 45}%`;
    });
    const scale = useTransform(scrollYProgress, (progress) => {
        const activeCardIndex = progress * (totalCards - 1);
        const distance = Math.abs(index - activeCardIndex);
        return Math.max(1 - distance * 0.1, 0.5);
    });
    const zIndex = useTransform(scrollYProgress, (progress) => {
        const activeCardIndex = progress * (totalCards - 1);
        const distance = Math.abs(index - activeCardIndex);
        return totalCards - distance;
    });
    return (
        <motion.div className="absolute w-full h-full flex items-center justify-center p-4 md:p-8" style={{ zIndex, y, scale }}>
            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-gray-900/5 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div className="flex flex-col justify-center items-start text-left">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{card.title}</h2>
                        <p className="text-lg text-slate-700 font-light leading-relaxed">{card.text}</p>
                    </div>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <color attach="background" args={['#FFF1EB']} />
                            <ambientLight intensity={1} />
                            <directionalLight position={[0, 2, 5]} intensity={1.5} />
                            <Card3D imageUrl={card.img} />
                        </Canvas>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

function PortfolioDeck() {
    const containerRef = useRef(null);
    const totalCards = cardsData.length;
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 35, mass: 0.5 });
    const headerRange = [0, 0.2];
    const cardsAppearRange = [0.2, 0.4];
    const cardStackRange = [0.4, 1];
    const headerScale = useTransform(smoothProgress, headerRange, [1, 0]);
    const headerBorderRadius = useTransform(smoothProgress, headerRange, ["0px", "48px"]);
    const cardsY = useTransform(smoothProgress, cardsAppearRange, ['100vh', '0vh']);
    const cardStackProgress = useTransform(smoothProgress, cardStackRange, [0, 1]);

    return (
        <div id="projects" className="font-sans antialiased bg-[#DDA26E]">
            <main ref={containerRef} className="relative" style={{ height: `${totalCards * 200}vh` }}>
                <div className="sticky top-0 h-screen overflow-hidden">
                    <motion.div style={{ y: cardsY }} className="absolute inset-0 z-0">
                        {cardsData.map((card, idx) => (
                            <StackingCard key={card.id} card={card} index={idx} totalCards={totalCards} scrollYProgress={cardStackProgress} />
                        ))}
                    </motion.div>
                    <motion.header style={{ scale: headerScale, borderRadius: headerBorderRadius }} className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#FFF1EB] z-10">
                        <motion.h1 
                          className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#131212]"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          Featured Projects
                        </motion.h1>
                        <motion.p 
                          className="text-xl md:text-2xl font-light max-w-3xl leading-relaxed text-slate-700"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          A curated selection of my work. Scroll down to see the details of each project.
                        </motion.p>
                        <motion.div 
                          className="mt-12 text-sm uppercase tracking-widest text-slate-500"
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Scroll <span className="text-2xl block mt-2">↓</span>
                        </motion.div>
                    </motion.header>
                </div>
            </main>
        </div>
    );
}

// --- Tech Stack Section ---
function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const techCategories = [
    {
      name: "Frontend",
      technologies: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
      ]
    },
    {
      name: "Backend",
      technologies: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "PostgreSQL", level: 82 },
        { name: "MongoDB", level: 88 },
      ]
    },
    {
      name: "Tools & Others",
      technologies: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 78 },
        { name: "Figma", level: 85 },
      ]
    }
  ];

  return (
    <section id="tech-stack" ref={ref} className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <motion.div
        className="absolute top-40 left-20 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Tech Stack
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{category.name}</h3>
              <div className="space-y-6">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: catIndex * 0.2 + techIndex * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-medium">{tech.name}</span>
                      <span className="text-purple-400">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tech.level}%` } : {}}
                        transition={{ duration: 1, delay: catIndex * 0.2 + techIndex * 0.1 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact Section ---
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactInfo = [
    { label: "Email", value: "john.doe@example.com", icon: Mail },
    { label: "Phone", value: "+1 (555) 123-4567", icon: Phone },
    { label: "Location", value: "San Francisco, CA", icon: MapPin },
  ];

  const socialLinks = [
    { name: "GitHub", url: "#", Icon: Github },
    { name: "LinkedIn", url: "#", Icon: Linkedin },
    { name: "Twitter", url: "#", Icon: Twitter },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="min-h-screen bg-gradient-to-br from-[#FAF4F0] to-[#F5E6DD] py-20 px-4 relative overflow-hidden">
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h3>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{info.label}</p>
                    <p className="text-lg font-semibold text-slate-900">{info.value}</p>
                  </div>
                </motion.div>
              );
            })}

            <div className="pt-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.Icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-6 h-6 text-slate-700" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center mt-20 text-slate-600"
      >
        <p>© 2025 John Doe. All rights reserved.</p>
      </motion.div>
    </section>
  );
}

// --- Main Export ---
export default function Home() {
    return (
        <>
            <HeroSection />
            <PortfolioDeck />
            <TechStack />
            <Contact />
        </>
    );
}
