"use client"

import { IconMenu2, IconBrandWhatsapp, IconPhone } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <IconMenu2 size={28} className="text-gray-700" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Mobile Logo Area */}
          <div className="p-6 border-b">
            <img src="/main-logo.png" alt="R-One Power" className="h-10 w-auto" />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col p-6 gap-4 font-inter">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="text-lg font-medium text-gray-800 hover:text-[#1E88E5] transition-colors py-2 border-b border-gray-50"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto p-6 bg-gray-50 flex flex-col gap-4">
            <Link href="#" className="flex items-center gap-3 text-gray-700 font-medium">
              <IconBrandWhatsapp size={24} className="text-green-500" />
              <span>WhatsApp Chat</span>
            </Link>
            <Button className="bg-[#1E88E5] hover:bg-blue-700 w-full rounded-full flex gap-2 items-center h-12">
              <IconPhone size={18} />
              <span>Call Support</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}