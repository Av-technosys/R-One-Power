"use client"

import React from "react"
import Image, { StaticImageData } from "next/image"
import { IconSunFilled } from "@tabler/icons-react"
import { motion } from "framer-motion"

type HeroSectionProps = {
  image: StaticImageData
  badgeText: string
  heading: React.ReactNode
  subtitle?: string
  alt?: string

  overlay?: "blue" | "dark" | "none"
  badgeVariant?: "yellow" | "blue"
}

const HeroSection = ({
  image,
  badgeText,
  heading,
  subtitle,
  alt = "Hero Background",
  overlay = "blue",
  badgeVariant = "yellow",
}: HeroSectionProps) => {

const overlayClass =
  overlay === "dark"
    ? "bg-black/25"
    : overlay === "none"
    ? ""
    : "bg-gradient-to-b from-[#1E88E580]/75 to-[#114B7F80]/100"

  const badgeClass =
    badgeVariant === "blue"
      ? "bg-blue-500/10 border-[#1E88E5] text-[#1E88E5]"
      : "bg-yellow-500/10 border-[#FDEA00] text-[#FDEA00]"

  return (
    <div className="relative w-full py-28 flex flex-col justify-center p-8 overflow-hidden">

      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`}></div>

      {/* Content */}
      <div className="relative text-white  pt-10 flex flex-col gap-10 items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className={`${badgeClass} w-fit px-5 border-2 rounded-full font-bold p-3 flex items-center justify-center gap-2`}
        >
          <IconSunFilled
            size={20}
            stroke={1.5}
            className="text-[#FBBF24] font-inter"
          />

          {badgeText}
        </motion.div>

        {/* Heading */}
        <div className="relative text-white flex flex-col gap-4 items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl px-4"
          >
            <h1 className="text-5xl md:text-5xl font-poppins font-bold leading-tight text-center break-words">
              {heading}
            </h1>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-xl p-4 md:p-6 font-poppins max-w-3xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroSection