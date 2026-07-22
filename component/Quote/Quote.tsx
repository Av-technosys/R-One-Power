"use client"

import React, { useRef, useState } from "react"
import { IconSend, IconXFilled } from "@tabler/icons-react"

const QuoteForm = ({ onClose }: { onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    SingleLine: "",
    Email: "",
    PhoneNumber_countrycode: "",
    SingleLine1: "",
    MultiLine: "",
    Dropdown: "-Select-",
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (successMessage) setSuccessMessage("")
    if (errorMessage) setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.SingleLine.trim()) {
      setErrorMessage("Full name is required")
      return
    }
    if (!formData.Email.trim()) {
      setErrorMessage("Email is required")
      return
    }
    if (!formData.PhoneNumber_countrycode.trim()) {
      setErrorMessage("Phone number is required")
      return
    }
    if (!formData.SingleLine1.trim()) {
      setErrorMessage("City is required")
      return
    }

    setLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      if (formRef.current) {
        const zohoFormData = new FormData(formRef.current)
        await fetch(
          "https://forms.zohopublic.in/r1power/form/ContactUsFormWebsite/formperma/hN8fePZJITUcdFgNdcMBW9mn2xwXq12W4hcDqCTTwoI/htmlRecords/submit",
          {
            method: "POST",
            body: zohoFormData,
            mode: "no-cors",
            keepalive: true,
          },
        )
      }

      setFormData({
        SingleLine: "",
        Email: "",
        PhoneNumber_countrycode: "",
        SingleLine1: "",
        MultiLine: "",
        Dropdown: "-Select-",
      })
      setSuccessMessage("Quote request submitted successfully! We'll contact you soon.")
      setTimeout(() => {
        setSuccessMessage("")
        onClose()
      }, 2000)
    } catch (error) {
      console.error(error)
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 w-full h-screen bg-black/60 flex items-center justify-center px-4 py-4 font-inter">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white rounded-[15px] px-6 py-6 md:px-10 md:py-8">
        
        <div className="flex items-start justify-between mb-5">
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

        <form
          ref={formRef}
          name="form"
          id="form"
          accept-charset="UTF-8"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input type="hidden" name="zf_referrer_name" value="" />
          <input type="hidden" name="zf_redirect_url" value="" />
          <input type="hidden" name="zc_gad" value="" />
          <input type="hidden" name="utm_source" value="" />
          <input type="hidden" name="utm_medium" value="" />
          <input type="hidden" name="utm_campaign" value="" />
          <input type="hidden" name="utm_term" value="" />
          <input type="hidden" name="utm_content" value="" />

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Full Name *
            </label>

            <input
              name="SingleLine"
              value={formData.SingleLine}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              maxLength={255}
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Email *
            </label>

            <input
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              maxLength={255}
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Phone Number *
            </label>

            <input
              name="PhoneNumber_countrycode"
              value={formData.PhoneNumber_countrycode}
              onChange={handleChange}
              type="tel"
              placeholder="Enter your phone number"
              maxLength={20}
              id="international_PhoneNumber_countrycode"
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              City *
            </label>

            <input
              name="SingleLine1"
              value={formData.SingleLine1}
              onChange={handleChange}
              type="text"
              placeholder="e.g., Jaipur"
              maxLength={255}
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Your Requirement
            </label>

            <textarea
              name="MultiLine"
              value={formData.MultiLine}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your solar requirements..."
              maxLength={65535}
              className="w-full border border-gray-300 rounded-lg px-5 py-4 outline-none resize-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[15px] md:text-base text-[#1D2433] font-bold-md mb-2">
              Lead Source
            </label>

            <select
              name="Dropdown"
              value={formData.Dropdown}
              onChange={handleChange}
              className="w-full h-[45px] border border-gray-300 rounded-lg px-5 outline-none focus:border-[#1E88E5] text-[15px] md:text-base text-gray-700"
            >
              <option value="-Select-">-Select-</option>
              <option value="Website- Request Quote">Website- Request Quote</option>
            </select>
          </div>

          {errorMessage && (
            <p className="text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-medium">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-center text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 font-medium">
              {successMessage}
            </p>
          )}

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