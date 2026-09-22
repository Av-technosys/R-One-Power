import type { Metadata } from 'next'
import ContactSection from '@/component/common/ContactSection'
import Faq from '@/component/contact/Faq'
import Questions from '@/component/contact/Questions'
import AboutSection from '@/component/home/AboutSection'
import BrandsSection from '@/component/home/BrandsSection'
import HeroBanner from '@/component/home/HeroBanner'
import IndustrialSolutions from '@/component/home/IndustrialSolutions'
import LogoStrap from '@/component/home/LogoStrap'
import ProcessSection from '@/component/home/ProcessSection'
import ProjectsSection from '@/component/home/ProjectsSection'
import RajasthanNetwork from '@/component/home/RajasthanNetwork'
import ReadyToSolar from '@/component/home/ReadyToSolar'
import ServicesSection from '@/component/home/ServicesSection'
import Solar from '@/component/home/Solar'
import SolarBenefits from '@/component/home/SolarBenefits'
import SolarCalculator from '@/component/home/SolarCalculator'
import Testimonials from '@/component/home/Testimonials'
import WhyChoose from '@/component/home/WhyChoose'
import React from 'react'

export const metadata: Metadata = {
  title: 'Solar EPC Company in India | Energy Solutions | R-One Power',
  description:
    'R-One Power is an MNRE-empanelled solar EPC company based in Rajasthan, serving clients across India. Residential, commercial & industrial solar solutions.',
  alternates: {
    canonical: 'https://www.r1power.com/',
  },
  openGraph: {
    type: 'website',
    siteName: 'R-One Power',
    url: 'https://www.r1power.com/',
    title: 'Solar EPC Company in India | Energy Solutions | R-One Power',
    description:
      'R-One Power is an MNRE-empanelled solar EPC company based in Rajasthan, serving clients across India. Residential, commercial & industrial solar solutions.',
    images: ['https://dg2suxnbcr839.cloudfront.net/main-logo.png'],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ronepowerindia',
    title: 'Solar EPC Company in India | Energy Solutions | R-One Power',
    description:
      'R-One Power is an MNRE-empanelled solar EPC company based in Rajasthan, serving clients across India. Residential, commercial & industrial solar solutions.',
    images: ['https://dg2suxnbcr839.cloudfront.net/main-logo.png'],
  },
}

const page = () => {
  return (
    <div>
      <HeroBanner/>
      {/* <LogoStrap/> */}
      <AboutSection/>
      <ProjectsSection/>
      <WhyChoose/>
      <ProcessSection/>
      <ServicesSection/>
      <Testimonials/>
      <IndustrialSolutions/>
      {/* <SolarCalculator/> */}
      <Solar/>
      <SolarBenefits/>
      <RajasthanNetwork/>
      <Faq/>
      <Questions/>
      <BrandsSection/>
      <ContactSection/>
      <ReadyToSolar />

    </div>
  )
}

export default page
