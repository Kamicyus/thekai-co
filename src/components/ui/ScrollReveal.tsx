"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

// ─────────────────────────────────────────────
// PARALLAX SECTION — Apple-style scroll parallax
// ─────────────────────────────────────────────
export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SCALE ON SCROLL — element scales in as you scroll
// ─────────────────────────────────────────────
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// REVEAL TEXT — Apple-style word-by-word reveal
// ─────────────────────────────────────────────
export function RevealText({
  text,
  className = "",
  highlightWords = [],
  highlightColor = "#D8FB32",
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const isHighlight = highlightWords.some((hw) =>
            word.toLowerCase().includes(hw.toLowerCase())
          );
          return (
            <WordReveal
              key={i}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
              highlight={isHighlight}
              highlightColor={highlightColor}
            />
          );
        })}
      </div>
    </div>
  );
}

function WordReveal({
  word,
  range,
  progress,
  highlight,
  highlightColor,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  highlight: boolean;
  highlightColor: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
        highlight ? "" : "text-white"
      }`}
    >
      {highlight ? <span style={{ color: highlightColor }}>{word}</span> : word}
    </motion.span>
  );
}

// ─────────────────────────────────────────────
// FLOATING GRADIENT ORB — decorative background
// ─────────────────────────────────────────────
export function FloatingOrb({
  color = "#D8FB32",
  size = 300,
  top,
  left,
  right,
  bottom,
  delay = 0,
  blur = 100,
}: {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  blur?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 10, 0, -10, 0],
        scale: [1, 1.05, 1, 0.95, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ─────────────────────────────────────────────
// COUNTER ANIMATION — numbers count up on scroll
// ─────────────────────────────────────────────
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.5"],
  });
  const count = useTransform(scrollYProgress, [0, 1], [0, value]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{count}</motion.span>
      {suffix}
    </motion.span>
  );
}

// ─────────────────────────────────────────────
// HORIZONTAL SCROLL TEXT — infinite marquee
// ─────────────────────────────────────────────
export function MarqueeText({
  items,
  speed = 30,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const duplicated = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-black text-white/10 select-none"
          >
            {item}
            <span className="text-[#D8FB32]/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GLOW LINE DIVIDER — animated section separator
// ─────────────────────────────────────────────
export function GlowDivider({ color = "#D8FB32" }: { color?: string }) {
  return (
    <div className="relative py-4">
      <motion.div
        className="h-px w-full mx-auto max-w-4xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
