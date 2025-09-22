"use client";

import { Montserrat } from "next/font/google";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

// Same font as navbar
const footerFont = Montserrat({ subsets: ["latin"], weight: "500" });

export default function Footer() {
  return (
    <footer
      className={`w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 ${footerFont.className}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo / Name */}
        <h1
          className="text-3xl font-bold italic text-black dark:text-white"
          style={{ fontFamily: "myfonts", transform: "scaleX(2)" }}
        >
          Godwin
        </h1>

        {/* Download Resume */}
        <a
          href="/RESUME4.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
        >
          <FileText className="w-5 h-5" /> Download My Resume
        </a>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-800 dark:text-gray-200">
          <a href="https://github.com/Godwinbaa" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 hover:text-gray-500 dark:hover:text-gray-400 transition" />
          </a>
          <a href="https://www.linkedin.com/in/godwin-baa-325b71245/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 hover:text-gray-500 dark:hover:text-gray-400 transition" />
          </a>
          <a href="mailto:yourmail@example.com">
            <Mail className="w-5 h-5 hover:text-gray-500 dark:hover:text-gray-400 transition" />
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Godwin. All rights reserved.
      </div>
    </footer>
  );
}
