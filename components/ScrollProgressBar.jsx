"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  // ✅ Add a smooth spring animation so it eases instead of snapping
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        scaleX, // animated width
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        transformOrigin: "0%",
        backgroundColor: "#ff0088", // change this to match your portfolio theme
        zIndex: 9999,
      }}
    />
  )
}
