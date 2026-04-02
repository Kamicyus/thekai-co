"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";
import { TOOLS } from "@/lib/constants";

interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
  lineNumLeft?: number;
  lineNumRight?: number;
}

function computeDiff(left: string, right: string): DiffLine[] {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  const results: DiffLine[] = [];

  // Simple LCS-based diff
  const m = leftLines.length;
  const n = rightLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack
  const diff: { type: "same" | "added" | "removed"; text: string }[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftLines[i - 1] === rightLines[j - 1]) {
      diff.unshift({ type: "same", text: leftLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: "added", text: rightLines[j - 1] });
      j--;
    } else {
      diff.unshift({ type: "removed", text: leftLines[i - 1] });
      i--;
    }
  }

  // Assign line numbers
  let leftNum = 0;
  let rightNum = 0;
  for (const d of diff) {
    if (d.type === "same") {
      leftNum++;
      rightNum++;
      results.push({ ...d, lineNumLeft: leftNum, lineNumRight: rightNum });
    } else if (d.type === "removed") {
      leftNum++;
      results.push({ ...d, lineNumLeft: leftNum });
    } else {
      rightNum++;
      results.push({ ...d, lineNumRight: rightNum });
    }
  }

  return results;
}

export default function MetinFarkiPage() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const diff = useMemo(() => {
    if (!leftText && !rightText) return [];
    return computeDiff(leftText, rightText);
  }, [leftText, rightText]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const same = diff.filter((d) => d.type === "same").length;
    return { added, removed, same };
  }, [diff]);

  const handleClear = useCallback(() => {
    setLeftText("");
    setRightText("");
  }, []);

  const handleSwap = useCallback(() => {
    setLeftText(rightText);
    setRightText(leftText);
  }, [leftText, rightText]);

  const otherTools = TOOLS.filter((t) => t.slug !== "metin-farki");

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
            <span className="text-[#F5F5F5]">Metin Farki Karsilastirici</span>
          </nav>
        </FadeIn>

        {/* Page Header */}
        <FadeIn className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Metin Farki Karsilastirici
          </h1>
          <p className="text-[#999999] text-lg max-w-2xl leading-relaxed">
            Iki metni yan yana karsilastirin. Eklenen satirlar yesil, silinen satirlar kirmizi olarak isaretlenir. Satir bazli karsilastirma.
          </p>
        </FadeIn>

        {/* Action Buttons */}
        <FadeIn delay={0.1} className="flex items-center gap-3 mb-6">
          <button
            onClick={handleSwap}
            disabled={!leftText && !rightText}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#1F2937] text-[#999999] text-sm font-medium rounded-xl hover:border-[#D8FB32]/30 hover:text-[#F5F5F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Degistir
          </button>
          <button
            onClick={handleClear}
            disabled={!leftText && !rightText}
            className="px-4 py-2 text-sm text-[#666666] hover:text-[#999999] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Temizle
          </button>
        </FadeIn>

        {/* Input Areas */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                Orijinal Metin
              </label>
              <textarea
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                placeholder="Orijinal metni buraya yapisitirin..."
                rows={12}
                className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-none"
                spellCheck={false}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs text-[#666666] uppercase tracking-wider font-medium">
                Degistirilmis Metin
              </label>
              <textarea
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                placeholder="Degistirilmis metni buraya yapisitirin..."
                rows={12}
                className="w-full bg-[#1A1A1A] border border-[#1F2937] rounded-xl px-4 py-3 text-[#F5F5F5] text-sm font-mono placeholder:text-[#666666] focus:outline-none focus:border-[#D8FB32]/50 transition-colors resize-none"
                spellCheck={false}
              />
            </div>
          </div>
        </FadeIn>

        {/* Diff Output */}
        {diff.length > 0 && (
          <FadeIn delay={0.2}>
            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <span className="text-xs text-[#666666]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] mr-1.5" />
                {stats.added} satir eklendi
              </span>
              <span className="text-xs text-[#666666]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#EF4444] mr-1.5" />
                {stats.removed} satir silindi
              </span>
              <span className="text-xs text-[#666666]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#666666] mr-1.5" />
                {stats.same} satir ayni
              </span>
            </div>

            {/* Diff View */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-xl overflow-hidden">
              <div className="overflow-auto max-h-[600px]">
                <table className="w-full text-sm font-mono">
                  <tbody>
                    {diff.map((line, i) => (
                      <tr
                        key={i}
                        className={
                          line.type === "added"
                            ? "bg-[#22C55E]/10"
                            : line.type === "removed"
                            ? "bg-[#EF4444]/10"
                            : ""
                        }
                      >
                        <td className="w-12 text-right pr-2 text-[#666666] text-xs select-none border-r border-[#1F2937] px-2 py-0.5">
                          {line.lineNumLeft ?? ""}
                        </td>
                        <td className="w-12 text-right pr-2 text-[#666666] text-xs select-none border-r border-[#1F2937] px-2 py-0.5">
                          {line.lineNumRight ?? ""}
                        </td>
                        <td className="w-6 text-center select-none py-0.5">
                          {line.type === "added" ? (
                            <span className="text-[#22C55E]">+</span>
                          ) : line.type === "removed" ? (
                            <span className="text-[#EF4444]">-</span>
                          ) : (
                            <span className="text-[#666666]"> </span>
                          )}
                        </td>
                        <td
                          className={`px-3 py-0.5 whitespace-pre-wrap break-all ${
                            line.type === "added"
                              ? "text-[#22C55E]"
                              : line.type === "removed"
                              ? "text-[#EF4444]"
                              : "text-[#F5F5F5]"
                          }`}
                        >
                          {line.text || "\u00A0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
