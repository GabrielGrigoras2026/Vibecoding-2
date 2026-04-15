'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bună ziua! Sunt Barista Bot ☕ Luni dimineața fără cafea e doar... luni dimineața. Cu ce te pot ajuta?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
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
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Conexiune întreruptă! Ca și când îți cade cafeaua din mână... Încearcă din nou. ☕' },
      ]);
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

  return (
    <>
      {/* FEREASTRA DE CHAT */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[350px] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            maxHeight: '520px',
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
              onClick={() => setIsOpen(false)}
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
                  {msg.content}
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
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT + BUTON TRIMITE */}
          <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
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

      {/* BUTON FLOTANT — pulsează când chat-ul e închis */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white text-2xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          !isOpen ? 'animate-pulse' : ''
        }`}
        style={{ background: isOpen ? '#F97316' : 'linear-gradient(135deg, #14B8A6, #0D9488)' }}
        aria-label="Deschide Barista Bot"
      >
        {isOpen ? '✕' : '☕'}
      </button>
    </>
  );
}
