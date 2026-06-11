"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { BookOpen, GraduationCap, Compass, ShoppingBag, Heart } from "lucide-react";

export default function LifePaused() {
  const { title, subtitle, introText, hopeTitle, hopeText, futureElements } =
    birthdayConfig.lifePaused;

  const iconMap = [
    <BookOpen size={20} className="text-gold-soft" />,
    <GraduationCap size={20} className="text-gold-soft" />,
    <Compass size={20} className="text-gold-soft" />,
    <ShoppingBag size={20} className="text-gold-soft" />,
    <Heart size={20} className="text-gold-soft" />,
  ];

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-charcoal text-cream overflow-hidden select-none">
      {/* Soft floating glow elements */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-gold-soft/10 blur-[130px] animate-[pulse_6s_infinite] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-pink-dust/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-pink-dust font-sans font-semibold opacity-70">
            chapter four
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-pink-dust/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-beige/80 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Narrative Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 bg-charcoal/50 border border-beige/10 p-8 md:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Glowing top rim */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />
            <p className="text-sm md:text-base font-sans text-beige/80 leading-relaxed font-light">
              {introText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start gap-4"
          >
            <h3 className="text-xl md:text-2xl font-serif font-light text-gold-soft tracking-wide leading-snug">
              {hopeTitle}
            </h3>
            <p className="text-xs md:text-sm font-sans text-beige/60 leading-relaxed font-light">
              {hopeText}
            </p>
          </motion.div>
        </div>

        {/* Future elements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
          {futureElements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 60 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(198, 167, 105, 0.1)" }}
              className={`bg-charcoal/40 border border-beige/10 hover:border-gold-soft/30 p-6 rounded-2xl flex gap-4 transition-all duration-300 shadow-lg group ${
                index === futureElements.length - 1 && futureElements.length % 2 !== 0
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-beige/5 border border-beige/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-soft/10 transition-colors duration-300">
                {iconMap[index] || <BookOpen size={20} className="text-gold-soft" />}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-serif font-semibold text-cream tracking-wide group-hover:text-gold-soft transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="text-xs font-sans text-beige/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
