"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

interface PaletteColor {
  hex: string;
  locked: boolean;
}

function randomHex(): string {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function getTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function generatePalette(): PaletteColor[] {
  return Array.from({ length: 5 }, () => ({
    hex: randomHex(),
    locked: false,
  }));
}

export default function RenkPaletiPage() {
  const [colors, setColors] = useState<PaletteColor[]>(generatePalette);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState("");

  const refresh = useCallback(() => {
    setColors((prev) =>
      prev.map((c) => (c.locked ? c : { hex: randomHex(), locked: false }))
    );
  }, []);

  const toggleLock = useCallback((index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  }, []);

  const copyCode = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedText("");
    }, 1500);
  }, []);

  const otherTools = TOOLS.filter((t) => t.slug !== "renk-paleti");

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
            <span className="text-[#F5F5F5]">Renk Paleti Uretici</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Renk Paleti Uretici
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Rastgele renk paleti olusturun. Begendiginiz renkleri kilitleyin, digerlerini yenileyin. HEX, RGB, HSL kodlarini tek tikla kopyalayin.
          </p>
        </FadeIn>

        {/* Refresh Button */}
        <FadeIn delay={0.1} className="mb-8">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#C8EB22] transition-colors duration-200"
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
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M3 22v-6h6" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            </svg>
            Yeni Palet Uret
          </button>
          <span className="ml-4 text-[#666666] text-sm">
            veya <kbd className="px-2 py-0.5 bg-[#1A1A1A] border border-[#1F2937] rounded text-[#999999] text-xs">Space</kbd> tusuna basin
          </span>
        </FadeIn>

        {/* Color Palette */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-12">
            {colors.map((color, i) => {
              const rgb = hexToRgb(color.hex);
              const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
              const textColor = getTextColor(color.hex);

              return (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden border border-[#1F2937] group"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Color Display */}
                  <div className="h-48 sm:h-64 flex items-center justify-center">
                    <span
                      className="text-2xl font-bold font-mono tracking-wider"
                      style={{ color: textColor }}
                    >
                      {color.hex.toUpperCase()}
                    </span>
                  </div>

                  {/* Lock Button */}
                  <button
                    onClick={() => toggleLock(i)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: color.locked
                        ? textColor + "33"
                        : "transparent",
                      color: textColor,
                    }}
                  >
                    {color.locked ? (
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
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
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </svg>
                    )}
                  </button>

                  {/* Color Codes */}
                  <div className="bg-[#141414] p-4 space-y-2">
                    <button
                      onClick={() => copyCode(color.hex.toUpperCase(), i * 10)}
                      className="w-full flex items-center justify-between text-xs font-mono group/btn hover:text-[#D8FB32] transition-colors"
                    >
                      <span className="text-[#666666]">HEX</span>
                      <span className="text-[#F5F5F5] group-hover/btn:text-[#D8FB32]">
                        {copiedIndex === i * 10 ? "Kopyalandi!" : color.hex.toUpperCase()}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        copyCode(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, i * 10 + 1)
                      }
                      className="w-full flex items-center justify-between text-xs font-mono group/btn hover:text-[#D8FB32] transition-colors"
                    >
                      <span className="text-[#666666]">RGB</span>
                      <span className="text-[#F5F5F5] group-hover/btn:text-[#D8FB32]">
                        {copiedIndex === i * 10 + 1
                          ? "Kopyalandi!"
                          : `${rgb.r}, ${rgb.g}, ${rgb.b}`}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        copyCode(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, i * 10 + 2)
                      }
                      className="w-full flex items-center justify-between text-xs font-mono group/btn hover:text-[#D8FB32] transition-colors"
                    >
                      <span className="text-[#666666]">HSL</span>
                      <span className="text-[#F5F5F5] group-hover/btn:text-[#D8FB32]">
                        {copiedIndex === i * 10 + 2
                          ? "Kopyalandi!"
                          : `${hsl.h}, ${hsl.s}%, ${hsl.l}%`}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Keyboard Shortcut Handler */}
        <KeyboardHandler onRefresh={refresh} />

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

function KeyboardHandler({ onRefresh }: { onRefresh: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        onRefresh();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onRefresh]);

  return null;
}
