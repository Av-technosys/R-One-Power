"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {  IconSunFilled } from "@tabler/icons-react"
import Link from "next/link"

const stats = [
  { label: "Projects Executed", value: "40+ MW" },
  { label: "States & UT Coverage", value: "18+" },
  { label: "Industry Experience", value: "8+ Years" },
  { label: "Energy Savings", value: "Up to 90%" },
]

export default function HeroBanner() {
  return (
    <section className="relative  font-inter overflow-hidden bg-gradient-to-b from-blue-50 py-24 to-white">
      {/* Background Graphic elements matching image */}
      <div className="absolute bottom-0 right-0 w-full h-full z-0">
         {/* Replace with your actual solar panel image path */}
        <Image 
          src="/hero-banner.png" 
          alt="Solar Panel Background"  
          fill 
          className="object-cover object-bottom opacity-90"
          priority
        />
        {/* Curvy blue/yellow wave overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E88E526] text-[#1E88E5] border border-[#4ADE8066] font-inter px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
        >
          <IconSunFilled className="inline-block mr-2 text-[#FBBF24]" /> MNRE Empanelled Solar EPC & I&C Company
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-poppins font-extrabold text-slate-900 leading-tight tracking-tight"
        >
          Cleaner Future<br />
          <span className="text-[#1E88E5]">Homes & </span> <span className="bg-linear-to-r from-[#FDEA00] to-[#FFC300] bg-clip-text text-transparent">Industries</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-[#616161] max-w-2xl"
        >
          Delivering end-to-end solar EPC, I&C, and renewable energy solutions across India since 2016. 
From residential rooftops to large-scale industrial projects, we provide reliable solar systems 
designed for long-term performance, maximum savings, and sustainable growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col md:flex-row gap-4 justify-center"
        ><Link href="/contact" className="w-full md:w-auto">
          <Button size="lg" className="bg-linear-to-r from-[#1E88E5] to-[#6EC6FF] py-6 border border-[#1E88E5] hover:bg-blue-700 md:px-8 px-25 text-md rounded-md">
            Get Free Consultation
          </Button>
          </Link>
          <Link href="/services" className="w-full md:w-auto">
            <Button size="lg" variant="outline" className="py-6 md:px-8  w-full  text-md rounded-md  border border-[#1E88E5] bg-linear-to-r from-[#1E88E5] to-[#157DC0]  bg-clip-text text-transparent hover:text-blue-50">
              {/* CTA Button 2 */}
            View Our Services
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid - Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white/50 backdrop-blur-lg border border-white/50 p-6 rounded-xl shadow-xl shadow-blue-900/5 text-center"
            >
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}