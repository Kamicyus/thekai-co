import { Inter, DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${dmSerifDisplay.variable}`;
