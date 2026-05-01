import type { Metadata } from "next";
import "./globals.css";
import SkipLink from "@/components/SkipLink";

export const metadata: Metadata = {
  title: "Election Process Challenge | Interactive Voter Guide 2026",
  description:
    "Master the US Election process with our interactive AI-powered guide. Real-time stats on Electoral Votes (538), Amendments, and more.",
  keywords: [
    "election process challenge",
    "voter guide 2026",
    "voter registration",
    "voting rights",
    "election laws",
    "electoral college",
    "civic education",
    "AI election agent",
    "anti-misinformation",
    "US elections",
    "538 electoral votes",
  ],
  openGraph: {
    title: "Election Process Challenge | Interactive Voter Guide 2026",
    description:
      "Master the US Election process with our interactive AI-powered guide. Real-time stats on Electoral Votes (538), Amendments, and more.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
