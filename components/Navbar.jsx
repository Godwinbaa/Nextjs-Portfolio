"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lora, Montserrat } from "next/font/google";
import { FileText, Menu, X } from "lucide-react";
import { motion } from "framer-motion"; // ✅ For animation
import ThemeToggle from "./ThemeToggle"; // ✅ Import the toggle button

// Fonts
const logoFont = Lora({ subsets: ["latin"], weight: "700" });
const linkFont = Montserrat({ subsets: ["latin"], weight: "500" });

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animState, setAnimState] = useState("idle"); // idle | enter | leave

  const openMenu = () => {
    setMenuVisible(true);
    setAnimState("enter");
  };

  const closeMenu = () => {
    setAnimState("leave");
  };

  useEffect(() => {
    if (animState === "leave") {
      const timer = setTimeout(() => {
        setMenuVisible(false);
        setAnimState("idle");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [animState]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-4xl font-bold text-black dark:text-white italic"
            style={{
              fontFamily: "myfonts",
              transform: "scaleX(2)",
            }}
          >
            Godwin
          </Link>

          {/* Desktop Links */}
          <ul
            className={`hidden md:flex items-center gap-6 text-sm md:text-base ${linkFont.className} text-gray-800 dark:text-gray-200`}
          >
            <li>
              <Link href="/">
                <motion.span
                  initial={{ y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block relative uppercase tracking-wide"
                >
                  Works
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/About">
                <motion.span
                  initial={{ y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block relative uppercase tracking-wide"
                >
                  About
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/Contact">
                <motion.span
                  initial={{ y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block relative uppercase tracking-wide"
                >
                  Contact
                </motion.span>
              </Link>
            </li>
            <li>
              <a
                href="/RESUME4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg text-black dark:text-white flex items-center justify-center transition-colors duration-300 hover:text-gray-500"
              >
                <FileText className="w-5 h-5" />
              </a>
            </li>

            {/* 🌙 Dark/Light Mode Toggle */}
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-800 dark:text-gray-200 hover:text-gray-500"
              aria-label="Toggle menu"
              onClick={() => (menuVisible ? closeMenu() : openMenu())}
            >
              {menuVisible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuVisible && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center bg-white dark:bg-black
            ${animState === "enter" ? "animate-slideDown" : ""}
            ${animState === "leave" ? "animate-slideUp" : ""}`}
          aria-hidden={!menuVisible}
        >
          <div
            className={`z-50 flex flex-col items-center gap-8 text-2xl ${linkFont.className}`}
          >
            <Link
              href="/"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-500 uppercase tracking-wide"
              onClick={closeMenu}
            >
              Works
            </Link>
            <Link
              href="/About"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-500 uppercase tracking-wide"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/Contact"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-500 uppercase tracking-wide"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <a
              href="/RESUME4.pdf"
              download
              className="text-gray-800 dark:text-gray-200 hover:text-gray-500 flex items-center"
              onClick={closeMenu}
            >
              <FileText className="w-5 h-5 mr-2" /> Resume
            </a>

            {/* 🌙 Dark/Light Toggle inside mobile menu */}
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
