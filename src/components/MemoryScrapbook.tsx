"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";

export default function MemoryScrapbook() {
  const { title, subtitle, items } = birthdayConfig.scrapbook;
  const [zIndexList, setZIndexList] = useState<string[]>(
    items.map((i) => i.id),
  );
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Bring clicked/dragged card to the top
  const bringToFront = (id: string) => {
    setZIndexList((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-beige/30 text-charcoal overflow-hidden select-none min-h-screen flex flex-col justify-center">
      {/* Decorative details */}
      <div className="absolute top-10 left-10 text-gold-soft/10 animate-[pulse_4s_infinite] pointer-events-none text-2xl font-serif">
        ✨
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold">
            chapter eight
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-gold-soft/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-charcoal/70 leading-relaxed px-2">
            {subtitle}
          </p>
        </div>

        {/* Polaroid Scrapbook Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[540px] md:h-[620px] bg-cream/40 border border-beige/40 rounded-3xl p-4 md:p-6 shadow-inner overflow-hidden"
        >
          {/* Instructions watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-charcoal/5 font-sans font-black uppercase text-5xl md:text-7xl tracking-widest text-center select-none pointer-events-none">
            memories
          </div>

          <div className="absolute top-4 right-6 text-[9px] uppercase tracking-[0.15em] text-charcoal/40 font-sans pointer-events-none">
            ✦ toss them around
          </div>

          {/* Draggable Cards */}
          {items.map((card, index) => {
            const zIndexValue = zIndexList.indexOf(card.id) + 10;

            // Random positioning optimized to fit the viewport without bottom-clipping
            const leftPositions = isMobile
              ? ["4%", "44%", "12%", "48%", "6%", "42%", "22%"]
              : ["8%", "52%", "24%", "58%", "12%", "42%", "34%"];
            const topPositions = isMobile
              ? ["4%", "8%", "25%", "34%", "44%", "16%", "52%"]
              : ["8%", "12%", "35%", "48%", "54%", "20%", "60%"];

            const cardLeft = leftPositions[index] || "20%";
            const cardTop = topPositions[index] || "20%";

            return (
              <motion.div
                key={card.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.05}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
                onDragStart={() => bringToFront(card.id)}
                onTap={() => bringToFront(card.id)}
                style={{
                  left: cardLeft,
                  top: cardTop,
                  zIndex: zIndexValue,
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: card.rotation }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileDrag={{ scale: 1.05, rotate: card.rotation + 3 }}
                whileHover={{ scale: 1.02 }}
                className="absolute w-[160px] md:w-[220px] bg-[#FAF8F5] border border-[#EADFC9]/70 p-3 md:p-4 rounded-xl shadow-[0_8px_25px_rgba(26,20,10,0.06)] hover:shadow-[0_20px_45px_rgba(26,20,10,0.12)] cursor-grab active:cursor-grabbing flex flex-col gap-2.5 group transition-all duration-500 ease-out"
              >
                {/* Vintage Frosted Washi Tape Pin */}
                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 flex justify-center w-full z-30 pointer-events-none">
                  <div className="w-12 h-3.5 bg-white/40 backdrop-blur-[1px] border-l border-r border-white/20 rotate-[-3deg] opacity-75 shadow-sm group-hover:bg-white/60 transition-all duration-300" />
                </div>

                {/* Photo frame */}
                <div
                  className={`w-full ${card.aspectRatio} bg-gradient-to-tr ${card.imagePlaceholderColor} rounded-lg relative overflow-hidden flex items-center justify-center border border-charcoal/5 shadow-sm`}
                >
                  {/* Real Image Tag */}
                  <img
                    src={card.imageUrl || `/memories/photo${card.id}.jpg`}
                    alt={card.caption}
                    className="absolute inset-0 w-full h-full object-cover z-10 filter sepia-[0.25] contrast-[1.02] saturate-[0.8] brightness-[0.98] group-hover:filter-none transition-all duration-700 ease-in-out"
                    onError={(e) => {
                      // Silently fallback to elegant gradient if file doesn't exist yet
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Recessed 3D shadow overlay over the photo */}
                  <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] rounded-lg z-20 pointer-events-none" />

                  {/* Photo Frame Watermark / Number */}
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-charcoal/10 select-none">
                    photo {card.id}
                  </span>
                </div>

                {/* Aesthetic separator */}
                <div className="w-1 h-1 rounded-full bg-gold-soft/20 mx-auto group-hover:bg-gold-soft/40 transition-colors duration-300" />

                {/* Caption / Serif Italic Style */}
                <div className="text-center select-none pt-1 flex items-center justify-center px-1">
                  <p className="font-serif italic text-xs md:text-sm text-[#4A4031]/80 group-hover:text-[#4A4031] leading-relaxed tracking-wide transition-colors duration-300">
                    {card.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
