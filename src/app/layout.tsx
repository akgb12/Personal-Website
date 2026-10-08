import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aneykanji12.vercel.app"),
  title: "Aney Kanji — Software, AI & Research",
  description: "Computer Science and Statistics at Texas A&M University. Selected software projects, professional experience, AI systems research, and publications by Aney Kanji.",
  openGraph: {
    title: "Aney Kanji",
    description: "Software engineering · AI systems · Machine learning. Computer Science + Statistics at Texas A&M University.",
    type: "website",
    images: [{ url: "/images/alpine-world.webp", width: 1672, height: 941, alt: "An original alpine landscape with a turquoise lake" }],
  },
  twitter: { card: "summary_large_image", title: "Aney Kanji" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body>{children}</body></html>;
}
