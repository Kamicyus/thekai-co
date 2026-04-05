"use client";

import { useState, useCallback, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

// ─── Types ──────────────────────────────────────────────────────────────────

interface AnalysisResult {
  title: string;
  artist: string;
  thumbnail: string;
  bpm: number | null;
  key: string | null;
  keyFull: string | null;
  spotifyId: string | null;
  found: boolean;
}

interface FileAnalysisResult {
  fileName: string;
  bpm: number | null;
  key: string | null;
  keyFull: string | null;
  duration: number;
}

type AnalysisStep =
  | "idle"
  | "fetching-meta"
  | "searching-spotify"
  | "fetching-features"
  | "done"
  | "error";

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.trim().match(p);
    if (m) return m[1];
  }
  return null;
}

// Camelot / Open Key wheel — maps Spotify pitch class + mode to key notation
const PITCH_CLASS_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const CAMELOT_WHEEL: Record<string, string> = {
  "C_major": "8B", "C#_major": "3B", "D_major": "10B", "D#_major": "5B",
  "E_major": "12B", "F_major": "7B", "F#_major": "2B", "G_major": "9B",
  "G#_major": "4B", "A_major": "11B", "A#_major": "6B", "B_major": "1B",
  "C_minor": "5A", "C#_minor": "12A", "D_minor": "7A", "D#_minor": "2A",
  "E_minor": "9A", "F_minor": "4A", "F#_minor": "11A", "G_minor": "6A",
  "G#_minor": "1A", "A_minor": "8A", "A#_minor": "3A", "B_minor": "10A",
};

