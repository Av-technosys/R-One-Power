"use client"

import React from "react"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import { IconCircleCheckFilled, IconRosetteFilled, IconTrophyFilled } from "@tabler/icons-react"

// Assuming 10 logos exist in public folder as logo1.png, logo2.png ... logo10.png
const brandLogos = [
  { name: "Adani Solar", img: "logo1.png" },
  { name: "Insol", img: "logo2.png" },
  { name: "Premier Energies", img: "logo3.png" },
  { name: "Rayzon Solar", img: "logo4.png" },
  { name: "ReNew Power", img: "logo5.png" },
  { name: "Tata Power", img: "logo10.png" },
  { name: "Usha Shriram", img: "logo7.png" },
  { name: "Waaree", img: "logo8.png" },
  { name: "Luminous", img: "logo9.png" },
]

export default function BrandsSection() {
  
  // Animation Variant: Niche se upar movement
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="relative md:py-20 py-10 text-white font-inter overflow-hidden">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/logo-bg.png" 
          alt="Solar Panel Field at Sunset" 
          fill 
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50 "></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-3">
          <motion.h2 
            {...fadeInUp}
            className="text-4xl md:text-5xl font-black font-poppins"
          >
            Premium <span className="text-[#FBC02D]">Tier-1 Brands</span>
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-gray-300 font-medium max-w-xl mx-auto"
          >
            We partner with the world&apos;s most trusted solar equipment manufacturers
          </motion.p>
          <motion.h4 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-bold font-poppins text-[#FBC02D] pt-5"
          >
            Solar <span className="text-white">Panels</span>
          </motion.h4>
        </div>

        {/* Logos Grid with Animation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {brandLogos.map((brand, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-3 flex items-center justify-center border border-white/10 aspect-[4/3] group hover:bg-white/10 transition-colors"
            >
              <div className="relative h-2/3 w-full p-2">
                <img 
                  src={`/${brand.img}`} 
                  alt={brand.name}
                  className="object-contain w-full h-full filter  group-hover:opacity-100 group-hover:filter-none transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer USP Icons */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <IconCircleCheckFilled size={40} stroke={2} className="text-[#22C55E]" />
            <div>
              <h5 className="font-bold font-poppins text-lg">Tier-1 Certified</h5>
              <p className="text-sm text-white font-medium">Top-rated manufacturers globally</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <IconRosetteFilled size={40} stroke={2} className="text-[#FBC02D]" />
            <div>
              <h5 className="font-bold font-poppins text-lg">25+ Years Warranty</h5>
              <p className="text-sm text-white font-medium">Performance guarantees on panels</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <IconTrophyFilled size={40} stroke={2} className="text-[#EC4899]" />
            <div>
              <h5 className="font-bold font-poppins text-lg">Proven Track Record</h5>
              <p className="text-sm text-white font-medium">Billions of watts installed worldwide</p>
            </div>
          </div>
        </motion.div>

        {/* Final Disclaimer */}
        <motion.p 
          {...fadeInUp}
          transition={{ delay: 1 }}
          className="text-center text-sm text-white font-medium mt-16 leading-relaxed"
        >
          All equipment comes with manufacturer warranties and our quality guarantee
        </motion.p>

      </div>
    </section>
  )
}