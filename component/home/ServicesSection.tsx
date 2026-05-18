"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  IconHome, 
  IconBuildingStore, 
  IconBatteryCharging, 
  IconArrowRight 
} from "@tabler/icons-react"
import Link from "next/link"

const services = [
  {
    title: "Residential Solar Solutions",
    desc: "Efficient rooftop solar systems for homes designed to reduce electricity costs, improve energy independence, and support sustainable living.",
    icon: <IconHome size={28} />,
    bgColor: "bg-[#22C55E]",
  },
  {
    title: "Commercial Solar Projects",
    desc: "Customized solar solutions for offices, institutions, and commercial spaces focused on operational savings and long-term energy efficiency.",
    icon: <IconBuildingStore size={28} />,
    bgColor: "bg-[#F59E0B]",
  },
  {
    title: "Industrial Solar EPC",
    desc: "High-capacity industrial solar projects with complete EPC execution, quality engineering, and dependable system performance.",
    icon: <IconBuildingStore size={28} />,
    bgColor: "bg-[#06B6D4]",
  },
  {
    title: "Hybrid & Backup Systems",
    desc: "Advanced hybrid solar and battery backup solutions for uninterrupted power supply and improved energy reliability.",
    icon: <IconBatteryCharging size={28} />,
    bgColor: "bg-[#EC4899]",
  },
]
export default function ServicesSection() {
  
  // Animation Strategy: Niche se upar, persistent
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 font-inter">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            {...fadeInUp}
            className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider"
          >
            What We Offer
          </motion.span>
          <motion.h2 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-poppins"
          >
            Our Solar <span className="text-[#1E88E5]">Services</span>
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed font-inter"
          >
            {/* Subheading */}
Comprehensive renewable energy solutions designed for residential, commercial, and industrial energy requirements with reliable execution and long-term performance.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-start h-full"
            >
              {/* Icon Container */}
              <div className={`${service.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {service.icon}
              </div>

              {/* Text Content */}
              <div className="flex-grow space-y-4">
                <h3 className="text-xl font-bold text-slate-900 font-poppins">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Learn More Link */}
              <button className="mt-8 flex items-center gap-2 text-[#1E88E5] font-bold text-sm hover:gap-3 transition-all">
                Learn More <IconArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <motion.div 
          {...fadeInUp}
          className="flex justify-center"
        >
          <Link href="/services" className="w-full md:w-auto">
            <Button className="bg-linear-to-r from-[#1E88E5] to-[#6EC6FF] w-full hover:opacity-90 h-14 px-10 rounded-xl text-white font-bold shadow-lg shadow-blue-100 flex items-center gap-2">
              View All Services <IconArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}