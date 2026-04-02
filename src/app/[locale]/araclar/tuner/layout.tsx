import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Gitar Akort Cihazı — Ücretsiz Tuner | The Kai",
  description:
    "Ücretsiz online gitar akort cihazı. Mikrofonunuzu kullanarak gitarınızı akort edin. Akustik ve elektro gitar için uygundur. Standart akort (EADGBE).",
  keywords: [
    "gitar akort",
    "online tuner",
    "gitar akort cihazı",
    "ücretsiz tuner",
    "gitar akort programı",
    "online gitar akort",
    "guitar tuner",
    "akort aleti",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
