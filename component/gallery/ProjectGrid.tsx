"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const projectsData = [
  { id: 1, type: "featured", image: "/gallery-1.png", badge: "Home", title: "Residential Rooftop" },
  { id: 2, type: "small", image: "/gallery-2.png", badge: "Team", title: "Installation in Progress" },
  { id: 3, type: "small", image: "/gallery-3.png", badge: "Tech", title: "Tier-1 Solar Panels" },
  { id: 4, type: "wide", image: "/gallery-4.png", badge: "Industrial", title: "Industrial Rooftop Plant" },
  { id: 5, type: "small", image: "/gallery-5.png", badge: "Service", title: "O&M & Cleaning Services" },
  { id: 6, type: "small", image: "/gallery-6.png", badge: "Utility", title: "Solar Farm, Rajasthan" }
]

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

export default function ProjectGrid() {
  return (
    <section className="py-20 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-10">
        
        {/* Main Grid: 4 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {projectsData.map((project) => {
            // Logic to decide spans based on type to match your screenshot
            const isFeatured = project.type === "featured";
            const isWide = project.type === "wide";

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={`relative rounded-[24px] overflow-hidden group shadow-sm
                  ${isFeatured ? "lg:col-span-2 lg:row-span-2" : ""} 
                  ${isWide ? "lg:col-span-2 lg:row-span-1" : ""}
                  ${!isFeatured && !isWide ? "lg:col-span-1 lg:row-span-1" : ""}
                `}
              >
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <Badge className="self-start px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold text-[10px] rounded-full uppercase tracking-widest mb-2 border-none">
                    {project.badge}
                  </Badge>
                  <h3 className={`font-black text-white font-poppins leading-tight tracking-tight
                    ${isFeatured ? "text-2xl md:text-3xl" : "text-lg"}
                  `}>
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}