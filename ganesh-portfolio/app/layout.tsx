import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ganesh Wakchaure | Full Stack Developer",
  description: "Senior Full Stack Developer specializing in scalable, intelligent web applications, distributed systems, real-time architectures, and modern interactive interfaces.",
  keywords: ["Ganesh Wakchaure", "Full Stack Developer", "Next.js", "TypeScript", "React", "Three.js", "Node.js", "MongoDB", "AI"],
  authors: [{ name: "Ganesh Wakchaure" }],
  creator: "Ganesh Wakchaure",
  openGraph: {
    title: "Ganesh Wakchaure | Full Stack Developer",
    description: "Building scalable, intelligent and user-focused web applications.",
    type: "website",
    locale: "en_US",
    siteName: "Ganesh Wakchaure Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Wakchaure | Full Stack Developer",
    description: "Building scalable, intelligent and user-focused web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020814",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020814] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
