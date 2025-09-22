"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const hoverRef = useRef(null);
  const requestRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const [hovered, setHovered] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hover detection
  useEffect(() => {
    const handleHover = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    const interactiveEls = document.querySelectorAll("a, button, li");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Smooth trailing animation
  useEffect(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (hoverRef.current) {
        hoverRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        hoverRef.current.style.opacity = hovered ? "1" : "0";
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(requestRef.current);
  }, [hovered]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full bg-black dark:bg-white transition-colors duration-150"
        style={{ willChange: "transform" }}
      />

      {/* Hover ring */}
      <div
        ref={hoverRef}
        className="fixed pointer-events-none z-[9998] w-10 h-10 rounded-full border-2 border-black dark:border-white transition-all duration-200"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
