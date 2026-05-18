"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { IconStarFilled } from "@tabler/icons-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const reviews = [
  {
    name: "Amit Sharma",
    role: "Residential Customer, Jaipur",
    text: '"The entire installation process was smooth and professionally managed. The R-One Power team guided us at every stage and helped us significantly reduce our monthly electricity expenses."',
    size: "5 kW",
    savings: "Lower Energy Bills",
  },
  {
    name: "Neha Industries",
    role: "Manufacturing Unit, Ajmer",
    text: '"R-One Power delivered our industrial solar project with excellent execution quality and timely completion. Their technical expertise and support throughout the project were highly impressive."',
    size: "100 kW",
    savings: "Improved Energy Efficiency",
  },
  {
    name: "Vikas Mehta",
    role: "Commercial Property Owner, Udaipur",
    text: '"From system design to final commissioning, the team handled everything efficiently. The solar installation has helped us optimize operational costs and improve sustainability."',
    size: "25 kW",
    savings: "Long-Term Savings",
  },
  {
    name: "Shree Balaji Hospital",
    role: "Healthcare Facility, Jodhpur",
    text: '"We were looking for a reliable solar EPC partner and R-One Power exceeded expectations with their professionalism, quality workmanship, and responsive support team."',
    size: "50 kW",
    savings: "Reliable Solar Power",
  },
]

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Carousel state management
  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="md:py-15 py-8 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span {...fadeInUp} className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-6 py-1.5 rounded-full text-xs font-bold mb-4 border border-blue-100 uppercase">
            {/* Badge */}
Customer Experiences
          </motion.span>
          <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-poppins">
            What Our <span className="text-[#1E88E5]">Clients Say</span>
          </motion.h2>
        </div>

        {/* Carousel Content */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((item, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[380px] h-full">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <IconStarFilled key={i} size={18} className="text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-500 italic leading-relaxed text-[15px] font-medium">
                        {item.text}
                      </p>
                    </div>

                    <div className="mt-5 pt-6 border-t border-gray-100 flex justify-between items-end">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{item.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-300 uppercase font-bold tracking-tighter mb-1">Size</p>
                        <p className="text-[#16A34A] font-black text-lg leading-none">{item.size}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{item.savings}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Clickable Dots Logic */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                current === i 
                ? "w-8 h-2.5 bg-[#1E88E5]" 
                : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}