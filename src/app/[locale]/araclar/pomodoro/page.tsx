"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "work" | "break" | "longBreak";

export default function PomodoroPage() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("work");
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getPhaseMinutes = useCallback(
    (p: Phase) => {
      if (p === "work") return workMinutes;
      if (p === "break") return breakMinutes;
      return longBreakMinutes;
    },
    [workMinutes, breakMinutes, longBreakMinutes]
  );

  const playNotification = useCallback(() => {
    try {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // Play 3 beeps
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.3 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.3);
        osc.stop(ctx.currentTime + i * 0.3 + 0.25);
      }
    } catch {
      // Audio not supported
    }
  }, []);

  const switchPhase = useCallback(() => {
    playNotification();

    if (phase === "work") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % 4 === 0) {
        setPhase("longBreak");
        setSecondsLeft(longBreakMinutes * 60);
      } else {
        setPhase("break");
        setSecondsLeft(breakMinutes * 60);
      }
    } else {
      setPhase("work");
      setSecondsLeft(workMinutes * 60);
    }
    setIsRunning(false);
  }, [phase, sessions, workMinutes, breakMinutes, longBreakMinutes, playNotification]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            switchPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, switchPhase]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("work");
    setSecondsLeft(workMinutes * 60);
    setSessions(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    switchPhase();
  };

  const applySettings = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSecondsLeft(getPhaseMinutes(phase) * 60);
    setShowSettings(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const totalSeconds = getPhaseMinutes(phase) * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  const phaseLabel =
    phase === "work" ? "Çalışma" : phase === "break" ? "Mola" : "Uzun Mola";
  const phaseColor =
    phase === "work" ? "#D8FB32" : phase === "break" ? "#22C55E" : "#3B82F6";

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
            Pomodoro Zamanlayıcı
          </h1>
          <p className="text-[#999999] text-base max-w-lg mx-auto">
            Pomodoro tekniği ile verimli çalışın.
            <br />
            25 dk çalışma, 5 dk mola, her 4 dönemde uzun mola.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-8 sm:p-10 mb-6">
          {/* Phase Indicator */}
          <div className="flex justify-center gap-3 mb-8">
            {(["work", "break", "longBreak"] as Phase[]).map((p) => (
              <button
                key={p}
                onClick={() => {
                  if (!isRunning) {
                    setPhase(p);
                    setSecondsLeft(getPhaseMinutes(p) * 60);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  phase === p
                    ? "text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-[#999] border border-[#1F2937] hover:border-[#D8FB32]/30"
                }`}
                style={phase === p ? { backgroundColor: phaseColor } : undefined}
              >
                {p === "work" ? "Çalışma" : p === "break" ? "Mola" : "Uzun Mola"}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="relative flex justify-center items-center mb-8">
            {/* Circular progress */}
            <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
              <circle
                cx="140"
                cy="140"
                r="125"
                fill="none"
                stroke="#1F2937"
                strokeWidth="6"
              />
              <circle
                cx="140"
                cy="140"
                r="125"
                fill="none"
                stroke={phaseColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 125}
                strokeDashoffset={2 * Math.PI * 125 * (1 - progress / 100)}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-7xl sm:text-8xl font-bold text-[#F5F5F5] tabular-nums">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
              <div className="text-sm font-medium mt-2" style={{ color: phaseColor }}>
                {phaseLabel}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={handleStartPause}
              className={`px-8 py-3.5 rounded-[10px] font-semibold text-base transition-all duration-200 ${
                isRunning
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030]"
              }`}
            >
              {isRunning ? "Duraklat" : "Başlat"}
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-3.5 rounded-[10px] font-semibold text-base bg-[#1A1A1A] text-[#F5F5F5] border border-[#1F2937] hover:border-[#D8FB32]/40 transition-all duration-200"
            >
              Atla
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3.5 rounded-[10px] font-semibold text-base bg-[#1A1A1A] text-[#F5F5F5] border border-[#1F2937] hover:border-[#D8FB32]/40 transition-all duration-200"
            >
              Sıfırla
            </button>
          </div>

          {/* Session Counter */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="text-[#999] text-sm">Tamamlanan oturum:</span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    i < sessions % 4
                      ? "border-[#D8FB32] bg-[#D8FB32]"
                      : "border-[#1F2937] bg-transparent"
                  }`}
                />
              ))}
            </div>
            <span className="text-[#F5F5F5] text-sm font-semibold tabular-nums">
              {sessions}
            </span>
          </div>

          {/* Settings Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-[#999] text-sm hover:text-[#D8FB32] transition-colors"
            >
              {showSettings ? "Ayarları Gizle" : "Süre Ayarları"}
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-6 p-5 bg-[#0A0A0A] border border-[#1F2937] rounded-xl space-y-4">
              {[
                { label: "Çalışma (dk)", value: workMinutes, setter: setWorkMinutes, min: 1, max: 60 },
                { label: "Mola (dk)", value: breakMinutes, setter: setBreakMinutes, min: 1, max: 30 },
                { label: "Uzun Mola (dk)", value: longBreakMinutes, setter: setLongBreakMinutes, min: 1, max: 60 },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between gap-4">
                  <label className="text-[#CCCCCC] text-sm font-medium whitespace-nowrap">
                    {setting.label}
                  </label>
                  <input
                    type="number"
                    min={setting.min}
                    max={setting.max}
                    value={setting.value}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= setting.min && v <= setting.max) setting.setter(v);
                    }}
                    className="w-20 bg-[#141414] border border-[#1F2937] rounded-lg px-3 py-2 text-[#F5F5F5] text-sm text-center focus:outline-none focus:border-[#D8FB32]/40"
                  />
                </div>
              ))}
              <button
                onClick={applySettings}
                className="w-full px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#D8FB32] text-[#0A0A0A] hover:bg-[#B4F030] transition-colors"
              >
                Uygula
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">Pomodoro Tekniği Nedir?</h2>
          <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">
            Pomodoro Tekniği, 1980&apos;lerde Francesco Cirillo tarafından geliştirilen
            bir zaman yönetimi yöntemidir. Çalışmalarınızı kısa aralıklara bölerek
            odaklanmayı ve verimliliği artırmayı amaçlar.
          </p>
          <ol className="space-y-2 text-[#CCCCCC] text-sm list-decimal list-inside">
            <li>25 dakika odaklı çalışın</li>
            <li>5 dakika mola verin</li>
            <li>Her 4 pomodoro sonrasında 15 dakika uzun mola verin</li>
            <li>Döngüleri tekrarlayın</li>
          </ol>
          <div className="mt-4 p-3 bg-[#D8FB32]/5 border border-[#D8FB32]/10 rounded-xl">
            <p className="text-[#D8FB32] text-xs">
              İpucu: Süre ayarlarını kendinize göre özelleştirin. Başlangıç için 25/5 önerilen standart süredir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
