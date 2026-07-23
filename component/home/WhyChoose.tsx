"use client"

import { HTMLMotionProps, motion } from "framer-motion"
import { 
  IconShieldCheck, 
  IconHeadset, 
  IconCurrencyRupee, 
  IconSettings, 
  IconLeaf ,
  IconRosetteAsterisk
} from "@tabler/icons-react"

const features = [
  {
    title: "Trusted Solar EPC Expertise",
    desc: "Delivering end-to-end solar EPC and I&C solutions since 2016 with proven experience across residential, commercial, and industrial projects.",
    icon: <IconRosetteAsterisk className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "PM Surya Ghar Empanelled",
    desc: "Authorized vendor for government-backed residential solar projects with complete support for subsidy processing and documentation.",
    icon: <IconShieldCheck className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Dedicated Technical Support",
    desc: "Our experienced team ensures smooth project execution, responsive assistance, and reliable post-installation support.",
    icon: <IconHeadset className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Transparent Project Planning",
    desc: "Clear project estimates, honest consultation, and optimized solar solutions designed around your energy requirements.",
    icon: <IconCurrencyRupee className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Complete Turnkey Solutions",
    desc: "From site assessment and system design to installation, commissioning, and maintenance — we handle the entire process.",
    icon: <IconSettings className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Focused on Sustainable Impact",
    desc: "Our solar systems help reduce electricity costs, lower carbon emissions, and support a cleaner, more sustainable future.",
    icon: <IconLeaf className="text-[#1E88E5]" size={28} />,
  },
]

export default function WhyChoose() {
  // Animation Approach: Niche se upar, once:true
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  return (
    <section className="md:py-20 py-15 bg-gray-50/50 font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            {...fadeInUp}
            className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1 rounded-full text-xs font-bold mb-4"
          >
            Why R-One Power
          </motion.span>
          <motion.h2 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-poppins " 
          >
            Why Choose <span className="text-[#1E88E5]">R-One Power</span>
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-[#80807F] max-w-2xl mx-auto text-sm md:text-base font-medium"
          >
            {/* Subheading */}
Delivering dependable solar solutions through quality engineering, trusted execution, and long-term energy performance across residential, commercial, and industrial sectors.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1 }} // Staggered entry
              className="group relative min-h-[220px] overflow-hidden rounded-md border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-300 sm:p-7 md:hover:-translate-y-2 md:hover:border-[#1E88E5]/35 md:hover:shadow-[0_18px_40px_rgba(30,136,229,0.14)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1E88E5] via-[#34A853] to-[#F6B21A]" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E3F2FD]/70 transition-transform duration-300 md:group-hover:scale-125" />

              {/* Card Top */}
              <div className="relative mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#E3F2FD] shadow-inner ring-1 ring-[#1E88E5]/10 transition-transform duration-300 md:group-hover:scale-105 md:group-hover:bg-[#D8EEFF]">
                  {item.icon}
                </div>
                <span className="font-poppins text-4xl font-black leading-none text-[#1E88E5]/25 transition-colors duration-300 md:text-slate-100 md:group-hover:text-[#1E88E5]/15">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
              </div>

              {/* Text Content */}
              <div className="relative space-y-3">
                <h3 className="max-w-[15rem] text-xl font-poppins font-extrabold leading-snug text-slate-900 transition-colors md:group-hover:text-[#1E88E5] sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold leading-6 text-slate-500 sm:font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
