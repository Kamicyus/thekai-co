"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import KaiIcon from "@/components/icons/KaiIcon";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at top, #020A1B 0%, #0A0A0A 70%)",
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(216,251,50,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Large background pinwheel — center, slowly rotating */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none hidden sm:block">
        <DecorativePinwheel size={550} opacity={0.04} animate />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none sm:hidden">
        <DecorativePinwheel size={280} opacity={0.04} animate />
      </div>

      {/* Small pinwheel — bottom-right, reverse rotation */}
      <div className="absolute bottom-16 right-6 sm:right-12 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.08} animate reverse />
      </div>

      {/* Orbiting Planets — "Dünyalar Kuruyoruz" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        {/* Neptune — widest orbit, slow */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -480, left: -10 }}>
            <div className="w-6 h-6 rounded-full opacity-35"
              style={{ background: "radial-gradient(circle at 30% 30%, #5B8DEF, #1a3a8a)", boxShadow: "0 0 15px rgba(91,141,239,0.2)" }}
            />
          </div>
        </motion.div>

        {/* Saturn — wide orbit with ring */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -420, left: -10 }}>
            <div className="relative">
              <div className="w-5 h-5 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle at 30% 30%, #E8D5A3, #A08040)", boxShadow: "0 0 12px rgba(232,213,163,0.15)" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 rounded-full border border-[#E8D5A3]/25 -rotate-[25deg]" />
            </div>
          </div>
        </motion.div>

        {/* Jupiter — large, reverse direction */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -360, left: -12 }}>
            <div className="w-7 h-7 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle at 30% 30%, #D4A76A, #8B6914)", boxShadow: "0 0 18px rgba(212,167,106,0.15)" }}
            />
          </div>
        </motion.div>

        {/* Mars — medium orbit */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -300, left: -7 }}>
            <div className="w-4 h-4 rounded-full opacity-25"
              style={{ background: "radial-gradient(circle at 30% 30%, #E07040, #8B3A1A)", boxShadow: "0 0 10px rgba(224,112,64,0.15)" }}
            />
          </div>
        </motion.div>

        {/* Green moon — spark colored, closest */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -240, left: -4 }}>
            <div className="w-3 h-3 rounded-full bg-[#D8FB32] opacity-12"
              style={{ boxShadow: "0 0 8px rgba(216,251,50,0.15)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8 text-center mt-20 sm:mt-16">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="relative inline-block group">
            {/* "Call Me" — tucked into top-left of logo, whisper style */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 sm:-top-6 md:-top-7 left-2 sm:left-8 md:left-10 font-serif italic text-[18px] sm:text-2xl md:text-[28px] text-[#999999] -rotate-[15deg] select-none whitespace-nowrap"
            >
              The
            </motion.span>
            {/* CARKSIZ logo PNG — no pinwheel, we add our own animated one */}
            <Image
              src="/images/kai-carksiz.png"
              alt="Kai"
              width={600}
              height={220}
              className="h-[100px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[230px] w-auto object-contain"
              priority
            />
            {/* Animated pinwheel on the i dot */}
            <motion.div
              className="absolute"
              style={{ top: '8%', right: '6%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src="/images/cark.png"
                alt=""
                width={36}
                height={36}
                className="object-contain sm:w-[52px] md:w-[64px] lg:w-[76px] drop-shadow-[0_0_12px_rgba(216,251,50,0.4)]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm sm:text-base text-[#999999] tracking-[0.03em] mb-3"
        >
          Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-xs sm:text-sm text-[#666666] italic font-serif tracking-[0.05em] mb-12"
        >
          Call me Kai!
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#hizmetler"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[10px] hover:bg-[#B4F030] hover:scale-[1.02] transition-all duration-200 text-base shadow-[0_0_30px_rgba(216,251,50,0.15)]"
          >
            Hizmetleri Gör
          </Link>
          <Link
            href="/#portfolyo"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[#1F2937] text-[#F5F5F5] font-semibold rounded-[10px] hover:border-[#D8FB32]/30 hover:bg-[#D8FB32]/5 hover:scale-[1.02] transition-all duration-200 text-base"
          >
            Portfolyo
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-24 sm:mt-28 flex justify-center"
        >
          <a
            href="/#hizmetler"
            className="flex flex-col items-center gap-2 text-[#666666] hover:text-[#999999] transition-colors duration-300 group"
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#333333] group-hover:border-[#666666] transition-colors duration-300 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[#D8FB32] rounded-full"
              />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
