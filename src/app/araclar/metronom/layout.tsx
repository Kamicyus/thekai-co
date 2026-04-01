import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Metronom — Ücretsiz Metronom Uygulaması | The Kai",
  description:
    "Ücretsiz online metronom. BPM ayarlama, tap tempo, farklı vuruş sayıları (2/4, 3/4, 4/4, 6/8). Müzik çalışmalarınız için tarayıcıda çalışan metronom.",
  keywords: [
    "online metronom",
    "metronom uygulaması",
    "ücretsiz metronom",
    "metronom online",
    "dijital metronom",
    "tap tempo",
    "BPM metronom",
    "müzik metronom",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
