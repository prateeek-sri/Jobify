"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-[9999]">
      {/* Animated Dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-black dark:bg-white"
            animate={{
              y: ["0%", "-50%", "0%"],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Optional: Loading text */}
      <motion.div
        className="absolute bottom-20 text-sm text-gray-500 dark:text-gray-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.div>
    </div>
  );
}
