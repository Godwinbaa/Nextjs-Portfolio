"use client";

import { Raleway } from "next/font/google";
import { motion } from "framer-motion";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const randomValue = (min, max) => Math.random() * (max - min) + min;

const blobs = [
  { size: 80, top: 10, left: 10, opacity: 0.2 },
  { size: 120, top: 50, left: 70, opacity: 0.15 },
  { size: 100, top: 80, left: 30, opacity: 0.1 },
  { size: 150, top: 20, left: 50, opacity: 0.18 },
];

const projects = [
  {
    title: "E-Commerce Website (Clothing Brand & Admin Panel)",
    points: [
      "Secure user & admin authentication using MongoDB.",
      "Customer shopping with cart, checkout (Razorpay / Cash on Delivery).",
      "Automated discounts & shipping charges at checkout.",
      "Admin panel: manage products, track orders: placed → packed → shipped → out for delivery → delivered.",
      "Cloudinary used for product images & optimized media handling.",
      "Users can view real-time order status updates.",
    ],
  },
  {
    title: "Chat Application",
    points: [
      "User authentication for secure login/signup.",
      "Chat UI with sidebar showing users & online status.",
      "Top-right menu with Profile, Themes (DaisyUI), Logout.",
      "Profile management: update name & profile picture; email & join date uneditable.",
      "Text messaging & image sharing (uploads via Cloudinary).",
      "All users can see & chat with each other.",
      "MongoDB for storing auth, messages & profile data.",
      "DaisyUI for clean & customizable UI themes.",
    ],
  },
  {
    title: "Admin Dashboard (Frontend Only)",
    points: [
      "Responsive UI with charts & modern layouts.",
      "Practiced frontend fundamentals: components, state, styling.",
      "No backend – purely UI & learning workflow.",
      "Served as a stepping stone before full-stack projects.",
    ],
  },
  {
    title: "Calculator App",
    points: [
      "Frontend-only Vite project with separate components for buttons, screen, wrapper.",
      "Dedicated JSX file for calculation logic.",
      "Focused on component structure & state handling in React.",
    ],
  },
  {
    title: "Weather App",
    points: [
      "Built using HTML, CSS & JS only.",
      "Integrated OpenWeather API for live data.",
      "Used Boxicons for icons & subtle animations.",
    ],
  },
  {
    title: "Login Page UI",
    points: [
      "HTML & CSS only, no JS or authentication.",
      "Designed a clean, modern login interface.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main
      className={`${raleway.className} relative min-h-screen bg-white dark:bg-black text-black dark:text-white px-8 py-20 overflow-hidden`}
    >
      {/* Animated Background Blobs */}
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl bg-black dark:bg-white"
          style={{
            width: blob.size,
            height: blob.size,
            top: `${blob.top}%`,
            left: `${blob.left}%`,
            opacity: blob.opacity,
          }}
          animate={{
            x: [0, randomValue(-200, 200), randomValue(-200, 200), 0],
            y: [0, randomValue(-200, 200), randomValue(-200, 200), 0],
          }}
          transition={{
            duration: randomValue(15, 30),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10 space-y-32">
        {/* About Me */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1
              className="text-5xl font-extrabold mb-6"
              style={{ fontFamily: "Caveat, sans-serif" }}
            >
              About Me
            </h1>
            <p
              className="text-3xl leading-relaxed"
              style={{ fontFamily: "Caveat, sans-serif" }}
            >
              I am a passionate Full Stack Developer based in New Delhi, eager
              to begin my professional journey as a fresher. I enjoy crafting
              both the frontend and backend of web applications, with a strong
              interest in design that brings ideas to life.
              <br />
              Beyond coding, I love exploring gaming and photography which fuel
              my creativity and problem-solving mindset.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/IMG_3501_1.jpg"
              alt="My photo"
              className=" object-cover w-[350px] h-[450px] mt-8"
            />
          </div>
        </section>

        {/* Education */}
        <section>
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "Libertinus Keyboard, sans-serif" }}
          >
            Education
          </h2>
          <ul className="list-disc list-inside text-lg space-y-4">
            <li><span className="font-semibold">School:</span> 2005 – 2019</li>
            <li><span className="font-semibold">College:</span> 2020 – 2023</li>
            <li><span className="font-semibold">Diploma Course:</span> 2023 – 2024</li>
          </ul>
        </section>

        {/* Experience / Projects */}
        <section>
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ fontFamily: "Libertinus Keyboard, sans-serif" }}
          >
            Experience / Projects
          </h2>

          <div className="space-y-16">
            {projects.map((project, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`w-full md:w-1/2 ${
                    isLeft ? "md:ml-0 md:mr-auto text-left" : "md:ml-auto text-right"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-lg">
                    {project.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
