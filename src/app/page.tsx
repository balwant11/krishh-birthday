import React from "react";
import HeroSection from "@/components/HeroSection";
import BeforeUs from "@/components/BeforeUs";
import Timeline from "@/components/Timeline";
import Understood from "@/components/Understood";
import LifePaused from "@/components/LifePaused";
import WeekendLove from "@/components/WeekendLove";
import MoodToggle from "@/components/MoodToggle";
import VoiceLetter from "@/components/VoiceLetter";
import MemoryScrapbook from "@/components/MemoryScrapbook";
import Ending from "@/components/Ending";
import AudioPlayer from "@/components/AudioPlayer";

export const metadata = {
  title: "For Krishh • Happy Birthday ❤️",
  description: "A cinematic space dedicated to my sweetheart. Being seen, understood, appreciated, and loved.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-charcoal">
      {/* Ambient background music control */}
      <AudioPlayer />

      {/* Cinematic scroll sections */}
      <main className="w-full">
        {/* Section 1 - Hero Intro */}
        <HeroSection />

        {/* Section 2 - Before Us */}
        <BeforeUs />

        {/* Section 3 - Then We Happened */}
        <Timeline />

        {/* Section 4 - Things You Don't Realize About Yourself */}
        <Understood />

        {/* Section 5 - The Life You Paused */}
        <LifePaused />

        {/* Section 6 - Weekend Love */}
        <WeekendLove />

        {/* Section 7 - Angry You vs Baby You */}
        <MoodToggle />

        {/* Section 8 - Voice Note / Audio Letter */}
        <VoiceLetter />

        {/* Section 9 - Gallery / Memories Scrapbook */}
        <MemoryScrapbook />

        {/* Section 10 - Final Ending */}
        <Ending />
      </main>
    </div>
  );
}
