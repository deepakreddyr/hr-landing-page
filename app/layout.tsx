// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

// Initialize Fonts (assuming these are defined correctly in your project)
// NOTE: I am keeping the font setup based on the imports you provided, 
// but using the standard way to initialize them for Next.js.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// 1. EXPORT METADATA OBJECT FOR SEO
export const metadata: Metadata = {
  // CRITICAL: Title Tag
  title: "TheHireAI | AI Recruitment & Automated Candidate Calls", 
  
  // CRITICAL: Meta Description
  description: "TheHireAI provides AI agents for automated candidate screening and human-like voice calls. Reinvent recruitment, save hours, and hire faster.",
  
  // Secondary Keywords
  keywords: ["TheHireAI", "AI recruitment", "automated candidate calls", "candidate screening AI", "recruitment software", "HR automation"],

  // Canonical URL (Change to your actual domain)
  metadataBase: new URL("https://www.thehireai.com"), 
  
  // Open Graph (For social media/LinkedIn sharing)
  openGraph: {
    title: "TheHireAI | AI Recruitment & Automated Candidate Calls",
    description: "TheHireAI: Automated AI voice agents for fast, human-like candidate screening and recruitment.",
    url: "https://www.thehireai.com",
    siteName: "TheHireAI",
    // images: [
    //     // Replace with your actual hero image or logo URL
    //     {
    //         url: "https://www.thehireai.com/og-image.jpg", 
    //         width: 1200,
    //         height: 630,
    //         alt: "TheHireAI AI Recruitment Platform",
    //     },
    // ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "TheHireAI | AI Recruitment & Automated Candidate Calls",
    description: "AI Voice Agents for Automated Candidate Screening.",
    creator: "@yourhandle", // Replace with your Twitter handle
    images: ["https://www.thehireai.com/twitter-image.jpg"], // Replace with a Twitter-specific image
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // 2. APPLY FONT VARIABLES TO HTML ELEMENT
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}