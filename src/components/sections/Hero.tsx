"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import KaiIcon from "@/components/icons/KaiIcon";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Hero() {
  const t = useTranslations("hero");
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

      {/* Orbiting Planets — realistic, far from center, overflow-hidden clips edges */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        {/* Neptune — icy blue, outermost orbit */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -520, left: -16 }}>
            <div className="w-10 h-10 rounded-full relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 30%, #7EB8E8 0%, #3B6BAA 40%, #1B3B6E 70%, #0A1A3A 100%)",
                boxShadow: "0 0 25px rgba(91,141,239,0.3), inset -3px -2px 6px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(200,230,255,0.15)",
                opacity: 0.45,
              }}
            >
              {/* Atmosphere band */}
              <div className="absolute inset-0 rounded-full" style={{
                background: "linear-gradient(160deg, transparent 30%, rgba(100,160,220,0.2) 50%, transparent 70%)",
              }} />
            </div>
          </div>
        </motion.div>

        {/* Saturn — golden with prominent ring */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [72, 432] }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -460, left: -20 }}>
            <div className="relative">
              <div className="w-9 h-9 rounded-full relative overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #F0DCA0 0%, #D4A84A 30%, #A07820 60%, #604810 100%)",
                  boxShadow: "0 0 20px rgba(232,213,163,0.25), inset -3px -2px 5px rgba(0,0,0,0.4), inset 2px 1px 3px rgba(255,240,200,0.2)",
                  opacity: 0.4,
                }}
              >
                {/* Bands */}
                <div className="absolute w-full" style={{ top: '35%', height: '8%', background: 'rgba(180,140,60,0.3)' }} />
                <div className="absolute w-full" style={{ top: '55%', height: '5%', background: 'rgba(140,100,30,0.25)' }} />
              </div>
              {/* Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[16px] rounded-full -rotate-[25deg]"
                style={{
                  border: '1.5px solid rgba(232,213,163,0.3)',
                  background: 'linear-gradient(90deg, transparent 10%, rgba(232,213,163,0.08) 50%, transparent 90%)',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Jupiter — largest, banded brown-orange */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [200, -160] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -400, left: -18 }}>
            <div className="w-12 h-12 rounded-full relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 30%, #E8C080 0%, #C09040 30%, #8B6020 60%, #503010 100%)",
                boxShadow: "0 0 28px rgba(212,167,106,0.2), inset -4px -3px 8px rgba(0,0,0,0.5), inset 3px 2px 5px rgba(255,220,150,0.15)",
                opacity: 0.4,
              }}
            >
              {/* Jupiter bands */}
              <div className="absolute w-full" style={{ top: '25%', height: '6%', background: 'rgba(200,150,80,0.3)' }} />
              <div className="absolute w-full" style={{ top: '40%', height: '10%', background: 'rgba(160,100,40,0.25)' }} />
              <div className="absolute w-full" style={{ top: '60%', height: '7%', background: 'rgba(180,120,50,0.2)' }} />
              {/* Great Red Spot */}
              <div className="absolute w-3 h-2 rounded-full" style={{ top: '42%', left: '55%', background: 'rgba(200,80,40,0.3)' }} />
            </div>
          </div>
        </motion.div>

        {/* Mars — red, smaller */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [290, 650] }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -480, left: -10 }}>
            <div className="w-7 h-7 rounded-full relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 30%, #E89070 0%, #C05030 40%, #802010 70%, #401008 100%)",
                boxShadow: "0 0 15px rgba(224,112,64,0.25), inset -2px -2px 5px rgba(0,0,0,0.5), inset 1px 1px 3px rgba(255,180,140,0.15)",
                opacity: 0.4,
              }}
            >
              {/* Polar ice cap */}
              <div className="absolute w-3 h-1.5 rounded-full" style={{ top: '8%', left: '30%', background: 'rgba(255,240,230,0.2)' }} />
            </div>
          </div>
        </motion.div>

        {/* Green moon — Kai spark colored */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [145, -215] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -360, left: -7 }}>
            <div className="w-5 h-5 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 30%, #E8FF80 0%, #D8FB32 40%, #90B010 70%, #506008 100%)",
                boxShadow: "0 0 18px rgba(216,251,50,0.25), inset -2px -1px 4px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,200,0.2)",
                opacity: 0.2,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Animated ring pulse behind heading */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-[#D8FB32]/10"
        />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]">
        <motion.div
          animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full border border-[#D8FB32]/5"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-8 text-center mt-28 sm:mt-24">
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
              className="absolute -top-4 sm:-top-7 md:-top-8 -left-1 sm:left-2 md:left-3 font-serif italic text-[22px] sm:text-[30px] md:text-[36px] text-[#999999] -rotate-[15deg] select-none whitespace-nowrap"
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
          {t("subtitle")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm sm:text-lg md:text-xl text-[#666666] italic font-serif tracking-[0.05em] mb-12"
        >
          {t("tagline")}
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
            className="inline-flex items-center justify-center px-10 py-4 bg-[#D8FB32] text-[#0A0A0A] font-semibold rounded-[12px] hover:bg-[#B4F030] hover:scale-[1.03] transition-all duration-300 text-lg shadow-[0_0_40px_rgba(216,251,50,0.3),0_0_80px_rgba(216,251,50,0.1)]"
          >
            {t("ctaServices")}
          </Link>
          <Link
            href="/#portfolyo"
            className="inline-flex items-center justify-center px-10 py-4 border border-white/[0.1] text-[#F5F5F5] font-semibold rounded-[12px] hover:border-[#D8FB32]/40 hover:bg-[#D8FB32]/5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(216,251,50,0.08)] transition-all duration-300 text-lg backdrop-blur-sm"
          >
            {t("ctaPortfolio")}
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
            className="flex flex-col items-center gap-2 text-[#666666] hover:text-[#999999] transition-colors duration-300 group opacity-30 hover:opacity-50"
          >
            <div className="w-6 h-10 rounded-full border border-[#333333] group-hover:border-[#555555] transition-colors duration-300 flex justify-center pt-2">
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
