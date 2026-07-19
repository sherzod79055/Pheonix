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
      {open && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col mb-3 overflow-hidden">
          <div className="bg-primary text-white px-4 py-2 flex justify-between items-center">
            <span className="font-medium text-sm">Maktab AI yordamchisi</span>
            <button onClick={() => setOpen(false)} aria-label="Yopish">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 max-w-[85%] ${
                  m.role === "user" ? "bg-primary text-white ml-auto" : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Yozmoqda...</div>}
            <div ref={bottomRef} />
          </div>
          <div className="border-t p-2 flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Savolingizni yozing..."
            />
            <button onClick={sendMessage} className="bg-secondary text-primary font-medium px-3 rounded text-sm">
              Yuborish
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-secondary text-primary rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
        aria-label="Chatni ochish"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
}
