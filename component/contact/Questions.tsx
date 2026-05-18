import React from 'react'
import { IconBrandWhatsapp, IconPhoneFilled } from "@tabler/icons-react";

function Questions() {
  return (
    <div className="w-full px-4 py-10">
      <div className="max-w-7xl mx-auto bg-[#1E88E526] border border-blue-100 rounded-md p-8 text-center">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1E88E5] font-poppins">
          Still have questions?
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 mt-2 font-inter">
          Our solar experts are here to help you make the right decision
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-6">
          
          {/* WhatsApp Button */}
        <a
          href="https://wa.me/919660077814?text=Hello%20R-One%20Power,%20I%20want%20to%20know%20more%20about%20your%20solar%20solutions."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto flex items-center justify-center font-inter gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:bg-green-600 text-white font-medium px-20 py-4 rounded-sm transition"
        >
          <IconBrandWhatsapp size={20} />
          Chat on WhatsApp
        </a>

          {/* Call Button */}
          <a
            href="tel:+919660077814"
            className="w-full md:w-auto flex items-center justify-center font-inter gap-2 border border-blue-500 text-blue-600 bg-[white] hover:bg-blue-50 font-medium px-20 py-4 rounded-sm transition"
          >
            <IconPhoneFilled size={20} className="text-[gray]" />
            Call: +91 96600 77814
          </a>

        </div>
      </div>
    </div>
  )
}

export default Questions