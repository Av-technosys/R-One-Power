"use client"

import React from "react"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react"
import Link from "next/link"

// Content from official layout
const hubs = [
  "JAIPUR",
  "JODHPUR",
  "UDAIPUR",
  "KOTA",
  "AJMER",
  "BIKANER",
  "BHILWARA",
  "ALWAR",
  "+ MORE CITIES"
]

const stats = [
  { label: "Installed Capacity", value: "50+ MW" },
  { label: "Completed Projects", value: "500+" },
  { label: "Industry Experience", value: "10+ Years" },
]
export default function RajasthanNetwork() {
  // Using HTMLMotionProps to fix the "Red Alert" TypeScript errors
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="md:py-24 pt-2 pb-12 bg-white font-inter overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Side: Rajasthan Map Section */}
          <div className="lg:w-1/2 w-full space-y-8">
            <motion.div {...fadeInUp} className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                EXPANDING SOLAR REACH
              </span>
              <h2 className="text-4xl md:text-3xl font-black text-slate-900 font-poppins leading-[1.1] tracking-tight">
                Serving Multiple Districts <br />
                Across Rajasthan
              </h2>
              <p className="text-slate-500 font-medium text-sm max-w-md leading-relaxed">
                Delivering reliable solar EPC solutions across Rajasthan with dedicated project execution, installation support, and long-term service coverage.              </p>
            </motion.div>

            {/* Map Container - No extra text, just your image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="relative w-full h-[300px] md:h-[350px]"
            >
              <Image
                src="/rajasthan.png"
                alt="Rajasthan Map"
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Right Side: Operational Hubs & Stats */}
          <div className="lg:w-1/2 w-full space-y-10">

            {/* Feature Box */}
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-2xl p-2 shadow-[0_20px_50px_-15px_rgba(251,191,36,0.2)] border border-slate-50 flex items-center gap-5"
            >
              <div className="h-14 w-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-xl shadow-amber-200">
                <IconMapPinFilled size={28} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 font-poppins">  Strong Regional Presence</h4>
                <p className="text-sm text-slate-400 font-medium leading-tight">
                  Our installation and support teams operate across major cities and industrial regions of Rajasthan.
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              {...fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href={"/contact"}>
              <Button className="w-full sm:w-auto h-14 px-8 bg-[#1E88E5] hover:bg-blue-600 rounded-md font-bold gap-3 text-sm">
                <IconPhoneFilled size={18} />
                Contact Our Team
              </Button>
              </Link>
               <Link href={"/contact"}>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 border-slate-200 text-[#1E88E5] hover:bg-slate-50 rounded-md font-bold text-sm"
              >
                Request a Consultation
              </Button>
              </Link>
            </motion.div>

            {/* Hubs Grid */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900 font-poppins tracking-tight">Operational Presence</h3>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SERVICE LOCATIONS</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {hubs.map((hub, i) => (
                  <motion.div
                    key={i}
                    {...fadeInUp}
                    transition={{ delay: i * 0.05 }}
                    className="h-12 flex items-center justify-center border border-slate-100 rounded-xl text-[11px] font-black text-slate-500 bg-slate-50/30"
                  >
                    {hub}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-100">
              {stats.map((stat, i) => (
                <div key={i}>
                  <h4 className="text-xl md:text-4xl font-black text-[#1E88E5] font-poppins leading-none">{stat.value}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 leading-none">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}