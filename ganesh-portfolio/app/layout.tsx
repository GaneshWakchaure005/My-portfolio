import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEVELOPER_INFO } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = DEVELOPER_INFO.siteUrl || "https://ganeshwakchaure.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ganesh Wakchaure",
    template: "%s | Ganesh Wakchaure",
  },
  description:
    "Official portfolio and personal website of Ganesh Wakchaure. Full Stack Developer and Computer Engineering student at SVIT Nashik specializing in React.js, Node.js, Express.js, MongoDB, Next.js, and high-performance web systems.",
  keywords: [
    "Ganesh Wakchaure",
    "Ganesh Wakchaure official",
    "Ganesh Wakchaure Portfolio",
    "Ganesh Wakchaure Website",
    "Ganesh Wakchaure Developer"
  ],
  authors: [{ name: "Ganesh Wakchaure", url: DEVELOPER_INFO.github }],
  creator: "Ganesh Wakchaure",
  publisher: "Ganesh Wakchaure",
  category: "technology",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ganesh Wakchaure",
    description:
      "Official portfolio and personal website of Ganesh Wakchaure. Building scalable full stack softwares using modern technologies.",
    url: siteUrl,
    siteName: "Ganesh Wakchaure",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/ganesh-profile.png",
        width: 1200,
        height: 630,
        alt: "Ganesh Wakchaure — Full Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Wakchaure",
    description:
      "Official portfolio and personal website of Ganesh Wakchaure.",
    images: ["/images/ganesh-profile.png"],
    creator: "@ganesh_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2lMZ3QSbVeiDLs8T5CFyZVWi83mAy5CtjEwmXiw4w9k",
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#020814] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
