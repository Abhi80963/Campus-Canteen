"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const foodImages = ["/e1.png", "/e2.png", "/e3.png"];

const generatePositions = () =>
  Array.from({ length: foodImages.length }, () => ({
    top: `${Math.random() * 80 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
  }));

export default function HeroSection() {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    setPositions(generatePositions());
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-screen background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(/bi1.jpg)` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content container - right aligned */}
      <div className="relative z-10 h-full flex items-center justify-end px-6 sm:px-12 md:px-20 lg:px-32">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-right max-w-xl"
        >
          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Taste the </span>
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Authentic Flavors
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/90 mb-10">
            Freshly baked with love using authentic ingredients and traditional recipes.
          </p>

          {/* Button */}
          <Link href="/menu">
  <Button
    className="
      bg-[#f5332d] 
      text-white 
      text-3xl       /* increased text size */
      font-semibold 
      px-12        /* increased horizontal padding */
      py-8         /* increased vertical padding */
      rounded-full 
      shadow-[0_4px_20px_rgba(245,51,45,0.4)] 
      hover:bg-black   /* change background color to black on hover */
      hover:cursor-pointer  /* hand icon cursor on hover */
      transition-all 
      duration-200
    "
  >
    Order Now
  </Button>
</Link>

        </motion.div>
      </div>

      {/* Floating food images */}
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-20 md:w-24 opacity-20 hover:opacity-40 transition-opacity"
          style={pos}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={foodImages[i]}
            alt={`floating food ${i}`}
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>
      ))}
    </section>
  );
}
