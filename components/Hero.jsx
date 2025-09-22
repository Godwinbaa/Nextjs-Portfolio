"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const heroFont = Montserrat({ subsets: ["latin"], weight: "500" });

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Stronger parallax for image
  const y = useTransform(scrollYProgress, [0, 1], ["-120px", "120px"]);

  // Force page to top on mount to prevent auto-scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full min-h-screen bg-white dark:bg-black flex items-center pt-20 md:pt-0 transition-colors duration-300"
    >
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-40 px-12">
        {/* Left Side - Text with scroll reveal */}
        <div className={`flex-1 text-center md:text-left ${heroFont.className}`}>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ amount: 0.6 }}
            className="text-gray-600 dark:text-gray-400 mb-2 text-lg md:text-xl"
          >
            Hi, I’m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ amount: 0.6 }}
            className="text-4xl font-bold text-black dark:text-white italic"
            style={{
              fontFamily: "myfonts",
              letterSpacing: "0.5em",
              transform: "scaleX(1)",
            }}
          >
            Godwin
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ amount: 0.6 }}
            className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold mb-4"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            viewport={{ amount: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-6"
          >
            Crafting{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              end-to-end Web solutions
            </span>{" "}
            with modern technologies, from sleek UIs to powerful backends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            viewport={{ amount: 0.6 }}
            className="flex gap-4 justify-center md:justify-start"
          >
            {/* Smooth scroll button */}
            <button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
            >
              View My Work
            </button>
          </motion.div>
        </div>

        {/* Right Side - Portrait Image with parallax */}
        <motion.div
          style={{ y, willChange: "transform" }}
          className="flex-1 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8, x: 50, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Link href="/About" className="relative group">
            <img
              src="/images/IMG_4952-2.jpg"
              alt="Portrait"
              className="w-56 h-80 md:w-64 md:h-96 object-cover shadow-xl border-4 border-gray-200 dark:border-gray-700 transition duration-500 group-hover:grayscale group-hover:opacity-70"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span
                className={`text-xl md:text-2xl font-semibold text-black dark:text-white opacity-0 group-hover:opacity-100 transition duration-500 ${heroFont.className}`}
                style={{ letterSpacing: "0.18em" }}
              >
                About me?
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
