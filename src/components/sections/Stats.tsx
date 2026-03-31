"use client";

import { STATS } from "@/lib/constants";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Stats() {
  return (
    <section className="w-full bg-[#111111] border-y border-[#1F2937]/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <StaggerChildren
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          staggerDelay={0.1}
        >
          {STATS.map((stat, i) => (
            <StaggerItem key={stat.label} className="text-center relative">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#D8FB32] tracking-[-2px] mb-2 font-sans">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-[#999999] font-medium">
                {stat.label}
              </div>
              {/* Pinwheel divider (not on last item) */}
              {i < STATS.length - 1 && (
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex-col items-center gap-1">
                  <div className="w-px h-4 bg-[#1F2937]" />
                  <div className="hover:scale-125 transition-transform duration-300 cursor-default">
                    <DecorativePinwheel size={16} opacity={0.3} />
                  </div>
                  <div className="w-px h-4 bg-[#1F2937]" />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
