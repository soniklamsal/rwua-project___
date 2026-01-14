import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vacancies - RWUA",
  description: "Current job opportunities at Rural Upliftment Women Association.",
};

export default function VacancyLayout({
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