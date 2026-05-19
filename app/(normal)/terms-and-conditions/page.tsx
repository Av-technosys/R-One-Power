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
                    Terms of <span className="text-[#FDEA00]">Services</span>
                  </>
                }
                subtitle="End-to-end solar services from design and installation to maintenance and
monitoring."
                overlay="blue"
                badgeVariant="yellow"
              />
            </div>

      {/* Content Section */}
     <div className="min-h-screen w-full max-w-7xl mx-auto bg-[#ffffff] px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-25 text-black font-inter">
  <div className="max-w-6xl w-full">

    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-10 leading-tight">
      Terms & Conditions
    </h1>

    <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 mb-12 md:mb-14 max-w-5xl">
      Welcome to R-One Power. By accessing or using our solar services,
      you agree to comply with the following terms. Please review them carefully.
    </p>

    {/* Section 1 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        1. Scope of Services
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        R-One Power provides end-to-end solar EPC solutions, including:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Site inspection & feasibility analysis</li>
        <li>System design & engineering</li>
        <li>Supply of solar components (modules, inverter, mounting)</li>
        <li>Installation & commissioning</li>
        <li>Assistance with DISCOM approvals and net metering</li>
        <li>Government subsidy support (e.g., PM Surya Ghar Yojana)</li>
        <li>Maintenance and after-sales service</li>
      </ul>
    </section>

    {/* Section 2 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        2. Eligibility Criteria
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 mb-5 md:mb-6 max-w-6xl">
        Our services are available across India for residential,
        commercial, and industrial clients.
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Customers must be 18 years or older</li>
        <li>Must have legal authority to install solar systems</li>
        <li>For rented properties, owner approval is mandatory</li>
      </ul>
    </section>

    {/* Section 3 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        3. Pricing & Quotations
      </h2>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>Validity: Quotes remain valid for 30 days</li>
        <li>Final Cost: Confirmed after detailed site inspection</li>
        <li>
          Inclusions: Equipment, installation, wiring, and basic protections
        </li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg mb-4 font-semibold">
        Exclusions:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Structural modifications</li>
        <li>Electrical panel upgrades (if needed)</li>
        <li>Special elevated structures</li>
        <li>Battery systems (unless specified)</li>
      </ul>
    </section>

    {/* Section 4 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        4. Payment Terms
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Standard payment breakup (may vary):
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>30% – Order confirmation</li>
        <li>40% – Material delivery</li>
        <li>20% – Installation stage</li>
        <li>10% – Final commissioning</li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        Accepted modes: Bank transfer, cheque, UPI <br />
        GST will be applicable as per government norms.
      </p>
    </section>

    {/* Section 5 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        5. Project Timeline
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Typical duration: 3–4 weeks
      </p>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Timeline depends on:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg mb-7 md:mb-8 leading-7 md:leading-8">
        <li>Material availability</li>
        <li>Approval process (DISCOM)</li>
        <li>Weather conditions</li>
        <li>Site readiness</li>
      </ul>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        Delays due to external factors are beyond our control.
      </p>
    </section>

    {/* Section 6 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        6. Customer Responsibilities
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        Customers are required to:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Provide accurate property and electricity details</li>
        <li>Ensure safe rooftop access</li>
        <li>Submit required documents on time</li>
        <li>Obtain necessary permissions</li>
        <li>Maintain clear installation space</li>
      </ul>
    </section>

    {/* Section 7 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        7. Warranty Details
      </h2>

      <div className="space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <div>
          <p className="font-semibold">Solar Panels</p>
          <p>Product Warranty: 10–12 years</p>
          <p>Performance Warranty: Up to 25 years</p>
        </div>

        <div>
          <p className="font-semibold">Inverter</p>
          <p>Warranty: 5–10 years (brand dependent)</p>
        </div>

        <div>
          <p className="font-semibold">Installation</p>
          <p>1-year workmanship warranty</p>
        </div>
      </div>
    </section>

    {/* Section 8 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        8. Maintenance & Support
      </h2>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>1-year free basic support</li>
        <li>AMC plans available after warranty</li>
        <li>Regular cleaning and upkeep recommended</li>
      </ul>
    </section>

    {/* Section 9 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        9. Cancellation Policy
      </h2>

      <div className="space-y-7 md:space-y-8 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <div>
          <p className="font-semibold mb-3">
            Customer Cancellation
          </p>

          <ul className="list-disc pl-5 sm:pl-8 space-y-2">
            <li>Before survey: Refund after minimal deduction</li>
            <li>After survey: Partial refund</li>
            <li>After procurement: No refund</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3">
            Company Cancellation
          </p>

          <p className="mb-4">
            We may cancel if:
          </p>

          <ul className="list-disc pl-5 sm:pl-8 space-y-2 mb-4">
            <li>Site is unsafe</li>
            <li>Requirements are not met</li>
          </ul>

          <p>
            (Full refund will be issued in such cases)
          </p>
        </div>
      </div>
    </section>

    {/* Section 10 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        10. Liability Disclaimer
      </h2>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Liability limited to project value</li>
        <li>No guarantee of exact energy savings</li>
        <li>Not responsible for policy changes or subsidy delays</li>
        <li>Not liable for natural disasters or external disruptions</li>
      </ul>
    </section>

    {/* Section 11 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        11. Intellectual Property
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        All technical documents, layouts, and designs remain the property
        of the company and cannot be reused without permission.
      </p>
    </section>

    {/* Section 12 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        12. Dispute Resolution
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        Any disputes will first be resolved mutually. If unresolved,
        jurisdiction will be as per your company’s registered location.
      </p>
    </section>

    {/* Section 13 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        13. Applicable Laws
      </h2>

      <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 leading-7 md:leading-8">
        These terms are governed by Indian laws including:
      </p>

      <ul className="list-disc pl-5 sm:pl-8 space-y-2 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        <li>Electricity Act</li>
        <li>Consumer Protection Act</li>
        <li>MNRE guidelines</li>
      </ul>
    </section>

    {/* Section 14 */}
    <section className="mb-12 md:mb-14">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        14. Updates to Terms
      </h2>

      <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8">
        We may revise these terms anytime. Continued use of services
        implies acceptance of updated terms.
      </p>
    </section>

    {/* Section 15 */}
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-6 leading-tight">
        15. Contact Details
      </h2>

      <div className="space-y-3 text-sm sm:text-base md:text-lg leading-7 md:leading-8 break-words">
        <p>R-ONE Power limited</p>

        <div className="space-y-2">
          <p>📧 Email: sales@r1power.com</p>
          <p>📞 Phone: +91 96600 77814 </p>
          <p>
            📍 Location: C-86, Gautam Marg, Behind Reliance Trends,
            Near Vaishali Circle, Vaishali Nagar,
            Jaipur – 302021
          </p>
        </div>
      </div>
    </section>

  </div>
</div>

    </div>
  )
}

export default page