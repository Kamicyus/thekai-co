"use client";

import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { SERVICES } from "@/lib/constants";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";
import FadeIn from "@/components/ui/FadeIn";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Services() {
  return (
    <section id="hizmetler" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative pinwheel — top-right accent */}
      <div className="absolute top-12 right-8 pointer-events-none">
        <DecorativePinwheel size={80} opacity={0.06} rotate={15} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            Ne Yapıyoruz
          </h2>
          <p className="text-[#999999] text-lg max-w-lg mx-auto">
            Sekiz temel alandan birleşen yaratıcı güç.
          </p>
        </FadeIn>

        {/* Cards Grid */}
        <StaggerChildren
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          staggerDelay={0.08}
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group relative flex flex-col h-full p-5 lg:p-6 bg-[#141414] border border-[#1F2937] rounded-[16px] hover:border-[#D8FB32]/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(216,251,50,0.06)] hover:scale-[1.01]">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#1F2937] flex items-center justify-center mb-4 text-[#D8FB32] group-hover:bg-[#D8FB32]/10 transition-colors duration-300">
                  <ServiceIcon icon={service.icon} size={22} />
                </div>

                {/* Text */}
                <h3 className="font-sans text-base lg:text-lg font-semibold text-[#F5F5F5] mb-2 tracking-[-0.3px]">
                  {service.title}
                </h3>
                <p className="text-[#999999] text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Corner accent on hover — pinwheel spins */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <DecorativePinwheel
                    size={18}
                    opacity={0.4}
                    className="group-hover:animate-[spin-slow_3s_linear_infinite]"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
