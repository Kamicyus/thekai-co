"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 relative overflow-hidden">
      {/* Atmospheric */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#D8FB32]/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#A855F7]/[0.03] rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/images/kai-carkli.svg"
            alt="Kai Agents"
            className="h-10 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <h1 className="text-3xl font-black text-white tracking-tight">
            Kai Agents
          </h1>
          <p className="text-white/40 text-sm mt-2">
            AI çalışan ekibine giriş yap
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#D8FB32]/10 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8FB32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Mail gönderildi!</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                <span className="text-[#D8FB32] font-semibold">{email}</span> adresine
                giriş linki gönderdik. Mail kutunu kontrol et.
              </p>
              <p className="text-white/30 text-xs mt-3">
                Bulamadın mı? Spam klasörünü de kontrol et.
              </p>
              <button
                onClick={() => { setStatus("idle"); setEmail(""); }}
                className="text-white/30 text-xs mt-6 hover:text-white/50 transition-colors"
              >
                Farklı e-posta kullan
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-white/50 text-xs font-medium mb-2 block">
                  E-posta adresi
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-xl px-4 py-3.5 text-base placeholder:text-white/20 focus:outline-none focus:border-[#D8FB32]/50 focus:ring-2 focus:ring-[#D8FB32]/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full bg-[#D8FB32] text-[#0A0A0A] py-3.5 rounded-xl font-bold text-base hover:bg-[#B4F030] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Gönderiliyor...
                  </span>
                ) : (
                  "Giriş Linki Gönder →"
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Bir hata oluştu. Lütfen tekrar dene.
                </p>
              )}

              <p className="text-white/20 text-[11px] text-center leading-relaxed">
                Şifre yok, güvenli magic link ile giriş.
                <br />
                Hesabın yoksa otomatik oluşturulur.
              </p>

              {/* Google Login — disabled, coming soon */}
              <div className="relative mt-2 pt-4 border-t border-white/[0.06]">
                <div className="group relative inline-block w-full">
                  <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-3 bg-white/[0.04] border border-white/[0.08] text-white/30 py-3 rounded-xl text-sm font-medium cursor-not-allowed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google ile Giriş
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white/60 text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Yakında
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/agents"
            className="inline-flex items-center gap-2 text-white/40 text-sm font-medium hover:text-white/70 transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5" /><path d="M12 19L5 12L12 5" />
            </svg>
            Ana sayfaya dön
          </a>
        </div>
      </motion.div>
    </div>
  );
}
