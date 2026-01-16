import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModernNavbar from "@/components/ModernNavbar";
import Footer from "@/components/Footer";
import FaustClientProvider from '@/components/FaustClientProvider';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rwua.com.np'),
  title: {
    default: "RWUA - Rural Women Upliftment Association Nepal",
    template: "%s | RWUA Nepal",
  },
  description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities in Nepal since 1998. Join us in building resilient communities.",
  keywords: ["rural development", "women empowerment", "education", "skill development", "NGO Nepal", "Sarlahi", "Haripur", "community development", "sustainable livelihood", "child rights", "health programs"],
  authors: [{ name: "RWUA Nepal" }],
  creator: "RWUA Nepal",
  publisher: "RWUA Nepal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rwua.com.np",
    siteName: "RWUA Nepal",
    title: "RWUA - Rural Women Upliftment Association Nepal",
    description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities in Nepal since 1998.",
    images: [
      {
        url: "https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg",
        width: 1200,
        height: 630,
        alt: "RWUA Nepal Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RWUA - Rural Women Upliftment Association Nepal",
    description: "Empowering rural women through education, skill development, and sustainable livelihood opportunities in Nepal since 1998.",
    images: ["https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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