"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function Ending() {
  const { quote1, quote2, finalLine } = birthdayConfig.ending;
  const controls = useAnimation();

  const triggerConfetti = () => {
    // Elegant soft gold and dusty pink confetti blast
    const colors = ["#C6A769", "#D8B4B4", "#F8F4EE"];
    
    // Left side burst
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    
    // Right side burst
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    // Center spray
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: colors,
    });
  };

  const [stars, setStars] = React.useState<Array<{ width: string; height: string; left: string; top: string; delay: string }>>([]);

  useEffect(() => {
    // Generate random star coordinates only on mount to prevent SSR mismatch
    const generatedStars = [...Array(20)].map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
    }));
    setStars(generatedStars);
  }, []);



  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-charcoal text-cream overflow-hidden select-none">
      {/* Floating particles background (pure CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold-soft/30 animate-[pulse_3s_infinite]"
            style={{
              width: star.width,
              height: star.height,
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center px-6 max-w-2xl flex flex-col items-center gap-6">
        {/* Quote line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-lg md:text-xl font-serif italic text-beige/90 font-light"
        >
          "{quote1}"
        </motion.p>

        {/* Quote line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="text-lg md:text-xl font-serif italic text-beige/90 font-light"
        >
          "{quote2}"
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 0.3, width: 50 }}
          viewport={{ once: true }}
          transition={{ delay: 2.8, duration: 1 }}
          className="h-[1px] bg-gold-soft my-6"
        />

        {/* Final Line */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onViewportEnter={triggerConfetti}
          transition={{ delay: 3.2, duration: 2.0 }}
          className="text-3xl md:text-5xl font-serif tracking-wide font-light text-cream"
        >
          {finalLine}
        </motion.h2>

        {/* Interactivity (Click heart for confetti) */}
        <motion.button
          onClick={triggerConfetti}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4.2, duration: 1 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(198, 167, 105, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 w-16 h-16 rounded-full border border-gold-soft/20 flex items-center justify-center text-pink-dust hover:text-gold-soft bg-charcoal/50 hover:bg-gold-soft/5 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-lg group"
          aria-label="Celebrate birthday"
        >
          <Heart size={24} className="fill-current animate-pulse group-hover:scale-110 transition-transform duration-300" />
        </motion.button>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 4.8, duration: 1 }}
          className="text-[9px] uppercase tracking-[0.2em] text-gold-soft/60 font-sans pointer-events-none mt-2"
        >
          click the heart to celebrate
        </motion.span>
      </div>

      {/* Subtle bottom watermark */}
      <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.25em] text-cream/20 font-sans pointer-events-none">
        made with love by {birthdayConfig.husbandName}
      </div>
    </section>
  );
}
