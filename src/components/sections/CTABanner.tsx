"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function CTABanner() {
  const t = useTranslations("cta");

  return (
    <section
      id="cta"
      className="w-full py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #D8FB32 0%, #5532FA 100%)",
      }}
    >
      {/* Scattered dark pinwheel decorations */}
      <div className="absolute top-8 left-[10%] pointer-events-none">
        <DecorativePinwheel
          size={60}
          opacity={0.12}
          color="#0A0A0A"
          rotate={25}
        />
      </div>
      <div className="absolute bottom-12 right-[15%] pointer-events-none">
        <DecorativePinwheel
          size={90}
          opacity={0.1}
          color="#0A0A0A"
          rotate={-15}
        />
      </div>

      {/* Dark orbiting planets — realistic, wide orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        {/* Dark Neptune */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [15, 375] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -420, left: -14 }}>
            <div
              className="w-9 h-9 rounded-full relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #1a3050 0%, #0a1a30 50%, #050a18 100%)",
                boxShadow:
                  "inset -2px -2px 5px rgba(0,0,0,0.6), inset 1px 1px 3px rgba(60,100,140,0.1)",
                opacity: 0.2,
              }}
            />
          </div>
        </motion.div>

        {/* Dark Saturn with ring */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [100, -260] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -380, left: -16 }}>
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #3a3020 0%, #201808 50%, #100a04 100%)",
                  boxShadow:
                    "inset -2px -2px 5px rgba(0,0,0,0.6), inset 1px 1px 2px rgba(100,80,40,0.1)",
                  opacity: 0.18,
                }}
              >
                <div
                  className="absolute w-full"
                  style={{
                    top: "40%",
                    height: "6%",
                    background: "rgba(60,50,30,0.3)",
                  }}
                />
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[14px] rounded-full -rotate-[25deg]"
                style={{ border: "1px solid rgba(80,60,30,0.15)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Dark Jupiter */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [220, 580] }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -350, left: -16 }}>
            <div
              className="w-10 h-10 rounded-full relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #2a2010 0%, #181008 50%, #0a0804 100%)",
                boxShadow:
                  "inset -3px -2px 6px rgba(0,0,0,0.6), inset 1px 1px 3px rgba(80,60,20,0.08)",
                opacity: 0.15,
              }}
            >
              <div
                className="absolute w-full"
                style={{
                  top: "30%",
                  height: "6%",
                  background: "rgba(50,40,20,0.2)",
                }}
              />
              <div
                className="absolute w-full"
                style={{
                  top: "55%",
                  height: "8%",
                  background: "rgba(40,30,15,0.2)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Dark Mars */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: [310, -50] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute" style={{ top: -400, left: -8 }}>
            <div
              className="w-6 h-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #3a1a10 0%, #201008 50%, #100804 100%)",
                boxShadow: "inset -2px -1px 4px rgba(0,0,0,0.6)",
                opacity: 0.15,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#0A0A0A]/15"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-[#0A0A0A]/10"
        />
        <motion.div
          animate={{ y: [-10, 25, -10], x: [-5, 12, -5] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#0A0A0A]/12"
        />
        <motion.div
          animate={{ y: [12, -18, 12], x: [6, -10, 6] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-[60%] right-[35%] w-2.5 h-2.5 rounded-full bg-[#0A0A0A]/8"
        />
        <motion.div
          animate={{ y: [-15, 10, -15] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-[15%] right-[40%] w-1.5 h-1.5 rounded-full bg-white/10"
        />
        <motion.div
          animate={{ y: [10, -12, 10] }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-[20%] right-[10%] w-2 h-2 rounded-full bg-white/8"
        />
      </div>

      <FadeIn>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-[24px] px-8 sm:px-16 py-10 sm:py-14 shadow-[0_8px_60px_rgba(0,0,0,0.2)]">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0A0A0A] tracking-[-0.02em] mb-6 max-w-3xl mx-auto leading-tight">
              {t("title")}
            </h2>
            <p className="text-[#0A0A0A]/70 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
              {t("subtitle")}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-[#0A0A0A] text-[#D8FB32] font-semibold rounded-[12px] text-base hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_40px_rgba(216,251,50,0.15)]"
            >
              {t("button")}
              <span className="animate-[spin-slow_3s_linear_infinite] inline-flex">
                <DecorativePinwheel size={16} opacity={0.9} />
              </span>
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
