"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import HeroSection from "@/component/hero section/hero"
import BusinessBg from "../../../public/business.png"
import { Button } from "@/components/ui/button"
import {
  IconBuildingFactory2,
  IconPlugConnected,
  IconChartBar,
  IconCircleCheckFilled,
  IconArrowRight,
  IconBriefcase,
  IconPhoneFilled,
  IconX,
  IconSunFilled,
  IconShieldCheck,
  IconClock,
  IconUsers,
} from "@tabler/icons-react"

// ── LocalStorage key ──────────────────────────────────────────────────────────
const LS_KEY = "r1power_business_verified"

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    id: "epc",
    icon: <IconBuildingFactory2 size={30} />,
    label: "EPC",
    title: "Engineering, Procurement & Construction",
    desc: "Complete turnkey EPC solutions for commercial and industrial solar power plants. We handle design, procurement of Tier-1 equipment, civil work, electrical installation, commissioning, and handover.",
    color: "from-[#1E88E5] to-[#1565C0]",
    features: [
      "Single-point responsibility",
      "Tier-1 solar panels & inverters",
      "Site survey & feasibility study",
      "Project execution in 30–60 days",
      "25-year performance warranty",
    ],
    image: "https://dg2suxnbcr839.cloudfront.net/services/industry",
  },
  {
    id: "ic",
    icon: <IconPlugConnected size={30} />,
    label: "I&C",
    title: "Installation & Commissioning",
    desc: "Professional installation and commissioning services for businesses that have already procured equipment. Our certified engineers ensure safe, compliant, and optimised system startup.",
    color: "from-[#F59E0B] to-[#D97706]",
    features: [
      "MNRE-certified installation team",
      "DISCOM grid connectivity support",
      "Safety & compliance checks",
      "System testing & performance validation",
      "Handover documentation",
    ],
    image: "https://dg2suxnbcr839.cloudfront.net/services/comercial",
  },
  {
    id: "netmeter",
    icon: <IconChartBar size={30} />,
    label: "Net Meter",
    title: "Net Metering & Grid Tie-Up",
    desc: "We manage the complete net metering process — from DISCOM application and documentation to approval and meter installation — so your business can start selling surplus solar power back to the grid.",
    color: "from-[#22C55E] to-[#15803D]",
    features: [
      "DISCOM documentation & filing",
      "Net meter procurement & installation",
      "Synchronisation & testing",
      "Export unit billing support",
      "Ongoing compliance assistance",
    ],
    image: "https://dg2suxnbcr839.cloudfront.net/services/matering",
  },
]

// ── Why Partner ────────────────────────────────────────────────────────────────
const whyUs = [
  {
    icon: <IconShieldCheck size={22} />,
    title: "MNRE Certified EPC",
    desc: "Government-certified contractor meeting the highest standards for solar installations.",
  },
  {
    icon: <IconClock size={22} />,
    title: "Fast Execution",
    desc: "Dedicated project teams ensure commercial projects are delivered in 30–60 days.",
  },
  {
    icon: <IconUsers size={22} />,
    title: "Dedicated B2B Team",
    desc: "A separate business team handles commercial and industrial clients exclusively.",
  },
  {
    icon: <IconSunFilled size={22} />,
    title: "50+ MW Installed",
    desc: "Track record of 800+ successful installations across Rajasthan and 18 states.",
  },
]

// ── Process Steps ─────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Register Interest", desc: "Fill the business enquiry form — our B2B team responds within 24 hours." },
  { num: "02", title: "Site Survey & Design", desc: "Free site survey and customised solar system design with ROI report." },
  { num: "03", title: "Proposal & Agreement", desc: "Detailed project proposal, commercial terms, and contract signing." },
  { num: "04", title: "Execution & Handover", desc: "Turnkey project execution, commissioning, and full documentation handover." },
]

