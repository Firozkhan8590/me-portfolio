import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://firozkhan.dev"),
  title: {
    default: "FIROZKHAN | Full Stack Developer · Backend Engineer · Official Portfolio",
    template: "%s | FIROZKHAN",
  },
  description:
    "Official streaming-platform portfolio of FIROZKHAN — Full Stack Developer & Backend Engineer specialized in Node.js, NestJS, Next.js, Python, PostgreSQL, and high-scale architecture. Building digital experiences that solve real problems.",
  keywords: [
    "FIROZKHAN",
    "Full Stack Developer",
    "Backend Engineer",
    "NestJS",
    "Node.js",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Django",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "Software Engineer",
    "Technopark",
    "Dubai Software Engineer",
    "UAE Developer",
  ],
  authors: [{ name: "FIROZKHAN" }],
  creator: "FIROZKHAN",
  openGraph: {
    title: "FIROZKHAN | Full Stack Developer · Backend Engineer · Official Portfolio",
    description:
      "Official streaming-platform portfolio of FIROZKHAN — Full Stack Developer & Backend Engineer specialized in Node.js, NestJS, Next.js, Python, PostgreSQL, and high-scale architecture.",
    url: "https://firozkhan.dev",
    siteName: "FIROZKHAN Portfolio",
    images: [
      {
        url: "/images/firozkhan-hero.png",
        width: 1199,
        height: 1312,
        alt: "FIROZKHAN - Full Stack Developer & Backend Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIROZKHAN | Full Stack Developer · Backend Engineer",
    description:
      "Official streaming-platform portfolio of FIROZKHAN — Full Stack Developer & Backend Engineer.",
    images: ["/images/firozkhan-hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#080808] text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}
