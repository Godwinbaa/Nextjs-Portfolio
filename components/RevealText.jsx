"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RevealText({
  text = "Hover Me",
  className = "",
  duration = 0.45,
  ease = [0.22, 1, 0.36, 1],
  isHovered = false,
}) {
  const container = { rest: {}, hover: {} };

  const topLine = {
    rest: { y: "0%" },
    hover: { y: "-100%" },
  };

  const bottomLine = {
    rest: { y: "100%" },
    hover: { y: "0%" },
  };

  return (
    <motion.span
      className={`relative inline-block overflow-hidden align-baseline ${className}`}
      variants={container}
      initial="rest"
      animate={isHovered ? "hover" : "rest"} // 👈 controlled externally
      // whileHover="hover"
      style={{ lineHeight: 1 }}
    >
      {/* Sizer to lock height so layout doesn't jump */}
      <span aria-hidden="true" style={{ visibility: "hidden", display: "block" }}>
        {text}
      </span>

      {/* Top text (visible initially, slides up on hover) */}
      <motion.span
        className="absolute inset-0"
        variants={topLine}
        transition={{ duration, ease }}
      >
        {text}
      </motion.span>

      {/* Bottom text (hidden below, slides up on hover) */}
      <motion.span
        className="absolute inset-0"
        variants={bottomLine}
        transition={{ duration, ease }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