// ── Business Enquiry Popup Form ───────────────────────────────────────────────
function BusinessPopup({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    address: "",
    mobile: "",
    service: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const digits = formData.mobile.replace(/\D/g, "")
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }
    if (!formData.service) {
      setError("Please select a service you are interested in.")
      return
    }

    setLoading(true)
    setError("")

    // ✅ Set localStorage IMMEDIATELY — popup won't show again regardless of email outcome
    localStorage.setItem(LS_KEY, "true")

    try {
      await fetch("/api/business", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      })
      // Always close popup — data is logged server-side even if email fails
      onClose()
    } catch {
      // Still close popup on network error — token already set
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
      >
        {/* Header bar */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#1565C0] p-6 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <IconBriefcase size={18} className="text-yellow-300" />
                <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">
                  B2B Enquiry
                </span>
              </div>
              <h2 className="text-white text-2xl font-black font-poppins">
                Register Your Business
              </h2>
              <p className="text-blue-100 text-sm mt-1 font-inter">
                Tell us about your requirement — our team will reach out within 24 hours.
              </p>
            </div>
            {/* No close button — form is mandatory on first visit */}
          </div>
        </div>

        {/* Form body */}
        <div className="p-6 md:p-8 space-y-4 font-inter">

          {/* Name + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">Full Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Rajesh Kumar"
                className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">Company Name *</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="ABC Industries Pvt. Ltd."
                className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
              />
            </div>
          </div>

          {/* Designation + Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">Designation *</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                placeholder="CEO / MD / Manager"
                className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700">Mobile Number *</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="98XXXXXXXX"
                type="tel"
                className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
              />
            </div>
          </div>

          {/* Office Address */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">Office Address *</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Building / Street, City, State"
              className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
            />
          </div>

          {/* Service Selector */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">Service Interested In *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full h-11 border border-slate-200 rounded-xl px-4 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700"
            >
              <option value="">Select a service</option>
              <option value="EPC">EPC — Engineering, Procurement & Construction</option>
              <option value="I&C">I&C — Installation & Commissioning</option>
              <option value="Net Meter">Net Meter — Grid Tie-Up & Net Metering</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Briefly describe your requirement, plant capacity, location, etc."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-700 resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-medium">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all disabled:opacity-60"
          >
            <IconArrowRight size={18} />
            {loading ? "Submitting..." : "Submit & Access Business Portal"}
          </button>

          <p className="text-center text-[11px] text-slate-400">
            Your information is kept confidential · We respond within 24 hours
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function BusinessPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [mounted, setMounted]     = useState(false)
  const router = useRouter()

  // Check localStorage on mount — show popup only on first visit
  useEffect(() => {
    setMounted(true)
    const verified = localStorage.getItem(LS_KEY)
    if (!verified) {
      setShowPopup(true)
    }
  }, [])

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial:    { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  // Prevent flash before mount
  if (!mounted) return null

  return (
    <div className={showPopup ? "overflow-hidden max-h-screen" : ""}>

      {/* ── Business Registration Popup ─────────────────────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <BusinessPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>

      {/* ── Content (blurred when popup is open) ────────────────────────── */}
      <div className={showPopup ? "filter blur-sm pointer-events-none select-none" : ""}>

        {/* Hero */}
        <HeroSection
          image={BusinessBg}
          badgeText="B2B Solar Solutions"
          heading={
            <>
              Solar Power for{" "}
              <span className="text-[#FDEA00]">Businesses</span> &{" "}
              <span className="text-[#1E88E5]">Industries</span>
            </>
          }
          subtitle="End-to-end EPC, Installation & Commissioning, and Net Metering services for commercial and industrial clients across India."
          overlay="blue"
          badgeVariant="yellow"
        />

        {/* ── Services ────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white font-inter">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="text-center mb-16">
              <motion.span {...fadeInUp}
                className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4"
              >
                Our B2B Services
              </motion.span>
              <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
              >
                What We Offer <span className="text-[#1E88E5]">Businesses</span>
              </motion.h2>
              <motion.p {...fadeInUp} transition={{ delay: 0.2 }}
                className="text-slate-500 font-medium max-w-2xl mx-auto mt-4"
              >
                From full turnkey EPC contracts to net metering tie-ups — we cover every step of your commercial solar journey.
              </motion.p>
            </div>

            <div className="space-y-20">
              {services.map((svc, idx) => (
                <motion.div
                  key={svc.id}
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* Image */}
                  <div className={`relative h-[300px] md:h-[380px] rounded-3xl overflow-hidden shadow-2xl ${idx % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Service badge overlay */}
                    <div className={`absolute top-5 left-5 bg-gradient-to-r ${svc.color} text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg`}>
                      {svc.icon}
                      <span className="font-black text-sm">{svc.label}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-6 ${idx % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div>
                      <span className={`inline-block bg-gradient-to-r ${svc.color} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3`}>
                        {svc.label}
                      </span>
                      <h3 className="text-3xl font-black text-slate-900 font-poppins leading-tight">
                        {svc.title}
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mt-3">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {svc.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <IconCircleCheckFilled size={18} className="text-[#1E88E5] shrink-0 mt-0.5" />
                          <span className="text-sm font-bold text-slate-700">{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => router.push("/contact")}
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${svc.color} text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105`}
                    >
                      Enquire for {svc.label} <IconArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Partner ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F9FAFB] font-inter">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="text-center mb-14">
              <motion.span {...fadeInUp}
                className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4"
              >
                Why R-One Power
              </motion.span>
              <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
              >
                Why Businesses <span className="text-[#1E88E5]">Trust Us</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1E88E5] mb-5">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-poppins mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-white font-inter">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            <div className="text-center mb-14">
              <motion.span {...fadeInUp}
                className="inline-block bg-[#E3F2FD] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4"
              >
                Our Process
              </motion.span>
              <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
              >
                How It <span className="text-[#1E88E5]">Works</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="relative bg-[#F9FAFB] border border-slate-100 p-7 rounded-2xl"
                >
                  <span className="text-5xl font-black text-[#1E88E5]/10 font-poppins leading-none block mb-3">
                    {step.num}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-poppins mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-[#1E88E5]">
                      <IconArrowRight size={20} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────────────────────── */}
        <section className="bg-[#1E88E5] py-14 font-inter">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { val: "50+ MW",  label: "Installed Capacity" },
                { val: "800+",    label: "Projects Completed" },
                { val: "18+",     label: "States Covered" },
                { val: "25 Yrs",  label: "Performance Warranty" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-black font-poppins">{stat.val}</p>
                  <p className="text-blue-100 text-sm font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F9FAFB] font-inter">
          <div className="max-w-3xl mx-auto text-center px-6">
            <motion.h2 {...fadeInUp}
              className="text-4xl font-black text-slate-900 font-poppins mb-4"
            >
              Ready to Switch Your Business to <span className="text-[#1E88E5]">Solar?</span>
            </motion.h2>
            <motion.p {...fadeInUp} transition={{ delay: 0.1 }}
              className="text-slate-500 font-medium mb-8"
            >
              Get a free site survey, feasibility study, and detailed ROI report for your facility.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => router.push("/contact")}
                className="h-14 px-10 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-bold rounded-xl shadow-lg shadow-blue-100 text-sm"
              >
                Contact Our B2B Team
              </Button>
              <a href="tel:+919660077814">
                <Button
                  variant="outline"
                  className="h-14 px-10 border-slate-200 text-slate-700 font-bold rounded-xl text-sm gap-2"
                >
                  <IconPhoneFilled size={16} />
                  +91 96600 77814
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

      </div>{/* end blurred wrapper */}
    </div>
  )
}