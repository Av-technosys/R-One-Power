"use client"

import { useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconSend, IconPhone, IconExternalLink } from "@tabler/icons-react"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    requirement: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()


      if (data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          requirement: "",
        })
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  return (
    <section className="py-24 bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Header */}
        <div className="text-center mb-16">
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-poppins"
          >
            Let&apos;s Start Your <span className="text-[#1E88E5]">Solar Journey</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-slate-400 font-medium text-sm md:text-base"
          >
            Get in touch for a free consultation and site assessment
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Request Callback Form */}
          <motion.div
            {...fadeInUp}
            className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-2xl shadow-slate-200/50"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-8 font-poppins">
              Request Callback
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 ml-1">
                  Your Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-12 bg-slate-50 border-gray-100 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 ml-1">
                  Email Address *
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-slate-50 border-gray-100 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 ml-1">
                  Phone Number *
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="h-12 bg-slate-50 border-gray-100 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 ml-1">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Jaipur"
                  className="h-12 bg-slate-50 border-gray-100 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 ml-1">
                  Your Requirement
                </label>
                <Textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Tell us about your solar requirements..."
                  className="min-h-[120px] bg-slate-50 border-gray-100 rounded-xl focus-visible:ring-[#1E88E5] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-bold rounded-xl text-md flex items-center gap-2 shadow-lg shadow-blue-100 mt-4 transition-all disabled:opacity-60"
              >
                <IconSend size={18} />
                {loading ? "Sending..." : "Request Callback"}
              </Button>

              <p className="text-center text-[11px] text-slate-400 font-medium">
                We&apos;ll get back to you within 24 hours
              </p>
            </form>
          </motion.div>

          {/* Right: Map & Quick Call */}
          <div className="space-y-8">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <span className="text-[#FB8C00] font-bold text-xs uppercase tracking-widest mb-2 block">
                Find Us
              </span>

              <h3 className="text-3xl font-black text-slate-900 mb-6 font-poppins">
                Our Location
              </h3>

              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-xl h-[450px] group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.3323719001!2d75.7118335165977!3d26.848529245585094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db61232b44917%3A0xf670737f19385966!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714986700000!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-gray-100">
                  <span className="text-[12px] font-bold text-slate-800">
                    Open in Maps
                  </span>
                  <IconExternalLink size={14} className="text-[#1E88E5]" />
                </div>
              </div>
            </motion.div>

            {/* Quick Call Card */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100"
            >
              <h4 className="text-lg font-black text-slate-900 mb-2 font-poppins">
                Quick Call
              </h4>

              <p className="text-sm text-slate-500 mb-6 font-medium">
                Prefer to talk? Call us directly for immediate assistance.
              </p>

              <Button className="bg-[#1E88E5] hover:bg-[#1565C0] h-14 px-8 rounded-xl text-white font-bold flex items-center gap-3 shadow-md transition-all">
                <IconPhone size={20} /> +91 141 234 5678
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}