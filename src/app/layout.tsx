import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DentoPrestige - Système de Gestion Cabinet Dentaire",
  description: "Logiciel de gestion de cabinet dentaire de prestige",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full bg-slate-50 text-slate-900 overflow-hidden`}>
        <div className="flex h-full w-full">
          <SidebarWrapper />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />
            <main className="flex-1 h-full overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

