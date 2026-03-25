'use client';

import { useState, useEffect } from 'react';
import { salveazaRezervare } from '@/lib/rezervari';

interface Props {
  onClose: () => void;
}

const MONTHS = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
const DAYS = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Să', 'Du'];
const DAY_NAMES = ['lun.', 'mar.', 'mie.', 'joi', 'vin.', 'săm.', 'dum.'];
const MONTH_SHORT = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.',
  'iul.', 'aug.', 'sep.', 'oct.', 'nov.', 'dec.'];

const ORE = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
  '20:30', '21:00', '21:30', '22:00',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function getQuickDays(count: number): Date[] {
  const today = new Date();
  const result: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push(d);
  }
  return result;
}

function formatDataLung(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const zi = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'][date.getDay()];
  return `${zi}, ${d} ${MONTHS[m - 1].toLowerCase()} ${y}`;
}

export default function RezervaModal({ onClose }: Props) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 6);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedOra, setSelectedOra] = useState<string | null>(null);
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [persoane, setPersoane] = useState(2);
  const [loading, setLoading] = useState(false);
  const [confirmat, setConfirmat] = useState(false);
  const [eroare, setEroare] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const quickDays = getQuickDays(8);

  const isPastDate = (y: number, m: number, d: number) => {
    return new Date(y, m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isFutureLimit = (y: number, m: number, d: number) => {
    return new Date(y, m, d) > maxDate;
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    if (next <= maxDate) {
      if (month === 11) { setMonth(0); setYear(y => y + 1); }
      else setMonth(m => m + 1);
    }
  };

  const selectDate = (y: number, m: number, d: number) => {
    const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    setSelectedDate(iso);
    setSelectedOra(null);
  };

  const quickDateKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const calKey = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const handleSubmit = async () => {
    if (!selectedDate || !selectedOra || !nume || !email || !telefon) {
      setEroare('Te rugăm completează toate câmpurile obligatorii.');
      return;
    }
    setEroare('');
    setLoading(true);
    try {
      await salveazaRezervare({
        nume,
        email,
        telefon,
        numar_persoane: persoane,
        data: selectedDate,
        ora: selectedOra,
      });
      setConfirmat(true);
    } catch {
      setEroare('A apărut o eroare. Te rugăm încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedOra(null);
    setNume('');
    setEmail('');
    setTelefon('');
    setPersoane(2);
    setConfirmat(false);
    setEroare('');
  };

  // ── ECRAN CONFIRMARE ──────────────────────────────────────────────────────
  if (confirmat && selectedDate && selectedOra) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Rezervare<br />confirmată!</h2>
          <p className="text-gray-500 mb-8">Vă așteptăm cu drag la Vibe Coffee</p>

          <div className="grid grid-cols-2 gap-4 text-left mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Data & Ora</p>
              <p className="font-bold text-gray-900">{formatDataLung(selectedDate)} la {selectedOra}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Număr persoane</p>
              <p className="font-bold text-gray-900">{persoane} {persoane === 1 ? 'persoană' : 'persoane'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Nume</p>
              <p className="font-bold text-gray-900">{nume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Contact</p>
              <p className="font-bold text-gray-900">{telefon}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            Veți primi un email de confirmare la <strong>{email}</strong>
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105"
            >
              Înapoi Acasă
            </button>
            <button
              onClick={resetForm}
              className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105"
            >
              Rezervare nouă
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORMULAR PRINCIPAL ────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
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

        {/* ── PASUL 1: DATA ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
          <h3 className="text-3xl font-bold text-gray-900">Selectează data</h3>
        </div>

        {/* Quick pick */}
        <div className="flex gap-2 overflow-x-auto pt-2 pb-2 pl-2 pr-2 mb-6">
          {quickDays.map((d, i) => {
            const key = quickDateKey(d);
            const isSelected = selectedDate === key;
            const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
            return (
              <button
                key={key}
                onClick={() => { setSelectedDate(key); setMonth(d.getMonth()); setYear(d.getFullYear()); }}
                className={`flex-shrink-0 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 hover:border-teal-400 hover:scale-105
                  ${isSelected ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-200 text-gray-700 bg-white'}`}
              >
                {i === 0 ? 'Azi' : `${DAY_NAMES[dayIdx].replace('.', '')} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`}
              </button>
            );
          })}
        </div>

        {/* Calendar */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 text-gray-400 hover:text-teal-500 transition-colors text-xl">‹</button>
            <span className="font-bold text-gray-900 text-lg">{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} className="p-2 text-gray-400 hover:text-teal-500 transition-colors text-xl">›</button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-gray-400 text-sm font-medium py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = calKey(day);
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
              const isSelected = selectedDate === key;
              const disabled = isPastDate(year, month, day) || isFutureLimit(year, month, day);
              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => selectDate(year, month, day)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-xl m-0.5 transition-all duration-200
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-teal-50 hover:text-teal-600 cursor-pointer'}
                    ${isSelected ? 'bg-teal-500 text-white font-bold hover:bg-teal-500 hover:text-white' : ''}
                    ${isToday && !isSelected ? 'text-teal-500 font-bold' : ''}
                    ${!isSelected && !isToday && !disabled ? 'text-gray-700' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PASUL 2: ORA ── */}
        {selectedDate && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <h3 className="text-3xl font-bold text-gray-900">Selectează ora</h3>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-10">
              {ORE.map(ora => (
                <button
                  key={ora}
                  onClick={() => setSelectedOra(ora)}
                  className={`
                    py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 hover:border-teal-400 hover:scale-105
                    ${selectedOra === ora ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-200 text-gray-700 bg-white hover:text-teal-600'}
                  `}
                >
                  {ora}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── PASUL 3: DETALII ── */}
        {selectedDate && selectedOra && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <h3 className="text-3xl font-bold text-gray-900">Detalii rezervare</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nume complet *</label>
                <input
                  type="text"
                  placeholder="Ion Popescu"
                  value={nume}
                  onChange={e => setNume(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="ion@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  placeholder="0712 345 678"
                  value={telefon}
                  onChange={e => setTelefon(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Număr persoane *</label>
                <select
                  value={persoane}
                  onChange={e => setPersoane(Number(e.target.value))}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-teal-500 transition-colors"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'persoană' : 'persoane'}</option>
                  ))}
                </select>
              </div>
            </div>

            {eroare && (
              <p className="text-red-500 text-sm mb-4 text-center">{eroare}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Se trimite...' : 'Confirmă rezervarea'}
            </button>
          </>
        )}

        {/* Footer info */}
        <div className="text-center text-gray-400 text-sm mt-10 pt-6 border-t border-gray-100">
          <p><strong className="text-gray-600">Program:</strong> Luni - Duminică, 10:00 - 22:00</p>
          <p><strong className="text-gray-600">Contact:</strong> 0721 234 567 | rezervari@vibecoffee.ro</p>
        </div>

      </div>
    </div>
  );
}
