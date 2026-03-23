'use client';

import { useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

const MONTHS = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
const DAYS = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Să', 'Du'];
const DAY_NAMES = ['lun.', 'mar.', 'mie.', 'joi', 'vin.', 'săm.', 'dum.'];
const MONTH_SHORT = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.',
  'iul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun → convert to Mon-based (0=Mon)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getNextDays(count: number): Date[] {
  const today = new Date();
  const result: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push(d);
  }
  return result;
}

export default function RezervaModal({ onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  // Loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 4;
      });
    }, 50);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const quickDays = getNextDays(14);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const dateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const calKey = (day: number) => `${year}-${month}-${day}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* ECRAN DE TRANZIȚIE */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-400 to-amber-400 flex flex-col items-center justify-center">
          <div className="text-6xl mb-6">☕</div>
          <h2 className="text-4xl font-bold text-white mb-2">Vibe Coffee</h2>
          <p className="text-white/80 mb-10">Se încarcă...</p>
          <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {!loading && (
        <div className="absolute inset-0 bg-white overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-10">

            {/* Înapoi */}
            <button
              onClick={onClose}
              className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1 mb-8 transition-colors"
            >
              ← Înapoi
            </button>

            {/* Titlu */}
            <div className="text-center mb-10">
              <h2 className="text-5xl font-bold text-gray-900 mb-3">
                Rezervă o <span className="text-teal-500">masă</span>
              </h2>
              <p className="text-gray-500 text-lg">Alege data, ora și completează detaliile pentru rezervare</p>
            </div>

            {/* Step 1 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <h3 className="text-3xl font-bold text-gray-900">Selectează data</h3>
            </div>

            {/* Calendar grid */}
            <div className="border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
              {/* Header lună */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 hover:text-teal-500 transition-colors text-gray-400 text-lg">‹</button>
                <span className="font-bold text-gray-900 text-lg">{MONTHS[month]} {year}</span>
                <button onClick={nextMonth} className="p-2 hover:text-teal-500 transition-colors text-gray-400 text-lg">›</button>
              </div>

              {/* Zile săptămână */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-gray-400 text-sm font-medium py-2">{d}</div>
                ))}
              </div>

              {/* Zile lună */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const key = calKey(day);
                  const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                  const isSelected = selected === key;
                  const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => setSelected(key)}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-full m-0.5 transition-all
                        ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-teal-50 cursor-pointer'}
                        ${isSelected ? 'bg-teal-500 text-white font-bold hover:bg-teal-500' : ''}
                        ${isToday && !isSelected ? 'text-teal-500 font-bold' : ''}
                        ${!isSelected && !isToday && !isPast ? 'text-gray-700' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick pick */}
            <p className="text-center text-gray-400 mb-4">sau alege rapid din următoarele zile:</p>
            <div className="grid grid-cols-4 gap-3 mb-10">
              {quickDays.map((d) => {
                const key = dateKey(d);
                const isSelected = selected === key;
                const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelected(key); setMonth(d.getMonth()); setYear(d.getFullYear()); }}
                    className={`
                      border-2 rounded-2xl p-4 text-center transition-all duration-200 hover:border-teal-400
                      ${isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white'}
                    `}
                  >
                    <div className="text-xs text-gray-400 mb-1">{DAY_NAMES[dayIdx]}</div>
                    <div className={`text-3xl font-bold ${isSelected ? 'text-teal-500' : 'text-gray-900'}`}>{d.getDate()}</div>
                    <div className="text-xs text-gray-400 mt-1">{MONTH_SHORT[d.getMonth()]}</div>
                  </button>
                );
              })}
            </div>

            {/* Buton continuare */}
            {selected && (
              <div className="text-center">
                <button className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Continuă →
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
