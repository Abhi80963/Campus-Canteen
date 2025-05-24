"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const foodImages = ["/e1.png", "/e2.png", "/e3.png"];

const generatePositions = () =>
  Array.from({ length: foodImages.length }, () => ({
    top: `${Math.random() * 80 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
  }));

export default function ChooseUsSection() {
  const features = [
    { title: "Quality Food", icon: "🍕", desc: "100% authentic ingredients" },
    { title: "Fast Delivery", icon: "⚡", desc: "Under 30 minutes or free" },
    { title: "Hygiene Certified", icon: "🧼", desc: "5-star food safety rating" },
    { title: "Easy Ordering", icon: "📲", desc: "Simple 3-step process" },
  ];

  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    setPositions(generatePositions());
  }, []);

  return (
    <section className="py-10 bg-white text-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 className="text-2xl font-sans font-bold mb-12 text-orange-600">Core Features</motion.h2>
        <motion.h2 className="text-4xl font-serif font-bold mb-12 text-black">Why Choose Us</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-50 p-8 rounded-2xl shadow-md"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-20 opacity-20"
          style={pos}
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        >
          <Image src={foodImages[i]} alt={`floating food ${i}`} width={100} height={100} />
        </motion.div>
      ))}
    </section>
  );
}
