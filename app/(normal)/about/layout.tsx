import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About R-One Power | Solar Energy Solutions in Rajasthan & India",
  description:
    "R-One Power delivers reliable solar energy solutions across Rajasthan & India. MNRE-certified EPC company with 18+ states served since 2016. Call us to discuss.",
  alternates: {
    canonical: "https://www.r1power.com/about",
  },
  openGraph: {
    type: "website",
    siteName: "R-One Power",
    url: "https://www.r1power.com/about",
    title: "About R-One Power | Solar Energy Solutions in Rajasthan & India",
    description:
      "R-One Power delivers reliable solar energy solutions across Rajasthan & India. MNRE-certified EPC company with 18+ states served since 2016. Call us to discuss.",
    images: [
      "https://www.r1power.com/_next/static/media/About_us.17l2l0tjxy2lr.jpg",
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ronepowerindia",
    title: "About R-One Power | Solar Energy Solutions in Rajasthan & India",
    description:
      "R-One Power delivers reliable solar energy solutions across Rajasthan & India. MNRE-certified EPC company with 18+ states served since 2016. Call us to discuss.",
    images: [
      "https://www.r1power.com/_next/static/media/About_us.17l2l0tjxy2lr.jpg",
    ],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
