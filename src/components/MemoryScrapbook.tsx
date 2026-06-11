"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { X } from "lucide-react";

export default function MemoryScrapbook() {
  const { title, subtitle, items } = birthdayConfig.scrapbook;
  const [zIndexList, setZIndexList] = useState<string[]>(items.map((i) => i.id));
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<any | null>(null);

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
        <div className="relative w-full h-[540px] md:h-[620px] bg-cream/40 border border-beige/40 rounded-3xl p-4 md:p-6 shadow-inner overflow-hidden">
          {/* Instructions watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-charcoal/5 font-sans font-black uppercase text-5xl md:text-7xl tracking-widest text-center select-none pointer-events-none">
            memories
          </div>

          <div className="absolute top-4 right-6 text-[9px] uppercase tracking-[0.15em] text-charcoal/40 font-sans pointer-events-none">
            ✦ toss them around & tap to read
          </div>

          {/* Draggable Cards */}
          {items.map((card, index) => {
            const zIndexValue = zIndexList.indexOf(card.id) + 10;
            
            // Random positioning optimized to fit the viewport without bottom-clipping
            const leftPositions = isMobile 
               ? ["4%", "44%", "12%", "48%", "6%", "42%"]
               : ["8%", "52%", "24%", "58%", "12%", "42%"];
            const topPositions = isMobile
               ? ["4%", "8%", "25%", "34%", "44%", "16%"]
               : ["8%", "12%", "35%", "48%", "54%", "20%"];
            
            const cardLeft = leftPositions[index] || "20%";
            const cardTop = topPositions[index] || "20%";

            return (
              <motion.div
                key={card.id}
                drag
                dragConstraints={isMobile 
                  ? { left: -10, right: 160, top: -10, bottom: 210 } 
                  : { left: -50, right: 400, top: -50, bottom: 300 }
                }
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
                onDragStart={() => bringToFront(card.id)}
                onTap={() => {
                  bringToFront(card.id);
                  setActiveCard(card);
                }}
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
                className="absolute w-[160px] md:w-[220px] bg-[#fbfbfa] border border-beige/60 p-3 md:p-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing flex flex-col gap-3 group transition-all duration-300"
              >
                {/* Vintage Tape Pin */}
                <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 text-gold-soft/30 flex justify-center w-full z-20">
                  <div className="w-10 h-3 bg-beige/60 rotate-[-4deg] opacity-70 group-hover:bg-gold-soft/20 transition-all duration-300" />
                </div>

                {/* Photo frame */}
                <div className={`w-full ${card.aspectRatio} bg-gradient-to-tr ${card.imagePlaceholderColor} rounded-lg relative overflow-hidden flex items-center justify-center border border-charcoal/5`}>
                  {/* Real Image Tag */}
                  <img
                    src={`/memories/photo${card.id}.jpg`}
                    alt={card.caption}
                    className="absolute inset-0 w-full h-full object-cover z-10 filter sepia-[0.18] contrast-[1.04] brightness-[1.01] saturate-[0.9]"
                    onError={(e) => {
                      // Silently fallback to elegant gradient if file doesn't exist yet
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Photo Frame Watermark / Number */}
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-charcoal/10 select-none">
                    photo {card.id}
                  </span>
                </div>

                {/* Caption / Serif Italic Style */}
                <div className="pt-2 text-center select-none min-h-[36px] flex items-center justify-center px-1">
                  <p className="font-serif italic text-xs md:text-sm text-charcoal/85 leading-relaxed tracking-wide">
                    {card.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo Details Modal */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4 md:p-6"
            onClick={() => setActiveCard(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-6 right-6 text-beige/60 hover:text-cream hover:scale-105 transition-all duration-300 z-50 p-2 rounded-full border border-beige/10 hover:bg-beige/5"
            >
              <X size={20} />
            </button>

            {/* Modal Content Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="w-full max-w-4xl bg-[#fbfbfa] border border-beige/40 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 items-center text-charcoal"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              {/* Photo Side */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className={`w-[220px] md:w-[260px] lg:w-[300px] ${activeCard.aspectRatio} bg-gradient-to-tr ${activeCard.imagePlaceholderColor} rounded-xl relative overflow-hidden shadow-lg border border-charcoal/5 p-4 flex flex-col bg-[#fbfbfa]`}>
                  {/* Tape */}
                  <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 text-gold-soft/30 flex justify-center w-full z-20">
                    <div className="w-12 h-4 bg-beige/60 rotate-[-3deg] opacity-70" />
                  </div>

                  <div className="w-full h-full relative rounded-lg overflow-hidden border border-charcoal/5 bg-charcoal/5">
                    <img
                      src={`/memories/photo${activeCard.id}.jpg`}
                      alt={activeCard.caption}
                      className="absolute inset-0 w-full h-full object-cover filter sepia-[0.18] contrast-[1.04] brightness-[1.01] saturate-[0.9]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-sans uppercase font-bold tracking-widest text-charcoal/10 select-none">
                      photo {activeCard.id}
                    </div>
                  </div>
                  <div className="pt-4 text-center select-none">
                    <p className="font-serif italic text-xs md:text-sm text-charcoal/60 leading-relaxed">
                      photo {activeCard.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold-soft font-sans font-bold">
                  memory notes • chapter eight
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-charcoal leading-relaxed font-medium">
                  "{activeCard.caption}"
                </h3>
                <div className="h-[1px] bg-gold-soft/20 w-16 my-2 mx-auto md:mx-0" />
                <p className="text-sm md:text-base font-serif italic text-charcoal/70 leading-relaxed max-w-md">
                  {activeCard.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
