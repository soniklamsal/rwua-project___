import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModernNavbar from "@/components/ModernNavbar";
import Footer from "@/components/Footer";
import FaustClientProvider from '@/components/FaustClientProvider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RWUA - Rural Upliftment Women Association",
  description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities.",
  keywords: "rural development, women empowerment, education, skill development, NGO",
  authors: [{ name: "RWUA Team" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "RWUA - Rural Upliftment Women Association",
    description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RWUA - Rural Upliftment Women Association",
    description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning={true}>
        <FaustClientProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-rwua-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
            Skip to main content
          </a>
          <ModernNavbar />
          <main id="main-content" className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </FaustClientProvider>
      </body>
    </html>
  );
}