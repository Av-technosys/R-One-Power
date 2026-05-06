"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { 
  IconSettings, 
  IconSearch, 
  IconLayoutDashboard, 
  IconTools, 
  IconClipboardCheck,
  IconCircleCheck,
  IconCertificate,
  IconShieldCheck,
  IconHeadset,
  IconSunFilled
} from "@tabler/icons-react"

const steps = [
  {
    id: "01",
    title: "Free Site Survey",
    desc: "Our experts visit your site, assess roof structure, and calculate solar potential.",
    img: "/step-1.png", // Replace with your image
    color: "#1E88E5",
    icon: <IconSearch size={20} />,
  },
  {
    id: "02",
    title: "Custom Design",
    desc: "We design a system tailored to your energy needs and budget with maximum efficiency.",
    img: "/step-2.png",
    color: "#FBC02D",
    icon: <IconLayoutDashboard size={20} />,
  },
  {
    id: "03",
    title: "Installation",
    desc: "Professional installation by certified engineers with  monitoring in 7-10 days.",
    img: "/step-3.png",
    color: "#1E88E5",
    icon: <IconTools size={20} />,
  },
  {
    id: "04",
    title: "Commissioning",
    desc: "System testing, net metering setup, and handover with full documentation.",
    img: "/step-4.png",
    color: "#FBC02D",
    icon: <IconClipboardCheck size={20} />,
  },
]

const bottomStats = [
  { label: "100% Satisfaction", sub: "We ensure complete customer satisfaction.", icon: <IconCircleCheck className="text-white" /> },
  { label: "Certified Experts", sub: "Trained & certified installation team.", icon: <IconCertificate className="text-white" /> },
  { label: "Quality Assured", sub: "Premium products with long-term warranty.", icon: <IconShieldCheck className="text-white" /> },
  { label: "After-Sales Support", sub: "Dedicated support even after installation.", icon: <IconHeadset className="text-white" /> },
]

export default function ProcessSection() {
  
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <section className="relative pt-15 bg-slate-50 overflow-hidden">
      {/* Background Solar Pattern Overlay */}
      <div className="absolute inset-0 ">
        <img src="/process-bg.png" alt="pattern" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div {...fadeInUp} className="flex justify-center mb-4">
            <span className="flex items-center gap-2 bg-blue-50 text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
              <IconSettings size={14} className="animate-spin-slow" />
              How it works
            </span>
          </motion.div>
          
          <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Simple 4-Step <span className="text-[#1E88E5]">Pro</span><span className="text-yellow-500">cess</span>
          </motion.h2>
          
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-[#4B5563] max-w-xl mx-auto font-medium">
            From your first call to going solar — we make it effortless.
          </motion.p>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="mt-8 flex justify-center items-center gap-4">
             <div className="h-[1px] w-12 bg-[#1E88E5]" />
             <div className="text-yellow-500"><IconSunFilled /></div>
             <div className="h-[1px] w-12 bg-[#1E88E5]" />
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.15 }}
              className="relative group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image & Number Badge */}
              <div className="relative h-48 overflow-hidden">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                {/* ID Badge */}
                <div 
                  className="absolute top-0 left-0 p-4 pt-3 pl-5 text-white font-black  text-xl z-10"
                  style={{ backgroundColor: step.color, clipPath: 'polygon(0 0, 100% 0, 85% 80%, 0 100%)' }}
                >
                  {step.id}
                </div>

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-[#1E88E5] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
                <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: step.color }} />
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Bottom accent bar */}
               <div className="w-40 rounded-t-2xl h-2 mx-auto" style={{ backgroundColor: step.color }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Banner */}
        <motion.div 
          {...fadeInUp}
          className="bg-white rounded-t-md shadow-xl border border-slate-100 lg:divide-x lg:divide-[#E5E7EB] pr-2  p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {bottomStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 group ">
              <div className="h-12 w-12 rounded-full bg-[#1E88E5] flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-100">
                {stat.icon}
              </div>
              
              <div>
                <h4 className="text-[#1E88E5] font-bold text-sm leading-tight">{stat.label}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1">{stat.sub}</p>
              </div>
              
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}