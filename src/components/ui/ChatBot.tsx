"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: number;
}

/* ─── Response Map ─── */
const RESPONSES: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /merhaba|selam|hello|hey|sa |sa$/i,
    reply:
      "Merhaba! The Kai'ye hoş geldiniz. Size nasıl yardımcı olabilirim? 🎵",
  },
  {
    pattern: /hizmet|ne yapıyorsunuz|servis|neler sunuyorsunuz/i,
    reply:
      '8 temel alanda hizmet veriyoruz: AI Ajan Sistemi, Web Sitesi, İçerik Üretimi, Artwork, Sesli Kitap, Müzik Prodüksiyon, Dijital Strateji ve Telegram Bot. Detaylar için [Hizmetler](/hizmetler) sayfamıza göz atın!',
  },
  {
    pattern: /fiyat|ücret|maliyet|kaç para|fiyatlandırma/i,
    reply:
      'Her projemiz özel olduğu için fiyatlarımız projeye göre belirleniyor. Ücretsiz görüşme için [İletişim](/iletisim) sayfamızdan bize ulaşabilirsiniz.',
  },
  {
    pattern: /ai ajan|yapay zeka|claude|otomasyon/i,
    reply:
      'AI ajan sistemi kurulumunda uzmanız. 72+ ajanla kendi operasyonlarımızı yönetiyoruz. SPARK, ENGINE ve ARCHITECT paketlerimiz var. [Detaylı bilgi](/hizmetler#ai-ajan-sistemi)',
  },
  {
    pattern: /müzik|prodüksiyon|şarkı|beat/i,
    reply:
      '15 yıllık müzik deneyimi ve Echo Bazaar\'da 20M+ dinlenme ile müzik prodüksiyon hizmeti veriyoruz. [Müzik Prodüksiyon](/hizmetler#muzik-produksiyon)',
  },
  {
    pattern: /web|site|tasarım/i,
    reply:
      'Next.js + Tailwind CSS ile modern web siteleri yapıyoruz. Bu site de bizim işimiz! [Web Tasarımı](/hizmetler#web-sitesi-tasarimi)',
  },
  {
    pattern: /echo bazaar/i,
    reply:
      'Echo Bazaar, Türk halk müziğini AI ile yeniden yorumlayan YouTube kanalımız. 20M+ dinlenmeye ulaştık! [Portfolyomuza göz atın](/#portfolyo)',
  },
  {
    pattern: /araç|tool|araçlar/i,
    reply:
      'Ücretsiz online araçlarımızı kullanabilirsiniz: QR Kod Oluşturucu, Kelime Sayacı, Şifre Oluşturucu ve daha fazlası. [Araçlar](/araclar)',
  },
  {
    pattern: /iletişim|email|telefon|ulaş|bize yaz/i,
    reply:
      'Bize hello@thekai.co adresinden veya [İletişim](/iletisim) sayfamızdaki form ile ulaşabilirsiniz. Sosyal medya: @callmethekai',
  },
  {
    pattern: /blog|yazı|makale/i,
    reply:
      'AI, müzik ve teknoloji üzerine blog yazılarımızı okuyabilirsiniz. [Blog](/blog)',
  },
  {
    pattern: /kim|kurucu|kamer/i,
    reply:
      "The Kai'nin kurucusu Kamer Can İzvermez — müzisyen, söz yazarı ve AI-native girişimci. 15 yıllık müzik deneyimi, Echo Bazaar'da 20M+ dinlenme.",
  },
  {
    pattern: /teşekkür|sağol|thanks|eyvallah/i,
    reply: "Rica ederim! Başka bir sorunuz olursa buradayım. 🎵",
  },
];

const DEFAULT_REPLY =
  'Bu konuda size daha iyi yardımcı olabilmem için [İletişim](/iletisim) sayfamızdan bize yazabilirsiniz. Ya da şu konularda hemen yardımcı olabilirim: hizmetlerimiz, fiyatlarımız, araçlarımız, portfolyomuz.';

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "bot",
  content:
    "Merhaba! 👋 Ben The Kai Asistanı. Hizmetlerimiz, araçlarımız veya projelerimiz hakkında sorularınızı yanıtlayabilirim. Ne ile ilgileniyorsunuz?",
  timestamp: Date.now(),
};

const QUICK_BUTTONS = [
  "Hizmetleriniz neler?",
  "Fiyat bilgisi",
  "Araçları göster",
  "İletişime geç",
];

/* ─── Helpers ─── */
function getReply(input: string): string {
  const trimmed = input.trim().toLowerCase();
  for (const { pattern, reply } of RESPONSES) {
    if (pattern.test(trimmed)) return reply;
  }
  return DEFAULT_REPLY;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/** Render markdown-style links [text](url) as clickable elements */
function renderContent(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | { text: string; href: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.map((part, i) => {
    if (typeof part === "string") return <span key={i}>{part}</span>;
    return (
      <Link
        key={i}
        href={part.href}
        className="underline text-spark hover:text-spark-dark transition-colors font-medium"
      >
        {part.text}
      </Link>
    );
  });
}

/* ─── Component ─── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* focus input on open */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowQuickButtons(false);
      setTyping(true);

      setTimeout(() => {
        const botMsg: Message = {
          id: uid(),
          role: "bot",
          content: getReply(trimmed),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
      }, 500);
    },
    [typing]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Toggle Button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-spark text-background flex items-center justify-center shadow-lg hover:bg-spark-dark transition-colors cursor-pointer"
            aria-label="Canlı destek chatbot'unu aç"
          >
            {/* Chat bubble icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] max-sm:inset-x-4 max-sm:w-auto max-sm:bottom-4 max-sm:right-auto flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border"
            style={{ backgroundColor: "#141414" }}
          >
            {/* ─ Header ─ */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-spark animate-pulse" />
                <h3 className="text-sm font-semibold text-foreground">
                  The Kai Asistan
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-foreground transition-colors cursor-pointer"
                aria-label="Sohbeti kapat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ─ Messages ─ */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-spark text-background rounded-br-sm"
                        : "bg-[#1F1F1F] text-foreground rounded-bl-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {/* Quick Buttons */}
              {showQuickButtons && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_BUTTONS.map((label) => (
                    <button
                      key={label}
                      onClick={() => sendMessage(label)}
                      className="text-xs px-3 py-1.5 rounded-full border border-spark/40 text-spark hover:bg-spark/10 transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1F1F1F] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ─ Input ─ */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-border bg-[#1A1A1A]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 bg-[#0A0A0A] border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-gray-600 outline-none focus:border-spark/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-full bg-spark text-background flex items-center justify-center hover:bg-spark-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                aria-label="Mesaj gönder"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
