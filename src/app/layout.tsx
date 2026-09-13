import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Çizgi Film Abla | Elif Çiftçi",
  description: "Çocuk Kitapları Yazarı ve Senarist Elif Çiftçi'nin (Çizgi Film Abla) resmi web sitesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${nunito.variable} ${fredoka.variable} font-sans antialiased bg-[#fffbfa] text-slate-800 flex flex-col min-h-screen overflow-x-hidden`}>
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
