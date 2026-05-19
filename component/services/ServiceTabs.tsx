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
    title: "Residential Rooftop Solar Solutions",
    image: "/services/residential",
    description:
      "R-ONE Power delivers residential rooftop solar systems with complete EPC support, subsidy guidance, premium Tier-1 components and long-term energy savings for homeowners across Rajasthan.",

    features: [
      "Residential rooftop solar installation",
      "PM Surya Ghar subsidy assistance",
      "Net metering approval support",
      "Tier-1 solar panels & inverters",
      "Lower monthly electricity bills",
      "Complete installation & maintenance support",
    ],

    stats: [
      { label: "Savings", value: "Up to 90%" },
      { label: "Warranty", value: "25 Years" },
      { label: "Subsidy", value: "Available" },
    ],
  },

  {
    id: "commercial-industrial",
    tabLabel: "Commercial Solar",
    icon: <IconBuildingCommunity size={18} />,
    title: "Commercial & Industrial Solar Power Projects",
    image: "/services/comercial",
    description:
      "We provide high-performance commercial solar power solutions for offices, hotels, schools, hospitals and industrial facilities designed to reduce operational electricity costs and improve energy efficiency.",

    features: [
      "Commercial rooftop solar systems",
      "Industrial solar EPC solutions",
      "Customized project engineering",
      "High-efficiency Tier-1 equipment",
      "Fast project execution",
      "Long-term operational savings",
    ],

    stats: [
      { label: "Project Type", value: "Commercial" },
      { label: "Savings", value: "High ROI" },
      { label: "Execution", value: "Fast" },
    ],
  },

  {
    id: "pm-kusum",
    tabLabel: "Industrial Solar",
    icon: <IconBuildingCommunity size={18} />,
    title: "Industrial Solar & PM Kusum Projects",
    image: "/services/industry",
    description:
      "R-ONE Power executes large-scale industrial solar and PM Kusum projects with complete planning, installation, commissioning and long-term technical support for reliable clean energy generation.",

    features: [
      "PM Kusum solar project solutions",
      "Industrial solar power plants",
      "Ground-mounted solar systems",
      "Project planning & commissioning",
      "Government scheme support",
      "Reliable after-sales service",
    ],

    stats: [
      { label: "Capacity", value: "Large Scale" },
      { label: "Support", value: "End-to-End" },
      { label: "Energy", value: "Clean Power" },
    ],
  },

  {
    id: "hybrid-off-grid",
    tabLabel: "Battery Storage",
    icon: <IconBuildingCommunity size={18} />,
    title: "Hybrid Solar & Battery Storage Systems",
    image: "/services/battery",
    description:
      "We offer hybrid and battery storage solutions designed for uninterrupted power backup, energy independence and reliable solar performance in residential, commercial and remote applications.",

    features: [
      "Hybrid solar system solutions",
      "Advanced battery backup systems",
      "Off-grid solar applications",
      "24/7 power availability",
      "Custom energy storage design",
      "Reliable backup during outages",
    ],

    stats: [
      { label: "Backup", value: "24/7" },
      { label: "System", value: "Hybrid" },
      { label: "Application", value: "All Sectors" },
    ],
  },

  {
    id: "open-access-resco",
    tabLabel: "Solar AMC",
    icon: <IconBuildingCommunity size={18} />,
    title: "Solar AMC & Operation Maintenance Services",
    image: "/services/amc",
    description:
      "Our AMC and operation maintenance services ensure maximum solar plant efficiency, reduced downtime and long-term performance through preventive inspections and expert technical support.",

    features: [
      "Annual maintenance contracts",
      "Preventive system inspection",
      "Performance monitoring support",
      "Panel cleaning & servicing",
      "Fault diagnosis & repair",
      "Long-term operational efficiency",
    ],

    stats: [
      { label: "Service", value: "AMC" },
      { label: "Monitoring", value: "24/7" },
      { label: "Performance", value: "Optimized" },
    ],
  },

  {
    id: "om-consultancy",
    tabLabel: "Net Metering",
    icon: <IconBuildingCommunity size={18} />,
    title: "Net Metering & Solar Consultancy Services",
    image: "/services/matering",
    description:
      "We provide complete net metering assistance, solar consultancy and technical support services to simplify approvals, improve system performance and maximize long-term savings.",

    features: [
      "Net metering documentation support",
      "DISCOM approval assistance",
      "Solar project consultancy",
      "Technical feasibility analysis",
      "System performance optimization",
      "Long-term expert guidance",
    ],

    stats: [
      { label: "Approvals", value: "Fast" },
      { label: "Consultancy", value: "Expert" },
      { label: "Support", value: "Complete" },
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
                <div
  key={i}
  className="
    bg-[#E3F2FD]
    rounded-[16px] md:rounded-[24px]
    px-3 py-4 md:px-6 md:py-8
    text-center
    flex flex-col justify-center items-center
    min-h-[90px] md:min-h-[140px]
    w-full
  "
>
  <h4 className="text-base sm:text-lg md:text-2xl font-black text-[#1E88E5] font-poppins leading-tight break-words">
    {stat.value}
  </h4>

  <p
    className="
      text-[9px] sm:text-[10px] md:text-xs
      font-bold
      text-slate-500
      uppercase
      tracking-normal md:tracking-widest
      leading-tight
      mt-1
      break-words
    "
  >
    {stat.label}
  </p>
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