"use client";

import React from "react";
import { birthdayConfig } from "../config/birthday";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function VoiceLetter() {
  const { letterText } = birthdayConfig.voiceLetter;

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 md:px-12 bg-charcoal text-cream overflow-hidden">
      {/* Background radial light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-soft/5 blur-[150px] pointer-events-none" />

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-pink-dust font-sans font-semibold opacity-70">
            chapter seven
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-3 font-light tracking-wide text-cream">
            A Letter for You
          </h2>
          <div className="h-[1px] bg-pink-dust/30 w-16 mx-auto my-5" />
        </div>

        {/* Elegant Letter Parchment Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full bg-[#FAF7F2] border border-[#EADFC9]/60 rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_15px_50px_rgba(20,15,10,0.15)] relative overflow-hidden text-[#3D3528]"
        >
          {/* Subtle background paper texture or elegant border lines */}
          <div className="absolute inset-4 border border-[#EADFC9]/40 rounded-2xl pointer-events-none" />

          {/* Gold Monogram Header */}
          <div className="flex flex-col items-center justify-center mb-8 relative">
            <div className="w-10 h-10 rounded-full border border-[#C6A769]/30 flex items-center justify-center text-[#C6A769] mb-2 bg-[#FAF7F2]">
              <span className="font-serif text-sm tracking-widest font-semibold">K</span>
            </div>
            <div className="w-8 h-[1px] bg-[#C6A769]/20" />
          </div>

          {/* Letter Content */}
          <div className="font-serif text-[15px] sm:text-base md:text-[17px] leading-loose text-left whitespace-pre-line italic text-[#4A4031] font-light px-2 sm:px-4">
            {letterText}
          </div>

          {/* Monogram / Signature Footer */}
          <div className="mt-10 flex flex-col items-end px-2 sm:px-4">
            <div className="w-12 h-[1px] bg-[#C6A769]/20 mb-3" />
            <span className="font-serif text-[#C6A769] text-lg md:text-xl font-light italic">
              — Balwant
            </span>
          </div>

          {/* Small decorative heart watermark */}
          <div className="absolute bottom-4 left-4 text-[#C6A769]/10">
            <Heart size={18} fill="currentColor" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
