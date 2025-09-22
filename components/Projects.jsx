"use client";

import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const projectsFont = Montserrat({ subsets: ["latin"], weight: "500" });

export default function Projects() {
  const projectList = [
    {
      title: "E-Commerce Website - Mernstack Project",
      description: "E-Commerce Website for Clothing Brand (with Admin Panel)",
      image: "/mockups/e-com.png",
      link: "https://fullstack-e-commerce-app-frontend.vercel.app/",
    },
    {
      title: "Chat-App Website - Mernstack Project",
      description:
        "A real-time chat app ",
      image: "/mockups/chat-app4.png",
      link: "#",
    },
    {
      title: "Admin-Dashboard - React frontend",
      description:
        "Frontend Admin-dashboard mainly Focused in Practice",
      image: "/mockups/admin-dashboard.png",
      link: "https://admin-dashboard-blue-kappa-15.vercel.app/",
    },
    {
      title: "Project Four",
      description: "Another creative project to showcase skills.",
      image: "/mockups/newpro.png",
      link: "#",
    },
  ];

  return (
    <section
      id="projects"
      className={`w-full bg-white dark:bg-black transition-colors duration-300 ${projectsFont.className}`}
    >
      <div className="max-w-8xl mx-auto px-0 md:px-0">
        <div className="grid grid-cols-2 gap-0 w-full">
          {projectList.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank" // ✅ open in new tab
              rel="noopener noreferrer" // ✅ security best practice
              className="relative w-full aspect-square overflow-hidden group"
            >
              {/* ✅ Image: grayscale default, color on hover */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter grayscale transition duration-500 group-hover:grayscale-0"
              />

              {/* ✅ Text: scroll reveal (not hover-based) */}
              <div className="absolute inset-0 flex items-center justify-center text-center bg-black/50">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 5, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ amount: 0.6 }}
                    className="text-white text-xl font-semibold mb-2"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    viewport={{ amount: 0.6 }}
                    className="text-white text-sm"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
