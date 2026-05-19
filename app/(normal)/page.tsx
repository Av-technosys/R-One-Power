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
