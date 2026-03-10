import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visit Oman — Discover the Sultanate",
  description:
    "Explore 300+ stunning tourist destinations across Oman. Plan your perfect trip with our interactive discovery platform.",
  keywords: [
    "Oman",
    "tourism",
    "travel",
    "destinations",
    "Muscat",
    "Dhofar",
    "beaches",
    "mountains",
    "culture",
  ],
  openGraph: {
    title: "Visit Oman — Discover the Sultanate",
    description:
      "Explore 300+ stunning tourist destinations across Oman.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
