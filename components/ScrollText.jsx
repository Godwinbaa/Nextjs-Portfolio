// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function ScrollText() {
//   const refLeft = useRef(null);
//   const refRight = useRef(null);

//   // Scroll progress for left text
//   const { scrollYProgress: leftProgress } = useScroll({
//     target: refLeft,
//     offset: ["start end", "end start"], 
//   });

//   const leftX = useTransform(leftProgress, [0, 1], ["-100px", "0px"]);

//   // Scroll progress for right text
//   const { scrollYProgress: rightProgress } = useScroll({
//     target: refRight,
//     offset: ["start end", "end start"],
//   });

//   const rightX = useTransform(rightProgress, [0, 1], ["100px", "0px"]);

//   return (
//     <div className="min-h-[200vh] flex flex-col items-center justify-center">
//       {/* From Left */}
//       <motion.h2
//         ref={refLeft}
//         style={{ x: leftX }}
//         className="text-5xl font-bold"
//       >
//         Slide from Left
//       </motion.h2>

//       {/* From Right */}
//       <motion.h2
//         ref={refRight}
//         style={{ x: rightX }}
//         className="text-5xl font-bold"
//       >
//         Slide from Right — Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       </motion.h2>
//     </div>
//   );
// }
