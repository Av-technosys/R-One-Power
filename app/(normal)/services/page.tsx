import type { Metadata } from 'next'
import HeroSection from '@/component/hero section/hero'
import ServiceGrid from '@/component/services/ServiceGrid'
import ServiceTabs from '@/component/services/ServiceTabs'
import service_bg from '@/public/service-bg.jpg'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Solar installation Services Across India | R-One Power',
  description:
    "Browse R-One Power's solar installation services across India, including residential, commercial & industrial, battery storage, AMC and net metering.",
  alternates: {
    canonical: 'https://www.r1power.com/services',
  },
  openGraph: {
    type: 'website',
    siteName: 'R-One Power',
    url: 'https://www.r1power.com/services',
    title: 'Solar installation Services Across India | R-One Power',
    description:
      "Browse R-One Power's solar installation services across India, including residential, commercial & industrial, battery storage, AMC and net metering.",
    images: [
      'https://www.r1power.com/_next/static/media/service-bg.181nka5a7anhe.jpg',
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar installation Services Across India | R-One Power',
    description:
      "Browse R-One Power's solar installation services across India, including residential, commercial & industrial, battery storage, AMC and net metering.",
    images: [
      'https://www.r1power.com/_next/static/media/service-bg.181nka5a7anhe.jpg',
    ],
  },
}

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <HeroSection
          image={service_bg}
          badgeText="End-to-End Renewable Energy Solutions"
          heading={
            <>
              Reliable <span className="text-[#FDEA00]">Solar Solutions </span>for Homes, Businesses & Industries
            </>
          }
          subtitle="End-to-end solar services from design and installation to maintenance and monitoring."
          overlay="blue"
          badgeVariant="yellow"
        />
      </div>

      <ServiceTabs/>
      <ServiceGrid/>
    </Suspense>
  )
}

export default page
