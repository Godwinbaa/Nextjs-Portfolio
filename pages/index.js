"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SmallProjects from "@/components/smallProject";
import SlidingLogos from "@/components/Slider";
import MagneticFilings from "@/components/MagneticFilings";
import ScrollText from "@/components/ScrollText";


export default function Home() {
  const [theme, setTheme] = useState("light");

  // Keep Home synced with global theme
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);

    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(updated);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div data-theme={theme} className="relative w-full min-h-screen">
      
      {/* Works page content = Hero + Projects */}
      <main className="flex flex-col items-center">
         <Hero />
        <Projects />
        <SmallProjects />
        <SlidingLogos />
        {/* <MagneticFilings/> */}
        {/* <ScrollText/> */}


      </main>
    </div>
  );
}
