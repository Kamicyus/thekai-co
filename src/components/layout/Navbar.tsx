"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import KaiIcon from "@/components/icons/KaiIcon";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Agents page/subdomain has its own navbar — hide via CSS to avoid hydration mismatch
  const [isAgents, setIsAgents] = useState(false);
  useEffect(() => {
    if (window.location.hostname.startsWith("agents.") || pathname === "/agents" || pathname.startsWith("/agents/")) {
      setIsAgents(true);
    }
  }, [pathname]);

  const NAV_LINKS = [
    { label: t("home"), href: "/" as const },
    { label: t("services"), href: "/hizmetler" as const },
    { label: t("portfolio"), href: "/portfolyo" as const },
    { label: t("about"), href: "/hakkimizda" as const },
    { label: t("blog"), href: "/blog" as const },
    { label: t("tools"), href: "/araclar" as const },
    { label: t("contact"), href: "/iletisim" as const },
    { label: t("agents"), href: "https://agents.thekai.co" as const, badge: true, external: true },
  ];

  const switchLocale = (newLocale: "tr" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isAgents) return null;

  return (
    <>
      <nav
        data-global-navbar
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#1F2937]/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kai-carkli.svg"
                alt="The Kai"
                className="h-[44px] w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const cls = `text-sm font-medium transition-colors duration-200 ${
                  "badge" in link && link.badge
                    ? "flex items-center gap-1.5 text-[#D8FB32] hover:text-white"
                    : "text-[#999999] hover:text-[#F5F5F5]"
                }`;
                const badge = "badge" in link && link.badge && (
                  <span className="inline-flex items-center bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide leading-none">
                    NEW
                  </span>
                );

                if ("external" in link && link.external) {
                  return (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {badge}
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={link.href === "/" ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : undefined}
                    className={cls}
                  >
                    {badge}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Language Switcher + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="#waitlist"
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#D8FB32] text-[#0A0A0A] text-sm font-semibold rounded-[10px] hover:bg-[#B4F030] transition-colors duration-200"
              >
                Ücretsiz Başla
              </Link>

              {/* Language Switcher */}
              <div className="hidden md:flex items-center gap-1 text-xs font-medium">
                <button
                  onClick={() => switchLocale("tr")}
                  className={`px-1.5 py-1 rounded transition-colors duration-200 ${
                    locale === "tr"
                      ? "text-[#D8FB32]"
                      : "text-[#666666] hover:text-[#999999]"
                  }`}
                >
                  TR
                </button>
                <span className="text-[#333333]">|</span>
                <button
                  onClick={() => switchLocale("en")}
                  className={`px-1.5 py-1 rounded transition-colors duration-200 ${
                    locale === "en"
                      ? "text-[#D8FB32]"
                      : "text-[#666666] hover:text-[#999999]"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[2px] bg-[#F5F5F5]"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-[2px] bg-[#F5F5F5]"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[2px] bg-[#F5F5F5]"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => {
                const isExternal = "external" in link && link.external;
                const mobileCls = `text-2xl font-semibold transition-colors flex items-center gap-2 ${
                  "badge" in link && link.badge
                    ? "text-[#D8FB32] hover:text-white"
                    : "text-[#F5F5F5] hover:text-[#D8FB32]"
                }`;
                return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {isExternal ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className={mobileCls}>
                      {link.label}
                      {"badge" in link && link.badge && (
                        <span className="text-xs bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-2 py-0.5 rounded font-bold uppercase tracking-wide">NEW</span>
                      )}
                    </a>
                  ) : (
                  <Link
                    href={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      if (link.href === "/") window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={mobileCls}
                  >
                    {link.label}
                    {"badge" in link && link.badge && (
                      <span className="text-xs bg-[#D8FB32]/10 border border-[#D8FB32]/30 text-[#D8FB32] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                        NEW
                      </span>
                    )}
                  </Link>
                  )}
                </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  href="#waitlist"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#D8FB32] text-[#0A0A0A] text-lg font-semibold rounded-[10px] hover:bg-[#B4F030] transition-colors"
                >
                  Ücretsiz Başla
                </Link>
              </motion.div>

              {/* Mobile Language Switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-sm font-medium mt-2"
              >
                <button
                  onClick={() => { switchLocale("tr"); setMobileOpen(false); }}
                  className={`px-2 py-1 rounded transition-colors duration-200 ${
                    locale === "tr"
                      ? "text-[#D8FB32]"
                      : "text-[#666666] hover:text-[#999999]"
                  }`}
                >
                  TR
                </button>
                <span className="text-[#333333]">|</span>
                <button
                  onClick={() => { switchLocale("en"); setMobileOpen(false); }}
                  className={`px-2 py-1 rounded transition-colors duration-200 ${
                    locale === "en"
                      ? "text-[#D8FB32]"
                      : "text-[#666666] hover:text-[#999999]"
                  }`}
                >
                  EN
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
