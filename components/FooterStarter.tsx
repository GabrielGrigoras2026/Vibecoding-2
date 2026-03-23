'use client';

import { useState } from 'react';

export default function FooterStarter() {
  const [email, setEmail] = useState('');

  return (
    <footer id="footer" className="bg-[#2C1A0E]">

      {/* WAVE SVG separator */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* CONȚINUT PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* COLOANA 1 — Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-3">
            <span className="text-teal-400">Vibe</span>{' '}
            <span className="text-orange-400">Coffee</span>
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Locul perfect pentru cafeaua ta zilnică și momente de relaxare
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Str. Cafenelelor nr. 42, București, România
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +40 712 345 678
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@vibecoffee.ro
            </li>
          </ul>
        </div>

        {/* COLOANA 2 — Program + Link-uri Rapide */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Program</h4>
          <ul className="space-y-2 text-gray-400 mb-8">
            <li className="flex justify-between"><span>Luni - Vineri</span><span className="text-white font-medium">07:00 - 22:00</span></li>
            <li className="flex justify-between"><span>Sâmbătă</span><span className="text-white font-medium">08:00 - 23:00</span></li>
            <li className="flex justify-between"><span>Duminică</span><span className="text-white font-medium">09:00 - 20:00</span></li>
          </ul>

          <h4 className="text-white font-bold text-lg mb-4">Link-uri Rapide</h4>
          <ul className="space-y-2">
            {[
              { label: 'Meniu', href: '#meniu' },
              { label: 'Locație', href: '#contact' },
              { label: 'Rezervări', href: '#contact' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLOANA 3 — Urmărește-ne + Newsletter */}
        <div>
          <h4 className="text-white font-bold text-lg mb-3">Urmărește-ne</h4>
          <p className="text-gray-400 mb-5 leading-relaxed">
            Alătură-te comunității noastre și fii la curent cu cele mai noi oferte!
          </p>

          {/* Iconițe sociale */}
          <div className="flex gap-3 mb-8">
            {/* Facebook */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
              </svg>
            </a>
          </div>

          {/* Newsletter */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <h5 className="text-white font-bold mb-1">Newsletter</h5>
            <p className="text-gray-400 text-sm mb-4">Primește oferte exclusive</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email-ul tău"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-500 text-sm border border-white/10 focus:outline-none focus:border-teal-400"
              />
              <button className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-semibold text-sm transition-colors duration-200">
                →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © 2026 Vibe Coffee. Toate drepturile rezervate. | Creat cu ❤️ pentru iubitorii de cafea
      </div>

    </footer>
  );
}
