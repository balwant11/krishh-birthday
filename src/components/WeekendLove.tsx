"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthday";
import { MapPin, Calendar, Clock, Heart, Train } from "lucide-react";

export default function WeekendLove() {
  const { title, subtitle, cities, distanceText, waitingDetails, poetry } =
    birthdayConfig.weekendLove;

  const [currentDay, setCurrentDay] = useState(1); // Default to Tuesday

  useEffect(() => {
    // Set to real day of the week (0 = Sunday, 1 = Monday, 2 = Tuesday...)
    const day = new Date().getDay();
    setCurrentDay(day === 0 ? 7 : day); // Map Sunday to 7
  }, []);

  const daysOfWeek = [
    { label: "M", name: "Monday", text: "Counting hours..." },
    { label: "T", name: "Tuesday", text: "Long phone calls." },
    { label: "W", name: "Wednesday", text: "Halfway there." },
    { label: "T", name: "Thursday", text: "Packing bags." },
    { label: "F", name: "Friday", text: "The train ride home!", highlight: true },
    { label: "S", name: "Saturday", text: "Together.", highlight: true, gold: true },
    { label: "S", name: "Sunday", text: "Every second counts.", highlight: true, gold: true },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-beige/40 text-charcoal overflow-hidden select-none">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-sans font-semibold">
            chapter five
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-gold-soft/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-charcoal/70 leading-relaxed max-w-xl mx-auto px-2">
            {subtitle}
          </p>
        </div>

        {/* Interactive Route Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-24">
          <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
            <div className="flex items-center gap-3 bg-cream border border-beige p-4 md:p-5 rounded-2xl shadow-sm">
              <MapPin size={20} className="text-gold-soft flex-shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-soft font-sans font-bold">
                  The Distance
                </h4>
                <p className="text-xs md:text-sm font-sans font-light text-charcoal/80 mt-0.5">
                  {distanceText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cream border border-beige p-4 md:p-5 rounded-2xl shadow-sm">
              <Clock size={20} className="text-gold-soft flex-shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-soft font-sans font-bold">
                  The Journey
                </h4>
                <p className="text-xs md:text-sm font-sans font-light text-charcoal/80 mt-0.5">
                  2 hours on the train. Railway tracks that know our voices by heart.
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm font-sans font-light text-charcoal/70 leading-relaxed px-1 mt-2">
              {waitingDetails}
            </p>
          </div>

          {/* Animated SVG Map */}
          <div className="lg:col-span-6 bg-cream border border-beige p-4 md:p-8 rounded-3xl shadow-sm flex flex-col justify-center h-[260px] md:h-[280px] relative order-1 lg:order-2 overflow-hidden">
            <div className="absolute top-4 left-6 text-[9px] uppercase tracking-[0.15em] text-charcoal/40 font-sans font-semibold">
              rail route map
            </div>
            
            {/* Map Container */}
            <div className="relative w-full h-[150px] flex items-center justify-between px-4 md:px-8 mt-4">
              {/* Ahmedabad node */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cream border-2 border-gold-soft flex items-center justify-center shadow-md">
                  <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-gold-soft" />
                </div>
                <span className="text-[10px] md:text-xs font-serif font-bold tracking-wide text-charcoal">
                  {cities.husband}
                </span>
              </div>

              {/* Connecting Railway SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 320 160" fill="none">
                  {/* Background track sleepers (wood ties) */}
                  <path
                    d="M 60 80 Q 160 30 260 80"
                    stroke="#E8DDD0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="2,10"
                    opacity="0.6"
                  />
                  {/* Background rails */}
                  <path
                    d="M 60 80 Q 160 30 260 80"
                    stroke="#E8DDD0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  
                  {/* Animated Progress Rails */}
                  <motion.path
                    d="M 60 80 Q 160 30 260 80"
                    stroke="#C6A769"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Animated Progress Sleepers */}
                  <motion.path
                    d="M 60 80 Q 160 30 260 80"
                    stroke="#C6A769"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="2,10"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  
                  {/* Moving Train Node */}
                  <motion.g
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                      ease: "easeInOut",
                    }}
                    style={{
                      motionPath: "path('M 60 80 Q 160 30 260 80')",
                    }}
                  >
                    <foreignObject x="-10" y="-12" width="20" height="24">
                      <div className="flex flex-col items-center justify-center">
                        <Train
                          size={14}
                          className="text-gold-soft filter drop-shadow-[0_0_4px_rgba(198,167,105,0.7)]"
                        />
                        <Heart
                          size={8}
                          fill="#D8B4B4"
                          className="text-pink-dust animate-pulse -mt-1"
                        />
                      </div>
                    </foreignObject>
                  </motion.g>
                </svg>
              </div>

              {/* Baroda node */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cream border-2 border-pink-dust flex items-center justify-center shadow-md">
                  <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-pink-dust animate-pulse" />
                </div>
                <span className="text-[10px] md:text-xs font-serif font-bold tracking-wide text-charcoal">
                  {cities.wife}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Countdown Progress */}
        <div className="bg-cream border border-beige p-5 md:p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={18} className="text-gold-soft" />
            <h3 className="text-sm md:text-base font-serif font-semibold tracking-wide">
              The Weekday Countdown
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-1.5 xs:gap-2 md:gap-4 justify-items-center">
            {daysOfWeek.map((day, idx) => {
              const dayNum = idx + 1;
              const isActive = dayNum === currentDay;
              
              let borderStyle = "border-beige";
              let bgStyle = "bg-cream text-charcoal/50";
              
              if (isActive) {
                borderStyle = day.gold ? "border-gold-soft shadow-[0_0_12px_rgba(198,167,105,0.25)]" : "border-pink-dust shadow-[0_0_12px_rgba(216,180,180,0.25)]";
                bgStyle = day.gold ? "bg-gold-soft text-cream font-bold" : "bg-pink-dust text-cream font-bold";
              } else if (dayNum < currentDay) {
                bgStyle = "bg-beige/30 text-charcoal/30 line-through";
              } else if (day.highlight) {
                borderStyle = day.gold ? "border-gold-soft/40" : "border-pink-dust/40";
                bgStyle = "bg-cream text-charcoal/80";
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 w-full">
                  <div
                    className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border ${borderStyle} ${bgStyle} flex items-center justify-center text-xs sm:text-sm font-sans transition-all duration-300 cursor-default`}
                  >
                    {day.label}
                  </div>
                  <span className="text-[8px] md:text-[10px] text-charcoal/40 text-center font-sans tracking-tight font-medium max-w-[64px] hidden sm:block">
                    {isActive ? "Today" : day.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Today message */}
          <div className="mt-5 text-center text-[11px] md:text-xs font-serif italic text-charcoal/60">
            {daysOfWeek[currentDay - 1] ? (
              <span>
                Today is {daysOfWeek[currentDay - 1].name}: "{daysOfWeek[currentDay - 1].text}"
              </span>
            ) : null}
          </div>
        </div>

        {/* Poetry / Shayari Block */}
        {poetry && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mt-16 text-center max-w-xl mx-auto border-t border-b border-gold-soft/20 py-8 px-4"
          >
            <p className="text-base md:text-lg font-serif italic text-charcoal/90 leading-relaxed font-medium">
              "{poetry[0]}"
            </p>
            <p className="text-base md:text-lg font-serif italic text-charcoal/90 leading-relaxed font-medium mt-2">
              "{poetry[1]}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
