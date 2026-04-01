"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

function analyzeText(text: string) {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      charsWithSpaces: 0,
      charsWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: "0 sn",
    };
  }

  const words = trimmed.split(/\s+/).filter((w) => w.length > 0).length;
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length || (trimmed.length > 0 ? 1 : 0);

  // Average reading speed: ~200 words/min for Turkish
  const minutes = words / 200;
  let readingTime: string;
  if (minutes < 1) {
    readingTime = `${Math.max(Math.ceil(minutes * 60), 1)} sn`;
  } else if (minutes < 60) {
    const m = Math.floor(minutes);
    const s = Math.ceil((minutes - m) * 60);
    readingTime = s > 0 ? `${m} dk ${s} sn` : `${m} dk`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = Math.ceil(minutes % 60);
    readingTime = `${h} sa ${m} dk`;
  }

  return {
    words,
    charsWithSpaces,
    charsWithoutSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
}

export default function KelimeSayaciPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setText("");
  };

  const otherTools = TOOLS.filter((t) => t.slug !== "kelime-sayaci");

  const statCards = [
    { label: "Kelime", value: stats.words, accent: true },
    { label: "Karakter (boşluklu)", value: stats.charsWithSpaces },
    { label: "Karakter (boşluksuz)", value: stats.charsWithoutSpaces },
    { label: "Cümle", value: stats.sentences },
    { label: "Paragraf", value: stats.paragraphs },
    { label: "Okuma Süresi", value: stats.readingTime, isString: true },
  ];

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Decorative pinwheels */}
      <div className="absolute top-20 right-8 pointer-events-none">
        <DecorativePinwheel size={100} opacity={0.04} rotate={15} />
      </div>
      <div className="absolute bottom-40 left-4 pointer-events-none">
        <DecorativePinwheel size={70} opacity={0.03} rotate={-20} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              href="/araclar"
              className="text-[#999999] hover:text-[#D8FB32] transition-colors"
            >
              Araçlar
            </Link>
            <span className="text-[#666666]">/</span>
            <span className="text-[#F5F5F5]">Kelime & Karakter Sayacı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Kelime & Karakter Sayacı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Metninizi yapıştırın veya yazın. Kelime, karakter, cümle ve paragraf
            sayisi anında guncellenir.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`bg-[#141414] border rounded-xl p-4 text-center ${
                  stat.accent
                    ? "border-[#D8FB32]/30 bg-[#D8FB32]/5"
                    : "border-[#1F2937]"
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold mb-1 font-mono ${
                    stat.accent ? "text-[#D8FB32]" : "text-[#F5F5F5]"
                  }`}
                >
                  {stat.isString ? stat.value : stat.value.toLocaleString("tr-TR")}
                </div>
                <div className="text-[#666666] text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Metninizi buraya yapisitirin veya yazin..."
              rows={14}
              className="w-full bg-[#141414] border border-[#1F2937] rounded-[20px] px-6 py-5 text-[#F5F5F5] text-base leading-relaxed placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-y min-h-[200px]"
            />

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleCopy}
                disabled={!text.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? "Kopyalandi!" : "Kopyala"}
              </button>
              <button
                onClick={handleClear}
                disabled={!text.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] border border-[#1F2937] text-[#999999] font-medium rounded-[10px] text-sm hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  width="16"
                  height="16"
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
                Temizle
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <FadeIn className="mt-20 lg:mt-28">
            <h2 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-6">
              Diğer Araçlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/araclar/${tool.slug}`}
                  className="group bg-[#141414] border border-[#1F2937] rounded-xl p-5 hover:border-[#D8FB32]/30 transition-all duration-300"
                >
                  <h3 className="text-[#F5F5F5] font-semibold text-sm mb-1 group-hover:text-[#D8FB32] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#666666] text-xs">{tool.description}</p>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Bottom Info */}
        <FadeIn className="mt-12 text-center">
          <p className="text-[#666666] text-sm">
            Tum islemler tarayıcınızda yapilir. Metniniz sunucuya gönderilmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
