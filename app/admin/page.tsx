'use client';

import { useState, useEffect, useCallback } from 'react';
import { citesteRezervari } from '@/lib/rezervari';

interface Rezervare {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  numar_persoane: number;
  data: string;
  ora: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  'în așteptare': 'bg-amber-100 text-amber-700',
  'confirmat': 'bg-green-100 text-green-700',
  'respins': 'bg-red-100 text-red-700',
};

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [filtru, setFiltru] = useState('toate');
  const [cautare, setCautare] = useState('');
  const [loading, setLoading] = useState(true);

  const incarcaRezervari = useCallback(async () => {
    try {
      const data = await citesteRezervari();
      setRezervari(data as Rezervare[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    incarcaRezervari();
    const interval = setInterval(incarcaRezervari, 10000);
    return () => clearInterval(interval);
  }, [incarcaRezervari]);

  const schimbaStatus = async (id: number, status: string) => {
    await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await incarcaRezervari();
  };

  const sterge = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi această rezervare?')) return;
    await fetch('/api/rezervari', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await incarcaRezervari();
  };

  const rezervariFiltrate = rezervari.filter(r => {
    const matchFiltru = filtru === 'toate' || r.status === filtru;
    const matchCautare = r.nume.toLowerCase().includes(cautare.toLowerCase()) ||
      r.email.toLowerCase().includes(cautare.toLowerCase());
    return matchFiltru && matchCautare;
  });

  const formatData = (data: string) => {
    const [y, m, d] = data.split('-');
    return `${d}.${m}.${y}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Înapoi */}
        <a href="/" className="text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1 mb-8 transition-colors w-fit">
          ← Înapoi
        </a>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Admin <span className="text-teal-500">Rezervări</span>
          </h1>
          <p className="text-gray-500 mt-1">Gestionează rezervările Vibe Coffee</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: rezervari.length, color: 'text-gray-900' },
            { label: 'În așteptare', value: rezervari.filter(r => r.status === 'în așteptare').length, color: 'text-amber-600' },
            { label: 'Confirmate', value: rezervari.filter(r => r.status === 'confirmat').length, color: 'text-green-600' },
            { label: 'Respinse', value: rezervari.filter(r => r.status === 'respins').length, color: 'text-red-600' },
          ].map(s => (
            <div key={s.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filtre + Căutare */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Caută după nume sau email..."
            value={cautare}
            onChange={e => setCautare(e.target.value)}
            className="flex-1 min-w-[200px] border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-teal-500 transition-colors bg-white/70 backdrop-blur-sm"
          />
          <div className="flex gap-2">
            {['toate', 'în așteptare', 'confirmat', 'respins'].map(f => (
              <button
                key={f}
                onClick={() => setFiltru(f)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 capitalize
                  ${filtru === f
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white/70 backdrop-blur-sm border-2 border-gray-200 text-gray-600 hover:border-teal-400'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tabel - desktop */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Se încarcă...</div>
        ) : rezervariFiltrate.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Nicio rezervare găsită.</div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Nume', 'Contact', 'Data & Ora', 'Persoane', 'Status', 'Acțiuni'].map(h => (
                      <th key={h} className="text-left text-sm font-semibold text-gray-500 px-5 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rezervariFiltrate.map(r => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-teal-50/30 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-900">{r.nume}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        <div>{r.email}</div>
                        <div>{r.telefon}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">
                        <div className="font-medium">{formatData(r.data)}</div>
                        <div className="text-gray-500">{r.ora.slice(0, 5)}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{r.numar_persoane} pers.</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {r.status !== 'confirmat' && (
                            <button
                              onClick={() => schimbaStatus(r.id, 'confirmat')}
                              className="px-3 py-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded-lg transition-all hover:scale-105"
                            >
                              Confirmă
                            </button>
                          )}
                          {r.status !== 'respins' && (
                            <button
                              onClick={() => schimbaStatus(r.id, 'respins')}
                              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-all hover:scale-105"
                            >
                              Respinge
                            </button>
                          )}
                          <button
                            onClick={() => sterge(r.id)}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-white text-xs font-semibold rounded-lg transition-all hover:scale-105"
                          >
                            Șterge
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile - carduri */}
            <div className="md:hidden flex flex-col gap-4">
              {rezervariFiltrate.map(r => (
                <div key={r.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{r.nume}</p>
                      <p className="text-sm text-gray-500">{r.email}</p>
                      <p className="text-sm text-gray-500">{r.telefon}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>📅 {formatData(r.data)} la {r.ora.slice(0, 5)}</span>
                    <span>👥 {r.numar_persoane} pers.</span>
                  </div>
                  <div className="flex gap-2">
                    {r.status !== 'confirmat' && (
                      <button
                        onClick={() => schimbaStatus(r.id, 'confirmat')}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-xl transition-all"
                      >
                        Confirmă
                      </button>
                    )}
                    {r.status !== 'respins' && (
                      <button
                        onClick={() => schimbaStatus(r.id, 'respins')}
                        className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold rounded-xl transition-all"
                      >
                        Respinge
                      </button>
                    )}
                    <button
                      onClick={() => sterge(r.id)}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-semibold rounded-xl transition-all"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
