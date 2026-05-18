"use client"
import Image from 'next/image'
import { IconMapPin, IconPhone, IconMail, IconClock } from '@tabler/icons-react'
import { IconSunFilled } from '@tabler/icons-react'
import Contact from '../../../public/Contact_bg.jpg'
import Faq from '@/component/contact/Faq'
import Questions from '@/component/contact/Questions'
import Solar from '@/component/common/ContactSection'
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {
  return (
    <div>

      {/*Hero section */}
      <div className="relative w-full min-h-[600px] h-[70vh] flex flex-col justify-center p-6 md:p-8 overflow-hidden">
        {/*Background Image*/}
        <div>
          <Image 
            src={Contact} 
            alt="Contact Us Background" 
            fill 
            className="object-cover" 
          />
        </div>

        <div className="absolute inset-0 bg-black/25"></div>
      
        <div className="relative text-white min-h-[330px] flex flex-col gap-4 items-center text-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="bg-blue-500/10 w-fit px-5 border-2 border-[#1E88E5] text-[#1E88E5] rounded-full font-bold p-3 flex items-center justify-center gap-2 "
          >
            <IconSunFilled size={20} stroke={1.5} className="text-[#FBBF24] font-inter" />
            Contact Us
          </motion.div>

          <div className="relative text-white flex flex-col gap-4 items-center text-center ">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-[38px] sm:text-5xl md:text-7xl font-poppins font-bold mb-2 leading-tight"
            >
              Get in <span className="text-[#FDEA00]">Touch</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl p-3 sm:p-4 font-poppins max-w-2xl"
            >
              Ready to switch to solar? Reach out for a free consultation and site survey.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Card section */}
      <div className="relative -mt-16 md:-mt-24 lg:-mt-30 px-4 sm:px-6 pb-12 w-full max-w-[95%] lg:max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
 
          {[
            {
              icon: <IconMapPin size={24} stroke={2} className="text-blue-500" />,
              title: "Corporate Office",
              line1: "C-86, Gautam Marg, Behind Reliance Trends",
              line2: "Near Vaishali Circle, Vaishali Nagar, Jaipur 302021",
              breakClass: "break-words"
            },
            {
              icon: <IconPhone size={24} stroke={2} className="text-blue-500" />,
              title: "Call Us",
              line1: "+91 96600 77814",
              line2: "",
              breakClass: ""
            },
            {
              icon: <IconMail size={24} stroke={2} className="text-blue-500" />,
              title: "Email Us",
              line1: "sales@r1power.com",
              line2: "",
              breakClass: "break-all"
            },
            {
              icon: <IconClock size={24} stroke={2} className="text-blue-500" />,
              title: "Working Presence",
              line1: "Operating Across 18 States & 5 UTs",
              line2: "Jaipur • Mumbai • Guwahati",
              breakClass: ""
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-xl shadow-lg min-h-[200px] md:min-h-[310px] p-3 md:p-4">
                <CardHeader className="pb-3 md:pb-4 p-3 md:p-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                  <CardTitle className="text-gray-900 font-bold text-xl md:text-3xl font-poppins mt-3 -mb-3">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="font-inter">
                  <p className={`text-gray-500 text-sm md:text-lg ${item.breakClass}`}>
                    {item.line1}
                  </p>
                  <p className={`text-gray-500 text-sm md:text-lg ${item.breakClass}`}>
                    {item.line2}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

        </div>
      </div>

      <Solar/>
      <Faq />
      <Questions />

    </div>
  )
}

export default Page