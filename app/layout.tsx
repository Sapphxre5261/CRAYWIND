import type { Metadata } from "next";
import { Orbitron, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import Chrome from "@/components/Chrome";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
});

const chakra = Chakra_Petch({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: "CRAYWIND — WINTERFELL",
  icons: { icon: "/og-avatar.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="dark">
      <body
        className={`${orbitron.variable} ${chakra.variable} ${jbMono.variable} min-h-screen overflow-x-hidden bg-[#050505] font-sans text-ink antialiased`}
      >
        {/* Original Craywind artwork */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Craywind_X3UF.png')" }}
        />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
