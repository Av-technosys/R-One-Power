import ContactSection from '@/component/common/ContactSection'
import AboutSection from '@/component/home/AboutSection'
import HeroBanner from '@/component/home/HeroBanner'
import IndustrialSolutions from '@/component/home/IndustrialSolutions'
import LogoStrap from '@/component/home/LogoStrap'
import ProcessSection from '@/component/home/ProcessSection'
import ProjectsSection from '@/component/home/ProjectsSection'
import ServicesSection from '@/component/home/ServicesSection'
import Testimonials from '@/component/home/Testimonials'
import WhyChoose from '@/component/home/WhyChoose'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroBanner/>
      <LogoStrap/>
      <AboutSection/>
      <ProjectsSection/>
      <WhyChoose/>
      <ProcessSection/>
      <ServicesSection/>
      <Testimonials/>
      <IndustrialSolutions/>
      <ContactSection/>
    </div>
  )
}

export default page
