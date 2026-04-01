"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

// Simple syntax highlighting for JSON
function highlightJSON(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g,
      (match) => {
        let cls = "text-[#98C379]"; // string
        if (/:$/.test(match)) {
          cls = "text-[#E06C75]"; // key
        }
        return `<span class="${cls}">${match}</span>`;
      }
    )
    .replace(/\b(true|false)\b/g, '<span class="text-[#D19A66]">$1</span>')
    .replace(/\b(null)\b/g, '<span class="text-[#C678DD]">$1</span>')
    .replace(/\b(-?\d+\.?\d*([eE][+-]?\d+)?)\b/g, '<span class="text-[#D19A66]">$1</span>');
}

export default function JSONFormatlayiciPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = useCallback((value: string) => {
    if (!value.trim()) {
      setOutput("");
      setHighlighted("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setHighlighted(highlightJSON(formatted));
      setError("");
    } catch (e) {
      const err = e as Error;
      setOutput("");
      setHighlighted("");
      setError(err.message);
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      formatJSON(value);
    },
    [formatJSON]
  );

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setHighlighted(highlightJSON(minified));
      setError("");
    } catch (e) {
      const err = e as Error;
      setError(err.message);
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const otherTools = TOOLS.filter((t) => t.slug !== "json-formatlayici");

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
            <span className="text-[#F5F5F5]">JSON Formatlayıcı</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            JSON Formatlayıcı
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            JSON verilerinizi yapıştırın, otomatik formatlayın. Syntax hatalarını tespit edin, sıkıştırın veya güzelleştirin. Reklamsız, ücretsiz, hızlı.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                  Giriş
                </label>
                <button
                  onClick={() => {
                    setInput("");
                    setOutput("");
                    setHighlighted("");
                    setError("");
                  }}
                  className="text-xs text-[#666666] hover:text-[#999999] transition-colors"
                >
                  Temizle
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder='{"isim": "The Kai", "tür": "ajans"}'
                rows={20}
                className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-none"
                spellCheck={false}
              />
            </div>

            {/* Right: Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                  Çıktı
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMinify}
                    disabled={!input.trim() || !!error}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Sıkıştır
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {copied ? "Kopyalandı!" : "Kopyala"}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="w-full bg-[#1A1A1A] border border-red-500/30 rounded-xl px-4 py-3 min-h-[480px] flex items-start">
                  <div className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                      <p className="text-red-400 text-sm font-medium mb-1">
                        JSON Hatası
                      </p>
                      <p className="text-red-400/70 text-xs font-mono">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              ) : highlighted ? (
                <pre className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 min-h-[480px] overflow-auto">
                  <code
                    className="text-sm font-mono leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
              ) : (
                <div className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 min-h-[480px] flex items-center justify-center">
                  <p className="text-[#666666] text-sm">
                    Formatlanmış JSON burada görünecek
                  </p>
                </div>
              )}
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
      </div>
    </section>
  );
}
