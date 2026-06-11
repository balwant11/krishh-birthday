"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { birthdayConfig } from "../config/birthday";

interface MelodyNote {
  note: string;
  freq: number;
  beats: number;
}

// "Happy Birthday to You" melody in C Major (3/4 time signature)
const birthdayMelody: MelodyNote[] = [
  { note: "G4", freq: 392.00, beats: 0.75 },
  { note: "G4", freq: 392.00, beats: 0.25 },
  { note: "A4", freq: 440.00, beats: 1.0 },
  { note: "G4", freq: 392.00, beats: 1.0 },
  { note: "C5", freq: 523.25, beats: 1.0 },
  { note: "B4", freq: 493.88, beats: 2.0 },
  
  { note: "G4", freq: 392.00, beats: 0.75 },
  { note: "G4", freq: 392.00, beats: 0.25 },
  { note: "A4", freq: 440.00, beats: 1.0 },
  { note: "G4", freq: 392.00, beats: 1.0 },
  { note: "D5", freq: 587.33, beats: 1.0 },
  { note: "C5", freq: 523.25, beats: 2.0 },
  
  { note: "G4", freq: 392.00, beats: 0.75 },
  { note: "G4", freq: 392.00, beats: 0.25 },
  { note: "G5", freq: 783.99, beats: 1.0 },
  { note: "E5", freq: 659.25, beats: 1.0 },
  { note: "C5", freq: 523.25, beats: 1.0 },
  { note: "B4", freq: 493.88, beats: 1.0 },
  { note: "A4", freq: 440.00, beats: 2.0 },
  
  { note: "F5", freq: 698.46, beats: 0.75 },
  { note: "F5", freq: 698.46, beats: 0.25 },
  { note: "E5", freq: 659.25, beats: 1.0 },
  { note: "C5", freq: 523.25, beats: 1.0 },
  { note: "D5", freq: 587.33, beats: 1.0 },
  { note: "C5", freq: 523.25, beats: 2.0 },
  
  // Extra space/silence at the end of the loop
  { note: "REST", freq: 0, beats: 2.0 }
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const timeoutIdRef = useRef<any>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master volume control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Create a beautiful music box echo delay
    const delay = ctx.createDelay(1.0);
    const delayGain = ctx.createGain();
    const delayFilter = ctx.createBiquadFilter();

    delay.delayTime.value = 0.5; // 500ms echo
    delayGain.gain.value = 0.35; // Soft feedback echo
    delayFilter.type = "lowpass";
    delayFilter.frequency.value = 1200; // Dampen echo high frequencies for warmth

    delay.connect(delayFilter);
    delayFilter.connect(delayGain);
    delayGain.connect(delay);

    delay.connect(masterGain);
    delayNodeRef.current = delay;
  };

  const playMusicBoxChime = (freq: number, startTime: number, duration: number) => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain || freq === 0) return;

    // Fundamental note
    const osc1 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = freq;

    // Octave overtone to simulate music box metal chime pluck
    const osc2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2;

    // Envelope for fundamental note (instant pluck, long ring-out)
    gainNode1.gain.setValueAtTime(0, startTime);
    gainNode1.gain.linearRampToValueAtTime(0.22, startTime + 0.01);
    gainNode1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.8);

    // Envelope for overtone (quieter, faster decay)
    gainNode2.gain.setValueAtTime(0, startTime);
    gainNode2.gain.linearRampToValueAtTime(0.07, startTime + 0.01);
    gainNode2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.4);

    osc1.connect(gainNode1);
    osc2.connect(gainNode2);

    gainNode1.connect(masterGain);
    gainNode2.connect(masterGain);

    if (delayNodeRef.current) {
      gainNode1.connect(delayNodeRef.current);
      gainNode2.connect(delayNodeRef.current);
    }

    osc1.start(startTime);
    osc1.stop(startTime + duration + 1.0);

    osc2.start(startTime);
    osc2.stop(startTime + duration + 1.0);
  };

  const playMelodyLoop = () => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    let time = ctx.currentTime + 0.1;
    const beatDuration = 60 / 105; // 105 BPM (pleasant walking speed for Happy Birthday)

    birthdayMelody.forEach((note) => {
      const duration = note.beats * beatDuration;
      if (note.freq > 0) {
        playMusicBoxChime(note.freq, time, duration);
      }
      time += duration;
    });

    // Loop the melody when it ends (total beats in melody is 26)
    const totalDuration = 26 * beatDuration;
    const timeoutId = setTimeout(() => {
      playMelodyLoop();
    }, totalDuration * 1000);

    timeoutIdRef.current = timeoutId;
  };

  const startMusicLoop = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Fade master volume in gently
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(birthdayConfig.music.volume * 1.5, ctx.currentTime + 1.5);

    // Start melody play loop
    playMelodyLoop();
    setIsPlaying(true);
  };

  const stopMusicLoop = () => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (ctx && masterGain) {
      // Fade master volume out
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
    }

    // Clear timeout loops
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusicLoop();
    } else {
      startMusicLoop();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 pointer-events-auto">
      <button
        onClick={togglePlayback}
        className="flex items-center gap-2 md:gap-3 bg-charcoal/80 text-cream border border-gold-soft/30 hover:border-gold-soft px-3.5 py-2 md:px-4 md:py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 group hover:scale-105"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isPlaying ? (
            <div className="flex gap-[3px] items-end justify-center w-full h-3">
              <span className="w-[3px] h-3 bg-gold-soft rounded-full animate-[pulse_0.8s_infinite_alternate]" />
              <span className="w-[3px] h-2 bg-gold-soft rounded-full animate-[pulse_0.6s_infinite_alternate_0.2s]" />
              <span className="w-[3px] h-3.5 bg-gold-soft rounded-full animate-[pulse_0.9s_infinite_alternate_0.1s]" />
              <span className="w-[3px] h-1.5 bg-gold-soft rounded-full animate-[pulse_0.5s_infinite_alternate_0.3s]" />
            </div>
          ) : (
            <Play size={15} className="text-gold-soft translate-x-[1px]" />
          )}
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-gold-soft/80 group-hover:text-gold-soft">
          {isPlaying ? "music on" : "play music"}
        </span>
      </button>
    </div>
  );
}
