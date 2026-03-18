'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutStarter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={sectionRef} id="despre" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGINE */}
        <div
          className={`overflow-hidden rounded-2xl shadow-xl transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <img
            src="/interior2.png"
            alt="Interiorul Vibe Caffè"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Povestea noastră
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Vibe Caffè s-a născut dintr-o pasiune simplă: credința că o cafea bună poate transforma
            o zi obișnuită într-una memorabilă. Am deschis ușile în 2019 cu un singur gând —
            să creăm un loc în care fiecare om să se simtă acasă, indiferent de ora sau starea de spirit.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Știm că uneori ai nevoie de liniște ca să gândești clar. De aceea am amenajat Vibe Caffè
            cu <strong className="text-gray-800">Wi-Fi rapid</strong>, prize la fiecare masă și o
            atmosferă prietenoasă cu studenții și freelancerii. Avem chiar și o
            <strong className="text-gray-800"> mică bibliotecă </strong>
            — poți lua o carte, o citești la o ceașcă de cafea și o lași pentru următorul vizitator.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            De la primul espresso de dimineață până la ultima sesiune de studiu seara, Vibe Caffè
            e locul unde timpul trece frumos. Te așteptăm cu un zâmbet și cu cea mai bună cafea
            din cartier.
          </p>

          {/* DOTĂRI */}
          <div className="mt-8 flex flex-wrap gap-3">
            {['Wi-Fi gratuit', 'Prize la mese', 'Bibliotecă', 'Spațiu de studiu', 'Muzică ambientală relaxantă'].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
