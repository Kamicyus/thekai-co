"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

const SUBJECTS = [
  "AI Ajan Sistemi",
  "Müzik Prodüksiyon",
  "İçerik Üretimi",
  "Yazılım Geliştirme",
  "Diğer",
];

const BUDGETS = [
  "Belirtmek istemiyorum",
  "5.000 TL altında",
  "5.000 - 15.000 TL",
  "15.000 - 50.000 TL",
  "50.000 TL üstü",
];

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission UI only for now
  };

  const inputClasses =
    "w-full bg-[#141414] border border-[#1F2937] rounded-[12px] px-5 py-3.5 text-[#F5F5F5] text-base placeholder-[#666666] focus:outline-none focus:border-[#D8FB32]/40 focus:ring-1 focus:ring-[#D8FB32]/20 transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-[#E0E0E0] mb-2";

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            İletişim
          </h1>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            Projeniz hakkında konuşalım. En kısa sürede döneceğiz.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <FadeIn direction="left" className="lg:col-span-3">
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      İsim
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınız Soyadınız"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Konu
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      required
                    >
                      <option value="" disabled>
                        Seçin
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className={labelClasses}>
                      Bütçe (Opsiyonel)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Seçin
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projenizi kısaca anlatın..."
                    rows={6}
                    className={`${inputClasses} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] text-base hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(216,251,50,0.1)]"
                >
                  Gönder
                </button>
              </form>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn direction="right" delay={0.15} className="lg:col-span-2">
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5 sm:p-8 lg:p-10 h-fit lg:sticky lg:top-28">
              <h3 className="font-sans text-xl font-semibold text-[#F5F5F5] mb-6">
                Doğrudan Ulaşın
              </h3>

              <div className="space-y-6 mb-10">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D8FB32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] uppercase tracking-wider mb-1 font-medium">
                      E-posta
                    </p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-[#F5F5F5] text-base hover:text-[#D8FB32] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Handle */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#D8FB32"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] uppercase tracking-wider mb-1 font-medium">
                      X / Twitter
                    </p>
                    <a
                      href={`https://x.com/${SITE_CONFIG.handle.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5F5F5] text-base hover:text-[#D8FB32] transition-colors"
                    >
                      {SITE_CONFIG.handle}
                    </a>
                  </div>
                </div>
              </div>

              {/* The Kai Social */}
              <div>
                <p className="text-xs text-[#666666] uppercase tracking-wider mb-4 font-medium">
                  The Kai — Sosyal Medya
                </p>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center text-[#999999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all duration-200"
                      aria-label={social.label}
                    >
                      <SocialIcon icon={social.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Kamer Personal Social */}
            <div className="bg-[#141414] border border-[#1F2937] rounded-[20px] p-5 sm:p-8 lg:p-10 mt-4">
              <h3 className="font-sans text-sm font-semibold text-[#999999] mb-4 uppercase tracking-wider">
                Kurucu — Kamer Can İzvermez
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://x.com/kamicyus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#1F2937] rounded-xl text-[#999999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all duration-200 text-sm">
                  <SocialIcon icon="x" size={14} />
                  @kamicyus
                </a>
                <a href="https://instagram.com/kamer.kim" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#1F2937] rounded-xl text-[#999999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all duration-200 text-sm">
                  <SocialIcon icon="instagram" size={14} />
                  @kamer.kim
                </a>
                <a href="https://open.spotify.com/artist/59F6mUQXzHMRpxoYtUI2AY" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#1F2937] rounded-xl text-[#999999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all duration-200 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  Spotify
                </a>
                <a href="https://youtube.com/@kamer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#1F2937] rounded-xl text-[#999999] hover:text-[#D8FB32] hover:border-[#D8FB32]/30 transition-all duration-200 text-sm">
                  <SocialIcon icon="youtube" size={14} />
                  YouTube
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
