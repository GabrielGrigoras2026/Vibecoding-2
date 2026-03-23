'use client';

/**
 * ✨ FEATURES STARTER - Secțiunea "De ce Vibe Coffee?"
 *
 * Layout: stânga = 2 carduri mici stivuite (Cafea + Patiserie)
 *         dreapta = 1 card mare (Ambient) cu imagine locală
 * Animații: fade-in staggered la scroll
 * Hover: imagine scale(1.1) + shadow mai puternic
 */

import { useEffect, useRef, useState } from 'react';

export default function FeaturesStarter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const cardBase = `group bg-amber-50 rounded-2xl overflow-hidden border border-amber-100
    shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500`;

  const fadeClass = (delay: number) =>
    `${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={sectionRef} id="features" className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLU + SUBTITLU */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            De ce <span className="text-teal-500">Vibe Coffee</span>?
          </h2>
          <p className="text-lg text-gray-500">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* GRID: 2 carduri mici stânga + 1 card mare dreapta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">

          {/* COLOANA STÂNGA: Cafea + Patiserie stivuite */}
          <div className="flex flex-col gap-6">

            {/* Card 1 — Cafea de Specialitate */}
            <div
              className={`${cardBase} ${fadeClass(0)} flex flex-col flex-1`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="overflow-hidden h-48 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
                  alt="Cafea de Specialitate"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cafea de Specialitate
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Boabe selectate din cele mai renumite regiuni ale lumii, prăjite local și preparate cu grijă de bariștii noștri. Fiecare ceașcă spune o poveste.
                </p>
              </div>
            </div>

            {/* Card 2 — Patiserie Artizanală */}
            <div
              className={`${cardBase} ${fadeClass(200)} flex flex-col flex-1`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="overflow-hidden h-48 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80"
                  alt="Patiserie Artizanală"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Patiserie Artizanală
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Preparate fresh în fiecare dimineață, din ingrediente naturale și rețete tradiționale.
                </p>
              </div>
            </div>

          </div>

          {/* COLOANA DREAPTA: Ambient Relaxant — card mare */}
          <div
            className={`group bg-amber-200 rounded-2xl overflow-hidden border border-amber-300 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${fadeClass(400)} flex flex-col`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* Imagine locală — ocupă cea mai mare parte */}
            <div className="overflow-hidden flex-1 min-h-[300px]">
              <img
                src="/interior-cafenea.png"
                alt="Ambient Relaxant"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Ambient Relaxant
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Un spațiu gândit pentru confort — fie că lucrezi, citești sau pur și simplu te bucuri de momentul tău.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
