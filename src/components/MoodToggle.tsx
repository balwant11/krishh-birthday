"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { Flame, ShieldAlert, Sparkles, Heart } from "lucide-react";

export default function MoodToggle() {
  const [mode, setMode] = useState<"angry" | "baby">("baby");
  const { title, subtitle, angry, baby } = birthdayConfig.moodToggle;

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-cream text-charcoal overflow-hidden select-none">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-dust/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-gold-soft/5 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold">
            chapter six
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-gold-soft/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-charcoal/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="relative flex items-center bg-beige/30 p-1.5 rounded-full border border-beige mb-16 shadow-inner w-full max-w-[320px]">
          {/* Animated slider background */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-cream border border-beige shadow-sm"
            animate={{
              left: mode === "angry" ? "6px" : "50%",
              width: "calc(50% - 6px)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />

          <button
            onClick={() => setMode("angry")}
            className={`relative z-10 w-1/2 text-center py-2 text-xs md:text-sm font-sans tracking-wider uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
              mode === "angry" ? "text-charcoal" : "text-charcoal/50"
            }`}
          >
            <span>😤</span> Angry
          </button>
          
          <button
            onClick={() => setMode("baby")}
            className={`relative z-10 w-1/2 text-center py-2 text-xs md:text-sm font-sans tracking-wider uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
              mode === "baby" ? "text-charcoal" : "text-charcoal/50"
            }`}
          >
            <span>🥺</span> Baby
          </button>
        </div>

        {/* Interactive Mode Display */}
        <div className="w-full max-w-2xl min-h-[340px] relative">
          <AnimatePresence mode="wait">
            {mode === "angry" ? (
              <motion.div
                key="angry-panel"
                initial={{ opacity: 0, scale: 0.98, x: -15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: 15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-cream border border-beige/80 p-8 md:p-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Mode indicators */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-charcoal pointer-events-none">
                  <Flame size={120} />
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-pink-dust/10 flex items-center justify-center text-pink-dust">
                    <ShieldAlert size={18} />
                  </span>
                  <div>
                    <h3 className="text-xl font-serif tracking-wide font-medium">
                      {angry.title}
                    </h3>
                    <p className="text-xs font-sans text-charcoal/50 mt-0.5">
                      {angry.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-beige w-full my-1" />

                <ul className="space-y-4">
                  {angry.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-sm font-sans text-charcoal/80 font-light leading-relaxed flex gap-3 items-start"
                    >
                      <span className="text-pink-dust mt-1 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="baby-panel"
                initial={{ opacity: 0, scale: 0.98, x: 15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-cream border border-beige/80 p-8 md:p-10 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Mode indicators */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-gold-soft pointer-events-none">
                  <Heart size={120} fill="currentColor" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gold-soft/10 flex items-center justify-center text-gold-soft">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <h3 className="text-xl font-serif tracking-wide font-medium">
                      {baby.title}
                    </h3>
                    <p className="text-xs font-sans text-charcoal/50 mt-0.5">
                      {baby.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-beige w-full my-1" />

                <ul className="space-y-4">
                  {baby.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-sm font-sans text-charcoal/80 font-light leading-relaxed flex gap-3 items-start"
                    >
                      <span className="text-gold-soft mt-1 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
