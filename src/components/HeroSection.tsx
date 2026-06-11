"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Starfield from "./Starfield";
import confetti from "canvas-confetti";

const getOrdinalSuffix = (num: number) => {
  const j = num % 10, k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
};

export default function HeroSection() {
  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
    targetAge: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: false, targetAge: 24 });

  useEffect(() => {
    // Phase 0: "This is not just a birthday website." (lasts 3.5s)
    // Phase 1: "It is a small proof that your existence matters deeply to me." (lasts 4.5s)
    // Phase 2: "Happy Birthday ❤️" (remains)
    const triggerConfetti = () => {
      const colors = ["#C6A769", "#D8B4B4", "#F8F4EE"];
      
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: colors,
      });
    };

    const timer1 = setTimeout(() => setPhase(1), 3500);
    const timer2 = setTimeout(() => {
      setPhase(2);
      triggerConfetti();
    }, 8500);

    const calculateTimeLeft = () => {
      const now = new Date();
      const birthYear = 2002;
      const currentYear = now.getFullYear();
      
      const currentMonth = now.getMonth(); // 5 is June
      const currentDate = now.getDate();
      
      let targetYear = currentYear;
      let isBirthday = false;

      // Celebrate her birthday on June 12th
      if (currentMonth === 5 && currentDate === 12) {
        isBirthday = true;
      } else if (currentMonth > 5 || (currentMonth === 5 && currentDate > 12)) {
        // From June 13th onwards, target next year's birthday
        targetYear = currentYear + 1;
      }

      const targetDate = new Date(targetYear, 5, 12, 0, 0, 0);
      const targetAge = targetYear - birthYear;

      let timeLeftData = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isBirthday,
        targetAge,
      };

      if (!isBirthday) {
        const difference = +targetDate - +now;
        if (difference > 0) {
          timeLeftData = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isBirthday: false,
            targetAge,
          };
        } else {
          timeLeftData.isBirthday = true;
        }
      }

      return timeLeftData;
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal select-none">
      {/* Canvas Starfield Background */}
      <Starfield />

      {/* Main Cinematic Text */}
      <div className="z-10 text-center px-6 max-w-3xl pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.h1
              key="hero-text-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-2xl md:text-3xl font-serif text-cream italic tracking-wide font-light leading-relaxed"
            >
              This is not just a birthday website.
            </motion.h1>
          )}

          {phase === 1 && (
            <motion.h1
              key="hero-text-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-2xl md:text-3xl font-serif text-cream italic tracking-wide font-light leading-relaxed"
            >
              It is a small, quiet proof that your existence matters deeply to me.
            </motion.h1>
          )}

          {phase === 2 && (
            <motion.div
              key="hero-text-final"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="text-[10px] uppercase tracking-[0.3em] text-gold-soft font-sans font-semibold"
              >
                a corner of the internet for Krishh
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-serif text-cream tracking-wide font-light">
                Happy Birthday, My Beautiful Wife <span className="text-pink-dust animate-[pulse_1.5s_infinite]">❤️</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="text-xs md:text-sm text-beige font-serif italic max-w-md mt-4 leading-relaxed"
              >
                "Being seen, understood, appreciated, and loved."
              </motion.p>

              {/* Birthday Countdown / Milestone */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2.0, duration: 1.5 }}
                className="mt-8 px-5 py-2 rounded-full border border-gold-soft/20 bg-charcoal/30 backdrop-blur-sm text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-soft font-sans font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-soft animate-pulse" />
                {timeLeft.isBirthday ? (
                  <span>Officially {timeLeft.targetAge} • Happy Birthday, Krishh! 🎉</span>
                ) : (
                  <span>
                    Counting to your {getOrdinalSuffix(timeLeft.targetAge)}: {timeLeft.days}d • {timeLeft.hours}h • {timeLeft.minutes}m • {timeLeft.seconds}s
                  </span>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Down Indicator */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-cream font-sans">
              scroll down
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cream to-transparent relative overflow-hidden">
              <motion.div
                animate={{
                  y: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-0 w-full h-4 bg-gold-soft"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
