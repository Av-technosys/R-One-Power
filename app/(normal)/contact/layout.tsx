import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Solar Consultation | R-One Power",
  description:
    "Contact R-One Power for a free solar consultation & site survey assessment for residential, commercial and industrial solar projects. Call us at +91 96600 77814",
  alternates: {
    canonical: "https://www.r1power.com/contact",
  },
  openGraph: {
    type: "website",
    siteName: "R-One Power",
    url: "https://www.r1power.com/contact",
    title: "Contact Us | Get a Free Solar Consultation | R-One Power",
    description:
      "Contact R-One Power for a free solar consultation & site survey assessment for residential, commercial and industrial solar projects. Call us at +91 96600 77814",
    images: [
      "https://www.r1power.com/_next/static/media/contact-bg.0cdwf7ur.1x-z.png",
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get a Free Solar Consultation | R-One Power",
    description:
      "Contact R-One Power for a free solar consultation & site survey assessment for residential, commercial and industrial solar projects. Call us at +91 96600 77814",
    images: [
      "https://www.r1power.com/_next/static/media/contact-bg.0cdwf7ur.1x-z.png",
    ],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
