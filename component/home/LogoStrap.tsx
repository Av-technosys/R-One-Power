"use client"

import { motion } from "framer-motion"
import { 
  IconBolt, 
  IconLeaf, 
  IconWind, 
  IconBatteryCharging, 
  IconShieldCheck 
} from "@tabler/icons-react"

const partners = [
  { name: "VOLTCORE", icon: <IconBolt className="text-[#1E88E5]" /> },
  { name: "SUNSTORM", icon: <IconLeaf className="text-[#1E88E5]" /> },
  { name: "AEROFLOW", icon: <IconWind className="text-[#1E88E5]" /> },
  { name: "GRIDPULSE", icon: <IconBatteryCharging className="text-[#1E88E5]" /> },
  { name: "KINETIC", icon: <IconShieldCheck className="text-[#1E88E5]" /> },
]

// Loop ke liye array ko double kar rahe hain
const duplicatedPartners = [...partners, ...partners]

export default function LogoStrap() {
  return (
    <section className="py-12 bg-white overflow-hidden border-b border-[#BDCABA4D]">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-center text-xs md:text-sm font-bold tracking-[0.2em] text-[#80807F] uppercase">
          Partnered with Global Energy Leaders
        </h2>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Infinite Slider Wrapper */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"], // 50% tak move karega kyunki array double hai
          }}
          transition={{
            ease: "linear",
            duration: 20, // Speed control yahan se hogi
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-8 md:mx-16 min-w-max"
            >
              <div className="p-2">
                {partner.icon}
              </div>
              <span className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Left & Right Gradient Fades (Edges ko smooth karne ke liye) */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  )
}