"use client"

import React from 'react'
import Image from 'next/image'
import Solar from '../../public/Solar_Faq.jpg'
import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Faq() {
  return (
    <div className="p-6 md:p-20">
      
      {/*Headings*/}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-center"
        >
          Frequently Asked <span className="text-[#1E88E5]">Questions</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="font-inter text-lg text-center text-[#717A75]"
        >
          Everything you need to know about solar
        </motion.p>
      </div>

      <div>
        {/* FAQ Section */}
        <div className="max-w-8xl mx-auto lg:mx-6 px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="relative w-full h-[350px] lg:h-full rounded-lg overflow-hidden hidden lg:block"
            >
              <Image
                src={Solar}
                alt="Solar FAQ"
                fill
                className="object-cover"
              />

              {/* Bottom text overlay */}
              <div className="absolute bottom-10 left-10 bg-white-900/30 border border-white/20 backdrop-blur-sm text-white rounded-xl p-7 h-2/7 w-[calc(100%-5rem)]">
                <p className="font-semibold text-xl font-poppins">
                  Sustainable Future
                </p>

                <p className="text-lg font-inter text-white/80 pt-3">
                  Join over 10,000 households powered by SolarPulse.
                </p>
              </div>
            </motion.div>

            {/* Right - Accordion */}
            <div className="w-full">
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full gap-3">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                >
                  <AccordionItem value="item-1" className="border border-gray-100 p-5 rounded-2xl shadow-lg shadow-[#0052FF0A] px-6 rounded-lg">
                    <AccordionTrigger className="font-poppins text-lg md:text-xl">
                      How much does a 3kW/5kW solar system cost?
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                      Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                >
                  <AccordionItem value="item-2" className="border border-gray-100 p-5 rounded-2xl shadow-lg shadow-[#0052FF0A] px-6 rounded-lg text-xl">
                    <AccordionTrigger className="font-poppins text-lg md:text-xl">
                      What is the warranty on panels and inverters?
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                      Our solar panels come with a 25-year performance warranty and inverters carry a 10-year manufacturer warranty.
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                >
                  <AccordionItem value="item-3" className="border border-gray-100 p-5 rounded-2xl shadow-lg shadow-[#0052FF0A] px-6 rounded-lg text-xl">
                    <AccordionTrigger className="font-poppins text-lg md:text-xl">
                      Is net-metering available in my area?
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                      Net-metering is available in most states across India. Contact us with your location and we'll confirm eligibility.
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                >
                  <AccordionItem value="item-4" className="border border-gray-100 p-5 rounded-2xl shadow-lg shadow-[#0052FF0A] px-6 rounded-lg text-xl">
                    <AccordionTrigger className="font-poppins text-lg md:text-xl">
                      Will solar work during cloudy days or monsoon?
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                      Yes, solar panels still generate electricity on cloudy days, though at reduced efficiency. Modern panels are designed to work in diffused light conditions.
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5 }}
                >
                  <AccordionItem value="item-5" className="border border-gray-100 p-5 rounded-2xl shadow-lg shadow-[#0052FF0A] px-6 rounded-lg text-xl">
                    <AccordionTrigger className="font-poppins text-lg md:text-xl">
                      What maintenance is required?
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                      Solar panels require minimal maintenance — typically just periodic cleaning to remove dust and debris. We offer annual maintenance packages as well.
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>

              </Accordion>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq