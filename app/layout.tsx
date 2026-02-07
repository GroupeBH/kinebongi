import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "kin ebongi | Recrutement de stagiaires en architecture",
  description:
    "Plateforme de recrutement pour les stagiaires en architecture qui conçoivent des projets immobiliers co-investis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${archivo.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
