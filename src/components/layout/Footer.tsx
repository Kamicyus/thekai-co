"use client";

import { useState, useEffect } from "react";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import KaiIcon from "@/components/icons/KaiIcon";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import DecorativePinwheel from "@/components/ui/DecorativePinwheel";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const pathname = usePathname();
  const [isAgents, setIsAgents] = useState(false);

  useEffect(() => {
    if (
      window.location.hostname.startsWith("agents.") ||
      pathname === "/agents" ||
      pathname.startsWith("/agents/")
    ) {
      setIsAgents(true);
    }
  }, [pathname]);

  if (isAgents) return null;

  const NAV_LINKS = [
    { label: tn("home"), href: "/" as const },
    { label: tn("services"), href: "/hizmetler" as const },
    { label: tn("portfolio"), href: "/portfolyo" as const },
    { label: tn("about"), href: "/hakkimizda" as const },
    { label: tn("blog"), href: "/blog" as const },
    { label: tn("tools"), href: "/araclar" as const },
    { label: tn("contact"), href: "/iletisim" as const },
  ];
  return (
    <footer
      data-global-footer
      className="w-full bg-[#0F0F0F] border-t border-[#1F2937] relative overflow-hidden"
    >
      {/* Large watermark pinwheel — right side */}
      <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 pointer-events-none">
        <DecorativePinwheel size={350} opacity={0.04} rotate={-10} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kai-carkli.svg"
                alt="The Kai"
                className="h-[38px] w-auto"
              />
            </div>
            <p className="text-[#999999] text-sm leading-relaxed mb-6 max-w-xs whitespace-pre-line">
              {t("brandDescription")}
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social relative text-[#666666] hover:text-[#D8FB32] transition-colors duration-200"
                  aria-label={social.label}
                >
                  {/* Pinwheel background on hover */}
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <DecorativePinwheel
                      size={28}
                      opacity={0.15}
                      className="animate-[spin-slow_4s_linear_infinite]"
                    />
                  </span>
                  <span className="relative z-10">
                    <SocialIcon icon={social.icon} size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-[#F5F5F5] font-semibold text-sm mb-4 tracking-wide uppercase">
              {t("pages")}
            </h2>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#999999] text-sm hover:text-[#F5F5F5] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[#F5F5F5] font-semibold text-sm mb-4 tracking-wide uppercase">
              {t("contact")}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666666"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[#999999] text-sm hover:text-[#D8FB32] transition-colors duration-200"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              {SITE_CONFIG.handle && (
                <li className="flex items-center gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#666666]"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <a
                    href={`https://x.com/${SITE_CONFIG.handle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#999999] text-sm hover:text-[#D8FB32] transition-colors duration-200"
                  >
                    {SITE_CONFIG.handle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1F2937]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#999999] text-xs">{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/gizlilik"
              className="text-[#999999] text-xs hover:text-[#F5F5F5] transition-colors duration-200"
            >
              {t("privacy")}
            </Link>
            <span className="text-[#666666] text-xs">·</span>
            <Link
              href="/kullanim-sartlari"
              className="text-[#999999] text-xs hover:text-[#F5F5F5] transition-colors duration-200"
            >
              {t("terms")}
            </Link>
            <span className="text-[#666666] text-xs">·</span>
            <Link
              href="/kvkk"
              className="text-[#999999] text-xs hover:text-[#F5F5F5] transition-colors duration-200"
            >
              {t("kvkk")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
