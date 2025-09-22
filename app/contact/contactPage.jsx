"use client";

import { Montserrat } from "next/font/google";

const contactFont = Montserrat({ subsets: ["latin"], weight: "500" });

export default function Contact() {
  return (
    <section className={`w-full min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-12 ${contactFont.className}`}>
      <h1 className="text-5xl font-bold mb-8">Contact Me</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Feel free to reach out for collaborations, projects, or just to say hi!
      </p>

      <form className="w-full max-w-xl flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
        <input type="email" placeholder="Your Email" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
        <textarea placeholder="Your Message" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none h-32"></textarea>
        <button type="submit" className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
          Send Message
        </button>
      </form>
    </section>
  );
}
