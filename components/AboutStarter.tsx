'use client';

import { useEffect, useRef, useState } from 'react';
import RezervaModal from './RezervaModal';

export default function AboutStarter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    {showModal && <RezervaModal onClose={() => setShowModal(false)} />}
    <section ref={sectionRef} id="despre" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGINE */}
        <div
          className={`group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <img
            src="/interior2.png"
            alt="Interiorul Vibe Caffè"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* TEXT */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Despre <span className="text-teal-500">noi</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Vibe Caffè a început din dorința de a aduce experiența autentică a cafelei de specialitate
            în inima orașului. Fiecare ceașcă este pregătită cu grijă de bariștii noștri experimentați,
            formați și certificați internațional.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Colaborăm direct cu plantații din America de Sud și Africa, selectând doar cele mai bune
            boabe, prăjite la perfecție pentru a scoate în evidență notele unice de aromă.
            Știm că uneori ai nevoie de liniște ca să gândești clar — de aceea am amenajat Vibe Caffè
            cu Wi-Fi rapid, prize la fiecare masă și o mică bibliotecă în care poți citi la o ceașcă de cafea.
          </p>

          {/* Listă cu checkmarks */}
          <ul className="mt-6 space-y-3">
            {[
              'Boabe proaspăt prăjite săptămânal',
              'Bariști certificați internațional',
              'Produse locale și sustenabile',
              'WiFi gratuit & loc de muncă',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700 text-base font-medium">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* BUTON CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-8 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Programează o Vizită
          </button>
        </div>

      </div>
    </section>
    </>
  );
}
