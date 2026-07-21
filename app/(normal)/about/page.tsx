"use client";

import Image from "next/image";
import HeroSection from "@/component/hero section/hero";
import About from "../../../public/About_us.jpg";
import about_1 from "../../../public/about_1.jpg";
import about_2 from "../../../public/about_2.jpg";
import about_3 from "../../../public/about_3.jpg";
import about_4 from "../../../public/about_4.jpg";
import Shield from "../../../public/Vector.svg";
import Bulb from "../../../public/Vector_2.svg";
import ab_vision from "../../../public/ab_vision.png";
import heart from "../../../public/heart.svg";
import leaf from "../../../public/leaf.svg";
import Person1 from "../../../public/vikas.png";
import Person2 from "../../../public/Anita_Sharma.jpg";
import Person3 from "../../../public/Rahul_Gupta.jpg";
import Person4 from "../../../public/Sneha_Patel.jpg";
import tab from "../../../public/tab_bgd.jpeg";
import mobile from "../../../public/mobile_bgd.jpeg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import QuoteForm from "@/component/Quote/Quote";

const page = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Professionalism",
      desc: "We build long-term client relationships through honesty, transparency and professional project execution.",
    },
    {
      icon: Bulb,
      title: "Technology Innovation",
      desc: "We adopt advanced solar technologies like remote monitoring, solar trackers and smart maintenance solutions.",
    },
    {
      icon: heart,
      title: "Safety Quality ",
      desc: "Safety and quality remain our top priorities during installation, operation, maintenance and cleaning.",
    },
    {
      icon: leaf,
      title: "Sustainability Commitment",
      desc: "We are committed to clean energy adoption, carbon reduction and a greener future for every customer.",
    },
  ];

  const team = [
    {
      image: Person1,
      name: "Vikas Jangid",
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
  ];

  return (
    <div>
      {/*Hero Section*/}
      <div>
        <HeroSection
          image={About}
          badgeText="MNRE Certified Solar EPC Partner"
          heading={
            <>
              Powering <span className="text-[#1E88E5]">India </span>with <br />
              Reliable Solar{" "}
              <span className="text-[#FDEA00]">Energy Solutions</span>
            </>
          }
          subtitle="End-to-end solar EPC solutions with guaranteed performance, transparent pricing, and 25-year warranty. Cut your electricity bill by up to 80%."
          overlay="none"
          badgeVariant="blue"
        />
      </div>

      {/*Our Story*/}
      <div className="max-w-7xl mx-auto">
        <div>
          <section className="w-full bg-white px-4 sm:px-6 md:px-16 lg:px-10 py-14 md:py-20 font-inter">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="text-orange-500 font-bold text-xs sm:text-sm tracking-wide mb-4"
                >
                  OUR STORY
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl  md:text-4xl font-poppins font-bold text-gray-900 leading-tight mb-5"
                >
                  Our Journey Towards Building a Sustainable Solar Future
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="space-y-5 md:space-y-6 font-inter text-gray-500 text-sm sm:text-base md:text-lg leading-7 md:leading-8"
                >
                  <p>
                    R-ONE Power Solution was founded in 2016 with a simple
                    mission: make clean, affordable solar energy accessible to
                    every home and business in Rajasthan. What started as a
                    small team of three passionate engineers has grown into a
                    full-service solar EPC company with over 40 team members.
                  </p>

                  <p>
                    Over the past 8 years, we have installed more than 850 solar
                    power systems across Jaipur, Jodhpur, Udaipur, and
                    surrounding regions. Our installations range from small 3kW
                    residential rooftops to large 500kW industrial solar plants.
                  </p>

                  <p>
                    We are proud to be an MNRE-certified EPC contractor, which
                    means we meet the highest government standards for solar
                    installations. Every system we install comes with a 25-year
                    performance warranty and comprehensive after-sales support.
                  </p>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {[about_1, about_2, about_3, about_4].map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    className="relative h-[160px] sm:h-[220px] md:h-[250px] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt="Solar"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CEO Section ──────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0B1120] overflow-hidden font-inter">

        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1E88E5]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FDEA00]/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#1E88E5]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-[#1E88E5]/15 border border-[#1E88E5]/40 text-[#60AEFF] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] animate-pulse inline-block" />
              Founder & Leadership
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Photo side ────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">

                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#1E88E5]/30 via-transparent to-[#FDEA00]/20 blur-xl" />

                {/* Yellow accent top-right corner */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#FDEA00] rounded-2xl rotate-12 opacity-80 z-0" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-[#1E88E5] rounded-xl -rotate-12 opacity-70 z-0" />

                {/* Photo container */}
                <div className="relative w-[280px] md:w-[360px] h-[360px] md:h-[450px] rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl z-10">
                  <Image
                    src={Person1}
                    alt="Vikas Jangid — Founder & CEO"
                    fill
                    className="object-cover object-top scale-105"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Name overlay inside photo */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-poppins font-black text-xl leading-tight">Vikas Jangid</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-6 h-0.5 bg-[#FDEA00]" />
                      <p className="text-[#FDEA00] text-xs font-bold uppercase tracking-widest">Founder & CEO</p>
                    </div>
                  </div>
                </div>

                {/* MNRE badge floating card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                  className="absolute -right-8 top-12 bg-white rounded-2xl shadow-2xl px-4 py-3 z-20 flex items-center gap-3 w-[160px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#1E88E5] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Certified</p>
                    <p className="text-slate-900 font-black text-xs">MNRE EPC</p>
                  </div>
                </motion.div>

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-8 bottom-20 bg-[#FDEA00] rounded-2xl shadow-2xl px-4 py-3 z-20 text-center w-[110px]"
                >
                  <p className="text-slate-900 font-black font-poppins text-2xl">8+</p>
                  <p className="text-slate-700 font-bold text-[10px] uppercase tracking-wide">Years Exp.</p>
                </motion.div>

              </div>
            </motion.div>

            {/* ── Content side ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Big quote mark */}
              <div className="relative">
                <span className="absolute -top-6 -left-2 text-[120px] font-serif text-[#1E88E5]/15 leading-none select-none pointer-events-none">&ldquo;</span>
                <blockquote className="relative pt-4">
                  <p className="text-2xl md:text-3xl font-poppins font-black text-white leading-tight">
                    My dream is simple —
                    <span className="text-[#FDEA00]"> solar energy</span> in every
                    Indian home. Clean, safe, and affordable power that saves money
                    <span className="text-[#60AEFF]"> today</span> and protects the planet for our children
                    <span className="text-[#FDEA00]"> tomorrow.</span>
                  </p>
                </blockquote>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#1E88E5]/50 to-transparent" />
                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">About</span>
                <div className="h-px flex-1 bg-gradient-to-l from-[#1E88E5]/50 to-transparent" />
              </div>

              {/* Bio */}
              <div className="space-y-4 text-slate-400 text-sm md:text-base leading-7">
                <p>
                  Vikas Jangid founded R-One Power in 2016 with one powerful belief:
                  that every Indian household — regardless of location or income —
                  deserves access to <span className="text-slate-200 font-semibold">safe, clean, and affordable solar energy</span>.
                  Starting with a team of three engineers in Jaipur, he built R-One Power
                  into Rajasthan&apos;s trusted solar EPC company with over 40 team members
                  and 800+ successful installations.
                </p>
                <p>
                  Under his leadership, R-One Power has installed more than 50 MW of
                  solar capacity across 18 states, helping thousands of families and
                  businesses cut their electricity bills by up to 90% while reducing
                  their carbon footprint. Vikas believes solar is not just an energy
                  choice — it is a <span className="text-slate-200 font-semibold">responsibility we owe to future generations</span>.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: "2016", label: "Founded", color: "from-[#1E88E5] to-[#1565C0]" },
                  { val: "50+ MW", label: "Installed", color: "from-[#FDEA00] to-[#F59E0B]" },
                  { val: "800+", label: "Projects", color: "from-[#22C55E] to-[#15803D]" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-center shadow-lg`}
                  >
                    <p className="text-white font-black font-poppins text-xl md:text-2xl">{s.val}</p>
                    <p className="text-white/80 text-[10px] font-bold mt-1 uppercase tracking-widest">{s.label}</p>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#F9FAFB] font-inter">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="inline-flex items-center justify-center border border-[#1E88E5] bg-[#1E88E51A] text-[#1E88E5] rounded-full px-6 py-2 text-xs font-semibold mb-4"
            >
              Our Purpose
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-poppins font-bold text-gray-900"
            >
              Our <span className="text-[#1E88E5]">Vision</span> &amp;{" "}
              <span className="text-[#F59E0B]">Mission</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto"
            >
              Driving innovation today for a cleaner, safer, and energy-independent tomorrow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-[#E3F2FD] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#1E88E5"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-poppins font-black text-slate-900">
                  Our <span className="text-[#1E88E5]">Vision</span>
                </h3>
              </div>
              <p className="text-slate-600 leading-8 text-sm md:text-base">
                We envision a future where <strong className="text-slate-800">every Indian home runs on clean solar energy</strong> —
                safe, reliable, and affordable for all. A nation where rooftops generate power,
                families are free from rising electricity bills, and communities thrive without
                depending on fossil fuels. Solar in every house is not just our goal —
                it is our commitment to future generations.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Solar in Every Home", "Energy Independence", "Safe & Clean Power"].map((tag, i) => (
                  <span key={i} className="bg-[#E3F2FD] text-[#1E88E5] text-[11px] font-bold px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-poppins font-black text-slate-900">
                  Our <span className="text-[#F59E0B]">Mission</span>
                </h3>
              </div>
              <p className="text-slate-600 leading-8 text-sm md:text-base">
                Our mission is to make solar energy <strong className="text-slate-800">accessible, safe, and impactful</strong> for
                every household and business in India. We are committed to delivering
                end-to-end solar EPC solutions with the highest quality standards,
                transparent pricing, and reliable after-sales support — so that switching
                to solar is simple, trustworthy, and genuinely life-changing for our customers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Affordable Solar", "Future-Safe", "Energy Savings"].map((tag, i) => (
                  <span key={i} className="bg-amber-50 text-amber-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        {/*Core Values*/}
        <div>
          <section className="w-full  bg-white px-4 sm:px-6 md:px-16 lg:px-10 pt-14 md:pt-15 font-inter">
            <div className="text-center mb-10 md:mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="inline-flex items-center justify-center border border-[#1E88E5] bg-[#1E88E51A] text-[#1E88E5] rounded-full px-6 md:px-8 py-2 text-xs md:text-sm font-semibold mb-5"
              >
                What Drives Us
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-poppins font-bold text-gray-900"
              >
                Our Core Values
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-12 mx-0 md:mx-5">
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-xl border border-gray-100/50 shadow-none min-h-[200px] md:min-h-[400px] flex flex-col items-center text-center px-5 md:px-6 py-7 md:py-8">
                      <CardHeader className="p-0 flex flex-col items-center mx-auto">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4 md:mb-5">
                          <Image
                            src={Icon}
                            alt={item.title}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>

                        <CardTitle className="text-md md:text-xl font-bold text-gray-900 font-poppins">
                          {item.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-0 mt-3 md:mt-4">
                        <p className="text-gray-500 text-sm md:text-base leading-6 md:leading-7">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>

        {/*Leadership Team*/}
        {/* <div>
        <section className="w-full bg-white px-4 sm:px-6 md:px-16 lg:px-10 py-14 md:py-24 font-inter">
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="inline-flex items-center justify-center border border-[#1E88E5] bg-[#1E88E51A] text-[#1E88E5] rounded-full px-6 md:px-8 py-2 text-xs md:text-sm font-semibold mb-5 md:mb-6"
            >
              The People
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-[#1D2433] leading-tight"
            >
              Meet Our Leadership Team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-[#717A75] text-sm sm:text-base md:text-lg mt-4 md:mt-6 max-w-3xl mx-auto"
            >
              Experienced professionals dedicated to delivering excellence in every solar project.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-4 md:gap-x-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-[135px] h-[135px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden border border-[#E8E8EE]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1D2433] mt-5 md:mt-8 font-poppins leading-tight">
                  {member.name}
                </h3>

                <p className="text-[#1E88E5] text-sm sm:text-base md:text-lg mt-2">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div> */}

        <div>{/*<QuoteForm/>*/}</div>
        <div className="h-12"></div>
      </div>
    </div>
  );
};

export default page;
