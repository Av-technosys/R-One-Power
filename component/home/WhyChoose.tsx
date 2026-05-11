"use client"

import { HTMLMotionProps, motion } from "framer-motion"
import { 
  IconRosetteFilled, 
  IconShieldCheck, 
  IconHeadset, 
  IconCurrencyRupee, 
  IconSettings, 
  IconLeaf 
} from "@tabler/icons-react"

const features = [
  {
    title: "MNRE Certified",
    desc: "Government-approved solar EPC partner with certified engineers.",
    icon: <IconRosetteFilled className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "25-Year Warranty",
    desc: "Industry-leading performance guarantee on all panel installations.",
    icon: <IconShieldCheck className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock monitoring and rapid response maintenance team.",
    icon: <IconHeadset className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs. Clear breakdown with subsidy assistance included.",
    icon: <IconCurrencyRupee className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "End-to-End EPC",
    desc: "From site survey to commissioning — we handle everything for you.",
    icon: <IconSettings className="text-[#1E88E5]" size={28} />,
  },
  {
    title: "Eco Commitment",
    desc: "Each kW installed reduces 1.5 tons of CO₂ emissions annually.",
    icon: <IconLeaf className="text-[#1E88E5]" size={28} />,
  },
]

export default function WhyChoose() {
  // Animation Approach: Niche se upar, once: false
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
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
            We don&apos;t just install panels — we engineer long-term energy independence for you.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.1 }} // Staggered entry
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-md border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex items-start gap-5 group"
            >
              {/* Icon Container */}
              <div className="shrink-0 w-14 h-14 bg-[#E3F2FD] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-poppins font-bold text-slate-900 group-hover:text-[#1E88E5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
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