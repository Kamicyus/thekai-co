import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Zamanlayıcı — Ücretsiz Çalışma Zamanlayıcı | The Kai",
  description:
    "Ücretsiz online Pomodoro zamanlayıcı. 25 dakika çalışma, 5 dakika mola. Süre özelleştirme, bildirim sesi ve oturum takibi.",
  keywords: [
    "pomodoro timer",
    "pomodoro zamanlayıcı",
    "çalışma zamanlayıcı",
    "pomodoro tekniği",
    "online timer",
    "odaklanma zamanlayıcı",
    "pomodoro sayacı",
    "ücretsiz pomodoro",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
