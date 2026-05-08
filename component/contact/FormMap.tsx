import React from 'react'
import { IconSend } from '@tabler/icons-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function FormMap() {
  return (
    <div>
        <div>
            <p className="text-5xl font-poppins font-bold mb-6 text-center">Let's Start Your <span className="text-[#1E88E5]">Solar Journey</span> </p>
            <p className='font-inter text-lg text-center text-[#717A75]'>Get in touch for a free consultation and site assessment</p>
        </div>
        <div>
            {/*Form*/}

            <div className="max-w-7xl mx-auto px-4 py-12">
            <Card className="max-w-lg mx-auto rounded-2xl shadow-md">
                <CardContent className="p-8 flex flex-col gap-5">
                
                <h2 className="text-3xl font-extrabold text-gray-900">Request Callback</h2>

                <div className="flex flex-col gap-1">
                    <Label className="font-semibold text-gray-800">Your Name <span className="text-red-500">*</span></Label>
                    <Input placeholder="Enter your full name" className="rounded-lg border-gray-300" />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="font-semibold text-gray-800">Email Address <span className="text-red-500">*</span></Label>
                    <Input type="email" placeholder="Enter your email" className="rounded-lg border-gray-300" />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="font-semibold text-gray-800">Phone Number <span className="text-red-500">*</span></Label>
                    <Input type="tel" placeholder="Enter your phone number" className="rounded-lg border-gray-300" />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="font-semibold text-gray-800">Subject <span className="text-red-500">*</span></Label>
                    <Input placeholder="Enter Subject" className="rounded-lg border-gray-300" />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="font-semibold text-gray-800">Message</Label>
                    <Textarea placeholder="Tell us about your solar requirements..." className="rounded-lg border-gray-300 min-h-[120px] resize-none" />
                </div>

                <Button className="w-full bg-[#1E88E5] hover:bg-[#1976D2] text-white font-bold py-6 rounded-lg flex items-center justify-center gap-2">
                    <IconSend size={18} />
                    Request Callback
                </Button>

                <p className="text-center text-sm text-gray-400">We'll get back to you within 24 hours</p>

                </CardContent>
            </Card>

            </div>

            {/*Map*/}
            <div>
                <h1>hi</h1>
            </div>
        </div>

    </div>
  )
}

export default FormMap