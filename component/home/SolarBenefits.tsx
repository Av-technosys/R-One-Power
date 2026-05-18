"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  IconTrendingDown, 
  IconCurrencyRupee, 
  IconHomeDollar, 
  IconWallet, 
  IconLeaf, 
  IconBolt 
} from "@tabler/icons-react"

const topBenefits = [
  {
    title: "Reduce Electricity Costs",
    desc: "Lower your monthly electricity expenses with efficient and reliable solar power generation.",
    icon: <IconTrendingDown size={32} stroke={1.5} />,
    color: "bg-linear-to-r from-[#3B82F6] to-[#06B6D4]",
    shadow: "shadow-blue-200"
  },
  {
    title: "Long-Term Financial Savings",
    desc: "Solar systems offer strong long-term returns with minimal operational and maintenance costs.",
    icon: <IconCurrencyRupee size={32} stroke={1.5} />,
    color: "bg-linear-to-r from-[#22C55E] to-[#10B981]",
    shadow: "shadow-emerald-200"
  },
  {
    title: "Government Subsidy Support",
    desc: "Eligible residential projects can benefit from government-backed solar subsidy programs.",
    icon: <IconHomeDollar size={32} stroke={1.5} />,
    color: "bg-linear-to-r from-[#F59E0B] to-[#F97316]",
    shadow: "shadow-amber-200"
  },
  {
    title: "Flexible Solar Solutions",
    desc: "Customized solar systems and financing options designed around your energy requirements.",
    icon: <IconWallet size={32} stroke={1.5} />,
    color: "bg-linear-to-r from-[#A855F7] to-[#EC4899]",
    shadow: "shadow-purple-200"
  }
]

export default function SolarBenefits() {
  return (
    <section className="py-24 bg-white font-inter overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="inline-block bg-blue-50 text-[#1E88E5] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-blue-100 mb-4"
          >
            What We Offer
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 font-poppins mb-4"
          >
            Solar <span className="text-[#1E88E5]">Benefits</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-lg mx-auto"
          >
           {/* Subheading */}
Smart solar investments designed to reduce energy costs, improve long-term savings, and support a more sustainable future.
          </motion.p>
        </div>

        {/* Top 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {topBenefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`${item.color} ${item.shadow} h-16 w-16 rounded-[22px] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 mb-6`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-poppins">{item.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom 2 Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="bg-[#BBF7D0] border border-emerald-100 rounded-[32px] p-10 flex flex-col items-start gap-3 hover:shadow-xl transition-shadow"
          >
            <div className="h-14 w-14 rounded-2xl  flex items-center justify-center ">
              <IconLeaf size={30} className="text-emerald-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 font-poppins">Sustainable Energy Impact</h3>
              <p className="text-sm text-[#717A75] leading-relaxed font-medium">
               Solar energy helps reduce carbon emissions, supports cleaner power generation, and contributes toward a more sustainable environment for future generations.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="bg-[#FDE68A] border border-amber-100 rounded-[32px] p-10 flex flex-col items-start gap-3 hover:shadow-xl transition-shadow"
          >
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center ">
              <IconBolt size={30} className="text-amber-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 font-poppins">  Greater Energy Independence</h3>
              <p className="text-sm text-[#717A75] leading-relaxed font-medium">
                Generate your own electricity, reduce dependency on conventional power sources, and protect against rising electricity tariffs over time.
              </p>
            </div>
          </motion.div>
        </div>  
      </div>
    </section>
  )
}