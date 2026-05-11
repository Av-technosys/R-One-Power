import ProjectGrid from '@/component/gallery/ProjectGrid';
import ServiceBanner from '@/component/services/ServiceBanner'
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
      <ServiceBanner 
      badgeText='MNRE Certified Solar EPC Partner'
       title={<> <span className="text-yellow-400">Project</span>  Gallery</>}
       description= { <p className='max-w-md'> A glimpse of our solar installations across homes, businesses and large-scale plants.</p> }
       bgImage="/gallery-bg.png"
/>
<ProjectGrid />
    </div>
  )
}

export default page
