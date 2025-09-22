"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence, useVelocity } from "framer-motion";
import Head from "next/head";
import RevealText from "@/components/RevealText";

const projects = [
  {
    title: "CALCULATOR APP",
    category: "A simple calculator project",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80",

  },
  {
    title: "WEATHER APP",
    category: "Weather forecasting project",
    img: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=800&fit=crop&q=80",
  },
  {
    title: "LOGIN PAGE",
    category: "Basic authentication UI",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&q=80",
  },
];

const CursorImage = ({ hoveredIndex, x, y }) => {
  if (hoveredIndex === null || hoveredIndex < 0 || hoveredIndex > 2) return null;

  // Smooth velocity-based tilt
  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };

  const skewX = useSpring(
    useTransform(xVelocity, [-1000, 1000], [-15, 15]),
    springConfig
  );
  const skewY = useSpring(
    useTransform(yVelocity, [-1000, 1000], [15, -15]),
    springConfig
  );

  return (
    <AnimatePresence>
      <motion.div
        style={{ x, y, skewX, skewY }}
        className="pointer-events-none fixed top-0 left-0 z-50 w-80 h-[28rem] 
                   overflow-hidden rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <img
          src={projects[hoveredIndex].img}
          alt={projects[hoveredIndex].title}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectItem = ({ title, category, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <div
      onMouseEnter={() => {
        onMouseEnter();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setIsHovered(false);
      }}
      className="group relative cursor-pointer border-b border-neutral-200 dark:border-neutral-800 py-10 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600 w-full"
    >
      <div className="flex justify-between items-center w-full">
        <motion.h2
          ref={titleRef}
          style={{ y: titleY, fontFamily: "myfont" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.6 }}
          className="text-5xl md:text-7xl font-light text-black dark:text-white transition-transform duration-500 ease-out group-hover:-translate-x-2"
        >
          <RevealText text={title} isHovered={isHovered} />
        </motion.h2>
        <p className="text-neutral-600 dark:text-neutral-400 font-light text-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {category}
        </p>
      </div>
      <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-black dark:bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
    </div>
  );
};

export default function SmallProjects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white font-[Raleway]"
      >
        <CursorImage hoveredIndex={hoveredIndex} x={smoothMouseX} y={smoothMouseY} />

        <main className="mx-auto w-full px-6 md:px-8">
          <motion.header
            ref={headerRef}
            className="py-24 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: headerY }}
            viewport={{ amount: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-light text-black dark:text-white mb-4 tracking-tight" style={{ fontFamily: "myfonts3" }}>
              Small Projects
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed" style={{ fontFamily: "myfonts3" }}>
              Hover over a project title to reveal a preview.
            </p>
          </motion.header>

          <div className="border-t border-neutral-200 dark:border-neutral-800 w-full">
            {projects.map((project, index) => (
              <ProjectItem
                key={index}
                title={project.title}
                category={project.category}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
               
              />
            ))}
          </div>
        </main>

        <footer className="py-16 px-6 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 font-light" style={{ fontFamily: "myfonts3" }}>
            Crafted with Framer Motion & React
          </p>
        </footer>
      </div>
    </>
  );
}
