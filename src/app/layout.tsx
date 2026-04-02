// Root layout — minimal shell. Locale-aware layout is in [locale]/layout.tsx.
// html/body/globals.css are all handled in [locale]/layout.tsx so it can set lang attribute.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
