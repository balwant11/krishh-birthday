"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw, VolumeX, Volume2 } from "lucide-react";
import { birthdayConfig } from "../config/birthday";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceLetter() {
  const { title, subtitle, letterText } = birthdayConfig.voiceLetter;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Split letter into sentences or short paragraphs for typing reveals
  const lines = letterText.split("\n\n");

  useEffect(() => {
    if (!isPlaying) return;

    if (textIndex < lines.length) {
      const currentFullLine = lines[textIndex];
      let charIdx = 0;
      setTypedText("");

      const interval = setInterval(() => {
        setTypedText((prev) => prev + currentFullLine.charAt(charIdx));
        charIdx++;

        if (charIdx >= currentFullLine.length) {
          clearInterval(interval);
          // Auto advance to next paragraph after a pause
          const nextTimer = setTimeout(() => {
            if (textIndex + 1 < lines.length) {
              setTextIndex((prev) => prev + 1);
            } else {
              setIsFinished(true);
            }
          }, 3500);
          return () => clearTimeout(nextTimer);
        }
      }, 35); // Typing speed

      return () => clearInterval(interval);
    }
  }, [isPlaying, textIndex]);

  // Web Audio Synth for Voice Letter (Soft, intimate string pad drone)
  const startAudioSynth = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2.5); // Warm, gentle level
    masterGain.connect(ctx.destination);
    synthGainRef.current = masterGain;

    // We synthesize a soft drone: F3 (174.61Hz), A3 (220.0Hz), C4 (261.63Hz), E4 (329.63Hz) - Fmaj7
    const frequencies = [174.61, 220.0, 261.63, 329.63];
    oscsRef.current = frequencies.map((freq, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      
      // Detune slightly for chorus effect
      osc.detune.value = (index - 1.5) * 6;

      // Slow LFO filter for volume swelling
      oscGain.gain.value = 0.05 + Math.random() * 0.05;
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      osc.start();
      return osc;
    });

    drawWaveform();
  };

  const stopAudioSynth = () => {
    const masterGain = synthGainRef.current;
    const ctx = audioCtxRef.current;

    if (masterGain && ctx) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }

    setTimeout(() => {
      oscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      oscsRef.current = [];
      if (ctx) {
        ctx.close();
      }
      audioCtxRef.current = null;
      synthGainRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearCanvas();
    }, 1500);
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(198, 167, 105, 0.4)";
      ctx.lineWidth = 1.5;

      const waves = 4;
      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        const amplitude = (canvas.height / 3.5) * ((waves - w) / waves) * (isPlaying ? 1.0 : 0.1);
        const speed = 0.03 + w * 0.01;
        const frequency = 0.015 - w * 0.002;

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * frequency + phase * speed) * amplitude * Math.sin(x / 40);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      phase += 1;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudioSynth();
      setIsPlaying(false);
    } else {
      startAudioSynth();
      setIsPlaying(true);
      if (isFinished) {
        setTypedText("");
        setTextIndex(0);
        setIsFinished(false);
      }
    }
  };

  const handleReset = () => {
    stopAudioSynth();
    setIsPlaying(false);
    setTypedText("");
    setTextIndex(0);
    setIsFinished(false);
  };

  useEffect(() => {
    // Canvas sizing
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = 60;
    }

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      stopAudioSynth();
    };
  }, []);

  const intervalIdRef = useRef<any>(null);

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-charcoal text-cream overflow-hidden select-none">
      {/* Background radial light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-soft/5 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-pink-dust font-sans font-semibold opacity-70">
            chapter seven
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 font-light tracking-wide">
            {title}
          </h2>
          <div className="h-[1px] bg-pink-dust/30 w-16 mx-auto my-6" />
          <p className="text-sm md:text-base font-serif italic text-beige/80 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Audio letter Cassette / Player UI */}
        <div className="w-full max-w-xl bg-charcoal/50 border border-beige/10 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-6 relative overflow-hidden mb-12">
          {/* Neon accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-soft/20 to-transparent" />

          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-soft font-sans font-bold">
              audio letter • cassette-A
            </span>
            <span className="text-[9px] font-sans text-beige/40">
              {isPlaying ? "playing" : "paused"}
            </span>
          </div>

          {/* Visualizer box */}
          <div className="w-full h-16 bg-charcoal/90 rounded-2xl border border-beige/5 relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
            {!isPlaying && (
              <span className="absolute text-[10px] uppercase tracking-[0.2em] text-gold-soft/40 font-sans pointer-events-none">
                click play to listen & read
              </span>
            )}
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleReset}
              disabled={textIndex === 0 && !isPlaying}
              className="w-10 h-10 rounded-full border border-beige/10 flex items-center justify-center text-beige/50 hover:text-cream disabled:opacity-40 hover:bg-beige/5 transition-all duration-300"
              aria-label="Restart letter"
            >
              <RefreshCw size={14} />
            </button>

            <button
              onClick={handlePlayToggle}
              className="w-16 h-16 rounded-full bg-cream hover:bg-white text-charcoal flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} className="translate-x-[2px]" fill="currentColor" />}
            </button>

            <div className="w-10 h-10 flex items-center justify-center text-beige/40">
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </div>
          </div>
        </div>

        {/* Typed letter text reveal container */}
        <div className="w-full max-w-xl min-h-[160px] flex items-center justify-center px-4 relative">
          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-center font-serif text-cream text-lg md:text-xl font-light leading-relaxed italic whitespace-pre-line"
              >
                {typedText}
                <span className="inline-block w-1.5 h-4 ml-1 bg-gold-soft animate-[pulse_0.8s_infinite]" />
              </motion.div>
            )}

            {!isPlaying && textIndex === 0 && (
              <motion.div
                key="instruction-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-center font-serif text-beige text-sm md:text-base italic leading-relaxed"
              >
                "Let the silence fall, take a deep breath, and hit play."
              </motion.div>
            )}
            
            {isFinished && !isPlaying && (
              <motion.div
                key="finished-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                className="text-center font-serif text-gold-soft text-base md:text-lg italic font-light"
              >
                "With all my heart, happy birthday my sweetheart."
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
