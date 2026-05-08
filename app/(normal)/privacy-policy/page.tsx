import React from 'react'
import Image from 'next/image'
import Solar_services from '../../../public/Solar_services.jpg'
import { IconSunFilled } from '@tabler/icons-react'


const page = () => {
  return (
    <div>

      {/*Hero section*/}
      <div className="relative w-full min-h-[600px] flex flex-col justify-center p-8 overflow-hidden">

        {/*Background Image*/}
        <div>
          <Image
            src={Solar_services}
            alt="Privacy Policy Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Dark Overlay*/}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E88E580]/75 to-[#114B7F80]/100"></div>

        {/* Main Heading and Subheading */}
        <div className="relative text-white min-h-[360px] pt-10 flex flex-col gap-10 items-center text-center ">
          
          <div className="bg-yellow-500/10 w-fit px-5 border-2 border-[#FDEA00] text-[#FDEA00] rounded-full font-bold p-3 flex items-center justify-center gap-2 ">
            <IconSunFilled
              size={20}
              stroke={1.5}
              className="text-[#FBBF24] font-inter"
            />
            Services
          </div>

          <div className="relative text-white flex flex-col gap-4 items-center text-center ">
            <p className="text-5xl md:text-7xl font-poppins font-bold mb-2">
              Privacy <span className="text-[#FDEA00]">Policy</span>
            </p>
            <p className="text-xl p-6 font-poppins">
              Last Updated: April 2026
            </p>
          </div>

        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-screen bg-[#efefef] px-6 py-10 lg:py-25 md:px-16 lg:px-25 text-black font-inter">
        <div className="max-w-6xl">

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10">
            Privacy Policy
          </h1>

          {/* Intro */}
          <p className="text-sm sm:text-base md:text-lg leading-8 mb-14 max-w-5xl">
            At R-One Power, we value your privacy and are committed to
            protecting your personal information. This policy explains how we
            collect, use, and safeguard your data.
          </p>

          {/* Section 1 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              1. Information We Collect
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              We may collect information when you:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg mb-8">
              <li>Request a quotation or consultation</li>
              <li>Book a site inspection</li>
              <li>Contact us via phone, email, or messaging platforms</li>
              <li>Fill out forms on our website</li>
              <li>Subscribe to updates or newsletters</li>
            </ul>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              Collected data may include:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg">
              <li>Full name</li>
              <li>Email address</li>
              <li>Contact number</li>
              <li>Property location</li>
              <li>Electricity usage details</li>
              <li>Rooftop specifications</li>
              <li>Property images (only with your consent)</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              2. Purpose of Data Collection
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-8 mb-6 max-w-6xl">
              Our services are available across India for residential,
              commercial, and industrial clients. Design suitable solar
              solutions and provide accurate pricing
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg">
              <li>Perform site analysis and feasibility checks</li>
              <li>Process installation requests</li>
              <li>Keep you informed about project progress</li>
              <li>Handle approvals and subsidy-related processes</li>
              <li>Provide maintenance and support services</li>
              <li>Share important updates regarding solar schemes and policies</li>
              <li>Enhance our services and user experience</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              3. Data Sharing Policy
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-8 mb-6 max-w-6xl">
              We respect your privacy and do not sell your data.
            </p>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              Your information may be shared with:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg">
              <li>Government Bodies: For approvals, net metering, and subsidy processing</li>
              <li>Service Providers: Vendors, logistics teams, and installation partners</li>
              <li>Financial Partners: If you apply for loans or financing options</li>
              <li>Legal Authorities: When required under applicable laws</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              4. Data Protection Measures
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              We take appropriate steps to secure your information, including:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg">
              <li>Encrypted communication channels</li>
              <li>Secure data storage systems</li>
              <li>Restricted access to sensitive information</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              5. Data Retention
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              Your information is stored only as long as required to:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg">
              <li>Complete your project</li>
              <li>Maintain warranty and service records</li>
              <li>Comply with legal requirements</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              6. Your Rights
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              You have the right to:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg mb-8">
              <li>Access your stored personal data</li>
              <li>Request updates or corrections</li>
              <li>Ask for deletion (subject to legal limits)</li>
              <li>Opt out of promotional communications</li>
              <li>Withdraw consent for specific data usage</li>
            </ul>

            <p className="text-sm sm:text-base md:text-lg">
              To exercise your rights, contact us using the details below.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              7. Cookies & Tracking Technologies
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6">
              Our website may use cookies to:
            </p>

            <ul className="list-disc pl-8 space-y-1 text-sm sm:text-base md:text-lg mb-8">
              <li>Improve user experience</li>
              <li>Analyze website performance</li>
              <li>Personalize content</li>
            </ul>

            <p className="text-sm sm:text-base md:text-lg">
              You can manage or disable cookies through your browser settings.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              8. External Links
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-8">
              Our website may include links to third-party platforms. We are
              not responsible for their privacy practices, so please review
              their policies separately.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              9. Children’s Privacy
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-8">
              Our services are not intended for individuals below 18 years of
              age. We do not knowingly collect data from minors.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              10. Policy Updates
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-8">
              This Privacy Policy may be revised periodically. Changes will be
              reflected with an updated date at the top of this page.
            </p>
          </section>

        </div>
      </div>

    </div>
  )
}

export default page