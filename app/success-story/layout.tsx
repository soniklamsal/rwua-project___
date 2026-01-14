import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Success Stories - RWUA",
  description: "Inspiring success stories from rural women empowerment programs.",
};

export default function SuccessStoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.variable}>
      <main role="main">
        {children}
      </main>
    </div>
  );
}