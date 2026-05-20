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

interface EstimateData {
  recommendedKW: number;
  monthlySavings: number;
  yearlySavings: number;
  finalPrice: number;
  subsidy: number;
  phase: string;
}

export default function Solar() {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const [load, setLoad] = React.useState("3");
  const [phase, setPhase] = React.useState("single");
  const [units, setUnits] = React.useState("650");
  const [bill, setBill] = React.useState("4200");

  const [estimate, setEstimate] = React.useState<EstimateData | null>(null);

  // Pricing Data
  const pricing: Record<number, number> = {
    3: 195000,
    5: 300000,
    6: 360000,
    8: 480000,
    10: 580000,
  };

  // Subsidy Logic
  const getSubsidy = (kw: number) => {
    if (kw <= 1) return 30000;
    if (kw <= 2) return 60000;
    if (kw <= 3) return 78000;

    return 78000;
  };

  // Recommended KW Logic
  const getRecommendedKW = (unitValue: number) => {
    if (unitValue <= 450) return 3;
    if (unitValue <= 750) return 5;
    if (unitValue <= 950) return 6;
    if (unitValue <= 1200) return 8;

    return 10;
  };

  const calculateSavings = () => {
    const monthlyUnits = Number(units);
    const monthlyBill = Number(bill);

    const recommendedKW = getRecommendedKW(monthlyUnits);

    const systemPrice = pricing[recommendedKW];

    const subsidy = getSubsidy(recommendedKW);

    const finalPrice = systemPrice - subsidy;

    const monthlySavings = Math.round(monthlyBill * 0.9);

    const yearlySavings = monthlySavings * 12;

    setEstimate({
      recommendedKW,
      monthlySavings,
      yearlySavings,
      finalPrice,
      subsidy,
      phase,
    });
  };

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
          {/* LEFT SIDE */}
          <div className="flex-1 p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-black text-slate-900 font-poppins">
              Your Details
            </h3>

            <div className="space-y-6">

              {/* Load */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Current Sanction Load
                </label>

                <Select value={load} onValueChange={setLoad}>
                  <SelectTrigger className="py-6 w-full bg-white border-slate-200 rounded-xl">
                    <SelectValue placeholder="Select Load" />
                  </SelectTrigger>

                  <SelectContent>
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
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Single Phase">
                      Single Phase
                    </SelectItem>

                    <SelectItem value="Three Phase">
                      Three Phase
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Units */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Avg Units Consumed (last 12 months per month)
                </label>

                <Input
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              {/* Bill */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Avg Bill Amount (last 12 months per month) ₹
                </label>

                <Input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />
              </div>

              {/* Button */}
              <Button
                onClick={calculateSavings}
                className="w-full h-14 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-black text-lg rounded-xl shadow-lg transition-all mt-4"
              >
                Calculate Savings
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-[50%] bg-linear-to-r from-[#1E88E5] to-[#42A5F5] p-8 md:p-12 text-white flex flex-col justify-between">
            <h3 className="text-2xl font-black font-poppins mb-10">
              Your Estimate
            </h3>

            {!estimate ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex items-center justify-center text-center"
              >
                <div>
                  <IconCalculator
                    size={70}
                    className="mx-auto mb-4 text-white/70"
                  />

                  <p className="text-lg text-white/80 font-medium">
                    Fill in your details to see your personalized estimate
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Recommendation Card */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconBolt size={34} className="text-white" />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-white/80">
                      We Recommend
                    </p>

                    <h4 className="text-3xl font-black text-white leading-tight mt-1">
                      {estimate.recommendedKW} KW {estimate.phase}
                    </h4>

                    <p className="text-sm mt-3 text-white">
                      To reduce your monthly bill to{" "}
                      <span className="text-yellow-300 font-bold">
                        Net Zero
                      </span>
                    </p>
                  </div>
                </div>

                {/* Savings Card */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconTrendingDown size={28} className="text-white" />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">
                    <p className="text-xs font-bold opacity-80">
                      Monthly Savings
                    </p>

                    <h4 className="text-3xl font-black">
                      ₹{estimate.monthlySavings.toLocaleString()}
                    </h4>

                    <p className="text-xs font-bold mt-1 opacity-90">
                      ₹{estimate.yearlySavings.toLocaleString()} per year
                    </p>
                  </div>
                </div>

                {/* Price Card */}
                <div className="flex">
                  <div className="w-[60px] rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">
                    <IconCurrencyRupee
                      size={28}
                      className="text-white"
                    />
                  </div>

                  <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">
                    <p className="text-xs font-bold opacity-80">
                      Starting Price
                    </p>

                    <h4 className="text-3xl font-black">
                      ₹{estimate.finalPrice.toLocaleString()}
                    </h4>

                    <p className="text-xs font-bold mt-1 opacity-90">
                      With ₹{estimate.subsidy.toLocaleString()} Govt.
                      Subsidy (DCR)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              variant="secondary"
              className="w-full h-14 bg-white text-[#1E88E5] hover:bg-slate-50 text-lg rounded-xl mt-10 font-black"
            >
              Get Detailed Proposal
            </Button>
          </div>
        </motion.div>

        {/* Bottom Trust Indicators */}
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