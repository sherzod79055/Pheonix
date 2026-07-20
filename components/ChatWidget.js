"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Assalomu alaykum! Men maktab bo'yicha savollaringizga javob beraman. Nima bilmoqchisiz?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });
      const data = await res.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply || "Kechirasiz, javob topilmadi." }]);
    } catch (e) {
      setMessages([...nextMessages, { role: "assistant", content: "Xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <style>{`
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.45), 0 10px 30px -8px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 0 10px rgba(212,175,55,0), 0 10px 30px -8px rgba(0,0,0,0.5); }
        }
        .gold-pulse { animation: goldPulse 2.6s ease-out infinite; }
      `}</style>

      {open && (
        <div
          className="w-80 h-96 rounded-2xl flex flex-col mb-3 overflow-hidden floating-card"
          style={{
            background: "linear-gradient(180deg, rgba(10,25,47,0.92), rgba(15,35,64,0.92))",
            backdropFilter: "blur(25px) saturate(190%)",
            WebkitBackdropFilter: "blur(25px) saturate(190%)",
            border: "1px solid rgba(255,255,255,0.15)"
          }}
        >
          <div className="px-4 py-3 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              <img src="/logo-gold-navy.png" alt="" className="h-6 w-6" />
              <span className="font-heading font-medium text-sm text-secondary">Maktab AI yordamchisi</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Yopish" className="text-white/60 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl px-3 py-2 max-w-[85%] font-body ${
                  m.role === "user"
                    ? "bg-secondary text-primary ml-auto"
                    : "bg-white/10 text-white/90 border border-white/10"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-white/40 text-xs">Yozmoqda...</div>}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-white/10 p-2 flex gap-2">
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm outline-none text-white placeholder-white/40"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Savolingizni yozing..."
            />
            <button
              onClick={sendMessage}
              className="bg-secondary text-primary font-medium px-3 rounded-lg text-sm hover:brightness-110"
            >
              Yuborish
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="gold-pulse rounded-full w-14 h-14 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #D4AF37, #AA7C11)",
          color: "#0A192F"
        }}
        aria-label="Chatni ochish"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
}
