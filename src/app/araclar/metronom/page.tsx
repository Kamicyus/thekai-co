"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TIME_SIGNATURES = [
  { label: "2/4", beats: 2 },
  { label: "3/4", beats: 3 },
  { label: "4/4", beats: 4 },
  { label: "6/8", beats: 6 },
];

export default function MetronomPage() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [timeSigIndex, setTimeSigIndex] = useState(2); // default 4/4
  const [tapTimes, setTapTimes] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const timerIdRef = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const bpmRef = useRef(bpm);
  const beatsRef = useRef(TIME_SIGNATURES[timeSigIndex].beats);

  // Keep refs in sync
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    beatsRef.current = TIME_SIGNATURES[timeSigIndex].beats;
  }, [timeSigIndex]);

  const playClick = useCallback((time: number, isAccent: boolean) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Primary tone — louder, sharper
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = isAccent ? 1200 : 900;
    gain.gain.value = isAccent ? 1.0 : 0.7;
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.08);

    // Click layer — adds punch
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.value = isAccent ? 2400 : 1800;
    gain2.gain.value = isAccent ? 0.6 : 0.4;
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(time);
    osc2.stop(time + 0.03);
  }, []);

  const scheduler = useCallback(() => {
    if (!audioContextRef.current || !isPlayingRef.current) return;
    const ctx = audioContextRef.current;

    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      const beat = currentBeatRef.current;
      const isAccent = beat === 0;
      playClick(nextNoteTimeRef.current, isAccent);

      // Schedule UI update
      const beatToShow = beat;
      setTimeout(() => {
        setCurrentBeat(beatToShow);
      }, (nextNoteTimeRef.current - ctx.currentTime) * 1000);

      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current = (currentBeatRef.current + 1) % beatsRef.current;
    }

    timerIdRef.current = window.setTimeout(scheduler, 25);
  }, [playClick]);

  const startMetronome = useCallback(() => {
    const ctx = new AudioContext();
    audioContextRef.current = ctx;
    isPlayingRef.current = true;
    currentBeatRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime;
    setIsPlaying(true);
    setCurrentBeat(-1);
    scheduler();
  }, [scheduler]);

  const stopMetronome = useCallback(() => {
    isPlayingRef.current = false;
    if (timerIdRef.current) clearTimeout(timerIdRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(-1);
  }, []);

  const handleTapTempo = () => {
    const now = Date.now();
    setTapTimes((prev) => {
      const newTaps = [...prev, now].filter((t) => now - t < 3000);
      if (newTaps.length >= 2) {
        const intervals: number[] = [];
        for (let i = 1; i < newTaps.length; i++) {
          intervals.push(newTaps[i] - newTaps[i - 1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const newBpm = Math.round(60000 / avgInterval);
        if (newBpm >= 20 && newBpm <= 300) {
          setBpm(newBpm);
        }
      }
      return newTaps;
    });
  };

  useEffect(() => {
    return () => {
      stopMetronome();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beats = TIME_SIGNATURES[timeSigIndex].beats;

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
            Online Metronom
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Muzik calismalari icin hassas ve kolay kullanilabilen metronom.
            <br />
            BPM ayarlayin, tempo belirleyin, pratik yapin.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* BPM Display */}
          <div className="text-center mb-8">
            <div className="text-8xl sm:text-9xl font-bold text-[#F5F5F5] mb-2 tabular-nums">
              {bpm}
            </div>
            <div className="text-[#999] text-base">BPM</div>
          </div>

          {/* Beat Indicators */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-10">
            {Array.from({ length: beats }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center text-sm font-semibold ${
                  currentBeat === i
                    ? i === 0
                      ? "bg-[#D8FB32] border-[#D8FB32] text-[#0A0A0A] scale-110"
                      : "bg-[#22C55E] border-[#22C55E] text-[#0A0A0A] scale-110"
                    : "bg-[#1A1A1A] border-[#1F2937] text-[#666]"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* BPM Slider */}
          <div className="mb-8">
            <input
              type="range"
              min={20}
              max={300}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#D8FB32]"
              style={{
                background: `linear-gradient(to right, #D8FB32 0%, #D8FB32 ${((bpm - 20) / 280) * 100}%, #1F2937 ${((bpm - 20) / 280) * 100}%, #1F2937 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-[#666] mt-2">
              <span>20</span>
              <span>300</span>
            </div>
          </div>

          {/* BPM Preset Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[60, 80, 100, 120, 140, 160, 180, 200].map((preset) => (
              <button
                key={preset}
                onClick={() => setBpm(preset)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  bpm === preset
                    ? "bg-[#D8FB32] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Time Signature */}
          <div className="flex justify-center gap-3 mb-8">
            {TIME_SIGNATURES.map((ts, i) => (
              <button
                key={ts.label}
                onClick={() => {
                  setTimeSigIndex(i);
                  if (isPlaying) {
                    stopMetronome();
                    setTimeout(() => startMetronome(), 50);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  timeSigIndex === i
                    ? "bg-[#D8FB32] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30"
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={isPlaying ? stopMetronome : startMetronome}
              className={`px-8 py-3.5 rounded-[10px] font-semibold text-base transition-all duration-200 ${
                isPlaying
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030]"
              }`}
            >
              {isPlaying ? "Durdur" : "Baslat"}
            </button>
            <button
              onClick={handleTapTempo}
              className="px-8 py-3.5 rounded-[10px] font-semibold text-base bg-[#1A1A1A] text-[#F5F5F5] border border-[#1F2937] hover:border-[#D8FB32]/40 transition-all duration-200"
            >
              Tap Tempo
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Nasil Kullanilir?</h2>
          <ol className="space-y-3 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li>BPM degerini slider veya preset butonlarla ayarlayin</li>
            <li>Vurusu sayisini secin (2/4, 3/4, 4/4, 6/8)</li>
            <li>&quot;Baslat&quot; butonuna tiklayin</li>
            <li>Veya &quot;Tap Tempo&quot; butonuna ritmik tiklayarak BPM belirleyin</li>
            <li>Ilk vurus vurguludur (aksanlı)</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              Ipucu: Tap Tempo ile bir sarkinin temposunu hizlica bulabilirsiniz. En az 3-4 tiklama yapin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
