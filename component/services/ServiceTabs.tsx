"use client"
import QuoteForm from "@/component/Quote/Quote"
import React, { useState } from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  IconHome, 
  IconBuildingCommunity, 
  IconCircleCheckFilled,
  IconArrowRight
} from "@tabler/icons-react"

const servicesData = [
  {
    id: "residential",
    tabLabel: "Residential Solar",
    icon: <IconHome size={18} />,
    title: "Residential Solar",
    image: "/service-bg.jpg", 
    description: "Transform your home into a power-generating asset with our custom residential solar solutions. We design systems that match your energy consumption, roof space, and budget.",
    features: [
      "Custom rooftop solar design",
      "3kW to 10kW system options",
      "Government subsidy assistance",
      "Net metering setup",
      "25-year panel warranty",
      "Mobile app monitoring"
    ],
    stats: [
      { label: "Homes Powered", value: "600+" },
      { label: "Bill Reduction", value: "80%" },
      { label: "Payback Period", value: "4-5 yrs" }
    ]
  },
  {
    id: "commercial",
    tabLabel: "Commercial Solar",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial Solar",
    image: "/commercial-solar.jpg",
    description: "Reduce operational costs and improve your bottom line with solar power for your business. We handle everything from large-scale installations to complex grid integrations.",
    features: [
      "MW scale capability",
      "Tax depreciation benefits",
      "Zero-investment PPA models",
      "High-efficiency panels",
      "Real-time performance tracking",
      "Dedicated account manager"
    ],
    stats: [
      { label: "Projects Done", value: "150+" },
      { label: "Avg. ROI", value: "3.5 yrs" },
      { label: "CO2 Reduced", value: "10k Tons" }
    ]
  },
  {
    id: "Industrial",
    tabLabel: "Industrial Solar",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial Solar",
    image: "/commercial-solar.jpg",
    description: "Reduce operational costs and improve your bottom line with solar power for your business. We handle everything from large-scale installations to complex grid integrations.",
    features: [
      "MW scale capability",
      "Tax depreciation benefits",
      "Zero-investment PPA models",
      "High-efficiency panels",
      "Real-time performance tracking",
      "Dedicated account manager"
    ],
    stats: [
      { label: "Projects Done", value: "150+" },
      { label: "Avg. ROI", value: "3.5 yrs" },
      { label: "CO2 Reduced", value: "10k Tons" }
    ]
  },
  {
    id: "Battery",
    tabLabel: "Battery Storage",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial Solar",
    image: "/commercial-solar.jpg",
    description: "Reduce operational costs and improve your bottom line with solar power for your business. We handle everything from large-scale installations to complex grid integrations.",
    features: [
      "MW scale capability",
      "Tax depreciation benefits",
      "Zero-investment PPA models",
      "High-efficiency panels",
      "Real-time performance tracking",
      "Dedicated account manager"
    ],
    stats: [
      { label: "Projects Done", value: "150+" },
      { label: "Avg. ROI", value: "3.5 yrs" },
      { label: "CO2 Reduced", value: "10k Tons" }
    ]
  },
  {
    id: "Solar",
    tabLabel: "Solar AMC",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial Solar",
    image: "/commercial-solar.jpg",
    description: "Reduce operational costs and improve your bottom line with solar power for your business. We handle everything from large-scale installations to complex grid integrations.",
    features: [
      "MW scale capability",
      "Tax depreciation benefits",
      "Zero-investment PPA models",
      "High-efficiency panels",
      "Real-time performance tracking",
      "Dedicated account manager"
    ],
    stats: [
      { label: "Projects Done", value: "150+" },
      { label: "Avg. ROI", value: "3.5 yrs" },
      { label: "CO2 Reduced", value: "10k Tons" }
    ]
  },
  {
    id: "Net",
    tabLabel: "Net Metering",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial Solar",
    image: "/commercial-solar.jpg",
    description: "Reduce operational costs and improve your bottom line with solar power for your business. We handle everything from large-scale installations to complex grid integrations.",
    features: [
      "MW scale capability",
      "Tax depreciation benefits",
      "Zero-investment PPA models",
      "High-efficiency panels",
      "Real-time performance tracking",
      "Dedicated account manager"
    ],
    stats: [
      { label: "Projects Done", value: "150+" },
      { label: "Avg. ROI", value: "3.5 yrs" },
      { label: "CO2 Reduced", value: "10k Tons" }
    ]
  },
]

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(servicesData[0])
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  }

  return (
    <section className="pt-12 md:pt-20 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap md:justify-center gap-3 mb-10 pb-2">
          {servicesData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item)}
              className={`flex items-center shrink-0 gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all duration-300 whitespace-nowrap ${
                activeTab.id === item.id 
                ? "bg-[#1E88E5] text-white shadow-lg shadow-blue-200" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {item.icon}
              {item.tabLabel}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab.id}
            {...fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start"
          >
            
            <div className="space-y-8 md:space-y-10">
              <div className="relative h-[250px] md:h-[350px] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl">
                <img 
                  src={activeTab.image} 
                  alt={activeTab.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-2xl font-black text-slate-900 font-poppins tracking-tight leading-tight">
                  {activeTab.title}
                </h2>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-2xl">
                  {activeTab.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {activeTab.stats.map((stat, i) => (
                  <div key={i} className="bg-[#E3F2FD] p-3 md:p-6 rounded-[16px] md:rounded-[24px] text-center space-y-1">
                    <h4 className="text-lg md:text-2xl font-black text-[#1E88E5] font-poppins">{stat.value}</h4>
                    <p className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-tighter md:tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-2 space-y-10">
              
              <div className="space-y-6">
                <h5 className="font-black text-slate-900 font-poppins uppercase tracking-[0.15em] text-sm">Key Features</h5>
                <div className="space-y-4">
                  {activeTab.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <IconCircleCheckFilled className="text-amber-400  shrink-0" size={18} />
                      <span className="text-sm font-bold text-slate-700 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-6 pb-10 md:pb-0">
                <div>
                  <h4 className="text-xl font-black text-slate-900 font-poppins">Need a custom solution?</h4>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mt-2 max-w-sm">
                    Every project is unique. Contact us for a free consultation and custom solar system design.
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full md:w-auto h-12 px-8 bg-[#1E88E5] hover:bg-blue-600 text-white rounded-md font-bold text-xs gap-3 transition-all"
                >
                  Request Quote <IconArrowRight size={16} />
                </Button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {showQuoteForm && (
        <QuoteForm onClose={() => setShowQuoteForm(false)} />
      )}
    </section>
  )
}