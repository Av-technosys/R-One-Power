import React from 'react'
import Image from 'next/image'
import { IconMapPin, IconPhone, IconMail, IconClock } from '@tabler/icons-react'
import { IconSunFilled } from '@tabler/icons-react'
import Contact from '../../../public/Contact_bg.jpg'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Faq from '@/Component/contact/Faq'
import Questions from '@/Component/contact/Questions'

const Page = () => {
  return (
    <div>

      {/*Hero section */}
      <div className="relative w-full min-h-[600px] flex flex-col justify-center p-8 overflow-hidden">
        {/*Background Image*/}
        <div>
          <Image 
            src={Contact} 
            alt="Contact Us Background" 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Overlay for better text visibility */} 
        <div className="absolute inset-0 bg-black/25"></div>
      
        {/* Main Heading and Subheading */}
        <div className="relative text-white min-h-[330px] flex flex-col gap-4 items-center text-center ">
          <div className="bg-blue-500/10 w-fit px-5 border-2 border-[#1E88E5] text-[#1E88E5] rounded-full font-bold p-3 flex items-center justify-center gap-2 ">
            <IconSunFilled size={20} stroke={1.5} className="text-[#FBBF24] font-inter" />
            Contact Us
          </div>

          <div className="relative text-white flex flex-col gap-4 items-center text-center ">
            <p className="text-5xl md:text-7xl font-poppins font-bold mb-2">
              Get in <span className="text-[#FDEA00]">Touch</span>
            </p>
            <p className="text-xl p-4 font-poppins">
              Ready to switch to solar? Reach out for a free consultation and site survey.
            </p>
          </div>
        </div>

      </div>

   {/* Card section */}
      <div className="relative -mt-16 md:-mt-24 lg:-mt-30 px-4 sm:px-6 pb-12 w-full max-w-[95%] lg:max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          <Card className="rounded-xl shadow-lg min-h-[200px] md:min-h-[270px] p-3 md:p-4">
            <CardHeader className="pb-3 md:pb-4 p-3 md:p-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                <IconMapPin size={24} stroke={2} className="text-blue-500" />
              </div>
              <CardTitle className="text-gray-900 font-bold text-xl md:text-3xl font-poppins mt-3 -mb-3">
                Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent className="font-inter">
              <p className="text-gray-500 text-sm md:text-lg break-words">
                45 Solar Park, Malviya Nagar
              </p>
              <p className="text-gray-500 text-sm md:text-lg break-words">
                Jaipur, Rajasthan 302017
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg min-h-[200px] md:min-h-[270px] p-3 md:p-4">
            <CardHeader className="pb-3 md:pb-4 p-3 md:p-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                <IconPhone size={24} stroke={2} className="text-blue-500" />
              </div>
              <CardTitle className="text-gray-900 font-bold text-xl md:text-3xl font-poppins mt-3 -mb-3">
                Call Us
              </CardTitle>
            </CardHeader>
            <CardContent className="font-inter">
              <p className="text-gray-500 text-sm md:text-lg">
                +91 141 234 5678
              </p>
              <p className="text-gray-500 text-sm md:text-lg">
                +91 98765 43210
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg min-h-[200px] md:min-h-[270px] p-3 md:p-4">
            <CardHeader className="pb-3 md:pb-4 p-3 md:p-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                <IconMail size={24} stroke={2} className="text-blue-500" />
              </div>
              <CardTitle className="text-gray-900 font-bold text-xl md:text-3xl font-poppins mt-3 -mb-3">
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="font-inter">
              <p className="text-gray-500 text-sm md:text-lg break-all">
                info@R-OnePower.in
              </p>
              <p className="text-gray-500 text-sm md:text-lg break-all">
                sales@R-OnePower.in
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg min-h-[200px] md:min-h-[270px] p-3 md:p-4">
            <CardHeader className="pb-3 md:pb-4 p-3 md:p-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                <IconClock size={24} stroke={2} className="text-blue-500" />
              </div>
              <CardTitle className="text-gray-900 font-bold text-xl md:text-3xl font-poppins mt-3 -mb-3">
                Working Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="font-inter">
              <p className="text-gray-500 text-sm md:text-lg">
                Mon - Sat: 9:00 AM - 6:00 PM
              </p>
              <p className="text-gray-500 text-sm md:text-lg">
                Sunday: Closed
              </p>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* FAQ Section */}
      <Faq />

      {/*Still have questions*/}
      <Questions />

    </div>
  )
}

export default Page