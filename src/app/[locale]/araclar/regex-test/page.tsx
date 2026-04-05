"use client";

import { useCallback, useMemo } from "react";
import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

interface MatchResult {
  fullMatch: string;
  groups: string[];
  index: number;
}

const COMMON_PATTERNS = [
  { label: "E-posta", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { label: "Telefon (TR)", pattern: "(\\+90|0)?[\\s-]?\\(?5\\d{2}\\)?[\\s-]?\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{2}" },
  { label: "URL", pattern: "https?://[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*" },
  { label: "IP Adresi", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" },
  { label: "HEX Renk", pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b" },
  { label: "Tarih (GG/AA/YYYY)", pattern: "\\b(0?[1-9]|[12]\\d|3[01])/(0?[1-9]|1[0-2])/(\\d{4})\\b" },
];

export default function RegexTestPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");

  // Hata ve eşleşme sonuçlarını setState olmadan render sırasında türet
  const { matches, error } = useMemo<{ matches: MatchResult[]; error: string }>(() => {
    if (!pattern || !testText) {
      return { matches: [], error: "" };
    }
    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          results.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      }
      return { matches: results, error: "" };
    } catch (e) {
      const err = e as Error;
      return { matches: [], error: err.message };
    }
  }, [pattern, testText, flags]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testText || error) return null;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(testText)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testText.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index + match[0].length;
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
      if (lastIndex < testText.length) {
        parts.push({ text: testText.slice(lastIndex), isMatch: false });
      }
      return parts;
    } catch {
      return null;
    }
  }, [pattern, testText, flags, error]);

  const handlePreset = useCallback((p: string) => {
    setPattern(p);
  }, []);

  const toggleFlag = useCallback((flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  }, []);

  const otherTools = TOOLS.filter((t) => t.slug !== "regex-test");

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
            <Link href="/araclar" className="text-[#999999] hover:text-[#D8FB32] transition-colors">
              Araclar
            </Link>
            <span className="text-[#666666]">/</span>
            <span className="text-[#F5F5F5]">Regex Test</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Regex Test Araci
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Duzenli ifade (regex) pattern yazin, metin uzerinde canli test edin. Eslesmeleri renkli olarak gorun, gruplari inceleyin.
          </p>
        </FadeIn>

        {/* Pattern Input */}
        <FadeIn delay={0.1}>
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-xs text-[#666666] uppercase tracking-wider font-medium">
                Pattern
              </label>
              <div className="flex items-center gap-2">
                {["g", "i", "m", "s"].map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFlag(f)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                      flags.includes(f)
                        ? "bg-[#D8FB32]/20 text-[#D8FB32] border border-[#D8FB32]/40"
                        : "bg-[#1A1A1A] text-[#666666] border border-[#1F2937] hover:border-[#D8FB32]/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Regex pattern girin..."
              className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
              spellCheck={false}
            />
            {error && (
              <p className="text-red-400 text-xs font-mono">{error}</p>
            )}
          </div>
        </FadeIn>

        {/* Presets */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-8">
            {COMMON_PATTERNS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.pattern)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1A1A1A] border border-[#1F2937] text-[#999999] hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200"
              >
                {p.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Test Text + Highlighted Output */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Test Text */}
            <div className="space-y-4">
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                Test Metni
              </label>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Test edilecek metni girin..."
                rows={14}
                className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-none"
                spellCheck={false}
              />
            </div>

            {/* Highlighted Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                  Sonuc
                </label>
                <span className="text-xs text-[#999999]">
                  {matches.length} eslesme
                </span>
              </div>
              <div className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 min-h-[336px] overflow-auto">
                {highlightedText && highlightedText.length > 0 ? (
                  <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
                    {highlightedText.map((part, i) =>
                      part.isMatch ? (
                        <mark
                          key={i}
                          className="bg-[#D8FB32]/25 text-[#D8FB32] rounded px-0.5"
                        >
                          {part.text}
                        </mark>
                      ) : (
                        <span key={i} className="text-[#F5F5F5]">
                          {part.text}
                        </span>
                      )
                    )}
                  </pre>
                ) : (
                  <p className="text-[#666666] text-sm">
                    {testText && pattern
                      ? "Eslesme bulunamadi"
                      : "Sonuclar burada gorunecek"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Match Details */}
        {matches.length > 0 && (
          <FadeIn delay={0.25}>
            <div className="bg-[#141414] border border-[#1F2937] rounded-xl p-6 mb-8">
              <h2 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-4">
                Eslesme Detaylari
              </h2>
              <div className="space-y-3 max-h-[300px] overflow-auto">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 text-sm font-mono bg-[#1A1A1A] rounded-lg px-4 py-3"
                  >
                    <span className="text-[#666666] shrink-0">#{i + 1}</span>
                    <div className="space-y-1">
                      <div>
                        <span className="text-[#999999] mr-2">Eslesen:</span>
                        <span className="text-[#D8FB32]">{`"${m.fullMatch}"`}</span>
                        <span className="text-[#666666] ml-2">
                          (index: {m.index})
                        </span>
                      </div>
                      {m.groups.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {m.groups.map((g, gi) => (
                            <span key={gi} className="text-[#999999]">
                              Grup {gi + 1}:{" "}
                              <span className="text-[#98C379]">
                                {`"${g ?? ""}"`}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <FadeIn className="mt-20 lg:mt-28">
            <h2 className="text-xs text-[#666666] uppercase tracking-wider font-medium mb-6">
              Diger Araclar
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
