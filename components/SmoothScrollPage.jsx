"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollClone() {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;

      // ---- 1) Animate the path draw ----
      const paths = content.querySelectorAll(".draw");
      paths.forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".heading",
            start: "top center",
            end: "bottom center",
            scrub: true,
            pin: ".pin", // 👈 keeps the heading fixed while drawing
            pinSpacing: false,
            // markers: true,
          },
        });
      });

      // ---- 2) Parallax effect for images ----
      const imgs = content.querySelectorAll(".images img");
      imgs.forEach((img) => {
        const raw = img.dataset.speed || "";
        const m = raw.match(/-?\d*\.?\d+/);
        const speed = m ? parseFloat(m[0]) : 1;

        gsap.to(img, {
          yPercent: -30 * (speed - 1), // stronger parallax
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        });
      });

      // ---- 3) Heading small slide up (instead of fading) ----
      gsap.fromTo(
        ".heading h1",
        { y: 50 },
        {
          y: 0,
          scrollTrigger: {
            trigger: ".heading",
            start: "top 85%",
            end: "top 50%",
            scrub: true,
            // markers: true,
          },
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef}>
      <header>
        <div className="logo">
          {/* keep your full SVG logo here */}
          <svg viewBox="0 0 370 100.34">
            {/* ... your SVG markup ... */}
          </svg>
        </div>
        <nav>
          <ul role="list">
            <li><a href="#">about</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero pad-l">
        <div className="heading">
          <div className="pin">
            <h1>
              <span className="clamp">
                Clamp
                <svg
                  viewBox="0 0 842.14 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="draw"
                    d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47"
                    fill="none"
                    stroke="#8486aa"
                    strokeWidth="8"
                  />
                </svg>
              </span>
              <span className="yt">your triggers</span>
            </h1>
          </div>
        </div>

        <div className="images">
          <img data-speed="clamp(2.4)" src="https://images.unsplash.com/photo-1530569673472-307dc017a82d?w=400" />
          <img data-speed="clamp(1.8)" src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=400" />
          <img data-speed="clamp(2.2)" src="https://images.unsplash.com/photo-1551376347-075b0121a65b?w=400" />
          <img data-speed="clamp(1.5)" src="https://images.unsplash.com/photo-1500817487388-039e623edc21?w=400" />
        </div>
      </section>

      <section className="spacer"></section>
    </div>
  );
}
