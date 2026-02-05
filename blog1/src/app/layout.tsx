import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Min's Portfolio",
  description: "A raw, high-contrast, honest developer portfolio.",
  openGraph: {
    title: "Min's Portfolio",
    description: "A raw, high-contrast, honest developer portfolio.",
    type: "website",
    siteName: "Min's Portfolio",
  },
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
        <CustomCursor />
        <div className="layout-container">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </div>

        <style>{`
          .layout-container {
            display: flex;
            min-height: 100vh;
          }
          .main-content {
            flex: 1;
            margin-left: 250px; /* Fixed Navbar width */
            width: calc(100% - 250px);
            min-height: 100vh;
          }

          /* Mobile Layout (Prompt 1) */
          @media (max-width: 768px) {
            .layout-container {
              flex-direction: column;
            }
            .main-content {
              margin-left: 0;
              width: 100%;
              padding-top: 80px; /* Space for fixed mobile header */
            }
          }
        `}</style>
      </body>
    </html>
  );
}
