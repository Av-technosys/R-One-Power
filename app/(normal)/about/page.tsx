import Image from "next/image"
import HeroSection from '@/component/hero section/hero'
import About from "../../../public/About_us.jpg"
import about_1 from "../../../public/about_1.jpg"
import about_2 from "../../../public/about_2.jpg"
import about_3 from "../../../public/about_3.jpg"
import about_4 from "../../../public/about_4.jpg"
import Shield from "../../../public/Vector.svg"
import Bulb from "../../../public/Vector_2.svg"
import ab_vision from "../../../public/ab_vision.png"
import heart from "../../../public/heart.svg"
import leaf from "../../../public/leaf.svg"
import Person1 from "../../../public/Vikram_Singh.jpg"
import Person2 from "../../../public/Anita_Sharma.jpg"
import Person3 from "../../../public/Rahul_Gupta.jpg"
import Person4 from "../../../public/Sneha_Patel.jpg"
import tab from "../../../public/tab_bgd.jpeg"
import mobile from "../../../public/mobile_bgd.jpeg"
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import QuoteForm from "@/component/Quote/Quote"



const page = () => {

const values = [
    {
      icon: Shield,
      title: "Integrity",
      desc: "We operate with complete transparency in pricing, timelines, and system performance.",
    },
    {
      icon: Bulb,
      title: "Innovation",
      desc: "Constantly adopting the latest solar technology to deliver maximum efficiency.",
    },
    {
      icon: heart,
      title: "Customer First",
      desc: "Every decision is made with our customers' long-term satisfaction in mind.",
    },
    {
      icon: leaf,
      title: "Sustainability",
      desc: "Committed to reducing carbon footprint and promoting clean energy adoption.",
    },
  ]

    const team = [
    {
      image: Person1,
      name: "Vikram Singh",
      role: "Founder & CEO",
    },
    {
      image: Person2,
      name: "Anita Sharma",
      role: "Technical Director",
    },
    {
      image: Person3,
      name: "Rahul Gupta",
      role: "Project Manager",
    },
    {
      image: Person4,
      name: "Sneha Patel",
      role: "Customer Relations",
    },
  ]

  return (
    <div>
{/*Hero Section*/}
      <div>
        <HeroSection
          image={About}
          badgeText="MNRE Certified Solar EPC Partner"
          heading={
            <>
              Powering <span className="text-[#1E88E5]">Rajasthan </span>with Clean <span className="text-[#FDEA00]">Energy</span>
            </>
          }
          subtitle="End-to-end solar EPC solutions with guaranteed performance, transparent pricing, and 25-year warranty. Cut your electricity bill by up to 80%."
          overlay="none"
          badgeVariant="blue"
        />
      </div>


{/*Our Story*/}
      <div>
        <section className="w-full bg-white px-4 sm:px-6 md:px-16 lg:px-30 py-14 md:py-20 font-inter">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">

            {/* Left Text */}
            <div>
              <p className="text-orange-500 font-bold text-xs sm:text-sm tracking-wide mb-4">
                OUR STORY
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-gray-900 leading-tight mb-5">
                From a Small Startup to Rajasthan&apos;s Trusted Solar Partner
              </h2>

              <div className="space-y-5 md:space-y-6 font-inter text-gray-500 text-sm sm:text-base md:text-lg leading-7 md:leading-8">
                
                <p>
                  R-ONE Power Solution was founded in 2016 with a simple mission:
                  make clean, affordable solar energy accessible to every home and
                  business in Rajasthan. What started as a small team of three
                  passionate engineers has grown into a full-service solar EPC
                  company with over 40 team members.
                </p>

                <p>
                  Over the past 8 years, we have installed more than 850 solar
                  power systems across Jaipur, Jodhpur, Udaipur, and surrounding
                  regions. Our installations range from small 3kW residential
                  rooftops to large 500kW industrial solar plants.
                </p>

                <p>
                  We are proud to be an MNRE-certified EPC contractor, which means
                  we meet the highest government standards for solar installations.
                  Every system we install comes with a 25-year performance warranty
                  and comprehensive after-sales support.
                </p>

              </div>
            </div>

            {/* Right Image Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">

              <div className="relative h-[160px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={about_1}
                  alt="Solar rooftop"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-[160px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={about_2}
                  alt="Solar inverter"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-[160px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={about_3}
                  alt="Solar installation"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-[160px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={about_4}
                  alt="Solar house"
                  fill
                  className="object-cover"
                />
              </div>

            </div>

          </div>
        </section>
      </div>

{/*Our Vision*/}
            <div>
              <div>
                <section className="relative w-full min-h-screen overflow-hidden font-poppins">
                  {/* Background Image */}
                  <Image
                    src={ab_vision}
                    alt="Vision Mission Background"
                    fill
                    className="hidden lg:block object-cover"
                    priority
                  />

                  <Image
                    src={tab}
                    alt="Vision Mission Background tab"
                    fill
                    className="hidden md:block lg:hidden object-cover object-center"
                    priority
                  />

                  <Image
                    src={mobile}
                    alt="Vision Mission Background mobile"
                    fill
                    className="block md:hidden object-cover object-center "
                    priority
                  />

                  {/* Text Content */}
                  <div className="hidden lg:block relative z-10 w-full min-h-screen px-6 py-14">
                    
                    {/* Top Heading */}
                    <div className="text-center">
                      <h1 className="text-3xl md:text-5xl font-bold uppercase">
                        <span className="text-[#1E88E5]">OUR VISION.</span>{" "}
                        <span className="text-[#FDEA00]">OUR MISSION.</span>
                      </h1>

                      <p className="text-gray-600 text-base md:text-lg mt-3 font-inter">
                        Driving innovation today for a cleaner, brighter tomorrow.
                      </p>
                    </div>

                    {/* Vision Text Box */}
                    <div className="hidden lg:block absolute left-[5%] 2xl:left-[12%] top-[44%] 2xl:top-[47%] w-[34%] xl:w-[30%] 2xl:w-[22%] bg-white/50 backdrop-blur-sm rounded-[28px] rounded-br-[100px] px-5 xl:px-6 2xl:px-8 py-5 xl:py-6 2xl:py-10 shadow-lg border border-white/40">
                      <h2 className="text-[#1E88E5] text-2xl 2xl:text-3xl font-bold mb-4 2xl:mb-6">
                        VISION
                      </h2>

                      <p className="text-gray-600 text-sm 2xl:text-base leading-6 2xl:leading-8 font-inter">
                        A future where clean, renewable energy powers every home and
                        business, reducing dependence on fossil fuels and lowering
                        environmental impact. We envision thriving communities with access
                        to affordable, reliable energy, fostering innovation, economic
                        growth, and a healthier planet while preserving natural resources
                        and ensuring sustainability for generations to come.
                      </p>
                    </div>

                    {/* Mission Text Box */}
                    <div className="hidden lg:block absolute right-[5%] 2xl:right-[12%] top-[44%] 2xl:top-[47%] w-[34%] xl:w-[30%] 2xl:w-[22%] bg-white/50 backdrop-blur-sm rounded-t-[20px] rounded-br-[28px] rounded-bl-[100px] px-5 xl:px-6 2xl:px-8 py-5 xl:py-6 2xl:py-10 shadow-lg border border-white/40 text-right">
                      <h2 className="text-[#FDEA00] text-2xl 2xl:text-3xl font-bold mb-4 2xl:mb-6">
                        MISSION
                      </h2>

                      <p className="text-gray-600 text-sm 2xl:text-base leading-6 2xl:leading-8 font-inter">
                        A future where clean, renewable energy powers every home and
                        business, reducing dependence on fossil fuels and lowering
                        environmental impact. We envision thriving communities with access
                        to affordable, reliable energy, fostering innovation, economic
                        growth, and a healthier planet while preserving natural resources
                        and ensuring sustainability for generations to come.
                      </p>
                    </div>

                  </div>
                </section>
              </div>
            </div>


{/*Core Values*/}
            <div>
              <section className="w-full bg-white px-4 sm:px-6 md:px-16 lg:px-24 py-14 md:py-20 font-inter">
                
                {/* Heading */}
                <div className="text-center mb-10 md:mb-14">
                  <div className="inline-flex items-center justify-center border border-[#1E88E5] bg-[#1E88E51A] text-[#1E88E5] rounded-full px-6 md:px-8 py-2 text-xs md:text-sm font-semibold mb-5">
                    What Drives Us
                  </div>

                  <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900">
                    Our Core Values
                  </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-12 mx-0 md:mx-5">
                  {values.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <Card
                        key={index}
                        className="rounded-xl border border-gray-100/50 shadow-none min-h-[200px] md:min-h-[220px] flex flex-col items-center text-center px-5 md:px-6 py-7 md:py-8"
                      >
                        <CardHeader className="p-0 flex flex-col items-center">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4 md:mb-5">
                            <Image
                              src={Icon}
                              alt={item.title}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>

                          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 font-poppins">
                            {item.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0 mt-3 md:mt-4">
                          <p className="text-gray-500 text-sm md:text-base leading-6 md:leading-7">
                            {item.desc}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>
            </div>

{/*Leadership Team*/}
      <div>
        <section className="w-full bg-white px-4 sm:px-6 md:px-16 lg:px-24 py-14 md:py-24 font-inter">
          
          {/* Heading */}
          <div className="text-center mb-12 md:mb-20">

            <div className="inline-flex items-center justify-center border border-[#1E88E5] bg-[#1E88E51A] text-[#1E88E5] rounded-full px-6 md:px-8 py-2 text-xs md:text-sm font-semibold mb-5 md:mb-6">
              The People
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-poppins text-[#1D2433] leading-tight">
              Meet Our Leadership Team
            </h2>

            <p className="text-[#717A75] text-sm sm:text-base md:text-lg mt-4 md:mt-6 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering excellence in every solar project.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-4 md:gap-x-6">

            {team.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >

                {/* Image Circle */}
                <div className="relative w-[135px] h-[135px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden border border-[#E8E8EE]">

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D2433] mt-5 md:mt-8 font-poppins leading-tight">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-[#1E88E5] text-sm sm:text-base md:text-lg mt-2">
                  {member.role}
                </p>

              </div>
            ))}

          </div>
        </section>
      </div>
      <div>

        {/*<QuoteForm/>*/}
      </div>
    </div>
  )
}

export default page
