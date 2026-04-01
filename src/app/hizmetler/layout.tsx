import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler — AI Ajan Kurulumu, Müzik Prodüksiyon, Web Tasarımı | The Kai",
  description:
    "AI ajan sistemi kurulumu, müzik prodüksiyon, web sitesi tasarımı, içerik üretimi, artwork ve dijital danışmanlık hizmetleri. İstanbul, Türkiye.",
  alternates: {
    canonical: "/hizmetler",
  },
  openGraph: {
    title: "Hizmetler — AI Ajan Kurulumu, Müzik Prodüksiyon, Web Tasarımı | The Kai",
    description:
      "AI ajan sistemi kurulumu, müzik prodüksiyon, web sitesi tasarımı, içerik üretimi, artwork ve dijital danışmanlık hizmetleri. İstanbul, Türkiye.",
    url: "https://thekai.co/hizmetler",
  },
};

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
