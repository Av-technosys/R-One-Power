"use client"

import React, { useState } from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconCheck } from "@tabler/icons-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
}

export default function SiteVisitForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "site-visit",
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
        })
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-24 w-full overflow-hidden bg-gradient-to-r from-[#1E88E5] to-[#06B6D4] font-inter">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white font-poppins tracking-tight mb-4">
            Schedule a Free Site Visit
          </h2>
          <p className="text-white/80 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Find out more about how Vikram Solar can help with your planned solar installation.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {isSuccess ? (
            <div className="bg-white/10 backdrop-blur-md border border-green-500/50 rounded-xl p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <IconCheck size={32} className="text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Thank You!
              </h3>
              <p className="text-white/80">
                Your site visit request has been submitted successfully. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 md:p-10 space-y-6"
            >
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-0 rounded-lg h-12 px-4 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-0 rounded-lg h-12 px-4 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/90 text-gray-900 placeholder:text-gray-400 border-0 rounded-lg h-12 px-4 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-0 rounded-lg h-12 px-4 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-0 rounded-lg h-12 px-4 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-12 bg-white text-[#1E88E5] hover:bg-gray-100 rounded-lg font-bold text-base shadow-xl transition-all hover:shadow-2xl hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed font-inter"
                >
                  {isSubmitting ? "Submitting..." : "Submit Details"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
