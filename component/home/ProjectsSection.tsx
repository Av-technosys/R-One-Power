"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { IconMapPin, IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projects = [
  { title: "Jaipur", img: "/solar-1.png" },
  { title: "Ajmer", img: "/solar-2.png" },
  { title: "Udaipur", img: "/solar-3.png" },
  { title: "Jaipur", img: "/solar-1.png" },
  { title: "Bikaner", img: "/solar-2.png" },
]

export default function ProjectsSection() {
  // Animation Variant: Niche se upar movement
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="bg-[#18202F] md:py-15 py-8 text-white overflow-hidden font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Stats & Heading */}
          <motion.div 
            
            className="lg:col-span-4 md:space-y-7"
          >
            <div className="font-poppins" >
              <h2 className="text-3xl font-bold">Real Project.</h2>
              <h2 className="text-4xl font-bold text-[#1E88E5]">Real Impact.</h2>
            </div>

            <div className="flex flex-wrap gap-5 pt-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">25MW+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider leading-tight">Total Installed <br/> Capacity</p>
              </div>
              <div className="w-px h-16 bg-gray-700 hidden sm:block" />
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">75+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider leading-tight">Cities in <br/> Rajasthan</p>
              </div>
              <div className="w-px h-16 bg-gray-700 hidden sm:block" />
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">5000+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider leading-tight">Happy <br/> Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Carousel */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 relative group"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-transparent border-0 overflow-hidden group/item">
                      <CardContent className="p-0 relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img 
                          src={project.img} 
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover/item:scale-110"
                        />
                        {/* Overlay and Location */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <IconMapPin size={16} className="text-gray-300" />
                            <span className="text-white">{project.title}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom Styled Navigation Buttons matching image */}
              <div className="flex gap-2 absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-[calc(100%+45px)] justify-between pointer-events-none">
                <CarouselPrevious className="pointer-events-auto h-12 w-12 rounded-lg bg-[#1E88E5] hover:bg-blue-600 border-0 text-white static translate-y-0" />
                <CarouselNext className="pointer-events-auto h-12 w-12 rounded-lg bg-[#1E88E5] hover:bg-blue-600 border-0 text-white static translate-y-0" />
              </div>
            </Carousel>
          </motion.div>

        </div>
      </div>
    </section>
  )
}