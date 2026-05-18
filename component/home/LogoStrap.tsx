"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const brandLogos = [
  { name: "Indian Oil", img: "/logo-1" },
  { name: "Railway", img: "/logo-2" },
  { name: "Refex", img: "/logo-3" },
  { name: "HP", img: "/logo-4" },
  { name: "Ecotec", img: "/logo-5" },
  { name: "Solar91", img: "/logo-6" },
  { name: "7 Greens", img: "/logo-7" },
  { name: "Genus", img: "/logo-8" },
  { name: "Penta", img: "/logo-9" },
  { name: "Green", img: "/logo-10" },
]

// Infinite loop ke liye duplicate
const duplicatedLogos = [...brandLogos, ...brandLogos]

export default function LogoStrap() {
  return (
    <section className="py-14 md:py-16 bg-white overflow-hidden border-y border-[#E5E7EB]">

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <h2 className="text-center text-xs md:text-sm font-poppins font-bold tracking-[0.25em] text-[#80807F] uppercase">
          Trusted by Leading Brands & Organizations
        </h2>
      </div>

      {/* Logo Loop */}
      <div className="relative flex overflow-hidden">

        {/* Left Blur */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />

        {/* Right Blur */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Animated Track */}
        <motion.div
          className="flex whitespace-nowrap gap-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {duplicatedLogos.map((brand, index) => (
            <div
              key={index}
              className="w-[180px] md:w-[220px] h-[110px] md:h-[130px] shrink-0 bg-white rounded-2xl border border-[#E5E7EB] flex items-center justify-center px-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={brand.img}
                  alt={brand.name}
                  fill
                 className="object-contain opacity-80"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}