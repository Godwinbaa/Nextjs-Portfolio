"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-14 h-7 rounded-full p-1 flex items-center bg-gray-300 dark:bg-gray-700 relative cursor-pointer"
    >
      {/* Container that moves the handle */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 25, bounce: 0.3 }}
        className="w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-white dark:bg-black"
        style={{
          // Moves left or right inside the button
          marginLeft: isDark ? "auto" : "0",
          marginRight: isDark ? "0" : "auto",
        }}
      >
        {isDark ? <Sun className="w-3 h-3 text-yellow-400" /> : <Moon className="w-3 h-3 text-gray-800" />}
      </motion.div>
    </button>
  );
}
