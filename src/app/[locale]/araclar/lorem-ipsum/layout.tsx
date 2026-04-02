import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Üretici — Ücretsiz Placeholder Metin | The Kai",
  description:
    "Ücretsiz Lorem Ipsum üretici. Paragraf, cümle veya kelime bazında Lorem Ipsum oluşturun. Türkçe Lorem Ipsum desteği.",
  keywords: [
    "lorem ipsum",
    "lorem ipsum generator",
    "placeholder text",
    "lorem ipsum üretici",
    "lorem ipsum oluşturucu",
    "türkçe lorem ipsum",
    "rastgele metin",
    "dolgu metin",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
