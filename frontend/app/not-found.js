"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6 overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-violet-500 to-pink-500 opacity-20 rounded-full -top-32 -left-32 animate-spin-slow"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400 to-cyan-400 opacity-20 rounded-full -bottom-32 -right-24 animate-spin-slow"
        animate={{ rotate: [360, 0] }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
      />

      {/* Main Error Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <span
            className="font-mono text-[12rem] font-bold leading-none tracking-tighter
                       text-transparent bg-clip-text
                       bg-linear-to-b from-black/90 via-black/60 to-black/30
                       dark:from-white/100 dark:via-white/80 dark:to-white/40
                       sm:text-[16rem]"
          >
            404
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-md mx-auto"
        >
          The page you’re looking for doesn’t exist, may have been removed, or the URL is incorrect.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium transition hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium transition hover:from-violet-500 hover:to-indigo-500"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
