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
 { name: "Residential Solar" , href: "/services" },
  { name: "Commercial Solar" , href: "/services" },
  { name: "Industrial Solar" , href: "/services" },
  { name: "Solar Maintenance" , href: "/services" },
  { name: "Battery Storage" , href: "/services" },
  { name: "Net Metering" , href: "/services" },
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

  { icon: IconBrandInstagram, href: "https://www.instagram.com/ronepowerindia/" },

  { icon: IconBrandLinkedin, href: "https://in.linkedin.com/company/r-one-power" },

  { icon: IconBrandYoutube, href: "https://www.youtube.com/channel/UCqEsmZmBqd_NCX5NqF8CGXg" },
]

export default function Footer() {
  return (
 <footer className="bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] text-gray-400 font-inter pt-10">
  <div className="max-w-7xl mx-auto md:px-0 px-4 pb-4">

    {/* Main Grid Layout */}
  {/* Main Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-14 md:mb-16">

  {/* Column 1: Brand & Bio */}
  <div className="space-y-5 md:space-y-6">
    <Link href={"/"}> 
      <img
        src="/footer-logo.png"
        alt="R-ONE Power"
        className="h-12 sm:h-14 md:h-15 w-auto"
      />
    </Link>

    <p className="text-sm text-[#9CA3AF] leading-relaxed font-medium max-w-xs">
      Powering homes and businesses with clean, affordable solar energy.
      MNRE-certified EPC partner with 25-year performance guarantee.
    </p>

    <div className="flex items-center flex-wrap gap-3">
      {socialLinks.map((social, idx) => (
        <Link
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#1E88E5] hover:text-white transition-all shrink-0"
        >
          <social.icon size={18} />
        </Link>
      ))}
    </div>
  </div>

  {/* Mobile: Quick Links + Services Side By Side */}
  <div className="grid grid-cols-2 gap-8 lg:contents">

    {/* Column 2: Quick Links */}
    <div className="space-y-5 md:space-y-6">
      <h4 className="text-white font-bold font-poppins text-lg">
        Quick Links
      </h4>

      <ul className="space-y-3 md:space-y-4">
        {quickLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="flex items-start gap-2 text-sm text-[#9CA3AF] hover:text-[#1E88E5] transition-colors group"
            >
              <IconChevronRight
                size={14}
                className="text-[#1E88E5] mt-[2px] shrink-0 group-hover:translate-x-1 transition-transform"
              />

              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 3: Services */}
    <div className="space-y-5 md:space-y-6">
      <h4 className="text-white font-bold font-poppins text-lg">
        Our Services
      </h4>

      <ul className="space-y-3 md:space-y-4">
        {services.map((service) => (
          <li key={service.name}>
            <Link
              href={service.href}
              className="flex items-start gap-2 text-sm text-[#9CA3AF] hover:text-[#1E88E5] transition-colors group"
            >
              <IconChevronRight
                size={14}
                className="text-[#1E88E5] mt-[2px] shrink-0 group-hover:translate-x-1 transition-transform"
              />

              <span>{service.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Column 4: Contact Info */}
  <div className="space-y-5 md:space-y-6 sm:col-span-2 lg:col-span-1">
    <h4 className="text-white font-bold font-poppins text-lg">
      Contact Us
    </h4>

    <div className="space-y-5">

      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
          <IconMapPin size={20} />
        </div>

        <p className="text-sm leading-6 break-words">
          C-86, Gautam Marg, Behind Reliance Trends,
          <br />
          Near Vaishali Circle, Vaishali Nagar,
          <br />
          Jaipur – 302021
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
          <IconPhone size={20} />
        </div>

        <a
          href="tel:+919660077814"
          className="text-sm font-bold hover:text-[#1E88E5] transition-colors break-all"
        >
          +91 96600 77814
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-[#1E88E5]">
          <IconMail size={20} />
        </div>

        <a
          href="mailto:sales@r1power.com"
          className="text-sm hover:text-[#1E88E5] cursor-pointer transition-colors break-all"
        >
          sales@r1power.com
        </a>
      </div>

    </div>
  </div>
</div>

    {/* Footer Bottom */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[13px] text-center md:text-left border-t border-white/10 pt-5">
      <p>
        © 2026 R-ONE Power Solutions. All rights reserved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <Link
          href="privacy-policy"
          className="hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>

        <Link
          href="terms-and-conditions"
          className="hover:text-white transition-colors"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  </div>

  {/* Certifications */}
  <div className="bg-[#16653466] py-4 border-t border-emerald-900/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-3 sm:gap-y-4">
        {certifications.map((cert) => (
          <div
            key={cert}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[#D1D5DB] uppercase tracking-widest text-center"
          >
            <IconCircleCheckFilled
              size={16}
              className="text-amber-500 shrink-0"
            />

            <span>{cert}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Credit Bar */}
  <div className="bg-[#030712] py-4 text-center px-4">
    <p className="text-[10px] sm:text-[11px] text-gray-600 font-medium leading-relaxed">
      Built with excellence by{" "}
      <a
        href="https://avtechnosys.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        AV Technosys
      </a>
    </p>
  </div>
</footer>
  )
}