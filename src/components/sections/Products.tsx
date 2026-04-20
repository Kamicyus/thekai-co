"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import StaggerChildren, { StaggerItem } from "@/components/ui/StaggerChildren";

type ProductKey = "starter" | "pro-tr" | "pro-en";

const PRODUCTS: Record<
  ProductKey,
  {
    tier: string;
    price: string;
    priceNote?: string;
    href: string;
    accent: string;
    badge?: string;
  }
> = {
  starter: {
    tier: "🟢 Starter · TR",
    price: "$5",
    priceNote: "min · PWYW",
    href: "https://thekaico.gumroad.com/l/ai-muzik-baslangic",
    accent: "#D8FB32",
    badge: "İLK DOLAR · FIRST DOLLAR",
  },
  "pro-tr": {
    tier: "🟡 Pro · Türkçe",
    price: "$24.97",
    priceNote: "50+ sayfa · sync deck",
    href: "https://thekaico.gumroad.com/l/ai-muzik-pro",
    accent: "#D8FB32",
  },
  "pro-en": {
    tier: "🌐 Pro · English",
    price: "$24.97",
    priceNote: "global sync focus",
    href: "https://thekaico.gumroad.com/l/ai-music-complete-guide",
    accent: "#D8FB32",
  },
};

const ORDER: ProductKey[] = ["starter", "pro-tr", "pro-en"];

export default function Products() {
  const t = useTranslations("products");

  return (
    <section
      id="urunler"
      className="py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Subtle lime glow in background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(216,251,50,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <FadeIn className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8FB32]/30 bg-[#D8FB32]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8FB32] animate-pulse" />
            <span className="text-[#D8FB32] text-xs font-semibold tracking-[3px] uppercase">
              {t("badge")}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F5F5] tracking-[-0.02em] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#999999] text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Product Grid */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          staggerDelay={0.12}
        >
          {ORDER.map((key) => {
            const product = PRODUCTS[key];
            return (
              <StaggerItem key={key}>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col h-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[20px] overflow-hidden hover:border-[#D8FB32]/40 transition-all duration-300 hover:shadow-[0_16px_50px_rgba(216,251,50,0.12),0_0_0_1px_rgba(216,251,50,0.08)] hover:-translate-y-1"
                >
                  {/* Header band */}
                  <div className="relative px-6 pt-7 pb-5 border-b border-white/[0.05]">
                    <div className="text-[#D8FB32] text-xs font-bold tracking-[4px] uppercase mb-3">
                      {product.tier}
                    </div>
                    <h3 className="font-sans text-xl lg:text-[22px] font-semibold text-[#F5F5F5] tracking-[-0.3px] leading-tight">
                      {t(`items.${key}.name`)}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-6 flex flex-col flex-1">
                    <p className="text-[#999999] text-[15px] leading-relaxed mb-6 flex-1">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-[#F5F5F5] text-3xl font-bold tracking-tight">
                        {product.price}
                      </span>
                      {product.priceNote && (
                        <span className="text-[#666] text-sm font-medium">
                          {product.priceNote}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                      <span className="text-[#D8FB32] text-sm font-semibold">
                        {t("cta")}
                      </span>
                      <span className="text-[#D8FB32] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        {/* All-products link */}
        <FadeIn className="text-center mt-14">
          <a
            href="https://thekaico.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#999999] hover:text-[#D8FB32] text-sm font-medium transition-colors"
          >
            <span>{t("allProducts")}</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="text-[#555] text-xs mt-3 tracking-wide">
            {t("refundNote")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
