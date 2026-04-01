"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const GUITAR_STRINGS = [
  { name: "1. Tel (E4)", note: "E4", freq: 329.63 },
  { name: "2. Tel (B3)", note: "B3", freq: 246.94 },
  { name: "3. Tel (G3)", note: "G3", freq: 196.0 },
  { name: "4. Tel (D3)", note: "D3", freq: 146.83 },
  { name: "5. Tel (A2)", note: "A2", freq: 110.0 },
  { name: "6. Tel (E2)", note: "E2", freq: 82.41 },
];

function getNote(frequency: number) {
  const noteNum = 12 * (Math.log2(frequency / 440));
  const noteIndex = Math.round(noteNum) % 12;
  const octave = Math.floor(Math.log2(frequency / 16.35));
  const cents = Math.round((noteNum - Math.round(noteNum)) * 100);
  const name = NOTE_NAMES[(noteIndex + 12) % 12];
  return { name, octave, cents, noteIndex };
}

function autoCorrelate(buf: Float32Array, sampleRate: number) {
  let size = buf.length;
  let rms = 0;
  for (let i = 0; i < size; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / size);
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = size - 1;
  const thresh = 0.2;
  for (let i = 0; i < size / 2; i++) {
    if (Math.abs(buf[i]) < thresh) { r1 = i; break; }
  }
  for (let i = 1; i < size / 2; i++) {
    if (Math.abs(buf[size - i]) < thresh) { r2 = size - i; break; }
  }

  buf = buf.slice(r1, r2);
  size = buf.length;

  const c = new Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i; j++) {
      c[i] += buf[j] * buf[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1, maxpos = -1;
  for (let i = d; i < size; i++) {
    if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  }

  let T0 = maxpos;
  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

// Smoothing buffer to prevent jitter
const SMOOTH_SIZE = 8;

export default function TunerPage() {
  const [isActive, setIsActive] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [note, setNote] = useState({ name: "-", octave: 0, cents: 0, noteIndex: 0 });
  const [playingRef, setPlayingRef] = useState<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const freqBufferRef = useRef<number[]>([]);
  const lastUpdateRef = useRef<number>(0);

  const updatePitch = useCallback(() => {
    if (!analyserRef.current) return;
    const buf = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buf);
    const freq = autoCorrelate(buf, audioContextRef.current!.sampleRate);

    if (freq > 0 && freq < 2000) {
      // Add to smoothing buffer
      freqBufferRef.current.push(freq);
      if (freqBufferRef.current.length > SMOOTH_SIZE) {
        freqBufferRef.current.shift();
      }

      // Only update display every 100ms to prevent jitter
      const now = Date.now();
      if (now - lastUpdateRef.current > 100) {
        lastUpdateRef.current = now;
        // Median filter (removes outliers better than average)
        const sorted = [...freqBufferRef.current].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        setFrequency(Math.round(median * 10) / 10);
        setNote(getNote(median));
      }
    }
    rafRef.current = requestAnimationFrame(updatePitch);
  }, []);

  const startTuner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;
      setIsActive(true);
      rafRef.current = requestAnimationFrame(updatePitch);
    } catch {
      alert("Mikrofon erişimi gerekiyor. Lütfen izin verin.");
    }
  };

  const stopTuner = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    setIsActive(false);
    setFrequency(0);
    setNote({ name: "-", octave: 0, cents: 0, noteIndex: 0 });
  };

  const playNote = (freq: number, index: number) => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0.3;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setPlayingRef(index);
    setTimeout(() => {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      setTimeout(() => { osc.stop(); ctx.close(); setPlayingRef(null); }, 600);
    }, 1500);
  };

  useEffect(() => {
    return () => { stopTuner(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const centsAngle = Math.max(-45, Math.min(45, (note.cents / 50) * 45));
  const isInTune = Math.abs(note.cents) < 5;

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">Ücretsiz Araç</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Online Gitar Akort Cihazı
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Mikrofonunuzu kullanarak gitarınızı akort edin. Akustik ve elektro gitar için uygundur.
          </p>
        </div>

        {/* Tuner Display */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* Gauge */}
          <div className="relative w-80 sm:w-96 h-48 sm:h-56 mx-auto mb-8">
            {/* Arc background */}
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Background arc */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
              {/* Green center zone */}
              <path d="M 92 23 A 80 80 0 0 1 108 23" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
              {/* Orange zones */}
              <path d="M 60 38 A 80 80 0 0 1 88 24" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
              <path d="M 112 24 A 80 80 0 0 1 140 38" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
              {/* Needle */}
              <line
                x1="100" y1="100" x2="100" y2="25"
                stroke={isActive ? (isInTune ? "#22C55E" : "#F5F5F5") : "#333"}
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${centsAngle}, 100, 100)`}
                style={{ transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />
              {/* Center dot */}
              <circle cx="100" cy="100" r="6" fill={isActive ? (isInTune ? "#22C55E" : "#D8FB32") : "#333"} />
            </svg>
          </div>

          {/* Note Display — fixed height to prevent layout shift */}
          <div className="text-center mb-8 h-[180px] sm:h-[200px] flex flex-col items-center justify-center">
            {!isActive || note.name === "-" ? (
              <img src="/images/kai-carkli.svg" alt="Kai" className="h-20 sm:h-24 opacity-20 mb-2" />
            ) : (
              <div className={`text-8xl sm:text-9xl font-bold mb-2 transition-colors duration-300 ${isInTune ? "text-[#22C55E]" : "text-[#F5F5F5]"}`}>
                {note.name}
                <span className="text-3xl sm:text-4xl text-[#999] ml-1">{note.octave}</span>
              </div>
            )}
            <div className="h-6">
              {isActive && frequency > 0 && (
                <span className="text-[#999] text-base">
                  {frequency} Hz • {note.cents > 0 ? "+" : ""}{note.cents} cent
                </span>
              )}
            </div>
            <div className="h-6 mt-1">
              {isActive && isInTune && frequency > 0 && (
                <span className="text-[#22C55E] text-base font-medium">✓ Akort tamam!</span>
              )}
            </div>
          </div>

          {/* Start/Stop Button */}
          <div className="text-center">
            <button
              onClick={isActive ? stopTuner : startTuner}
              className={`px-8 py-3.5 rounded-[10px] font-semibold text-base transition-all duration-200 ${
                isActive
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030]"
              }`}
            >
              {isActive ? "Akort Cihazını Kapat" : "Akort Cihazını Aç"}
            </button>
          </div>
        </div>

        {/* Guitar Strings Reference */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Standart Gitar Akort Notaları</h2>
          <div className="space-y-3">
            {GUITAR_STRINGS.map((s, i) => (
              <div key={s.note} className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-[#1F2937]/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => playNote(s.freq, i)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      playingRef === i ? "bg-[#D8FB32] text-[#0A0A0A]" : "bg-[#252525] text-[#D8FB32] hover:bg-[#D8FB32]/20"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <span className="text-[#F5F5F5] text-sm font-medium">{s.name}</span>
                </div>
                <span className="text-[#666] text-xs">{s.freq} Hz</span>
              </div>
            ))}
          </div>
          <p className="text-[#666] text-xs mt-4">
            Referans notayı dinlemek için ▶ butonuna tıklayın. Gitarınızın telini bu sese göre ayarlayın.
          </p>
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Nasıl Kullanılır?</h2>
          <ol className="space-y-3 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li>Yeşil "Akort Cihazını Aç" butonuna tıklayın</li>
            <li>Tarayıcınız mikrofon izni isteyecek — izin verin</li>
            <li>Gitarınızın bir telini çalın</li>
            <li>Ekrandaki ibre ortaya gelene kadar teli ayarlayın</li>
            <li>İbre tam ortadayken ve yeşil yandığında tel akort olmuştur</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              💡 İpucu: Sessiz bir ortamda akort yapın. Arka plan gürültüsü sonuçları etkileyebilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
