"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

export default function MagneticFilings() {
  const { theme } = useTheme();
  const rows = 15;
  const cols = 25;
  const spacing = 40;

  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const width = cols * spacing;
  const height = rows * spacing;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const items = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const centerX = c * spacing + spacing / 2;
      const centerY = r * spacing + spacing / 2;

      const dx = useTransform(mouseX, (mx) => mx - centerX);
      const dy = useTransform(mouseY, (my) => my - centerY);
      const angle = useTransform([dx, dy], ([dx, dy]) =>
        Math.atan2(dy, dx) * (180 / Math.PI)
      );

      // random glow animation setup
      const glowDuration = Math.random() * 2 + 1;
      const glowDelay = Math.random() * 2;

      // Theme-aware dot base color
      const baseColor = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
      const glowColor = theme === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";

      items.push(
        <motion.div
          key={`${r}-${c}`}
          animate={{
            width: isHovering ? 24 : 2,              // ✅ hover effect unchanged
            height: 2,                                // ✅ hover effect unchanged
            borderRadius: isHovering ? "2px" : "50%", // ✅ hover effect unchanged
          }}
          style={{
            background: baseColor,
            rotate: angle,
            x: centerX,
            y: centerY,
            position: "absolute",
            left: 0,
            top: 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {/* make the dot itself glow */}
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
            }}
            animate={{
              background: [baseColor, glowColor, baseColor],
              scale: [1, 1.3, 1], // dot itself "pulses"
            }}
            transition={{
              duration: glowDuration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: glowDelay,
            }}
          />
        </motion.div>
      );
    }
  }

  return (
    <div
      className={`flex items-center justify-center w-full h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        style={{
          width,
          height,
          position: "relative",
          border: "1px solid transparent",
        }}
      >
        {items}
      </div>
    </div>
  );
}
