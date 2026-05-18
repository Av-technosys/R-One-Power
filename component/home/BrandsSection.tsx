"use client"

import React from "react"
import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion"
import {
  IconCircleCheckFilled,
  IconRosetteFilled,
  IconTrophyFilled,
} from "@tabler/icons-react"

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

export default function BrandsSection() {

  // Duplicate for infinite loop
  const duplicatedLogos = [...brandLogos, ...brandLogos]

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="relative md:py-20 py-10 text-white font-inter overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/logo-bg.png"
          alt="Solar Background"
          fill
          className="object-cover"
          quality={100}
        />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 px-6 lg:px-10">
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-black font-poppins"
          >
            Premium <span className="text-[#FBC02D]">Tier-1 Brands</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-gray-300 font-medium max-w-xl mx-auto mt-4"
          >
            We partner with the world&apos;s most trusted solar equipment manufacturers
          </motion.p>

          <motion.h4
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-bold font-poppins text-[#FBC02D] pt-5"
          >
            Solar <span className="text-white">Panels</span>
          </motion.h4>
        </div>

        {/* Infinite Logo Slider */}
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden mb-20"
        >

          {/* Left Blur */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

          {/* Right Blur */}
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex w-max gap-5"
          >
            {duplicatedLogos.map((brand, idx) => (
              <div
                key={idx}
                className="w-[220px] h-[140px] shrink-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer USP */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 lg:px-10"
        >
          <div className="flex flex-col items-center gap-4">
            <IconCircleCheckFilled
              size={40}
              className="text-[#22C55E]"
            />

            <div>
              <h5 className="font-bold font-poppins text-lg">
                Tier-1 Certified
              </h5>

              <p className="text-sm text-white font-medium">
                Top-rated manufacturers globally
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <IconRosetteFilled
              size={40}
              className="text-[#FBC02D]"
            />

            <div>
              <h5 className="font-bold font-poppins text-lg">
                25+ Years Warranty
              </h5>

              <p className="text-sm text-white font-medium">
                Performance guarantees on panels
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <IconTrophyFilled
              size={40}
              className="text-[#EC4899]"
            />

            <div>
              <h5 className="font-bold font-poppins text-lg">
                Proven Track Record
              </h5>

              <p className="text-sm text-white font-medium">
                Billions of watts installed worldwide
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 1 }}
          className="text-center text-sm text-white font-medium mt-16 leading-relaxed px-6"
        >
          All equipment comes with manufacturer warranties and our quality guarantee
        </motion.p>

      </div>
    </section>
  )
}