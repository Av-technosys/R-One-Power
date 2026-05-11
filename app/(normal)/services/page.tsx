import ServiceBanner from '@/component/services/ServiceBanner'
import ServiceGrid from '@/component/services/ServiceGrid'
import ServiceTabs from '@/component/services/ServiceTabs'
import React from 'react'

const page = () => {
  return (
    <div>
      <ServiceBanner 
  title={<>Comprehensive <span className="text-yellow-400">Solar</span> <br className="hidden md:block" /> Solutions</>}
  description="End-to-end solar services from design and installation to maintenance."
  bgImage="/service-bg.jpg"
/>
      <ServiceTabs/>
      <ServiceGrid/>
    </div>
  )
}

export default page
