'use client';

import { useEffect, useState } from 'react';

/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    // Re-declanșează animația când revii pe tab
    const handleVisibility = () => {
      if (!document.hidden) {
        setAnimKey(k => k + 1);
      }
    };

    // Re-declanșează animația când scrollezi înapoi sus (pentru când pagina va fi mai lungă)
    let scrolledDown = false;
    const handleScroll = () => {
      if (window.scrollY > 30) {
        scrolledDown = true;
      } else if (scrolledDown && window.scrollY < 10) {
        scrolledDown = false;
        setAnimKey(k => k + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* IMAGINE FUNDAL */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-cafe.jpg')",
        }}
      />

      {/* OVERLAY SEMI-TRANSPARENT */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TITLU + SUBTITLU - sus, la 20% din înălțime */}
      <div className="absolute top-[20%] left-0 right-0 z-10 px-6 text-center text-white">
        <h1 key={`title-${animKey}`} className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-1">
          Locul tău,<br />unde cafeaua te trezește!
        </h1>
        <p key={`sub-${animKey}`} className="text-3xl md:text-4xl font-bold text-white/90 animate-fade-in delay-2">
          Mai mult decât o băutură — e ritualul tău de dimineață
        </p>
      </div>

      {/* BUTOANE CTA - la 62% din înălțime, peste ceașcă */}
      <div key={`btns-${animKey}`} className="absolute top-[75%] left-0 right-0 z-10 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in delay-3">
        <a
          href="#meniu"
          className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
        >
          Vezi Meniul
        </a>
        <a
          href="#contact"
          className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg hover:bg-white/10"
        >
          Vizitează-ne
        </a>
      </div>
      {/* SCROLL INDICATOR */}
      <a
        href="#footer"
        key={`arrow-${animKey}`}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/75 hover:text-amber-600 transition-colors animate-bounce animate-fade-in delay-4"
        aria-label="Scroll în jos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
