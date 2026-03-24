import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Oswald, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mean girls | Film Editorial Platform",
  description: "High-end Editorial Platform for Film Selection, Interpretation, and Archiving.",
  keywords: ["film", "editorial", "cinema", "mean girls", "curation"],
  authors: [{ name: "MEAN" }],
  openGraph: {
    title: "Mean girls | Film Editorial Platform",
    description: "High-end Editorial Platform for Film Selection, Interpretation, and Archiving.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${oswald.variable} ${notoKr.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
