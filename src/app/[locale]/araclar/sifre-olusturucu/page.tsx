"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

function generatePassword(
  length: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (options.uppercase) chars += upper;
  if (options.lowercase) chars += lower;
  if (options.numbers) chars += nums;
  if (options.symbols) chars += syms;

  if (!chars) chars = lower;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

function getStrength(
  password: string,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): { label: string; color: string; width: string; score: number } {
  if (!password)
    return { label: "", color: "", width: "0%", score: 0 };

  let score = 0;
  const len = password.length;

  if (len >= 8) score += 1;
  if (len >= 12) score += 1;
  if (len >= 16) score += 1;
  if (len >= 24) score += 1;

  const typesUsed = [
    options.uppercase,
    options.lowercase,
    options.numbers,
    options.symbols,
  ].filter(Boolean).length;

  score += typesUsed;

  if (score <= 2) return { label: "Zayıf", color: "#EF4444", width: "25%", score: 1 };
  if (score <= 4) return { label: "Orta", color: "#F59E0B", width: "50%", score: 2 };
  if (score <= 6) return { label: "Güçlü", color: "#22C55E", width: "75%", score: 3 };
  return { label: "Çok Güçlü", color: "#D8FB32", width: "100%", score: 4 };
}

export default function SifreOlusturucuPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  // Yenile tuşuna basılınca seed değişir, yeni şifre üretilir
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  // password'ü useMemo ile türet — useEffect + setState döngüsünden kaçın
  const password = useMemo(() => {
    // seed bağımlılığı sayesinde "Yenile" butonu yeni şifre üretir
    void seed;
    return generatePassword(length, options);
  }, [length, options, seed]);

  const generate = useCallback(() => {
    setSeed((s) => s + 1);
    setCopied(false);
  }, []);

  // İlk render'da useEffect gerekmiyor; useMemo zaten üretiyor
  useEffect(() => { /* intentionally empty — password useMemo'dan geliyor */ }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const strength = getStrength(password, options);
  const otherTools = TOOLS.filter((t) => t.slug !== "sifre-olusturucu");

  const checkboxes = [
    { key: "uppercase" as const, label: "Büyük Harf (A-Z)" },
    { key: "lowercase" as const, label: "Küçük Harf (a-z)" },
    { key: "numbers" as const, label: "Rakam (0-9)" },
    { key: "symbols" as const, label: "Özel Karakter (!@#$)" },
  ];

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
            <span className="text-[#F5F5F5]">Şifre Oluşturucu</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Şifre Oluşturucu
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Güvenli, rastgele şifre oluşturun. Uzunluk ve karakter tipini seçin.
            Tüm işlemler tarayıcınızda yapılır.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Password Display */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6">
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-3">
                Oluşturulan Şifre
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 font-mono text-[#F5F5F5] text-lg break-all select-all leading-relaxed">
                  {password}
                </div>
                <button
                  onClick={handleCopy}
                  className="shrink-0 px-4 py-3 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-xl text-sm hover:bg-[#B4F030] transition-all duration-200"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline mr-1.5"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? "Kopyalandı!" : "Kopyala"}
                </button>
              </div>

              {/* Strength Bar */}
              {strength.label && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#666666] uppercase tracking-wider">
                      Şifre Gücü
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: strength.width,
                        backgroundColor: strength.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 space-y-6">
              {/* Length Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-[#666666] uppercase tracking-wider font-medium">
                    Uzunluk
                  </label>
                  <span className="text-[#D8FB32] font-mono font-bold text-lg">
                    {length}
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={128}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-[#1A1A1A] rounded-full appearance-none cursor-pointer accent-[#D8FB32] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#D8FB32] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-[#D8FB32] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-[#666666] text-xs mt-1">
                  <span>8</span>
                  <span>128</span>
                </div>
              </div>

              {/* Character Type Checkboxes */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-3">
                  Karakter Tipleri
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {checkboxes.map((cb) => (
                    <label
                      key={cb.key}
                      className="flex items-center gap-3 bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 cursor-pointer hover:border-[#D8FB32]/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={options[cb.key]}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            [cb.key]: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 accent-[#D8FB32] bg-[#0A0A0A] border-[#1F2937] rounded cursor-pointer"
                      />
                      <span className="text-[#F5F5F5] text-sm">{cb.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-sm hover:bg-[#B4F030] hover:scale-[1.01] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.08)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6" />
                <path d="M2.5 12a10 10 0 0 1 16.8-7.4L21.5 2" />
                <path d="M2.5 22v-6h6" />
                <path d="M21.5 12a10 10 0 0 1-16.8 7.4L2.5 22" />
              </svg>
              Yeni Şifre Oluştur
            </button>
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
            Tüm işlemler tarayıcınızda yapılır. Şifreniz sunucuya gönderilmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
