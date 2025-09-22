"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[200vh] overflow-hidden bg-black text-white">
      {/* Background layer (slowest) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offsetY * 0.2}px)`,
          background: "linear-gradient(to bottom, #111, #000)",
          zIndex: 1,
        }}
      />

      {/* Mid layer (medium speed) */}
      <div
        className="absolute inset-0 flex justify-center items-center"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
          zIndex: 2,
        }}
      >
        <h1 className="text-6xl font-bold tracking-widest">MY PORTFOLIO</h1>
      </div>

      {/* Foreground layer (fastest) */}
      <div
        className="absolute inset-0 flex justify-center items-end pb-20"
        style={{
          transform: `translateY(${offsetY * 0.8}px)`,
          zIndex: 3,
        }}
      >
        <button className="px-6 py-3 bg-white text-black rounded-lg shadow-lg">
          Explore
        </button>
      </div>
    </div>
  );
}
