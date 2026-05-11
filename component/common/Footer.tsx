"use client"

import React from "react"
import Link from "next/link"
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconClock,
  IconBrandFacebook,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconChevronRight,
  IconCircleCheckFilled
} from "@tabler/icons-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

const services = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Solar Maintenance",
  "Battery Storage",
  "Net Metering",
]

const certifications = [
  "MNRE Certified",
  "25-Year Warranty",
  "800+ Installations",
  "Tier-1 Brands Only",
  "ISO 9001:2015"
]

const socialLinks = [
  { icon: IconBrandFacebook, href: "https://www.facebook.com/ronepowerindia/" },

  { icon: IconBrandX, href: "#" },

  { icon: IconBrandInstagram, href: "https://www.instagram.com/ronepowerindia/" },

  { icon: IconBrandLinkedin, href: "https://in.linkedin.com/company/r-one-power" },

  { icon: IconBrandYoutube, href: "https://www.youtube.com/channel/UCqEsmZmBqd_NCX5NqF8CGXg" },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] text-gray-400 font-inter pt-10">
      <div className="max-w-7xl mx-auto px-10 pb-4">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <img 
              src="/footer-logo.png" // Replace with your R-ONE Power logo
              alt="R-ONE Power" 
              className="h-15 w-auto " 
            />
            <p className="text-sm text-[#9CA3AF] leading-relaxed font-medium max-w-xs">
              Powering homes and businesses with clean, affordable solar energy. 
              MNRE-certified EPC partner with 25-year performance guarantee.
            </p>
         <div className="flex items-center gap-3">
  {socialLinks.map((social, idx) => (
    <Link
      key={idx}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#1E88E5] hover:text-white transition-all"
    >
      <social.icon size={18} />
    </Link>
  ))}
</div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold font-poppins text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#1E88E5] transition-colors group">
                    <IconChevronRight size={14} className="text-[#1E88E5] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-white font-bold font-poppins text-lg">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm hover:text-[#1E88E5] cursor-pointer transition-colors group">
                  <IconChevronRight size={14} className="text-[#1E88E5] group-hover:translate-x-1 transition-transform" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold font-poppins text-lg">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
                  <IconMapPin size={20} />
                </div>
                <p className="text-sm leading-snug">57, Arihant Nagar, Kalwar Road,<br/>Jaipur, Rajasthan – 302012</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
                  <IconPhone size={20} />
                </div>
                <p className="text-sm font-bold ">+91 95213 73117</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
                  <IconMail size={20} />
                </div>
                <p className="text-sm hover:text-[#1E88E5] cursor-pointer transition-colors">info@R-One Power.com</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
                  <IconClock size={20} />
                </div>
                <p className="text-sm font-medium">Mon-Sat: 9 AM – 7 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
          <p>© 2026 R-ONE Power Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Dark Green Bottom Bar (Certifications) */}
      <div className="bg-[#16653466] py-4 border-t border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-[11px] font-bold text-[#D1D5DB] uppercase tracking-widest">
                <IconCircleCheckFilled size={16} className="text-amber-500" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Bar */}
      <div className="bg-[#030712] py-4 text-center">
        <p className="text-[10px] text-gray-600 font-medium">
          Built with excellence by <span className="text-blue-500">AV Digi Solution</span>
        </p>
      </div>
    </footer>
  )
}