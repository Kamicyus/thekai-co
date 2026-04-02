"use client";

import { useState, useCallback, useRef } from "react";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEY_NAMES: Record<string, string> = {
  "C": "C Majör / A Minör", "C#": "C# Majör / A# Minör", "D": "D Majör / B Minör",
  "D#": "D# Majör / C Minör", "E": "E Majör / C# Minör", "F": "F Majör / D Minör",
  "F#": "F# Majör / D# Minör", "G": "G Majör / E Minör", "G#": "G# Majör / F Minör",
  "A": "A Majör / F# Minör", "A#": "A# Majör / G Minör", "B": "B Majör / G# Minör",
};

export default function BpmBulucuPage() {
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [minBpm, setMinBpm] = useState<number | null>(null);
  const [maxBpm, setMaxBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);

  // File analysis state
  const [fileBpm, setFileBpm] = useState<number | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeFile = useCallback(async (file: File) => {
    setAnalyzing(true);
    setFileName(file.name);
    setFileBpm(null);
    setFileKey(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;

      // --- BPM Detection (onset detection + autocorrelation) ---
      const bufferSize = 1024;
      const energies: number[] = [];
      for (let i = 0; i < channelData.length - bufferSize; i += bufferSize) {
        let energy = 0;
        for (let j = 0; j < bufferSize; j++) {
          energy += channelData[i + j] * channelData[i + j];
        }
        energies.push(energy / bufferSize);
      }

      // Onset detection — find peaks in energy
      const onsets: number[] = [];
      const threshold = energies.reduce((a, b) => a + b, 0) / energies.length * 1.5;
      let lastOnset = -10;
      for (let i = 1; i < energies.length; i++) {
        if (energies[i] > threshold && energies[i] > energies[i - 1] && i - lastOnset > 5) {
          onsets.push(i);
          lastOnset = i;
        }
      }

      // Calculate intervals between onsets → BPM
      if (onsets.length > 2) {
        const intervals: number[] = [];
        for (let i = 1; i < Math.min(onsets.length, 50); i++) {
          const interval = (onsets[i] - onsets[i - 1]) * bufferSize / sampleRate;
          if (interval > 0.2 && interval < 2.0) {
            intervals.push(interval);
          }
        }
        if (intervals.length > 2) {
          intervals.sort((a, b) => a - b);
          const median = intervals[Math.floor(intervals.length / 2)];
          let detectedBpm = Math.round(60 / median);
          // Normalize to common BPM range
          while (detectedBpm < 60) detectedBpm *= 2;
          while (detectedBpm > 200) detectedBpm /= 2;
          setFileBpm(detectedBpm);
        }
      }

      // --- Key Detection (chromagram analysis) ---
      const fftSize = 4096;
      const offlineCtx = new OfflineAudioContext(1, channelData.length, sampleRate);
      const source = offlineCtx.createBufferSource();
      const analyser = offlineCtx.createAnalyser();
      analyser.fftSize = fftSize;

      const newBuffer = offlineCtx.createBuffer(1, channelData.length, sampleRate);
      newBuffer.getChannelData(0).set(channelData);
      source.buffer = newBuffer;
      source.connect(analyser);
      analyser.connect(offlineCtx.destination);
      source.start(0);

      await offlineCtx.startRendering();

      const freqData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqData);

      // Build chromagram
      const chroma = new Array(12).fill(0);
      for (let i = 0; i < freqData.length; i++) {
        const freq = i * sampleRate / fftSize;
        if (freq > 60 && freq < 2000 && freqData[i] > 50) {
          const noteNum = 12 * Math.log2(freq / 440) + 69;
          const noteIndex = Math.round(noteNum) % 12;
          chroma[(noteIndex + 12) % 12] += freqData[i];
        }
      }

      // Find dominant note
      let maxChroma = 0;
      let dominantNote = 0;
      for (let i = 0; i < 12; i++) {
        if (chroma[i] > maxChroma) {
          maxChroma = chroma[i];
          dominantNote = i;
        }
      }

      const noteName = NOTE_NAMES[dominantNote];
      setFileKey(noteName);

      audioContext.close();
    } catch (err) {
      console.error("Analiz hatası:", err);
    } finally {
      setAnalyzing(false);
    }
  }, []);

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
              Ücretsiz Araç
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            BPM Bulucu
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Bir şarkının temposunu bulmak için ritme tıklayın.
            <br />
            En az 3 tıklama ile BPM değerini hesaplayın.
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
              Sıfırla
            </button>
          </div>
        </div>

        {/* File Analysis */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-2">Dosya ile BPM & Ton Analizi</h2>
          <p className="text-[#999] text-sm mb-6">MP3, WAV veya OGG dosyası yükleyin — BPM ve ton otomatik tespit edilsin.</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) analyzeFile(file);
            }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={analyzing}
            className="w-full py-4 rounded-[10px] border-2 border-dashed border-[#1F2937] hover:border-[#D8FB32]/40 transition-colors text-[#999] hover:text-[#D8FB32] text-sm font-medium disabled:opacity-50"
          >
            {analyzing ? "Analiz ediliyor..." : "Ses Dosyası Yükle"}
          </button>

          {fileName && (
            <div className="mt-4 p-3 bg-[#1A1A1A] rounded-xl">
              <p className="text-[#999] text-xs mb-3">Dosya: {fileName}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A0A] border border-[#1F2937] rounded-xl p-4 text-center">
                  <div className="text-[#666] text-xs uppercase tracking-wider mb-1">BPM</div>
                  <div className="text-[#D8FB32] text-3xl font-bold tabular-nums">
                    {analyzing ? "..." : fileBpm ?? "—"}
                  </div>
                </div>
                <div className="bg-[#0A0A0A] border border-[#1F2937] rounded-xl p-4 text-center">
                  <div className="text-[#666] text-xs uppercase tracking-wider mb-1">Ton / Key</div>
                  <div className="text-[#D8FB32] text-3xl font-bold">
                    {analyzing ? "..." : fileKey ?? "—"}
                  </div>
                  {fileKey && !analyzing && (
                    <div className="text-[#999] text-xs mt-1">{KEY_NAMES[fileKey] || ""}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Nasıl Kullanılır?</h2>
          <ol className="space-y-3 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li><strong>Tap ile:</strong> Dinlediğiniz şarkının ritmine göre TAP butonuna tıklayın</li>
            <li>Her vuruşta bir kez tıklayın — en az 3-4 tıklama yapın</li>
            <li><strong>Dosya ile:</strong> MP3/WAV dosyası yükleyin — BPM ve ton otomatik tespit edilir</li>
            <li>Dosya analizi tamamen tarayıcınızda çalışır, sunucuya yüklenmez</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              İpucu: Tap ile daha doğru sonuç için şarkının bas davuluna göre tıklayın. Dosya analizi kısa parçalarda (&lt;5 dk) daha doğru çalışır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
