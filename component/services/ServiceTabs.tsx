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
    id: "pm-surya-ghar",
    tabLabel: "Residential Solar",
    icon: <IconHome size={18} />,
    title: "PM Surya Ghar Residential Solar Power Plant",
    image: "/service-bg.jpg",
    description:
      "R-One Power provides residential rooftop solar power plant solutions under PM Surya Ghar Yojna with complete support for installation, subsidy assistance and long-term savings.",
    features: [
      "Residential rooftop solar power plant",
      "PM Surya Ghar Yojna support",
      "Government subsidy assistance",
      "Net metering support",
      "Long-term electricity bill savings",
      "Reliable service and maintenance",
    ],
    stats: [
      { label: "Bill Reduction", value: "Up to 90%" },
      { label: "System Life", value: "25+ Years" },
      { label: "Maintenance", value: "Low" },
    ],
  },
  {
    id: "commercial-industrial",
    tabLabel: "Commercial Solar",
    icon: <IconBuildingCommunity size={18} />,
    title: "Industrial and Commercial Solar Power Projects",
    image: "/commercial-solar.jpg",
    description:
      "We deliver industrial and commercial solar power projects designed to reduce electricity costs, improve energy efficiency and provide long-term value for businesses.",
    features: [
      "Industrial solar power projects",
      "Commercial rooftop solar systems",
      "High-performance solar solutions",
      "Tier-1 quality products",
      "Project financing support",
      "Timely project execution",
    ],
    stats: [
      { label: "Segments", value: "Industrial" },
      { label: "Savings", value: "High" },
      { label: "Products", value: "Tier-1" },
    ],
  },
  {
    id: "pm-kusum",
    tabLabel: "PM Kusum",
    icon: <IconBuildingCommunity size={18} />,
    title: "PM Kusum Yojna Based Solar Power Plant",
    image: "/commercial-solar.jpg",
    description:
      "R-One Power executes PM Kusum Yojna based solar power plant projects with complete planning, installation and project support for agricultural and renewable energy applications.",
    features: [
      "PM Kusum solar power plants",
      "Government scheme based projects",
      "Solar project planning",
      "Installation and commissioning",
      "Quality workmanship",
      "Long-term project support",
    ],
    stats: [
      { label: "Project Type", value: "PM Kusum" },
      { label: "Support", value: "End-to-End" },
      { label: "Energy", value: "Clean" },
    ],
  },
  {
    id: "hybrid-off-grid",
    tabLabel: "Hybrid & Off Grid",
    icon: <IconBuildingCommunity size={18} />,
    title: "Hybrid and Off Grid Solar Projects",
    image: "/commercial-solar.jpg",
    description:
      "We provide hybrid and off-grid solar project solutions for reliable clean energy where grid power is limited, unstable or unavailable.",
    features: [
      "Hybrid solar projects",
      "Off-grid solar solutions",
      "Battery backup support",
      "Reliable power supply",
      "Remote area applications",
      "Customized solar system design",
    ],
    stats: [
      { label: "Power Type", value: "Hybrid" },
      { label: "Backup", value: "Available" },
      { label: "Use Case", value: "Remote Areas" },
    ],
  },
  {
    id: "open-access-resco",
    tabLabel: "Open Access",
    icon: <IconBuildingCommunity size={18} />,
    title: "Open Access and IPP Based RESCO Projects",
    image: "/commercial-solar.jpg",
    description:
      "R-One Power provides open access and IPP based RESCO solar project solutions for industrial users looking for clean energy with flexible investment models.",
    features: [
      "Open access solar projects",
      "IPP based RESCO projects",
      "Industrial user solutions",
      "Clean energy procurement",
      "Flexible solar investment model",
      "Large-scale solar project support",
    ],
    stats: [
      { label: "Model", value: "RESCO" },
      { label: "Users", value: "Industrial" },
      { label: "Scale", value: "Large" },
    ],
  },
  {
    id: "om-consultancy",
    tabLabel: "O&M / Consultancy",
    icon: <IconBuildingCommunity size={18} />,
    title: "Design, Consultancy, Operation and Maintenance",
    image: "/commercial-solar.jpg",
    description:
      "We offer solar project design, consultancy and operation & maintenance services to ensure reliable performance, better efficiency and long-term system life.",
    features: [
      "Solar project design",
      "Solar consultancy services",
      "Operation and maintenance work",
      "Performance monitoring",
      "Preventive maintenance",
      "Long-term reliability support",
    ],
    stats: [
      { label: "Service", value: "O&M" },
      { label: "Support", value: "Long-Term" },
      { label: "Focus", value: "Performance" },
    ],
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