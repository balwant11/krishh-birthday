"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";

export default function Understood() {
  const { title, subtitle, points } = birthdayConfig.unseenObservations;

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-cream text-charcoal overflow-hidden select-none">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-gold-soft/5 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-pink-dust/10 blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold">
            chapter three
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide max-w-xl mx-auto leading-tight">
            {title}
          </h2>
          <div className="h-[1px] bg-gold-soft/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-charcoal/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Observations List - Staggered Row Layout */}
        <div className="flex flex-col gap-10">
          {points.map((point, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: 0.1,
                }}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Number Indicator */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold-soft/20 flex items-center justify-center font-serif text-gold-soft/75 text-xl bg-beige/10 shadow-[inset_0_2px_4px_rgba(232,221,208,0.1)]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content Card */}
                <div className="flex-grow w-full">
                  <div className="bg-cream border border-beige hover:border-gold-soft/20 p-6 md:p-8 rounded-2xl transition-all duration-300 shadow-[0_2px_15px_rgba(232,221,208,0.1)] group">
                    <h3 className="text-lg md:text-xl font-serif tracking-wide font-medium text-charcoal">
                      {point.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-gold-soft/20 my-3 group-hover:w-20 transition-all duration-300" />
                    <p className="text-sm font-sans text-charcoal/70 leading-relaxed font-light">
                      {point.observation}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* A concluding emotional sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center font-serif italic text-sm md:text-base text-charcoal/80 mt-20 max-w-md mx-auto leading-relaxed"
        >
          "In my eyes, you are the most beautiful, strong, and complete version of grace. Thank you for just being you."
        </motion.p>
      </div>
    </section>
  );
}
