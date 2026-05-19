"use client"

import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import {
  IconHome,
  IconBuildingSkyscraper,
  IconBolt,
  IconBatteryAutomotive,
  IconSettings,
  IconArrowRight,
  IconBuildingFactory
} from "@tabler/icons-react"

const solutions = [
  {
    title: "Residential Rooftop Solar",
    desc: "Efficient rooftop solar systems designed for homes to reduce electricity costs and support long-term energy savings.",
    img: "/solution-1.png",
    icon: <IconHome size={24} />,
    color: "bg-linear-to-r from-[#3B82F6] to-[#06B6D4]",
  },
  {
    title: "Commercial Solar Solutions",
    desc: "Customized solar installations for offices, institutions, and commercial properties focused on operational efficiency and cost reduction.",
    img: "/solution-2.png",
    icon: <IconBuildingSkyscraper size={24} />,
    color: "bg-linear-to-r from-[#22C55E] to-[#10B981]",
  },
  {
    title: "Industrial Solar EPC",
    desc: "Large-scale industrial solar projects with complete EPC services, quality engineering, and dependable performance.",
    img: "/solution-3.png",
    icon: <IconBuildingFactory size={24} />,
    color: "bg-linear-to-r from-[#A855F7] to-[#EC4899]",
  },
  {
    title: "On-Grid & Hybrid Systems",
    desc: "Flexible solar solutions with grid connectivity and hybrid configurations designed for reliable energy management.",
    img: "/solution-4.png",
    icon: <IconBolt size={24} />,
    color: "bg-linear-to-r from-[#F59E0B] to-[#F97316]",
  },
  {
    title: "Solar Battery Backup",
    desc: "Advanced battery-integrated solar systems for uninterrupted power supply and enhanced energy reliability.",
    img: "/solution-5.png",
    icon: <IconBatteryAutomotive size={24} />,
    color: "bg-linear-to-r from-[#14B8A6] to-[#06B6D4]",
  },
  {
    title: "Operation & Maintenance",
    desc: "Comprehensive maintenance and support services to ensure optimal solar system efficiency and long-term performance.",
    img: "/solution-6.png",
    icon: <IconSettings size={24} />,
    color: "bg-linear-to-r from-[#6366F1] to-[#A855F7]",
  },
]

export default function IndustrialSolutions() {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="md:py-15 py-8 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            {...fadeInUp}
            className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-6 py-1.5 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wider"
          >
            What We Offer
          </motion.span>

          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
          >
            Complete Solar <span className="text-[#1E88E5]">Energy Solutions</span>
          </motion.h2>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-sm font-medium leading-relaxed"
          >
            <p>{/* Subheading */}
              Reliable and performance-driven solar solutions for residential, commercial, and industrial energy requirements with complete EPC execution and long-term support.</p>

          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Floating Icon */}
                <div className={`absolute top-4 left-4 ${item.color} text-white p-2.5 rounded-lg shadow-lg`}>
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1E88E5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              
                <button className="flex items-center gap-2 text-[#1E88E5] text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all">
                  Learn More <IconArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}