function formatKey(pitchClass: number, mode: number): { short: string; full: string } {
  const note = PITCH_CLASS_NAMES[pitchClass] ?? "?";
  const modeStr = mode === 1 ? "Majör" : "Minör";
  const modeKey = mode === 1 ? "major" : "minor";
  const short = mode === 1 ? note : `${note}m`;
  const camelot = CAMELOT_WHEEL[`${note}_${modeKey}`] ?? "";
  const full = `${note} ${modeStr}${camelot ? ` · Camelot: ${camelot}` : ""}`;
  return { short, full };
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function buildWavFilename(title: string, bpm: number | null, key: string | null): string {
  const t = slugifyTitle(title) || "beat";
  const b = bpm ? `${bpm}bpm` : "";
  const k = key ? `_${key}` : "";
  return `${t}${b ? `_${b}` : ""}${k}.wav`;
}

// Step labels for progress indicator
const STEP_LABELS: Record<AnalysisStep, string> = {
  idle: "",
  "fetching-meta": "YouTube bilgisi alınıyor...",
  "searching-spotify": "Spotify'da aranıyor...",
  "fetching-features": "BPM & ton analiz ediliyor...",
  done: "",
  error: "",
};

// ─── Component ──────────────────────────────────────────────────────────────

// ─── Web Audio BPM Detection ──────────────────────────────────────────────
function detectBpmFromBuffer(audioBuffer: AudioBuffer): number {
  const channel = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;

  // Downsample for speed
  const downsampleFactor = Math.floor(sampleRate / 4000);
  const downsampled: number[] = [];
  for (let i = 0; i < channel.length; i += downsampleFactor) {
    downsampled.push(Math.abs(channel[i]));
  }
  const dsRate = sampleRate / downsampleFactor;

  // Onset detection — energy peaks
  const windowSize = Math.floor(dsRate * 0.05); // 50ms windows
  const energies: number[] = [];
  for (let i = 0; i < downsampled.length - windowSize; i += windowSize) {
    let energy = 0;
    for (let j = 0; j < windowSize; j++) {
      energy += downsampled[i + j] * downsampled[i + j];
    }
    energies.push(energy / windowSize);
  }

  // Find peaks (onsets)
  const peaks: number[] = [];
  const threshold = energies.reduce((a, b) => a + b, 0) / energies.length * 1.4;
  for (let i = 1; i < energies.length - 1; i++) {
    if (energies[i] > threshold && energies[i] > energies[i - 1] && energies[i] > energies[i + 1]) {
      peaks.push(i);
    }
  }

  if (peaks.length < 4) return 0;

  // Calculate intervals between peaks
  const intervals: number[] = [];
  for (let i = 1; i < peaks.length; i++) {
    const interval = (peaks[i] - peaks[i - 1]) * 0.05; // seconds
    if (interval > 0.2 && interval < 2.0) { // 30-300 BPM range
      intervals.push(interval);
    }
  }

  if (intervals.length === 0) return 0;

  // Most common interval (histogram approach)
  const bpmCounts = new Map<number, number>();
  for (const interval of intervals) {
    const bpm = Math.round(60 / interval);
    // Normalize to 60-200 range
    let normalized = bpm;
    while (normalized < 60) normalized *= 2;
    while (normalized > 200) normalized /= 2;
    const rounded = Math.round(normalized);
    bpmCounts.set(rounded, (bpmCounts.get(rounded) || 0) + 1);
  }

  let bestBpm = 120;
  let bestCount = 0;
  for (const [bpm, count] of bpmCounts) {
    if (count > bestCount) {
      bestCount = count;
      bestBpm = bpm;
    }
  }

  return bestBpm;
}

// ─── Key Detection (Krumhansl-Schmuckler algorithm) ───────────────────────
function detectKeyFromBuffer(audioBuffer: AudioBuffer): { short: string; full: string } {
  const channel = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const fftSize = 4096;

  // Use first 30 seconds max
  const maxSamples = Math.min(channel.length, sampleRate * 30);
  const chromagram = new Float32Array(12).fill(0);

  // Simple chromagram via autocorrelation-based pitch detection
  const noteFreqs = [
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23,
    369.99, 392.00, 415.30, 440.00, 466.16, 493.88
  ]; // C4 to B4

  for (let offset = 0; offset < maxSamples - fftSize; offset += fftSize) {
    for (let note = 0; note < 12; note++) {
      const period = sampleRate / noteFreqs[note];
      let correlation = 0;
      const samples = Math.min(fftSize, maxSamples - offset);
      for (let i = 0; i < samples - Math.ceil(period); i++) {
        correlation += channel[offset + i] * channel[offset + i + Math.round(period)];
      }
      // Also check octaves
      const period2 = period * 2;
      let corr2 = 0;
      for (let i = 0; i < samples - Math.ceil(period2); i++) {
        corr2 += channel[offset + i] * channel[offset + i + Math.round(period2)];
      }
      chromagram[note] += Math.max(0, correlation) + Math.max(0, corr2) * 0.5;
    }
  }

  // Krumhansl-Schmuckler profiles
  const majorProfile = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
  const minorProfile = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

  let bestKey = 0;
  let bestMode = 0;
  let bestCorr = -Infinity;

  for (let key = 0; key < 12; key++) {
    for (let mode = 0; mode < 2; mode++) {
      const profile = mode === 0 ? majorProfile : minorProfile;
      // Rotate chromagram
      let sumXY = 0, sumX = 0, sumY = 0, sumX2 = 0, sumY2 = 0;
      for (let i = 0; i < 12; i++) {
        const x = chromagram[(i + key) % 12];
        const y = profile[i];
        sumXY += x * y;
        sumX += x;
        sumY += y;
        sumX2 += x * x;
        sumY2 += y * y;
      }
      const n = 12;
      const corr = (n * sumXY - sumX * sumY) /
        Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
      if (corr > bestCorr) {
        bestCorr = corr;
        bestKey = key;
        bestMode = mode;
      }
    }
  }

  const note = PITCH_CLASS_NAMES[bestKey];
  const modeStr = bestMode === 0 ? "Majör" : "Minör";
  const modeKey = bestMode === 0 ? "major" : "minor";
  const short = bestMode === 0 ? note : `${note}m`;
  const camelot = CAMELOT_WHEEL[`${note}_${modeKey}`] ?? "";
  return {
    short,
    full: `${note} ${modeStr}${camelot ? ` · Camelot: ${camelot}` : ""}`,
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function YoutubeBpmAnalyzPage() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<AnalysisStep>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // File upload state
  const [fileResult, setFileResult] = useState<FileAnalysisResult | null>(null);
  const [fileStep, setFileStep] = useState<"idle" | "decoding" | "analyzing-bpm" | "analyzing-key" | "done" | "error">("idle");
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileCopied, setFileCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File analysis handler ──────────────────────────────────────────────────
  const analyzeFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|flac|ogg|m4a|aac|aiff|wma)$/i)) {
      setFileError("Lütfen bir ses dosyası seçin (MP3, WAV, FLAC, OGG, M4A, AAC)");
      return;
    }

    setFileError(null);
    setFileResult(null);
    setFileStep("decoding");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new AudioContext();

      setFileStep("decoding");
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      setFileStep("analyzing-bpm");
      const bpm = detectBpmFromBuffer(audioBuffer);

      setFileStep("analyzing-key");
      const key = detectKeyFromBuffer(audioBuffer);

      setFileResult({
        fileName: file.name,
        bpm: bpm > 0 ? bpm : null,
        key: key.short,
        keyFull: key.full,
        duration: audioBuffer.duration,
      });
      setFileStep("done");

      await audioContext.close();
    } catch (e) {
      setFileError(`Dosya analiz edilemedi: ${e instanceof Error ? e.message : "Bilinmeyen hata"}`);
      setFileStep("error");
    }
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) analyzeFile(file);
  }, [analyzeFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) analyzeFile(file);
  }, [analyzeFile]);

  // ── Core analysis pipeline ────────────────────────────────────────────────

  const analyze = useCallback(async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Geçerli bir YouTube URL'si girin. (örn: https://youtube.com/watch?v=...)");
      return;
    }

    setError(null);
    setResult(null);
    setStep("fetching-meta");

    // ── 1. YouTube oEmbed → title + thumbnail ────────────────────────────
    let title = "";
    let artist = "";
    let thumbnail = "";

    try {
      const oembed = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      if (!oembed.ok) throw new Error("oEmbed isteği başarısız");
      const data = await oembed.json();
      title = data.title ?? "";
      artist = data.author_name ?? "";
      // oEmbed doesn't return thumbnail — build it directly
      thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } catch {
      // Fallback: use video ID thumbnail, no title
      thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      title = `YouTube Video (${videoId})`;
    }

    setStep("searching-spotify");

    // ── 2. Spotify token (Client Credentials) ────────────────────────────
    // We use a public proxy approach: call /api/spotify-features
    // which handles the token server-side. But since we're fully client-side
    // here, we use the Spotify public search widget API (no auth needed for search)
    // and the GetSongBPM free API as fallback.

    let bpm: number | null = null;
    let keyShort: string | null = null;
    let keyFull: string | null = null;
    let spotifyId: string | null = null;
    let found = false;

    // ── 3. GetSongBPM API (public, free, no key needed for basic search) ─
    // API: https://getsongbpm.com/api
    // The free tier allows searches without an API key via their public endpoint.
    try {
      const cleanTitle = title
        .replace(/\(.*?\)/g, "")
        .replace(/\[.*?\]/g, "")
        .replace(/ft\..*/i, "")
        .replace(/feat\..*/i, "")
        .trim();

      const searchQuery = encodeURIComponent(`${cleanTitle}`);
      const gsbRes = await fetch(
        `https://api.getsongbpm.com/search/?api_key=free&type=both&lookup=${searchQuery}`,
        { headers: { Accept: "application/json" } }
      );

      if (gsbRes.ok) {
        const gsbData = await gsbRes.json();
        const songs = gsbData?.search ?? [];
        if (songs.length > 0) {
          const song = songs[0];
          if (song.tempo) {
            bpm = Math.round(Number(song.tempo));
            found = true;
          }
          if (song.key_of) {
            keyShort = song.key_of;
            keyFull = song.key_of;
          }
        }
      }
    } catch {
      // GetSongBPM failed — continue to next method
    }

    setStep("fetching-features");

    // ── 4. Spotify Search + Audio Features (via our API route) ───────────
    // Falls back if GetSongBPM didn't return results
    if (!found || bpm === null) {
      try {
        const apiRes = await fetch(
          `/api/spotify-features?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
        );
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.bpm) bpm = Math.round(apiData.bpm);
          if (apiData.key !== undefined && apiData.mode !== undefined) {
            const { short, full } = formatKey(apiData.key, apiData.mode);
            keyShort = short;
            keyFull = full;
          }
          if (apiData.spotifyId) spotifyId = apiData.spotifyId;
          found = true;
        }
      } catch {
        // API route not available (static export) — that's fine
      }
    }

    // ── 5. Lokal BPM API (yt-dlp + librosa ile gerçek ses analizi) ─────
    if (process.env.NODE_ENV === "development" && (!found || bpm === null)) {
      try {
        const localRes = await fetch("http://localhost:5555/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (localRes.ok) {
          const localData = await localRes.json();
          if (localData.bpm) {
            bpm = localData.bpm;
            keyShort = localData.key;
            keyFull = localData.keyFull;
            found = true;
          }
        }
      } catch {
        // Lokal API çalışmıyor — devam et
      }
    }

    // ── 6. Fallback: Parse BPM/Key from video title (type beats often include it)
    if (!found || bpm === null) {
      // Try to extract BPM from title like "140 BPM", "tempo 120", etc.
      const bpmMatch = title.match(/(\d{2,3})\s*bpm/i) || title.match(/tempo\s*(\d{2,3})/i);
      if (bpmMatch) {
        bpm = parseInt(bpmMatch[1]);
        if (bpm >= 40 && bpm <= 300) found = true;
      }
      // Try to extract key from title like "Am", "C# Minor", "F Major", "Dm"
      const keyMatch = title.match(/\b([A-G][#b]?)\s*(min(?:or)?|maj(?:or)?|m)\b/i)
        || title.match(/\b([A-G][#b]?m)\b/);
      if (keyMatch) {
        const rawKey = keyMatch[0].trim();
        keyShort = rawKey.replace(/minor/i, "m").replace(/major/i, "").replace(/min/i, "m").replace(/maj/i, "");
        keyFull = rawKey;
        found = true;
      }
    }

    setResult({
      title,
      artist,
      thumbnail,
      bpm,
      key: keyShort,
      keyFull,
      spotifyId,
      found,
    });
    setStep("done");
  }, [url]);

  // ── Copy BPM handler ──────────────────────────────────────────────────────

  const copyBpm = useCallback(() => {
    if (result?.bpm) {
      navigator.clipboard.writeText(String(result.bpm)).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }, [result]);

  // ── Download WAV handler (creates a named anchor with a placeholder) ───

  const [downloading, setDownloading] = useState(false);

  const handleDownloadHint = useCallback(async () => {
    if (!result || !url) return;
    setDownloading(true);

    try {
      // Try cobalt API for audio extraction
      const res = await fetch("https://api.cobalt.tools/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ url, audioFormat: "wav", isAudioOnly: true, aFormat: "wav" }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          // Direct download link from cobalt
          const a = document.createElement("a");
          a.href = data.url;
          a.download = buildWavFilename(result.title, result.bpm, result.key);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setDownloading(false);
          return;
        }
      }

      // Fallback: open in new tab for manual download
      const videoId = url.match(/(?:v=|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/)?.[1];
      if (videoId) {
        window.open(`https://cobalt.tools/#${url}`, "_blank");
      } else {
        alert("Bu URL desteklenmiyor. Lütfen geçerli bir YouTube linki girin.");
      }
    } catch {
      // Network error — open cobalt.tools as fallback
      window.open(`https://cobalt.tools/`, "_blank");
    } finally {
      setDownloading(false);
    }
  }, [result, url]);

  const isLoading =
    step === "fetching-meta" ||
    step === "searching-spotify" ||
    step === "fetching-features";

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D8FB32]/3 rounded-full blur-[120px]" />

      {/* Decorative pinwheels */}
      <div className="absolute top-24 right-8 pointer-events-none">
        <DecorativePinwheel size={110} opacity={0.04} rotate={10} />
      </div>
      <div className="absolute bottom-48 left-4 pointer-events-none">
        <DecorativePinwheel size={72} opacity={0.03} rotate={-18} />
      </div>

      <div className="max-w-[780px] mx-auto px-6 lg:px-8">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D8FB32]/10 border border-[#D8FB32]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full" />
            <span className="text-[#D8FB32] text-xs font-medium uppercase tracking-wider">
              Ücretsiz Araç
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            YouTube BPM &amp; Ton Analiz
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto leading-relaxed">
            YouTube linki yapıştır veya ses dosyası yükle — şarkının BPM (tempo) ve
            müzikal ton (key) bilgisini anında öğren. Prodüksiyonda mix uyumu için ideal.
          </p>
        </FadeIn>

        {/* ── Input Card ────────────────────────────────────────────────── */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-7 sm:p-9 mb-6">
          <label className="block text-[#CCCCCC] text-sm font-medium mb-2">
            YouTube URL
          </label>
          <p className="text-[#666] text-xs mb-3">
            ⚠️ Tarayıcınızda pop-up engelleyici veya mikrofon izni uyarısı çıkarsa &quot;İzin Ver&quot; butonuna tıklayın.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
                if (step === "done") setStep("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) analyze();
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-4 py-3.5 bg-[#0A0A0A] border border-[#1F2937] rounded-[12px] text-[#F5F5F5] text-sm placeholder-[#444] outline-none focus:border-[#D8FB32]/40 focus:ring-1 focus:ring-[#D8FB32]/20 transition-all"
            />
            <button
              onClick={analyze}
              disabled={isLoading || !url.trim()}
              className="px-7 py-3.5 rounded-[12px] bg-[#D8FB32] text-[#0A0A0A] text-sm font-bold hover:bg-[#C4E82C] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_0_20px_rgba(216,251,50,0.12)]"
            >
              {isLoading ? "Analiz Ediliyor..." : "Analiz Et"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl">
              <p className="text-[#EF4444] text-sm">{error}</p>
            </div>
          )}

          {/* Loading progress */}
          {isLoading && (
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#D8FB32]/30 border-t-[#D8FB32] animate-spin flex-shrink-0" />
                <span className="text-[#D8FB32] text-sm">{STEP_LABELS[step]}</span>
              </div>
              {/* Step dots */}
              <div className="flex gap-2 pl-8">
                {(["fetching-meta", "searching-spotify", "fetching-features"] as const).map(
                  (s) => (
                    <div
                      key={s}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        step === s
                          ? "w-6 bg-[#D8FB32]"
                          : ["fetching-meta", "searching-spotify", "fetching-features"].indexOf(s) <
                            ["fetching-meta", "searching-spotify", "fetching-features"].indexOf(step)
                          ? "w-4 bg-[#D8FB32]/50"
                          : "w-4 bg-[#1F2937]"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Results Card ───────────────────────────────────────────────── */}
        {step === "done" && result && (
          <FadeIn>
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] overflow-hidden mb-6">
              {/* Song header strip */}
              <div className="flex items-center gap-4 p-6 border-b border-[#1F2937]">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    width={80}
                    height={56}
                    className="w-20 h-14 object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* YouTube play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#FF0000]/80 flex items-center justify-center">
                      <svg width="8" height="9" viewBox="0 0 8 9" fill="white">
                        <path d="M1.5 1.5l5 3.5-5 3.5V1.5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title + artist */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-[#F5F5F5] text-base font-semibold leading-snug line-clamp-2 mb-0.5">
                    {result.title}
                  </h2>
                  <p className="text-[#999] text-sm">{result.artist}</p>
                </div>

                {/* Open on YouTube */}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-xl bg-[#1A1A1A] border border-[#1F2937] text-[#999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all"
                  title="YouTube'da aç"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              {/* BPM + Key metrics */}
              <div className="grid grid-cols-2 gap-px bg-[#1F2937]">
                {/* BPM */}
                <div className="bg-[#141414] p-7 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#666] text-xs uppercase tracking-wider mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m12 7 1 4.5L16 13" />
                    </svg>
                    Tempo (BPM)
                  </div>
                  {result.bpm !== null ? (
                    <>
                      <div className="text-[#D8FB32] text-6xl font-bold tabular-nums leading-none">
                        {result.bpm}
                      </div>
                      <div className="text-[#999] text-xs">vuruş / dakika</div>
                      {/* Tempo description */}
                      <div className="mt-2 inline-flex">
                        <span className="text-[10px] bg-[#D8FB32]/10 text-[#D8FB32] px-2.5 py-1 rounded-full font-medium">
                          {result.bpm < 70
                            ? "Largo — Çok Yavaş"
                            : result.bpm < 90
                            ? "Andante — Yavaş"
                            : result.bpm < 110
                            ? "Moderato — Orta"
                            : result.bpm < 130
                            ? "Allegretto — Canlı"
                            : result.bpm < 160
                            ? "Allegro — Hızlı"
                            : result.bpm < 200
                            ? "Vivace — Çok Hızlı"
                            : "Presto — Aşırı Hızlı"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-[#555] text-3xl font-bold">—</div>
                  )}
                </div>

                {/* Key */}
                <div className="bg-[#141414] p-7 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#666] text-xs uppercase tracking-wider mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21 2-9.6 9.6" />
                      <path d="M3.5 17.5 5 20l2.5 1.5 10-10-3-3L4.5 18Z" />
                      <circle cx="14" cy="9" r="2" />
                    </svg>
                    Müzikal Ton (Key)
                  </div>
                  {result.key !== null ? (
                    <>
                      <div className="text-[#D8FB32] text-6xl font-bold leading-none tracking-tight">
                        {result.key}
                      </div>
                      <div className="text-[#999] text-xs leading-relaxed mt-1">
                        {result.keyFull}
                      </div>
                    </>
                  ) : (
                    <div className="text-[#555] text-3xl font-bold">—</div>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="p-5 flex flex-wrap gap-3 border-t border-[#1F2937]">
                {/* Copy BPM */}
                {result.bpm !== null && (
                  <button
                    onClick={copyBpm}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#1F2937] text-[#CCCCCC] text-sm hover:border-[#D8FB32]/30 hover:text-[#D8FB32] transition-all"
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Kopyalandı!
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        BPM Kopyala
                      </>
                    )}
                  </button>
                )}

                {/* Beat download hint */}
                <button
                  onClick={handleDownloadHint}
                  disabled={downloading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D8FB32]/10 border border-[#D8FB32]/20 text-[#D8FB32] text-sm hover:bg-[#D8FB32]/15 hover:border-[#D8FB32]/40 transition-all font-medium disabled:opacity-50"
                >
                  {downloading ? (
                    <>
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                      İndiriliyor...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Beat İndir (WAV)
                    </>
                  )}
                </button>

                {/* Spotify link */}
                {result.spotifyId && (
                  <a
                    href={`https://open.spotify.com/track/${result.spotifyId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] text-sm hover:bg-[#1DB954]/15 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </a>
                )}

                {/* New analysis */}
                <button
                  onClick={() => {
                    setStep("idle");
                    setResult(null);
                    setUrl("");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#1F2937] text-[#999] text-sm hover:border-[#EF4444]/30 hover:text-[#EF4444] transition-all ml-auto"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                  </svg>
                  Yeni Analiz
                </button>
              </div>

              {/* Not found notice — scroll to file upload */}
              {!result.found && (
                <div className="px-5 pb-5">
                  <div className="p-4 bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-xl">
                    <p className="text-[#F59E0B] text-sm">
                      <strong>BPM / ton bilgisi bulunamadı.</strong> Bu şarkı müzik
                      veritabanlarında kayıtlı olmayabilir (type beat, remix, cover vb.).{" "}
                      <button
                        onClick={() => document.getElementById("file-upload-section")?.scrollIntoView({ behavior: "smooth" })}
                        className="underline hover:text-[#F5F5F5] transition-colors font-medium"
                      >
                        Aşağıdaki ses dosyası yükleme alanını kullanarak
                      </button>{" "}
                      doğrudan analiz edebilirsin.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* ── File Upload Section ───────────────────────────────────────── */}
        <div id="file-upload-section" className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-7 sm:p-9 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#D8FB32]/10 border border-[#D8FB32]/20 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <div>
              <h2 className="text-[#F5F5F5] text-base font-semibold">Ses Dosyası Analizi</h2>
              <p className="text-[#666] text-xs">Kendi ses dosyanı yükle — BPM ve ton anında analiz edilsin</p>
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-[16px] p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-[#D8FB32] bg-[#D8FB32]/5"
                : "border-[#1F2937] hover:border-[#D8FB32]/40 hover:bg-[#0A0A0A]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,.mp3,.wav,.flac,.ogg,.m4a,.aac,.aiff"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                isDragging ? "bg-[#D8FB32]/20" : "bg-[#1A1A1A]"
              }`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDragging ? "#D8FB32" : "#666"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <p className="text-[#CCCCCC] text-sm font-medium">
                  {isDragging ? "Bırak!" : "Ses dosyasını sürükle veya tıkla"}
                </p>
                <p className="text-[#555] text-xs mt-1">MP3, WAV, FLAC, OGG, M4A, AAC — maks 100MB</p>
              </div>
            </div>
          </div>

          {/* File loading progress */}
          {fileStep !== "idle" && fileStep !== "done" && fileStep !== "error" && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#D8FB32]/30 border-t-[#D8FB32] animate-spin flex-shrink-0" />
              <span className="text-[#D8FB32] text-sm">
                {fileStep === "decoding" && "Ses dosyası çözümleniyor..."}
                {fileStep === "analyzing-bpm" && "BPM tespit ediliyor..."}
                {fileStep === "analyzing-key" && "Ton analiz ediliyor..."}
              </span>
            </div>
          )}

          {/* File error */}
          {fileError && (
            <div className="mt-3 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl">
              <p className="text-[#EF4444] text-sm">{fileError}</p>
            </div>
          )}

          {/* File results */}
          {fileStep === "done" && fileResult && (
            <div className="mt-5 bg-[#0A0A0A] border border-[#1F2937] rounded-[16px] overflow-hidden">
              {/* File info header */}
              <div className="flex items-center gap-3 p-5 border-b border-[#1F2937]">
                <div className="w-10 h-10 rounded-xl bg-[#D8FB32]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[#F5F5F5] text-sm font-semibold truncate">{fileResult.fileName}</p>
                  <p className="text-[#666] text-xs">
                    {Math.floor(fileResult.duration / 60)}:{String(Math.floor(fileResult.duration % 60)).padStart(2, "0")} süre
                  </p>
                </div>
              </div>

              {/* BPM + Key grid */}
              <div className="grid grid-cols-2 gap-px bg-[#1F2937]">
                <div className="bg-[#0A0A0A] p-6 flex flex-col gap-1.5">
                  <div className="text-[#666] text-xs uppercase tracking-wider">BPM</div>
                  {fileResult.bpm ? (
                    <>
                      <div className="text-[#D8FB32] text-5xl font-bold tabular-nums leading-none">
                        {fileResult.bpm}
                      </div>
                      <div className="mt-1.5 inline-flex">
                        <span className="text-[10px] bg-[#D8FB32]/10 text-[#D8FB32] px-2.5 py-1 rounded-full font-medium">
                          {fileResult.bpm < 70 ? "Largo" : fileResult.bpm < 90 ? "Andante" : fileResult.bpm < 110 ? "Moderato" : fileResult.bpm < 130 ? "Allegretto" : fileResult.bpm < 160 ? "Allegro" : "Vivace"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-[#555] text-3xl font-bold">—</div>
                  )}
                </div>
                <div className="bg-[#0A0A0A] p-6 flex flex-col gap-1.5">
                  <div className="text-[#666] text-xs uppercase tracking-wider">Ton (Key)</div>
                  {fileResult.key ? (
                    <>
                      <div className="text-[#D8FB32] text-5xl font-bold leading-none">{fileResult.key}</div>
                      <div className="text-[#999] text-xs mt-1">{fileResult.keyFull}</div>
                    </>
                  ) : (
                    <div className="text-[#555] text-3xl font-bold">—</div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 flex flex-wrap gap-3 border-t border-[#1F2937]">
                {fileResult.bpm && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(String(fileResult.bpm));
                      setFileCopied(true);
                      setTimeout(() => setFileCopied(false), 1500);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F2937] text-[#CCCCCC] text-sm hover:border-[#D8FB32]/30 hover:text-[#D8FB32] transition-all"
                  >
                    {fileCopied ? "✓ Kopyalandı!" : "BPM Kopyala"}
                  </button>
                )}
                {fileResult.bpm && fileResult.key && (
                  <button
                    onClick={() => {
                      const info = `${fileResult.bpm} BPM · ${fileResult.keyFull}`;
                      navigator.clipboard.writeText(info);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F2937] text-[#CCCCCC] text-sm hover:border-[#D8FB32]/30 hover:text-[#D8FB32] transition-all"
                  >
                    Tümünü Kopyala
                  </button>
                )}
                <button
                  onClick={() => {
                    setFileStep("idle");
                    setFileResult(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] border border-[#1F2937] text-[#999] text-sm hover:border-[#EF4444]/30 hover:text-[#EF4444] transition-all ml-auto"
                >
                  Yeni Dosya
                </button>
              </div>
            </div>
          )}

          {/* Permission + Privacy note */}
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-[#3B82F6]/8 border border-[#3B82F6]/20 rounded-xl">
              <p className="text-[#93C5FD] text-xs leading-relaxed">
                ℹ️ <strong>İzin gerekebilir:</strong> Tarayıcınız ses analizi için izin isteyebilir. &quot;İzin Ver&quot; veya &quot;Allow&quot; butonuna tıklayın. Bu izin sadece yüklediğiniz dosyayı analiz etmek içindir.
              </p>
            </div>
            <div className="p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
              <p className="text-[#D8FB32]/70 text-xs leading-relaxed">
                🔒 Ses dosyanız sunucuya yüklenmez. Tüm analiz tarayıcınızda (Web Audio API) yapılır. Verileriniz cihazınızdan çıkmaz.
              </p>
            </div>
          </div>
        </div>

        {/* Beat Download Guide ve How It Works kaldırıldı — kullanıcı odaklı temiz arayüz */}
      </div>
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

// Sub-components removed — clean user-facing UI only
