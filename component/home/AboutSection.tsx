"use client"

import Image from "next/image"
import { motion, HTMLMotionProps } from "framer-motion" // HTMLMotionProps add kiya
import { Button } from "@/components/ui/button"
import { IconRosetteFilled } from "@tabler/icons-react"
import Link from "next/link"

export default function AboutSection() {
  
  // Strategy: Niche se upar (y), once: false, and Type safe
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="py-15 md:py-20 bg-white overflow-hidden font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Column */}
          <motion.div {...fadeInUp}> {/* Red alert fixed with spread props */}
            <span className="inline-block bg-[#1E88E526] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              About R-One Power
            </span>
            
            <h2 className="text-4xl md:text-4xl font-black text-slate-900 font-poppins leading-tight">
              Engineering Excellence <br className="md:block hidden" />
              <span className="text-[#1E88E5]">Meets Solar Innovation</span>
            </h2>

            <div className="mt-8 space-y-5 text-[#80807F] leading-relaxed max-w-xl">
              <p>
                R-One Power Energy Solutions is a leading MNRE-certified solar EPC
                company serving residential, commercial, and industrial clients across
                Rajasthan. We deliver turnkey solar installations from feasibility study to
                commissioning and ongoing maintenance.
              </p>
              <p>
                With 800+ successful installations and 50MW+ of deployed capacity, we bring
                engineering-grade reliability and customer-first service to every project. Our
                transparent pricing and subsidy assistance make solar accessible to everyone.
              </p>
            </div>

            <div className="mt-10 flex md:flex-row flex-col gap-4">
              <Link href="/about" className="w-full md:w-auto">    
              <Button className="bg-linear-to-r from-[#1E88E5] to-[#6EC6FF] hover:bg-[#45a7e4] w-full h-14 md:px-8 rounded-md text-white font-bold shadow-lg shadow-blue-200 transition-all">
                Learn More About Us
              </Button>
              </Link>
              <Link href="/contact">
              <Button variant="outline" className="border-[#1E88E5] text-[#1E88E5] hover:bg-blue-50 w-full h-14 px-15 rounded-md font-bold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image Column with Floating Cards */}
          <motion.div 
            {...fadeInUp} // Same strategy applied here
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Wrapper */}
            <div className="relative h-[300px] md:h-[400px] w-full md:w-[490px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/about-right.jpg" 
                alt="Solar Installation Excellence"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card 1: 800+ Happy Clients */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }} // Persistent animation
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-6 -right-4 md:right-12 bg-[#56B8F5] text-white p-3 rounded-3xl shadow-xl px-5 text-center border-4 border-white"
            >
              <h4 className="text-3xl md:text-4xl font-black">800+</h4>
              <p className="text-xs md:text-sm font-medium opacity-90">Happy Clients</p>
            </motion.div>

            {/* Floating Card 2: MNRE Certified */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} // Standardized to upward motion
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }} // Persistent animation
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100"
            >
              <div className="bg-[#56B8F5] p-3 rounded-xl text-white">
                <IconRosetteFilled size={32} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Certified by</p>
                <h5 className="text-lg font-black text-slate-900">MNRE India</h5>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}