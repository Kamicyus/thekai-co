import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BPM Bulucu — Tap Tempo ile BPM Hesaplama | The Kai",
  description:
    "Ücretsiz BPM bulucu. Ritme tıklayarak şarkının BPM değerini hesaplayın. Ortalama, minimum ve maksimum BPM göstergesi. Tap tempo ile kolay BPM bulma.",
  keywords: [
    "BPM bulucu",
    "BPM hesaplama",
    "tap tempo",
    "şarkı BPM bulma",
    "tempo bulucu",
    "BPM sayacı",
    "beats per minute",
    "ritim hesaplama",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
