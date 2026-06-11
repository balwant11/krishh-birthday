"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { birthdayConfig } from "../config/birthday";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the audio element with the user's uploaded MP3
    const audio = new Audio("/birthday.mp3");
    audio.loop = true;
    audio.volume = birthdayConfig.music.volume || 0.3; // Use config volume or fallback
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Autoplay failed or audio play error:", error);
        });
    }
  };

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
