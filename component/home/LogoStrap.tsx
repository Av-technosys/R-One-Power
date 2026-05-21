"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const brandLogos = [
  { name: "Indian Oil", img: "https://dg2suxnbcr839.cloudfront.net/logo-1.png" },
  { name: "Railway", img: "https://dg2suxnbcr839.cloudfront.net/logo-2.png"},
  { name: "Refex", img: "https://dg2suxnbcr839.cloudfront.net/logo-3.png" },
  { name: "HP", img: "https://dg2suxnbcr839.cloudfront.net/logo-4.png" },
  { name: "Ecotec", img: "https://dg2suxnbcr839.cloudfront.net/logo-5.png" },
  { name: "Solar91", img: "https://dg2suxnbcr839.cloudfront.net/logo-6.png" },
  { name: "7 Greens", img: "https://dg2suxnbcr839.cloudfront.net/logo-7.png" },
  { name: "Genus", img: "https://dg2suxnbcr839.cloudfront.net/logo-8.png" },
  { name: "Penta", img: "https://dg2suxnbcr839.cloudfront.net/logo-9.png" },
  { name: "Green", img: "https://dg2suxnbcr839.cloudfront.net/logo-10.png" },
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
                 sizes="120px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}