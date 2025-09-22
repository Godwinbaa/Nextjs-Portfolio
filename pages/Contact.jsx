"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { Raleway } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";

// ✅ Raleway font
const raleway = Raleway({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(false); // 👈 new state

  // Create blobs on mount
  useEffect(() => {
    const temp = Array.from({ length: 8 }).map(() => ({
      size: `${Math.random() * 200 + 100}px`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 2,
      color: "bg-black dark:bg-white",
    }));
    setBlobs(temp);
  }, []);

  // 🔥 Parallax + Scroll animations
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-80px", "80px"]);

  // form submission
  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop redirect
    setLoading(true); // 👈 start loading
    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/mdkwnobp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    setLoading(false); // 👈 stop loading

    if (response.ok) {
      setSubmitted(true); // 👈 this will trigger your "Thanks" message
      setForm({ name: "", email: "", message: "" }); // clear form after submit
    } else {
      alert("Oops! Something went wrong, please try again.");
    }
  };

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      ref={ref}
      className={`${raleway.className} min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 
      bg-white dark:bg-black relative overflow-hidden text-black dark:text-white transition-colors duration-300`}
    >
      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-20 ${blob.color} blur-3xl`}
          style={{
            width: blob.size,
            height: blob.size,
            top: `${blob.y}%`,
            left: `${blob.x}%`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 300 - 150, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: blob.delay,
          }}
        />
      ))}

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10 mt-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ amount: 0.6 }}
          className="space-y-8"
        >
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "myfonts2", letterSpacing: "0.5rem" }}
          >
            Let’s Build Something{" "}
            <span
              className="text-gray-600 dark:text-gray-300"
              style={{ fontFamily: "myfonts2" }}
            >
              Amazing
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            Got a project in mind? Let’s collaborate and create something
            extraordinary. Whether you want to discuss ideas, ask questions, or
            just say hello — I’d love to hear from you!
          </motion.p>

          {/* Contact Info */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            {[
              { Icon: Mail, text: "godwinbaa01@gmail.com" },
              { Icon: Phone, text: "+91 8368283247" },
              { Icon: MapPin, text: "New Delhi, India" },
            ].map(({ Icon, text }, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer transition-colors duration-300 hover:text-black dark:hover:text-white"
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.span>
                <span className="transition-colors duration-300">{text}</span>
              </motion.p>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/in/godwin-baa-325b71245/" },
              { Icon: Github, href: "https://github.com/Godwinbaa" },
              { Icon: Twitter, href: "https://twitter.com" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="transition"
              >
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          style={{ y, willChange: "transform" }}
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ amount: 0.6 }}
          className="flex flex-col gap-6 relative z-10"
        >
          {!submitted ? (
            <>
              {/* Name & Email */}
              {["name", "email"].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.1,
                  }}
                  viewport={{ amount: 0.6 }}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 scale-y-0 origin-bottom transition-transform duration-300 pointer-events-none -z-10 group-focus-within:scale-y-100"></div>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field === "name" ? "Name" : "Email"}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="relative w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 
                               bg-transparent text-black dark:text-white outline-none
                               placeholder-gray-400 dark:placeholder-gray-500 placeholder-semibold placeholder:text-lg placeholder:italic"
                  />
                </motion.div>
              ))}

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ amount: 0.6 }}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 scale-y-0 origin-bottom transition-transform duration-300 pointer-events-none -z-10 group-focus-within:scale-y-100"></div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="relative w-full px-4 py-3 border-b border-gray-300 dark:border-gray-600 
                             bg-transparent text-black dark:text-white outline-none resize-none
                             placeholder-gray-400 dark:placeholder-gray-500 placeholder-semibold placeholder:text-lg placeholder:italic"
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading} // 👈 disable when loading
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black 
             px-6 py-3 rounded-none text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 
             transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white dark:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center text-xl font-medium text-black-600 dark:text-green-400"
              style={{ fontFamily: "myfonts2", letterSpacing: "0.5rem" }}
            >
              Thanks for reaching out! I’ll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
