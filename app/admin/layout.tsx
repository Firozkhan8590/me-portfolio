import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firozkhan Portfolio | Owner Control Center",
  description: "Secure administration and content management system for Firozkhan Portfolio.",
  robots: "noindex, nofollow", // Keep admin out of search engine indexes
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#e6edf3] font-sans antialiased selection:bg-[#e50914] selection:text-white">
      {children}
    </div>
  );
}

