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

      {/* Large background pinwheel — centered with Kai logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none hidden sm:block">
        <DecorativePinwheel size={550} opacity={0.04} animate />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none sm:hidden">
        <DecorativePinwheel size={280} opacity={0.04} animate />
      </div>

      {/* Small pinwheel — bottom-right, reverse rotation */}
      <div className="absolute bottom-16 right-6 sm:right-12 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.08} animate reverse />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8 text-center mt-16 sm:mt-12">
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
              className="absolute -top-3 sm:-top-4 md:-top-5 left-0 sm:left-4 font-serif italic text-[14px] sm:text-xl md:text-[22px] text-[#999999] -rotate-[15deg] select-none whitespace-nowrap"
            >
              Call Me
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
          className="text-sm sm:text-base text-[#999999] tracking-[0.03em] mb-12"
        >
          Müzik, teknoloji ve yaratıcılık kesişiminde bir stüdyo.
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
