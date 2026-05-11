"use client"

import React, { useState } from "react"
import { IconSend, IconXFilled } from "@tabler/icons-react"

const QuoteForm = ({ onClose }: { onClose: () => void }) => {
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
      alert(data.message)

      if (data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          requirement: "",
        })

        onClose()
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 w-full h-screen bg-black/60 flex items-center justify-center px-4 py-4 font-inter overflow-y-auto">
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-[28px] px-6 py-6 md:px-10 md:py-10">
        
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-[24px] md:text-2xl font-bold text-[#1D2433] font-poppins">
            Request a Quote
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <IconXFilled size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Your Name *
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Email Address *
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Phone Number *
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              City *
            </label>

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              type="text"
              placeholder="e.g., Jaipur"
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Your Requirement
            </label>

            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your solar requirements..."
              className="w-full border border-gray-300 rounded-lg px-5 py-4 outline-none resize-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[45px] rounded-lg bg-[#1E88E5] hover:bg-[#1976D2] transition-all duration-300 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-3 disabled:opacity-60"
          >
            <IconSend size={20} />
            {loading ? "Sending..." : "Request Quote"}
          </button>

          <p className="text-center text-gray-500 text-xs md:text-sm">
            We&apos;ll get back to you within 24 hours
          </p>

        </form>
      </div>
    </section>
  )
}

export default QuoteForm