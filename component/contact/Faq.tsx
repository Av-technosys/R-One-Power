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

const faqs = [
  {
    question: "What factors affect the cost of a solar system?",
    answer:
      "The cost of a solar system depends on factors such as system capacity, rooftop size, component quality, installation requirements, and whether battery backup or hybrid solutions are included.",
  },
  {
    question: "What warranty is provided with solar installations?",
    answer:
      "Solar panels typically include long-term performance warranties, while inverters and other components are covered under manufacturer warranties based on product specifications.",
  },
  {
    question: "Is net metering available for solar systems?",
    answer:
      "Net metering availability depends on local electricity distribution regulations and project eligibility. Our team assists customers with the required application and approval process.",
  },
  {
    question: "Does solar power work during cloudy weather?",
    answer:
      "Yes, solar panels continue generating electricity during cloudy or low-light conditions, although energy generation may be lower compared to clear sunny days.",
  },
  {
    question: "How much maintenance does a solar system require?",
    answer:
      "Solar systems generally require minimal maintenance. Periodic cleaning, routine inspections, and timely servicing help maintain optimal system efficiency and long-term performance.",
  },
]

function Faq() {
  return (
    <div className="p-6 md:p-1">
      
      {/*Headings*/}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-3xl md:text-4xl font-poppins font-bold mb-3 text-center"
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
          Answers to common questions about solar installation, performance,
          maintenance, and project support.
        </motion.p>
      </div>

      <div>
        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto pt-16 px-6 md:px-10">
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
                  Trusted Solar Solutions
                </p>

                <p className="text-md font-inter text-white/80 pt-3">
                  Delivering reliable solar energy systems for residential,
                  commercial, and industrial projects across Rajasthan.
                </p>
              </div>
            </motion.div>

            {/* Right - Accordion */}
            <div className="w-full">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full gap-3"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${index + 1}`}
                      className="border border-gray-100 p-3 rounded-2xl shadow-lg shadow-[#0052FF0A] px-4 rounded-lg text-xl"
                    >
                      <AccordionTrigger className="font-poppins text-lg md:text-xl">
                        {faq.question}
                      </AccordionTrigger>

                      <AccordionContent className="text-gray-500 text-base md:text-lg leading-relaxed pb-6 font-inter">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq