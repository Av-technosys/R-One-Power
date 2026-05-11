"use client"

import React from "react"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import { IconSunHigh, TablerIcon } from "@tabler/icons-react"

// Types define kar dete hain taaki autocomplete mile
interface ServiceBannerProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode; // ReactNode isliye taaki <span> use kar sako
  description: React.ReactNode;
  bgImage: string;
  // Overlay colors ke liye default values set hain niche
  overlayFrom?: string; 
  overlayTo?: string;
}

export default function ServiceBanner({
  badgeText = "Services",
  badgeIcon = <IconSunHigh size={18} stroke={2.5} className="text-[#FBBF24]"/>,
  title,
  description,
  bgImage,
  overlayFrom = "from-[#1E88E580]", // Default Blue
  overlayTo = "to-[#114B7F80]"      // Default Dark Blue
}: ServiceBannerProps) {
  
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.7, ease: "easeOut" }        
  }

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage} 
          alt="Banner Background" 
          fill 
          priority
          className="object-cover"
        />
        {/* Dynamic Overlay Layer */}
        <div className={`absolute inset-0 bg-linear-to-r ${overlayFrom} ${overlayTo}`}></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-7xl px-6 text-center">
        <motion.div {...fadeInUp} className="flex flex-col items-center space-y-6 md:space-y-8">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FDEA00] text-[#FDEA00] backdrop-blur-sm shadow-lg shadow-amber-500/10">
            {badgeIcon}
            <span className="text-[10px] md:text-[12px] font-black tracking-[0.2em] font-poppins uppercase">
              {badgeText}
            </span>
          </div>

          {/* Main Heading - Responsive text sizes fixed */}
          <h1 className="text-4xl md:text-5xl  2xl:text-6xl font-black text-white font-poppins leading-[1.1] tracking-tight">
            {title}
          </h1>

          {/* Subtext */}
          <p className="text-white/90 text-sm md:text-md 2xl:text-xl font-medium font-inter max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

        </motion.div>
      </div>

    </section>
  )
}