"use client";

import { useState, useCallback } from "react";

export default function BpmBulucuPage() {
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [minBpm, setMinBpm] = useState<number | null>(null);
  const [maxBpm, setMaxBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = useCallback(() => {
    const now = Date.now();

    setTaps((prev) => {
      // Keep last 8 taps, reset if gap > 3 seconds
      const filtered = prev.filter((t) => now - t < 5000);
      const newTaps = [...filtered, now].slice(-8);

      if (newTaps.length >= 2) {
        const intervals: number[] = [];
        for (let i = 1; i < newTaps.length; i++) {
          intervals.push(newTaps[i] - newTaps[i - 1]);
        }
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const bpms = intervals.map((iv) => Math.round(60000 / iv));
        setBpm(Math.round(60000 / avg));
        setMinBpm(Math.min(...bpms));
        setMaxBpm(Math.max(...bpms));
      }

      setTapCount(newTaps.length);
      return newTaps;
    });
  }, []);

  const handleReset = () => {
    setTaps([]);
    setBpm(null);
    setMinBpm(null);
    setMaxBpm(null);
    setTapCount(0);
  };

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Ucretsiz Arac
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            BPM Bulucu
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Bir sarkinin temposunu bulmak icin ritme tiklayın.
            <br />
            En az 3 tiklama ile BPM degerini hesaplayin.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* BPM Display */}
          <div className="text-center mb-10">
            <div
              className={`text-8xl sm:text-9xl font-bold mb-2 tabular-nums transition-colors duration-200 ${
                bpm ? "text-[#D8FB32]" : "text-[#333]"
              }`}
            >
              {bpm ?? "---"}
            </div>
            <div className="text-[#999] text-base">BPM</div>
          </div>

          {/* Stats */}
          {bpm && (
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-[#1A1A1A] border border-[#1F2937]/50 rounded-xl p-4 text-center">
                <div className="text-[#666] text-xs uppercase tracking-wider mb-1">Minimum</div>
                <div className="text-[#F5F5F5] text-2xl font-bold tabular-nums">{minBpm}</div>
              </div>
              <div className="bg-[#1A1A1A] border border-[#D8FB32]/20 rounded-xl p-4 text-center">
                <div className="text-[#D8FB32] text-xs uppercase tracking-wider mb-1">Ortalama</div>
                <div className="text-[#D8FB32] text-2xl font-bold tabular-nums">{bpm}</div>
              </div>
              <div className="bg-[#1A1A1A] border border-[#1F2937]/50 rounded-xl p-4 text-center">
                <div className="text-[#666] text-xs uppercase tracking-wider mb-1">Maksimum</div>
                <div className="text-[#F5F5F5] text-2xl font-bold tabular-nums">{maxBpm}</div>
              </div>
            </div>
          )}

          {/* Tap Count Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-150 ${
                  i < tapCount ? "bg-[#D8FB32] scale-100" : "bg-[#1F2937] scale-75"
                }`}
              />
            ))}
          </div>

          {/* Tap Button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleTap}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#D8FB32] text-[#0A0A0A] text-2xl sm:text-3xl font-bold hover:bg-[#B4F030] active:scale-95 transition-all duration-100 shadow-[0_0_40px_rgba(216,251,50,0.15)] hover:shadow-[0_0_60px_rgba(216,251,50,0.25)]"
            >
              TAP
            </button>
          </div>

          {/* Reset */}
          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-[10px] text-sm font-medium bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#EF4444]/30 hover:text-[#EF4444] transition-colors"
            >
              Sifirla
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Nasil Kullanilir?</h2>
          <ol className="space-y-3 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li>Dinlediginiz sarkinin ritmine gore &quot;TAP&quot; butonuna tiklayin</li>
            <li>Her vuruşta bir kez tiklayin</li>
            <li>En az 3-4 tiklama yapin, sonuc netlestikce BPM degeri kararli hale gelir</li>
            <li>Son 8 tiklama uzerinden hesaplama yapilir</li>
            <li>3 saniyeden uzun ara verirseniz sayac sifirlanir</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              Ipucu: Daha dogru sonuc icin sarkinin bas davuluna veya snare&apos;ina gore tiklayin. Klavyeden bosluk tusuyla da tiklayabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
