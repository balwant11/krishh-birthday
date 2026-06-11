export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  details?: string;
}

export interface ScrapbookItem {
  id: string;
  caption: string;
  rotation: number;
  imagePlaceholderColor: string; // Dynamic elegant gradient if image is missing
  aspectRatio: string; // "aspect-square" or "aspect-[3/4]" or "aspect-[4/3]"
  details?: string; // Heartfelt longer message when photo is clicked
}

export const birthdayConfig = {
  wifeName: "Krishh",
  husbandName: "Balwant",

  // Custom Web Audio Music settings
  music: {
    tempo: 60, // Slow ambient BPM
    chordProgression: ["Cmaj9", "Am9", "Fmaj7", "Gadd4"],
    volume: 0.15, // Max volume for background loop
  },

  // Clickable Star Quotes (hidden easter eggs in dark sections)
  starQuotes: [
    "Your laugh is my absolute favorite sound in the world.",
    "I notice how quietly you handle everything. You are so strong.",
    "Thank you for being my safe haven.",
    "I love the way your eyes crinkle when you're genuinely happy.",
    "The world is a much softer, gentler place with you in it.",
    "You are my home.",
    "Every day with you is a quiet blessing.",
    "I see all the little sacrifices you make. They never go unnoticed.",
  ],

  // Section 2: Before Us
  beforeUs: {
    title: "Before Our Paths Crossed",
    subtitle:
      "A tribute to the girl who grew up quietly, holding her dreams close.",
    cards: [
      {
        emoji: "🏡",
        title: "Growing Up Away from Home",
        text: "Spending parts of your childhood away from your parents wasn't easy. Yet, instead of letting it harden you, it taught you how to quietly adapt, find strength in solitude, and cultivate an inner resilience.",
      },
      {
        emoji: "📚",
        title: "A Love for Learning",
        text: "You always valued your education and loved studying. For you, books weren't just pages; they were windows to independence, a way to build a future that was entirely your own.",
      },
      {
        emoji: "✨",
        title: "Unwavering Independence",
        text: "You learned early to stand on your own two feet. You carry a silent, beautiful pride in being able to handle things yourself, never wanting to be a burden to anyone.",
      },
      {
        emoji: "🌸",
        title: "Remaining Soft",
        text: "Despite the responsibilities piled on you and the moments you had to grow up too fast, you never lost your softness. Your heart remained tender, kind, and deeply caring.",
      },
    ],
  },

  // Section 3: Then We Happened
  timeline: {
    title: "How We Happened",
    subtitle: "A cinematic map of the days that changed our lives forever.",
    items: [
      {
        date: "23 Nov 2021",
        title: "Our Engagement",
        description: "The official promise.",
        details:
          "Nervous smiles, family blessings, and the quiet realization that our lives were about to merge into one beautiful story.",
      },
      {
        date: "5 Jan 2022",
        title: "The First Call",
        description: "Where hours dissolved into seconds.",
        details:
          "We were strangers trying to find common ground, but the conversation flowed so easily we forgot about the distance.",
      },
      {
        date: "14 Feb 2022",
        title: "First Meeting",
        description: "Seeing you in front of me.",
        details:
          "Valentine's Day. Sitting in that cozy cafe, heart racing with nervous excitement. The moment our eyes met across the table, all the text messages and calls suddenly became real.",
      },
      {
        date: "16 Feb 2023",
        title: "The Wedding Day",
        description: "Two lives, one forever.",
        details:
          "Holding your hand in front of the sacred fire, promising to walk beside you through every season of life.",
      },
    ] as TimelineItem[],
    extraContext: {
      distance: "Ahmedabad ↔ Baroda",
      details: [
        "Late-night Instagram DMs when we couldn't sleep.",
        "The endless waiting during weekdays, counting hours to the weekend.",
        "The Ahmedabad-Baroda railway track which started feeling like a bridge to happiness.",
        "Those little, silly fights that ended in longer phone calls and deeper understanding.",
        "Caring moments when one of us fell sick, and playful texts that kept us smiling.",
      ],
    },
  },

  // Section 4: Things You Don't Realize About Yourself
  unseenObservations: {
    title: "Things You Don't Realize About Yourself",
    subtitle: "The quiet magic in you that I get to witness every single day.",
    points: [
      {
        title: "Selfless Yet Self-Aware",
        observation:
          "You care deeply for everyone else's comfort and happiness, yet you also hold the beautiful wisdom to protect your own peace and care for yourself when you need it.",
      },
      {
        title: "The Tired Smile",
        observation:
          "Even on days when responsibilities drain you completely, you still find a way to smile. It is a quiet, beautiful strength that lights up the room.",
      },
      {
        title: "Our Pillar of Strength",
        observation:
          "During difficult times, you quietly step up and become the anchor. You don't make a fuss about it, but your presence makes everything feel safe.",
      },
      {
        title: "Pure Affection over Luxury",
        observation:
          "You want true presence, soft words, and deep connection far more than any luxury. A quiet walk or a warm hug means the world to you.",
      },
      {
        title: "Safe to be a Baby",
        observation:
          "The way you shed all your guard and become a baby around me. It's the ultimate proof that you feel completely safe, protected, and loved.",
      },
    ],
  },

  // Section 5: The Life You Paused
  lifePaused: {
    title: "The Life You Paused",
    subtitle:
      "An honest, loving acknowledgement of the dreams you put on hold.",
    introText:
      "I see the choices you make every day. Caring for the home, taking on family responsibilities, and quietly setting aside your studies and career dreams to ensure everything runs smoothly. I want you to know: your sacrifices are seen, and they are precious. But more importantly...",
    hopeTitle: "Your dreams are not gone. They are just waiting.",
    hopeText:
      "I still believe in your future. Your desire to study, to work, to create an independent identity—I am here to support it, not replace it. We will build it together.",
    futureElements: [
      {
        label: "Books & Knowledge",
        desc: "Reigniting your love for learning, diving back into books, and pursuing your education with pride.",
      },
      {
        label: "Career & Independence",
        desc: "Building your own path, achieving financial freedom, and stepping into the professional world at your own pace.",
      },
      {
        label: "Travel & Adventures",
        desc: "Wandering through the streets of Japan and checking off all the beautiful destinations on your travel list.",
      },
      {
        label: "Your Dream Wardrobe",
        desc: "Turning all those beautiful clothes saved in the cart into real outfits to wear and shine in.",
      },
      {
        label: "A Lifetime of Growth",
        desc: "Never having to choose between family and your own identity, growing stronger each day.",
      },
    ],
  },

  // Section 6: Weekend Love (Ahmedabad - Baroda)
  weekendLove: {
    title: "Weekend Love & Weekday Wait",
    subtitle:
      "The railway tracks between Ahmedabad and Baroda that witnessed our story.",
    cities: {
      husband: "Ahmedabad",
      wife: "Baroda",
    },
    distanceText: "110 km of longing, waiting, and train journeys.",
    waitingDetails:
      "Monday to Friday felt like a test of patience, but Friday evening felt like a victory. Sitting on the train, watching the stations pass by, was always filled with excitement because I was moving closer to you.",
    poetry: [
      "Kitna Kam pad jata hai vakt jab hum aur aap sath me hote hain",
      "Vakt raftaar pakad leta Hain jab hum aur aap sath me hote hain",
    ],
  },

  // Section 7: Angry vs Baby Mode
  moodToggle: {
    title: "The Dual States of You",
    subtitle:
      "A playful, affectionate look at the two sides of your personality.",
    angry: {
      title: "😤 Angry Mode",
      subtitle: "Handle with extreme care & chocolate.",
      points: [
        "The cute pouty face where you try to look serious but look adorable instead.",
        "Being angry just because she wants me to pamper her ('mai manau usko') and make it up to her.",
        "Expecting only gentle love and warmth in return, with absolutely zero angry reactions from me.",
        "Frowning because I didn't eat on time or didn't call when I reached safely (which is actually just love).",
      ],
    },
    baby: {
      title: "🥺 Baby Mode",
      subtitle: "Requires immediate head scratches and hugs.",
      points: [
        "Speaking in a tiny, soft voice that immediately melts all my stress away.",
        "Hugging my arm like a teddy bear and refusing to let go.",
        "Demanding head scratches and hair playing while we watch a movie.",
        "Shedding every single worry, feeling safe enough to just let go and be completely protected.",
      ],
    },
  },

  // Section 8: Audio Letter / Voice Note
  voiceLetter: {
    title: "A Letter in the Air",
    subtitle: "A digital recording made of love, gratitude, and promises.",
    audioUrl: "", // Optional user mp3, otherwise will fallback to beautiful speech synthesis / typing reveal
    letterText: `Hello, hello, this is the internet corner I made just for you.

You are like the cherry on top of my life. I know that sounds a little cheesy, and honestly I'm not very good at poems or fancy words, but I hope you'll forgive me for that.

I was just thinking about how much you mean to me. You're genuinely one of the most beautiful people in my life, not just because of how you look, but because of who you are.

Jaise sur bina sangeet adhura lagta hai, waise hi main aapke bina adhura hoon.

I want to see our dreams come true together. I want to see you smile on your happiest days, support you on your difficult ones, and be there for all the little moments in between.

You make ordinary days feel special without even trying. And no matter how bad I am at expressing it, I want you to know that having you in my life means more to me than words can properly explain.

So yeah... this little corner of the internet is for you, because you're someone very special to me. ❤️`,
  },

  // Section 9: Scrapbook Gallery
  scrapbook: {
    title: "Our Digital Scrapbook",
    subtitle:
      "Moments of chaos, peace, and beautiful everyday life. Click and drag them around!",
    items: [
      {
        id: "1",
        caption:
          "Lost in the golden dunes of Jaisalmer, carrying a smile that makes the world stand still.",
        rotation: -3,
        imagePlaceholderColor: "from-pink-200 to-amber-100",
        aspectRatio: "aspect-[3/4]",
        details:
          "Jaisalmer was magical, but the real magic was watching you glow under the desert sun. I remember how your smile felt brighter than the golden sands, and in that moment, I realized that home isn't a place, it's wherever you are.",
      },
      {
        id: "2",
        caption:
          "The little girl with innocent eyes, whose laughter was destined to complete my world.",
        rotation: 4,
        imagePlaceholderColor: "from-amber-200 to-rose-100",
        aspectRatio: "aspect-[3/4]",
        details:
          "Looking at your childhood photos, I see the same spark in your eyes that I fall in love with every single day. Even back then, you had that innocent, beautiful soul that was destined to bring so much peace and happiness into my life.",
      },
      {
        id: "3",
        caption:
          "Amidst the heritage charm of Jodhpur, matching the grace of the royalty in the frames.",
        rotation: -5,
        imagePlaceholderColor: "from-orange-200 to-yellow-100",
        aspectRatio: "aspect-[3/4]",
        details:
          "In Jodhpur, amidst all the historical forts and royal frames, you stood out so effortlessly. You don't need crowns or palaces to look like royalty—your grace, your elegance, and the way you carry yourself is more majestic than any palace.",
      },
      {
        id: "4",
        caption:
          "A flower behind your ear, a playful smile, and that child-like joy that instantly melts my heart.",
        rotation: 2,
        imagePlaceholderColor: "from-rose-200 to-red-100",
        aspectRatio: "aspect-[3/4]",
        details:
          "This is one of my favorite versions of you—completely carefree, playful, and full of joy. When you put a flower in your hair and laugh without a worry, the whole world fades away. I promise to always protect that beautiful, childlike joy in you.",
      },
      {
        id: "5",
        caption:
          "Standing beneath the ancient arches, carrying a light that outshines history itself.",
        rotation: -6,
        imagePlaceholderColor: "from-teal-200 to-yellow-100",
        aspectRatio: "aspect-[3/4]",
        details:
          "Standing under those ancient arches, you looked like a timeless painting. It made me realize how lucky I am to walk through this life with you. Centuries of history are beautiful, but they don't compare to the beautiful future we are building together.",
      },
    ] as ScrapbookItem[],
  },

  // Section 10: Final Ending
  ending: {
    quote1: "You wanted love.",
    quote2: "So I made you a small corner of the internet filled with it.",
    finalLine: "Happy Birthday, my sweetheart ❤️",
  },
};
