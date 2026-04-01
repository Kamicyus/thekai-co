"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
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

function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export default function RenkCeviriciPage() {
  const [hex, setHex] = useState("#D8FB32");
  const [rgb, setRgb] = useState({ r: 216, g: 251, b: 50 });
  const [hsl, setHsl] = useState({ h: 70, s: 96, l: 59 });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b));
    }
  }, []);

  const updateFromRgb = useCallback(
    (r: number, g: number, b: number) => {
      setRgb({ r, g, b });
      setHex(rgbToHex(r, g, b));
      setHsl(rgbToHsl(r, g, b));
    },
    []
  );

  const updateFromHsl = useCallback(
    (h: number, s: number, l: number) => {
      setHsl({ h, s, l });
      const rgbVal = hslToRgb(h, s, l);
      setRgb(rgbVal);
      setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
    },
    []
  );

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromHex(e.target.value);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const hexString = hex.startsWith("#") ? hex.toUpperCase() : `#${hex}`.toUpperCase();
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const otherTools = TOOLS.filter((t) => t.slug !== "renk-cevirici");

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
            <span className="text-[#F5F5F5]">Renk Kodu Çevirici</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Renk Kodu Çevirici
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            HEX, RGB ve HSL renk kodlarını anında çevirin. Canlı önizleme ile
            renginizi seçin, tüm formatları kopyalayın.
          </p>
        </FadeIn>

        {/* Main Content */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Color Preview + Picker */}
            <div className="space-y-6">
              {/* Color Preview */}
              <div
                className="w-full aspect-square max-h-[320px] rounded-[20px] border border-[#1F2937] transition-colors duration-200"
                style={{ backgroundColor: hexString }}
              />

              {/* Color Picker */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  Renk Seçici
                </label>
                <input
                  type="color"
                  value={hexString}
                  onChange={handleColorPicker}
                  className="w-full h-14 rounded-xl border border-[#1F2937] cursor-pointer bg-transparent"
                />
              </div>
            </div>

            {/* Right: Color Values */}
            <div className="space-y-5">
              {/* HEX */}
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  HEX
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => updateFromHex(e.target.value)}
                    className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] font-mono text-lg focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    placeholder="#D8FB32"
                  />
                  <button
                    onClick={() => copyToClipboard(hexString, "hex")}
                    className="shrink-0 px-4 py-3 bg-[#1A1A1A] border border-[#1F2937] text-[#999999] rounded-xl text-sm hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all"
                  >
                    {copiedField === "hex" ? "Kopyalandı!" : "Kopyala"}
                  </button>
                </div>
              </div>

              {/* RGB */}
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  RGB
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">R</label>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.r}
                      onChange={(e) =>
                        updateFromRgb(Number(e.target.value), rgb.g, rgb.b)
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">G</label>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.g}
                      onChange={(e) =>
                        updateFromRgb(rgb.r, Number(e.target.value), rgb.b)
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">B</label>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb.b}
                      onChange={(e) =>
                        updateFromRgb(rgb.r, rgb.g, Number(e.target.value))
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-4 py-2.5 text-[#F5F5F5] font-mono text-sm">
                    {rgbString}
                  </div>
                  <button
                    onClick={() => copyToClipboard(rgbString, "rgb")}
                    className="shrink-0 px-4 py-2.5 bg-[#1A1A1A] border border-[#1F2937] text-[#999999] rounded-lg text-sm hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all"
                  >
                    {copiedField === "rgb" ? "Kopyalandı!" : "Kopyala"}
                  </button>
                </div>
              </div>

              {/* HSL */}
              <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5">
                <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium mb-2">
                  HSL
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">
                      H (0-360)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={360}
                      value={hsl.h}
                      onChange={(e) =>
                        updateFromHsl(Number(e.target.value), hsl.s, hsl.l)
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">
                      S (0-100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={hsl.s}
                      onChange={(e) =>
                        updateFromHsl(hsl.h, Number(e.target.value), hsl.l)
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#666666] mb-1">
                      L (0-100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={hsl.l}
                      onChange={(e) =>
                        updateFromHsl(hsl.h, hsl.s, Number(e.target.value))
                      }
                      className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-3 py-2.5 text-[#F5F5F5] font-mono text-sm focus:outline-none focus:border-[#D8FB32]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#1A1A1A] border border-[#1F2937] rounded-lg px-4 py-2.5 text-[#F5F5F5] font-mono text-sm">
                    {hslString}
                  </div>
                  <button
                    onClick={() => copyToClipboard(hslString, "hsl")}
                    className="shrink-0 px-4 py-2.5 bg-[#1A1A1A] border border-[#1F2937] text-[#999999] rounded-lg text-sm hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all"
                  >
                    {copiedField === "hsl" ? "Kopyalandı!" : "Kopyala"}
                  </button>
                </div>
              </div>
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
            Tüm işlemler tarayıcınızda yapılır. Verileriniz sunucuya gönderilmez.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
