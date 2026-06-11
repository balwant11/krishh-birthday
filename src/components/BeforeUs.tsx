"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";

export default function BeforeUs() {
  const { title, subtitle, cards } = birthdayConfig.beforeUs;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-cream text-charcoal overflow-hidden select-none">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-beige/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-pink-dust/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-20 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold"
          >
            chapter one
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 0.3, width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-[1px] bg-gold-soft mx-auto my-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-sm md:text-base font-serif italic text-charcoal/80 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Storytelling Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-cream border border-beige hover:border-gold-soft/30 p-6 md:p-8 rounded-2xl shadow-[0_4px_30px_rgba(232,221,208,0.15)] backdrop-blur-sm transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group"
            >
              {/* Card accent border */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-gold-soft/30 to-pink-dust/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-beige/40 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">
                  {card.emoji}
                </span>
                <h3 className="text-lg md:text-xl font-serif font-medium tracking-wide">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm font-sans text-charcoal/70 leading-relaxed font-light mt-2">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
