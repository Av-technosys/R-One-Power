"use client"

import React from "react"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { IconPhoneFilled } from "@tabler/icons-react"

export default function ReadyToSolar() {
  
  // Clean animation props to avoid "red alert"
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="relative py-24 w-full overflow-hidden flex items-center justify-center text-center">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/sky-bg.jpg" 
          alt="Sky Background" 
          fill 
          className="object-cover"
          priority
        />
        {/* Blue/Sky Overlay to match the image vibe */}
        <div className="absolute inset-0 bg-linear-to-r from-[#248FEC80] to-[#6EC6FF80]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl px-6">
        <motion.div {...fadeInUp} className="space-y-6">
          
          <h2 className="text-3xl md:text-4xl font-black text-white font-poppins tracking-tight">
            Ready to Go Solar?
          </h2>

          <p className="text-white/90 text-sm md:text-md font-medium font-inter max-w-2xl mx-auto leading-relaxed">
            Get a free site survey and customized quote today. Our experts will help you 
            choose the right system and maximize your savings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary Button */}
            <Button 
              className="h-14 px-10  font-inter bg-white text-[#1E88E5] hover:bg-slate-100 rounded-md font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              Book Free Site Survey
            </Button>

            {/* Ghost/Glass Button */}
            <Button 
              variant="outline"
              className="h-14 px-10 font-inter  border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-md font-bold text-sm gap-3 transition-all"
            >
              <IconPhoneFilled size={18} />
              +91 95213 73117
            </Button>
          </div>

        </motion.div>
      </div>

    </section>
  )
}   