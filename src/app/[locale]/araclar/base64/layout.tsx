import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — Ücretsiz Base64 Çevirici | The Kai",
  description:
    "Ücretsiz online Base64 encoder ve decoder. Metin veya dosya Base64 encode/decode. Hızlı, güvenli, tarayıcıda çalışır.",
  keywords: [
    "base64 encode",
    "base64 decode",
    "base64 çevirici",
    "base64 encoder",
    "base64 decoder",
    "base64 dönüştürücü",
    "online base64",
    "base64 converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
