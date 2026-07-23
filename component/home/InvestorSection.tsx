"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import {
  IconTrendingUp,
  IconShieldCheck,
  IconSunFilled,
  IconBuildingBank,
  IconLeaf,
  IconChartBar,
  IconArrowRight,
  IconCertificate,
} from "@tabler/icons-react"
import Link from "next/link"

const fadeInUp: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
}

// ── Key investment metrics ────────────────────────────────────────────────────
const metrics = [
  { val: "₹500 Cr+", label: "Assets Under Management", icon: <IconBuildingBank size={20} /> },
  { val: "18–22%", label: "Avg. IRR for Investors", icon: <IconTrendingUp size={20} /> },
  { val: "25 Yrs",  label: "Asset Life", icon: <IconSunFilled size={20} /> },
  { val: "MNRE",    label: "Government Certified", icon: <IconCertificate size={20} /> },
]

// ── Why invest ────────────────────────────────────────────────────────────────
const reasons = [
  {
    icon: <IconTrendingUp size={26} />,
    title: "High & Predictable Returns",
    desc: "Solar assets generate stable cash flows with 18–22% IRR and 25-year power purchase agreements backed by DISCOM contracts.",
    accent: "from-[#1E88E5] to-[#1565C0]",
  },
  {
    icon: <IconShieldCheck size={26} />,
    title: "Low-Risk Asset Class",
    desc: "Solar energy is a government-backed, inflation-proof sector with zero fuel cost risk and predictable generation throughout the asset lifetime.",
    accent: "from-[#22C55E] to-[#15803D]",
  },
  {
    icon: <IconLeaf size={26} />,
    title: "ESG & Green Credentials",
    desc: "Every megawatt you invest in offsets tonnes of CO₂, qualifying for ESG reporting, CSR compliance, and green financing benefits.",
    accent: "from-[#FDEA00] to-[#F59E0B]",
  },
  {
    icon: <IconChartBar size={26} />,
    title: "Transparent Reporting",
    desc: "Investors receive monthly generation reports, financial summaries, and real-time dashboard access for full visibility into their portfolio.",
    accent: "from-[#A855F7] to-[#7C3AED]",
  },
]

// ── Investment models ─────────────────────────────────────────────────────────
const models = [
  {
    title: "CAPEX Model",
    tag: "Own & Operate",
    tagColor: "bg-[#1E88E5]",
    desc: "You own the solar asset outright. R-One Power handles EPC, commissioning, and O&M. Enjoy 100% of savings and depreciation benefits from day one.",
    bullets: ["Full ownership", "80% accelerated depreciation", "25-yr performance warranty"],
  },
  {
    title: "OPEX / RESCO",
    tag: "Zero Capex",
    tagColor: "bg-[#22C55E]",
    desc: "Install solar at zero upfront cost. Pay only for units consumed at a rate lower than DISCOM tariff. R-One Power is the asset owner and investor.",
    bullets: ["₹0 investment from client", "Instant savings from day 1", "25-yr PPA agreement"],
  },
  {
    title: "JV / Co-Investment",
    tag: "Partnership",
    tagColor: "bg-[#F59E0B]",
    desc: "Partner with R-One Power on large industrial or C&I solar projects. Share returns proportional to investment. Ideal for HNIs and family offices.",
    bullets: ["18–22% target IRR", "Quarterly distributions", "MNRE-backed assets"],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function InvestorSection() {
  return (
    <section className="relative bg-[#0B1120] py-24 md:py-32 font-inter overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#1E88E5]/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FDEA00]/6 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <motion.span
            {...fadeInUp}
            className="inline-flex items-center gap-2 bg-[#FDEA00]/10 border border-[#FDEA00]/30 text-[#FDEA00] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FDEA00] animate-pulse inline-block" />
            Investor Relations
          </motion.span>

          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-poppins text-white leading-tight"
          >
            Invest in{" "}
            <span className="text-[#FDEA00]">India&apos;s</span>{" "}
            <span className="text-[#1E88E5]">Solar Future</span>
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-5 leading-7"
          >
            R-One Power offers institutional and individual investors access to
            high-yield, government-backed solar energy assets with transparent
            reporting and proven execution across 18+ states.
          </motion.p>
        </div>

        {/* ── Metrics strip ────────────────────────────────────────────── */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-[#1E88E5]/40 transition-all duration-300"
            >
              <div className="flex justify-center text-[#1E88E5] mb-3">{m.icon}</div>
              <p className="text-white font-black font-poppins text-2xl md:text-3xl">{m.val}</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide mt-2">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Why Invest ───────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.h3
            {...fadeInUp}
            className="text-2xl md:text-3xl font-black font-poppins text-white text-center mb-12"
          >
            Why Invest with <span className="text-[#1E88E5]">R-One Power</span>
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#1E88E5]/40 hover:bg-white/8 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${r.accent} text-white mb-5 shadow-lg`}>
                  {r.icon}
                </div>
                <h4 className="text-white font-bold font-poppins text-lg mb-3">{r.title}</h4>
                <p className="text-slate-400 text-sm leading-7">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Investment Models ────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.h3
            {...fadeInUp}
            className="text-2xl md:text-3xl font-black font-poppins text-white text-center mb-12"
          >
            Investment <span className="text-[#FDEA00]">Models</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((m, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.12 }}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 hover:bg-white/8 transition-all duration-300 flex flex-col"
              >
                <span className={`${m.tagColor} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full w-fit mb-4`}>
                  {m.tag}
                </span>
                <h4 className="text-white font-black font-poppins text-xl mb-3">{m.title}</h4>
                <p className="text-slate-400 text-sm leading-7 mb-5 flex-1">{m.desc}</p>
                <ul className="space-y-2">
                  {m.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E88E5] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* CTA background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E88E5] to-[#1565C0]" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #FDEA00 0%, transparent 50%),
                                radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 50%)`,
            }}
          />

          <div className="relative px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">
                Ready to invest?
              </p>
              <h3 className="text-white font-black font-poppins text-2xl md:text-3xl leading-tight">
                Partner with R-One Power <br className="hidden md:block" />
                for long-term solar returns.
              </h3>
              <p className="text-blue-100 text-sm mt-3 max-w-md">
                Talk to our investor relations team. We&apos;ll share our project pipeline,
                financial models, and due diligence documentation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/contact">
                <button className="h-13 px-8 py-3.5 bg-[#FDEA00] hover:bg-yellow-300 text-slate-900 font-black rounded-xl text-sm flex items-center gap-2 shadow-xl shadow-yellow-500/20 transition-all hover:scale-105">
                  Schedule a Meeting <IconArrowRight size={17} />
                </button>
              </Link>
              <a href="tel:+919660077814">
                <button className="h-13 px-14 lg:px-8 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold rounded-xl text-sm transition-all text-center">
                  +91 96600 77814
                </button>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
