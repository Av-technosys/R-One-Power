import ProjectGrid from '@/component/gallery/ProjectGrid';
import HeroSection from '@/component/hero section/hero';
import gallery_bg from '@/public/gallery-bg.png'

import React from 'react'
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
