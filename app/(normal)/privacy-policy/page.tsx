import React from 'react'
import Image from 'next/image'
import Solar_services from '../../../public/Solar_services.jpg'
import { IconSunFilled } from '@tabler/icons-react'
import HeroSection from '@/component/hero section/hero'



const page = () => {
  return (
    <div>

      {/*Hero section*/}
            <div>
              <HeroSection
                image={Solar_services}
                badgeText="Services"
                heading={
                  <>
                    Privacy <span className="text-[#FDEA00]">Policy</span>
                  </>
                }
                subtitle=""
                overlay="blue"
                badgeVariant="yellow"
              />
            </div>

  

      {/* Content Section */}
     <div className="min-h-screen w-full max-w-7xl mx-auto bg-[#ffffff] px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-25 text-black font-inter">
  <div className="max-w-6xl w-full">

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-10 leading-tight">
      Privacy Policy
    </h1>

    {/* Intro */}
    <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 mb-12 md:mb-14 max-w-5xl">
      At R-One Power, we value your privacy and are committed to
      protecting your personal information. This policy explains how we
      collect, use, and safeguard your data.
    </p>

    {/* Section 1 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        1. Information We Collect
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        We may collect information when you:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>Request a quotation or consultation</li>
        <li>Book a site inspection</li>
        <li>Contact us via phone, email, or messaging platforms</li>
        <li>Fill out forms on our website</li>
        <li>Subscribe to updates or newsletters</li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Collected data may include:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
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
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        2. Purpose of Data Collection
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 mb-5 md:mb-6 max-w-6xl">
        Our services are available across India for residential,
        commercial, and industrial clients. Design suitable solar
        solutions and provide accurate pricing
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
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
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        3. Data Sharing Policy
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 mb-5 md:mb-6 max-w-6xl">
        We respect your privacy and do not sell your data.
      </p>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Your information may be shared with:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Government Bodies: For approvals, net metering, and subsidy processing</li>
        <li>Service Providers: Vendors, logistics teams, and installation partners</li>
        <li>Financial Partners: If you apply for loans or financing options</li>
        <li>Legal Authorities: When required under applicable laws</li>
      </ul>
    </section>

    {/* Section 4 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        4. Data Protection Measures
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        We take appropriate steps to secure your information, including:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Encrypted communication channels</li>
        <li>Secure data storage systems</li>
        <li>Restricted access to sensitive information</li>
      </ul>
    </section>

    {/* Section 5 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        5. Data Retention
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Your information is stored only as long as required to:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Complete your project</li>
        <li>Maintain warranty and service records</li>
        <li>Comply with legal requirements</li>
      </ul>
    </section>

    {/* Section 6 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        6. Your Rights
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        You have the right to:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>Access your stored personal data</li>
        <li>Request updates or corrections</li>
        <li>Ask for deletion (subject to legal limits)</li>
        <li>Opt out of promotional communications</li>
        <li>Withdraw consent for specific data usage</li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        To exercise your rights, contact us using the details below.
      </p>
    </section>

    {/* Section 7 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        7. Cookies & Tracking Technologies
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Our website may use cookies to:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>Improve user experience</li>
        <li>Analyze website performance</li>
        <li>Personalize content</li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        You can manage or disable cookies through your browser settings.
      </p>
    </section>

    {/* Section 8 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        8. External Links
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        Our website may include links to third-party platforms. We are
        not responsible for their privacy practices, so please review
        their policies separately.
      </p>
    </section>

    {/* Section 9 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        9. Children’s Privacy
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        Our services are not intended for individuals below 18 years of
        age. We do not knowingly collect data from minors.
      </p>
    </section>

    {/* Section 10 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        10. Policy Updates
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
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