import type { Metadata } from 'next';
import ProjectGrid from '@/component/gallery/ProjectGrid';
import HeroSection from '@/component/hero section/hero';
import gallery_bg from '@/public/gallery-bg.png'

import React from 'react'

export const metadata: Metadata = {
  title: 'Solar installation Project Gallery | R-One Power India',
  description:
    "Explore R-One Power's solar installation project gallery featuring residential, commercial & industrial solar installations, rooftop projects and solar farms across India.",
  alternates: {
    canonical: 'https://www.r1power.com/gallery',
  },
  openGraph: {
    type: 'website',
    siteName: 'R-One Power',
    url: 'https://www.r1power.com/gallery',
    title: 'Solar installation Project Gallery | R-One Power India',
    description:
      "Explore R-One Power's solar installation project gallery featuring residential, commercial & industrial solar installations, rooftop projects and solar farms across India.",
    images: [
      'https://www.r1power.com/_next/static/media/gallery-bg.0r~96nl6wk9rq.png',
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar installation Project Gallery | R-One Power India',
    description:
      "Explore R-One Power's solar installation project gallery featuring residential, commercial & industrial solar installations, rooftop projects and solar farms across India.",
    images: [
      'https://www.r1power.com/_next/static/media/gallery-bg.0r~96nl6wk9rq.png',
    ],
  },
}

type ServiceBannerProps = {
  badgeText: string;
  title: React.ReactNode;
  description: string;
  bgImage: string;
};
const page = () => {
  return (
    <div>
            <div>
        <HeroSection
          image={gallery_bg}
          badgeText="MNRE Certified Solar EPC Partner"
          heading={
            <>
              <span className="text-[#FDEA00]">Project </span>Gallery
            </>
          }
          subtitle="A glimpse of our solar installations across homes, businesses and large-scale plants."
          overlay="dark"
          badgeVariant="yellow"
        />
      </div>

<ProjectGrid />
    </div>
  )
}

export default page
