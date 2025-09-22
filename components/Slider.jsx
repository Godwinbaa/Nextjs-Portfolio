"use client";

const logos = [
  "/logos/mongodb.svg",
  "/logos/react.svg",
  "/logos/Vitejs.png",
  "/logos/html5.png",
  "/logos/css-3.png",
  "/logos/java-script.png",
  "/logos/nodejs.svg",
  "/logos/figma.png",
  "/logos/Tailwind css.png",
  "/logos/Nextjs.svg", // 👈 special handling
  "/logos/framer.svg", // 👈 special handling
  "/logos/formspree.png",  

];

export default function BrandSlider() {
  return (
    <div className="overflow-hidden w-full bg-white dark:bg-black py-6 relative">
      <div className="flex animate-marquee">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt="tech logo"
            className={`h-16 w-auto object-contain mx-8 select-none pointer-events-none
              ${
                logo.includes("Nextjs") || logo.includes("framermotion")
                  ? "dark:invert dark:brightness-0 dark:contrast-100"
                  : ""
              }
            `}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
