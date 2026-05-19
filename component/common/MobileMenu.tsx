"use client"

import {
  IconMenu2,
  IconBrandWhatsapp,
  IconPhone,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function MobileMenu() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden flex items-center justify-center"
        >
          <IconMenu2 size={28} className="text-gray-700" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[340px] bg-white p-0 border-l shadow-xl"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="px-6 py-5 border-b flex items-center">
            <img
              src="/main-logo.png"
              alt="R-One Power"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col px-6 py-5 font-inter">
            {navItems.map((item) => (
              <SheetClose asChild key={item.name}>
                <Link
                  href={item.href}
                  className="text-[17px] font-medium text-gray-800 hover:text-[#1E88E5] transition-all duration-200 py-4 border-b border-gray-100"
                >
                  {item.name}
                </Link>
              </SheetClose>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto p-6 border-t bg-gray-50 flex flex-col gap-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/919660077814"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 font-medium hover:text-green-600 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                <IconBrandWhatsapp size={22} className="text-green-600" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">WhatsApp</span>
                <span className="text-base font-semibold">
                  +91 96600 77814
                </span>
              </div>
            </a>

            {/* Call Button */}
            <a href="tel:+919660077814" className="w-full">
              <Button className="bg-[#1E88E5] hover:bg-blue-700 w-full rounded-full flex gap-2 items-center justify-center h-12 text-white">
                <IconPhone size={18} />
                <span>Call Support</span>
              </Button>
            </a>

            {/* Email */}
            <a
              href="mailto:sales@r1power.com"
              className="text-sm text-center text-gray-600 hover:text-[#1E88E5] transition-colors break-all"
            >
              sales@r1power.com
            </a>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}