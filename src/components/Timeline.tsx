"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { Star } from "lucide-react";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { title, subtitle, items, extraContext } = birthdayConfig.timeline;

  // Track scroll progress inside this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale the timeline line height
  const scaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 bg-charcoal text-cream overflow-hidden select-none"
    >
      {/* Background Star Details */}
      <div className="absolute top-1/4 left-1/10 text-gold-soft/10 animate-[pulse_3s_infinite] pointer-events-none">
        <Star size={24} fill="currentColor" />
      </div>
      <div className="absolute bottom-1/4 right-1/10 text-gold-soft/10 animate-[pulse_4s_infinite_1s] pointer-events-none">
        <Star size={18} fill="currentColor" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-28">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold opacity-70">
            chapter two
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-gold-soft/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-beige/80 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative w-full mb-32">
          {/* Vertical progress line - Centered on desktop, left on mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-beige/10 transform -translate-x-1/2">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-gold-soft via-pink-dust to-gold-soft"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-20">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot with pulse effect */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 w-4 h-4 rounded-full bg-charcoal border-2 border-gold-soft transform -translate-x-1/2 z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-soft animate-ping absolute" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-soft" />
                  </div>

                  {/* Spacer or Card Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      className="bg-charcoal/40 border border-beige/10 hover:border-gold-soft/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 shadow-xl"
                    >
                      <span className="text-xs font-sans text-gold-soft uppercase tracking-[0.2em] font-semibold">
                        {item.date}
                      </span>
                      <h3 className="text-lg md:text-xl font-serif tracking-wide mt-2 text-cream font-light">
                        {item.title}
                      </h3>
                      <p className="text-xs font-serif italic text-pink-dust/80 mt-1">
                        {item.description}
                      </p>
                      {item.details && (
                        <p className="text-xs md:text-sm font-sans text-beige/70 font-light mt-4 leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty side spacer for desktop alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Everyday Moments sub-section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="border-t border-beige/10 pt-20 max-w-2xl mx-auto text-center"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-pink-dust font-sans font-semibold">
            the spaces in between
          </span>
          <h3 className="text-xl md:text-2xl font-serif mt-2 mb-8 font-light tracking-wide">
            Our Everyday Magic
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {extraContext.details.map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.85, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, opacity: 1 }}
                className="bg-charcoal/80 border border-beige/10 px-5 py-3 rounded-full text-xs font-sans font-light tracking-wide text-beige shadow-inner flex items-center gap-2 cursor-default hover:border-gold-soft/20 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-soft/60" />
                {detail}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
