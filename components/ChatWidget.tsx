'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// Butoane afișate la deschiderea chat-ului
const INITIAL_QUICK_REPLIES = ['Vezi meniu', 'Recomandări', 'Rezervări', 'Program'];

// Butoane contextuale în funcție de cuvinte cheie din răspunsul botului
function getContextualReplies(botReply: string): string[] {
  const text = botReply.toLowerCase();
  if (text.includes('vegan') || text.includes('meniu') || text.includes('cold') || text.includes('rece') || text.includes('desert') || text.includes('patiserie')) {
    return ['Opțiuni vegane', 'Deserturi', 'Cafea rece'];
  }
  return [];
}

export default function ChatWidget({ onRezervare }: { onRezervare?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: 'Bună ziua! Sunt Barista Bot ☕ Luni dimineața fără cafea e doar... luni dimineața. Cu ce te pot ajuta?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(INITIAL_QUICK_REPLIES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Renderează markdown: **bold** și [text](url) — definit în componentă ca să aibă acces la onRezervare
  const renderMarkdown = useCallback((text: string) => {
    const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push(<span key={i++}>{text.slice(lastIndex, match.index)}</span>);
      }

      if (match[2]) {
        result.push(<strong key={i++}>{match[2]}</strong>);
      } else if (match[3] && match[4]) {
        const href = match[4];
        const label = match[3];
        result.push(
          <button
            key={i++}
            onClick={() => {
              if (href === '/#rezervare') {
                onRezervare?.();
                setIsOpen(false);
              } else if (href === '/#meniu') {
                document.getElementById('meniu')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              } else {
                window.location.href = href;
              }
            }}
            className="underline font-semibold hover:opacity-80 transition-opacity"
            style={{ color: '#0D9488', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            {label}
          </button>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(<span key={i++}>{text.slice(lastIndex)}</span>);
    }

    return result;
  }, [onRezervare]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;

    // Butoane speciale care nu trimit mesaj la bot
    if (messageText === 'Vezi meniu') {
      document.getElementById('meniu')?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    setQuickReplies([]);
    setInput('');

    const userMessage = { role: 'user' as const, content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      const botReply = data.reply ?? 'Hm, ceva nu a funcționat... ca espressorul luni dimineața. Încearcă din nou!';
      setMessages(prev => [...prev, { role: 'assistant' as const, content: botReply }]);
      setQuickReplies(getContextualReplies(botReply));
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant' as const, content: 'Conexiune întreruptă! Ca și când îți cade cafeaua din mână... Încearcă din nou. ☕' },
      ]);
      setQuickReplies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) setQuickReplies([]);
  };

  return (
    <>
      {/* FEREASTRA DE CHAT */}
      {isOpen && (
        <div
          className="fixed left-3 right-3 sm:left-auto sm:right-6 sm:w-[350px] z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            bottom: '80px',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Barista Bot</p>
                <p className="text-teal-100 text-xs">Vibe Caffè — online</p>
              </div>
            </div>
            <button
              onClick={() => { setIsOpen(false); setMessages([{ role: 'assistant', content: 'Bună ziua! Sunt Barista Bot ☕ Luni dimineața fără cafea e doar... luni dimineața. Cu ce te pot ajuta?' }]); setQuickReplies(INITIAL_QUICK_REPLIES); }}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Închide chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* ZONA DE MESAJE */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ maxHeight: '340px' }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? { background: '#F97316', color: 'white', borderBottomRightRadius: '4px' }
                      : { background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.2)', color: '#1F2937', borderBottomLeftRadius: '4px' }
                  }
                >
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* LOADING — 3 puncte animate */}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.2)', borderBottomLeftRadius: '4px' }}
                >
                  <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            {/* QUICK REPLIES — în zona de scroll, după mesaje */}
            {quickReplies.length > 0 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-200 hover:scale-105"
                    style={{
                      borderColor: '#14B8A6',
                      color: '#0D9488',
                      background: 'rgba(20,184,166,0.08)',
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* BUTON REVENIRE LA ÎNCEPUT — apare după primul mesaj al userului */}
          {messages.length > 1 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={() => { setMessages([{ role: 'assistant', content: 'Bună ziua! Sunt Barista Bot ☕ Luni dimineața fără cafea e doar... luni dimineața. Cu ce te pot ajuta?' }]); setQuickReplies(INITIAL_QUICK_REPLIES); setInput(''); }}
                className="w-full py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-200 hover:opacity-80"
                style={{ borderColor: '#F97316', color: '#F97316', background: 'rgba(249,115,22,0.06)' }}
              >
                ↩ Revenire la început
              </button>
            </div>
          )}

          {/* INPUT + BUTON TRIMITE */}
          <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}
              aria-label="Trimite mesaj"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* MANȘETĂ + BUTON FLOTANT — vizibil doar când chat-ul e închis */}
      {!isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end" style={{ paddingRight: 'env(safe-area-inset-right, 0px)' }}>
          {/* Manșetă verde voalată */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-tl-2xl text-sm font-semibold"
            style={{ background: 'rgba(20,184,166,0.25)', backdropFilter: 'blur(8px)', color: '#0D9488' }}
          >
            <span>☕</span>
            <span>Barista Bot</span>
          </div>
          {/* Buton rotund */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-3 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #14B8A6, #0D9488)' }}
            aria-label="Deschide Barista Bot"
          >
            Întreabă-mă orice! ☕
          </button>
        </div>
      )}
    </>
  );
}
