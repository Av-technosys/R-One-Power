import HeroSection from '@/component/hero section/hero'
import ServiceGrid from '@/component/services/ServiceGrid'
import ServiceTabs from '@/component/services/ServiceTabs'
import service_bg from '@/public/service-bg.jpg'
import React from 'react'

const page = () => {
  return (
    <div>
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
    </div>
  )
}

export default page
