import "./globals.css";

// Root layout — minimal shell. Locale-aware layout is in [locale]/layout.tsx.
// We cannot use <html>/<body> here because [locale]/layout.tsx needs to set lang attribute.
// Next.js will auto-wrap with <html><body> if not provided here.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
