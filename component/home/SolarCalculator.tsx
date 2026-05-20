"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconBolt,
  IconTrendingDown,
  IconCurrencyRupee,
  IconCalculator,
} from "@tabler/icons-react";

const SOLAR_PRICING: Record<number, number> = {
  1: 70000,
  2: 130000,
  3: 195000,
  4: 240000,
  5: 285000,
  6: 330000,
  8: 420000,
  10: 520000,
};

export default function SolarCalculator() {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const [sanctionLoad, setSanctionLoad] = React.useState("3");
  const [phase, setPhase] = React.useState("three");
  const [monthlyUnits, setMonthlyUnits] = React.useState(200);
  const [monthlyBill, setMonthlyBill] = React.useState(4200);

  // Recommended System Size Logic
  const recommendedKW = React.useMemo(() => {
    const kw = Math.ceil(monthlyUnits / 130);

    if (kw <= 1) return 1;
    if (kw <= 2) return 2;
    if (kw <= 3) return 3;
    if (kw <= 4) return 4;
    if (kw <= 5) return 5;
    if (kw <= 6) return 6;
    if (kw <= 8) return 8;

    return 10;
  }, [monthlyUnits]);

  // Auto phase suggestion
  const recommendedPhase = recommendedKW <= 5 ? "Single Phase" : "Three Phase";

  // Pricing
  const systemPrice = SOLAR_PRICING[recommendedKW] || 0;

  // Subsidy Logic (PM Surya Ghar)
  const subsidy = React.useMemo(() => {
    if (recommendedKW === 1) return 30000;
    if (recommendedKW === 2) return 60000;
    if (recommendedKW >= 3) return 78000;

    return 0;
  }, [recommendedKW]);

  const finalPrice = systemPrice - subsidy;

  // Solar Generation Logic
  const monthlyGeneration = recommendedKW * 130;

  // Savings Logic
  const estimatedMonthlySavings = Math.min(
    monthlyBill,
    Math.round(monthlyGeneration * 7)
  );

  const yearlySavings = estimatedMonthlySavings * 12;

  // ROI
  const paybackYears =
    yearlySavings > 0 ? (finalPrice / yearlySavings).toFixed(1) : 0;

  // 25 Year Savings
  const lifetimeSavings = yearlySavings * 25;

  const handleProposalClick = () => {
    const message =
      "Hi, I'm interested in a solar installation. Please share a detailed proposal for the recommended system."

    const whatsappUrl = `https://wa.me/919660077814?text=${encodeURIComponent(
      message
    )}`

    window.location.href = whatsappUrl
  }

  return (
    <section className="py-24 bg-linear-to-b from-[#F9FCFA] to-[#F4F9F6] font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div {...fadeInUp} className="flex justify-center">
            <span className="flex items-center gap-2 bg-[#DCEEFE] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
              <IconCalculator size={14} /> Quick Quote Calculator
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
          >
            Instant <span className="text-[#1E88E5]">Solar Pricing</span>{" "}
            Estimate
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium"
          >
            Get a detailed cost estimate and savings projection in seconds
          </motion.p>
        </div>

        {/* Calculator Card */}
        <motion.div
          {...fadeInUp}
          className="max-w-5xl mx-auto bg-[#F0FDF44D] rounded-xl overflow-hidden shadow-xl shadow-blue-900/5 flex flex-col lg:flex-row border border-slate-100"
        >
          {/* Left Side */}
          <div className="flex-1 p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-black text-slate-900 font-poppins">
              Your Details
            </h3>

            <div className="space-y-6">
              {/* Sanction Load */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Current Sanction Load
                </label>

                <Select
                  value={sanctionLoad}
                  onValueChange={setSanctionLoad}
                >
                  <SelectTrigger className="py-6 w-full bg-white border-slate-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">1 KW</SelectItem>
                    <SelectItem value="2">2 KW</SelectItem>
                    <SelectItem value="3">3 KW</SelectItem>
                    <SelectItem value="5">5 KW</SelectItem>
                    <SelectItem value="6">6 KW</SelectItem>
                    <SelectItem value="8">8 KW</SelectItem>
                    <SelectItem value="10">10 KW</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phase */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Phase
                </label>

                <Select value={phase} onValueChange={setPhase}>
                  <SelectTrigger className="py-6 w-full bg-white border-slate-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="single">Single Phase</SelectItem>
                    <SelectItem value="three">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Units */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Avg Units Consumed (Monthly)
                </label>

                <Input
                  type="number"
                  value={monthlyUnits}
                  onChange={(e) =>
                    setMonthlyUnits(Number(e.target.value))
                  }
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              {/* Bill */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Avg Bill Amount ₹
                </label>

                <Input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) =>
                    setMonthlyBill(Number(e.target.value))
                  }
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              <Button className="w-full h-14 bg-[#90CAF9] hover:bg-[#64B5F6] text-white font-black text-lg rounded-xl shadow-lg transition-all mt-4">
                Calculate Savings
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:w-[50%] bg-linear-to-r from-[#1E88E5] to-[#6EC6FF] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black font-poppins mb-10">
                Your Estimate
              </h3>

              <div className="space-y-6">
                {/* Recommendation */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconBolt size={34} className="text-white" />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5">
                    <p className="text-sm font-semibold text-white/80">
                      We Recommend
                    </p>

                    <h4 className="text-3xl font-black text-white leading-tight mt-1">
                      {recommendedKW} KW {recommendedPhase}
                    </h4>

                    <p className="text-sm mt-3 text-white">
                      Estimated Generation:
                      <span className="font-bold text-yellow-300">
                        {" "}
                        {monthlyGeneration} Units / Month
                      </span>
                    </p>
                  </div>
                </div>

                {/* Savings */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconTrendingDown size={28} className="text-white" />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5">
                    <p className="text-xs font-bold opacity-80">
                      Monthly Savings
                    </p>

                    <h4 className="text-3xl font-black">
                      ₹{estimatedMonthlySavings.toLocaleString()}
                    </h4>

                    <p className="text-xs font-bold mt-1 opacity-90">
                      ₹{yearlySavings.toLocaleString()} per year
                    </p>

                    <p className="text-xs mt-2 opacity-80">
                      Payback in ~{paybackYears} Years
                    </p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconCurrencyRupee size={28} className="text-white" />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5">
                    <p className="text-xs font-bold opacity-80">
                      Estimated Price
                    </p>

                    <h4 className="text-3xl font-black">
                      ₹{finalPrice.toLocaleString()}
                    </h4>

                    <p className="text-xs font-bold mt-1 opacity-90">
                      Incl. ₹{subsidy.toLocaleString()} Govt. Subsidy
                    </p>

                    <p className="text-xs mt-2 opacity-80">
                      25 Year Savings:
                      ₹{lifetimeSavings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="button"
           
              onClick={handleProposalClick}
              className="w-full h-14 bg-white text-[#1E88E5] hover:bg-slate-50 text-lg rounded-xl mt-10 font-bold transition-all"
            >
              Get Detailed Proposal
            </Button>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-[13px] font-bold text-[#717A75]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#1E88E5]" />
            No Hidden Costs
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#1E88E5]" />
            Transparent Pricing
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#1E88E5]" />
            Free Site Visit
          </div>
        </div>
      </div>
    </section>
  );
}