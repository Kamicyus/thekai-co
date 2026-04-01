"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

function toUpperCaseTR(text: string): string {
  return text
    .replace(/i/g, "\u0130")
    .replace(/ı/g, "I")
    .toUpperCase();
}

function toLowerCaseTR(text: string): string {
  return text
    .replace(/I/g, "\u0131")
    .replace(/\u0130/g, "i")
    .toLowerCase();
}

function toTitleCase(text: string): string {
  return text
    .split(/(\s+)/)
    .map((word) => {
      if (word.trim().length === 0) return word;
      const lower = toLowerCaseTR(word);
      const firstChar = lower.charAt(0);
      const upperFirst = toUpperCaseTR(firstChar);
      return upperFirst + lower.slice(1);
    })
    .join("");
}

function toSentenceCase(text: string): string {
  const lower = toLowerCaseTR(text);
  return lower.replace(/(^|[.!?]\s+)(\S)/g, (_match, prefix, char) => {
    return prefix + toUpperCaseTR(char);
  });
}

function toAlternateCase(text: string): string {
  let result = "";
  let index = 0;
  for (const char of text) {
    if (/\s/.test(char)) {
      result += char;
    } else {
      result +=
        index % 2 === 0 ? toLowerCaseTR(char) : toUpperCaseTR(char);
      index++;
    }
  }
  return result;
}

type TransformType = "upper" | "lower" | "title" | "sentence" | "alternate";

const TRANSFORMS: { key: TransformType; label: string; description: string }[] = [
  { key: "upper", label: "TÜMÜ BÜYÜK", description: "Tüm harfleri büyük yapar" },
  { key: "lower", label: "tümü küçük", description: "Tüm harfleri küçük yapar" },
  { key: "title", label: "Başlık Düzeni", description: "Her kelimenin ilk harfi büyük" },
  { key: "sentence", label: "Cümle düzeni", description: "Cümlelerin ilk harfi büyük" },
  { key: "alternate", label: "tErS çEvİr", description: "Harfleri sırayla büyük/küçük yapar" },
];

export default function HarfCeviriciPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [activeTransform, setActiveTransform] = useState<TransformType | null>(null);
  const [copied, setCopied] = useState(false);

  const applyTransform = (type: TransformType) => {
    if (!text.trim()) return;

    let transformed: string;
    switch (type) {
      case "upper":
        transformed = toUpperCaseTR(text);
        break;
      case "lower":
        transformed = toLowerCaseTR(text);
        break;
      case "title":
        transformed = toTitleCase(text);
        break;
      case "sentence":
        transformed = toSentenceCase(text);
        break;
      case "alternate":
        transformed = toAlternateCase(text);
        break;
      default:
        transformed = text;
    }
    setResult(transformed);
    setActiveTransform(type);
  };

  const handleCopy = () => {
    const textToCopy = result || text;
    if (!textToCopy.trim()) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setActiveTransform(null);
  };

  const otherTools = TOOLS.filter((t) => t.slug !== "harf-cevirici");

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
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
            <span className="text-[#F5F5F5]">Büyük/Küçük Harf Çevirici</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Büyük/Küçük Harf Çevirici
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Metninizi yapıştırın, istediğiniz formata anında dönüştürün.
            Türkçe karakterler tam desteklenir.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Input Textarea */}
            <div>
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                Metin Girin
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setResult("");
                  setActiveTransform(null);
                }}
                placeholder="Metninizi buraya yapıştırın veya yazın..."
                rows={6}
                className="w-full bg-[#141414] border border-[#1F2937] rounded-[20px] px-6 py-5 text-[#F5F5F5] text-base leading-relaxed placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-y min-h-[120px]"
              />
            </div>

            {/* Transform Buttons */}
            <div>
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-3">
                Dönüştürme Seçenekleri
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {TRANSFORMS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => applyTransform(t.key)}
                    disabled={!text.trim()}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      activeTransform === t.key
                        ? "bg-[#D8FB32] text-[#0A0A0A] border-[#D8FB32]"
                        : "bg-[#1A1A1A] border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5]"
                    } disabled:opacity-30 disabled:cursor-not-allowed`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Textarea */}
            {result && (
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Sonuç
                </label>
                <textarea
                  value={result}
                  readOnly
                  rows={6}
                  className="w-full bg-[#141414] border border-[#D8FB32]/30 rounded-[20px] px-6 py-5 text-[#F5F5F5] text-base leading-relaxed focus:outline-none resize-y min-h-[120px]"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                disabled={!result && !text.trim()}
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
                {copied ? "Kopyalandı!" : "Kopyala"}
              </button>
              <button
                onClick={handleClear}
                disabled={!text.trim() && !result}
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

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {TRANSFORMS.slice(0, 3).map((t) => (
                <div
                  key={t.key}
                  className="bg-[#141414] border border-[#1F2937] rounded-xl p-4"
                >
                  <div className="text-[#D8FB32] text-sm font-semibold mb-1">
                    {t.label}
                  </div>
                  <div className="text-[#666666] text-xs">{t.description}</div>
                </div>
              ))}
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
            Tüm işlemler tarayıcınızda yapılır. Metniniz sunucuya gönderilmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
