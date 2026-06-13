import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yachani — Biblioteca Educativa",
  description:
    "Plataforma educativa que pone recursos de calidad al alcance de todos. Maqueta en Next.js.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-surface font-sans text-ink">
        <Nav />
        <main className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
          {children}
        </main>
        <footer className="mx-auto w-full max-w-6xl px-5 py-10">
          <div className="border-t border-hairline pt-6">
            <p className="text-sm text-muted">
              <span className="label-mono">yachani</span> · Biblioteca educativa
              de código abierto · Maqueta
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
