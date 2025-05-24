"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 border-t bg-white text-gray-700">
      <p className="text-base sm:text-lg font-medium flex justify-center items-center gap-2">
        Crafted with
        <motion.span
          className="text-red-500 text-2xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
        by <span className="text-blue-600 font-semibold">Abhishek Raj</span>
      </p>
    </footer>
  );
}
