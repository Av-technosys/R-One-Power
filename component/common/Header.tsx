"use client"

import Link from "next/link"
import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed  mx-auto top-0 left-0 right-0 font-inter z-50 flex items-center justify-between px-4 md:px-10 py-1 2xl:py-2 transition-all duration-300 ${scrolled ? "bg-white/70  backdrop-blur-md text-[#1E88E5] shadow-sm" : "bg-transparent text-white"}`}>
      
      {/* Logo Section - Alignment Fixed */}
      <div className="flex items-center shrink-0">
        <Link href="/">
          <img 
            src="/main-logo.png" 
            alt="R-One Power" 
            className="h-10 md:h-14 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Desktop Navigation - Pure Centered Alignment */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-semibold  mt-2">
        {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
          <Link 
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} 
            className="hover:text-[#1E88E5] transition-all relative group py-2"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1E88E5] transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* Action Buttons & Mobile Menu */}
      <div className="flex items-center gap-3 lg:gap-5 mt-2">
        {/* WhatsApp - Only visible on Large Screens */}
      <Link
  href="https://wa.me/919660077814?text=Hello%20R-One%20Power,%20I%20want%20to%20know%20more%20about%20your%20solar%20services."
  target="_blank"
  className={`hidden xl:flex items-center gap-2 text-sm font-medium hover:text-green-600 transition-colors ${
    scrolled ? "text-[#1E88E5]" : "text-white"
  }`}
>
  <IconBrandWhatsapp size={22} className="text-green-500" />
  <span>Chat on WhatsApp</span>
</Link>

        {/* Call Button - Hidden on very small screens, visible from sm up */}
      <a href="tel:+919660077814">
  <Button className="hidden sm:flex bg-[#1E88E5] bg-linear-to-r from-[#1E88E5] to-[#157DC0] rounded-md gap-2 items-center px-5 py-4 shadow-md shadow-blue-500/20 transition-all active:scale-95">
    <IconPhone size={18} />
    <span className="md:block hidden font-bold">
      +91 96600 77814
    </span>
  </Button>
</a>

        {/* The Mobile Drawer Trigger */}
        <MobileMenu />
      </div>
    </header>
  )
}