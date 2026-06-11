"use client";

import React, { useEffect, useRef, useState } from "react";
import { birthdayConfig } from "../config/birthday";
import { AnimatePresence, motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  quoteIndex: number;
  pulseSpeed: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [quotePosition, setQuotePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    const starCount = 80;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.05 + 0.01,
          quoteIndex: Math.floor(Math.random() * birthdayConfig.starQuotes.length),
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Pulse alpha
        star.alpha += star.pulseSpeed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        // Float upwards
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Draw star with soft glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#C6A769";
        ctx.fillStyle = `rgba(248, 244, 238, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset shadow blur
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    // Click handler for stars
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find closest star
      let clickedStar: Star | null = null;
      let minDistance = window.innerWidth < 768 ? 35 : 25; // Larger click radius for touch targets on mobile

      stars.forEach((star: Star) => {
        const dist = Math.hypot(star.x - clickX, star.y - clickY);
        if (dist < minDistance) {
          minDistance = dist;
          clickedStar = star;
        }
      });

      if (clickedStar) {
        const quote = birthdayConfig.starQuotes[(clickedStar as Star).quoteIndex];
        setActiveQuote(quote);
        
        // Calculate safe boundaries based on tooltip width (w-56 = 224px on mobile, w-72 = 288px on desktop)
        const tooltipWidth = window.innerWidth < 640 ? 224 : 288;
        const halfWidth = tooltipWidth / 2;
        const margin = 16;
        
        const boundedX = Math.min(
          Math.max(clickX, halfWidth + margin),
          window.innerWidth - (halfWidth + margin)
        );

        setQuotePosition({
          x: boundedX,
          y: Math.max(clickY - 20, 40), // Positioned directly above the star
        });

        // Hide quote after 4.5 seconds
        const timer = setTimeout(() => {
          setActiveQuote((prev) => (prev === quote ? null : prev));
        }, 4500);

        return () => clearTimeout(timer);
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal via-transparent to-charcoal/80" />
      
      {/* Click instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-gold-soft/50 pointer-events-none select-none font-sans text-center">
        ✦ click the stars to read my hidden thoughts ✦
      </div>

      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            style={{
              position: "absolute",
              left: `${quotePosition.x}px`,
              top: `${quotePosition.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            className="z-50 bg-charcoal/95 border border-gold-soft/30 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_4px_25px_rgba(198,167,105,0.25)] text-cream text-[13px] sm:text-sm md:text-[15px] font-serif italic text-center w-56 sm:w-72 pointer-events-auto leading-relaxed"
          >
            <div className="text-[10px] sm:text-[11px] text-gold-soft font-sans not-italic uppercase tracking-[0.18em] mb-1 font-semibold">
              a quiet thought
            </div>
            "{activeQuote}"
            
            {/* Beautiful pointer arrow pointing down towards the clicked star */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-charcoal border-r border-b border-gold-soft/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
