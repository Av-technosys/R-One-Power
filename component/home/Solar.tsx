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
  IconPhone,
} from "@tabler/icons-react";

import { calculateSolarSavings } from "@/lib/solar/calculations";

type TariffType = "Residential" | "Commercial" | "Industrial";

interface EstimateData {
  recommendedKW: number;
  monthlySavings: number;
  yearlySavings: number;
  finalPrice: number;
  subsidy: number;
}

interface CashFlowPoint {
  year: number;
  value: number;
}

const CASH_FLOW_YEARS = Array.from(
  { length: 25 },
  (_, index) => index + 1
);

const CHART_WIDTH = 1240;
const CHART_HEIGHT = 560;
const CHART_MARGIN = {
  top: 86,
  right: 28,
  bottom: 72,
  left: 108,
};

const getNiceStep = (value: number) => {
  if (value <= 0) {
    return 100_000;
  }

  const power = 10 ** Math.floor(Math.log10(value));
  const normalized = value / power;

  if (normalized <= 1) {
    return power;
  }

  if (normalized <= 2) {
    return 2 * power;
  }

  if (normalized <= 5) {
    return 5 * power;
  }

  return 10 * power;
};

const formatINR = (value: number) =>
  Math.round(value).toLocaleString("en-IN");

const buildCashFlowData = (estimate: EstimateData | null): CashFlowPoint[] => {
  if (!estimate) {
    return [];
  }

  return CASH_FLOW_YEARS.map((year) => ({
    year,
    value: Math.round(estimate.yearlySavings * year - estimate.finalPrice),
  }));
};

const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export default function Solar() {
  const fadeInUp: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // -----------------------------------------
  // STATES
  // -----------------------------------------

  const [units, setUnits] =
    React.useState("650");

  const [connectedLoad, setConnectedLoad] =
    React.useState("");

  const [estimate, setEstimate] =
    React.useState<EstimateData | null>(null);

  const [activeCashFlowYear, setActiveCashFlowYear] =
    React.useState(25);

  const [selectedState, setSelectedState] =
    React.useState<string>("Rajasthan");

  const [selectedTariffType, setSelectedTariffType] =
    React.useState<TariffType>("Residential");

  // -----------------------------------------
  // CONDITIONS
  // -----------------------------------------

  const monthlyUnits =
    Number(units || 0);

  const connectedLoadKW =
    Number(connectedLoad || 0);

  const showLargeSystemMessage =
    Boolean(
      estimate?.recommendedKW &&
        estimate.recommendedKW > 10
    );

  // -----------------------------------------
  // LIVE SAVINGS
  // -----------------------------------------

  const liveMonthlySavings =
    estimate?.monthlySavings ?? 0;

  const liveYearlySavings =
    estimate?.yearlySavings ?? 0;

  const cashFlowData =
    React.useMemo(
      () => buildCashFlowData(estimate),
      [estimate]
    );

  const chartBounds =
    React.useMemo(() => {
      const values = cashFlowData.map((point) => point.value);
      const minValue = Math.min(...values, 0);
      const maxValue = Math.max(...values, 1);
      const step = getNiceStep(
        Math.max(Math.abs(minValue), Math.abs(maxValue)) / 5
      );
      const min = Math.min(Math.floor(minValue / step) * step, -step);
      const max = Math.max(Math.ceil(maxValue / step) * step, step);
      const ticks = Array.from(
        { length: Math.round((max - min) / step) + 1 },
        (_, index) => min + index * step
      );

      return {
        min,
        max,
        ticks,
      };
    }, [cashFlowData]);

  const activeCashFlow =
    cashFlowData.find((point) => point.year === activeCashFlowYear) ??
    cashFlowData[cashFlowData.length - 1];

  const chartPlotWidth =
    CHART_WIDTH - CHART_MARGIN.left - CHART_MARGIN.right;
  const chartPlotHeight =
    CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;

  const valueToY = (value: number) =>
    CHART_MARGIN.top +
    ((chartBounds.max - value) / (chartBounds.max - chartBounds.min)) *
      chartPlotHeight;

  const baselineY = valueToY(0);
  const barSlotWidth = chartPlotWidth / CASH_FLOW_YEARS.length;
  const barWidth = Math.min(42, barSlotWidth * 0.82);

  const calculateSavings = () => {
    try {
      const result = calculateSolarSavings({
        state: selectedState,
        tariffType: selectedTariffType,
        monthlyUnits,
        connectedLoadKW:
          connectedLoadKW > 0
            ? connectedLoadKW
            : null,
      });

      setEstimate({
        recommendedKW: result.recommendedKW,
        monthlySavings: Math.round(result.averageMonthlyBill),
        yearlySavings: Math.round(result.averageAnnualBill),
        finalPrice: Math.round(result.netCost),
        subsidy: Math.round(result.subsidy),
      });
      setActiveCashFlowYear(25);
    } catch {
      setEstimate(null);
    }
  };

  // -----------------------------------------
  // WHATSAPP
  // -----------------------------------------

  const openDetailedProposal = () => {

    const message =
      "Hi, I'm interested in a solar installation. Please share a detailed proposal based on my estimate.";

    const whatsappUrl =
      `https://wa.me/919660077814?text=${encodeURIComponent(
        message
      )}`;

    if (typeof window !== "undefined") {
      window.open(
        whatsappUrl,
        "_blank"
      );
    }
  };

  return (
    <section id="solar-calculator" className="py-24 bg-linear-to-b from-[#F9FCFA] to-[#F4F9F6] font-inter">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}

        <div className="text-center mb-16 space-y-4">

          <motion.div
            {...fadeInUp}
            className="flex justify-center"
          >
            <span className="flex items-center gap-2 bg-[#DCEEFE] text-[#1E88E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
              <IconCalculator size={14} />
              Quick Quote Calculator
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 font-poppins"
          >
            Instant{" "}
            <span className="text-[#1E88E5]">
              Solar Pricing
            </span>{" "}
            Estimate
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium"
          >
            Get a detailed cost estimate
            and savings projection in
            seconds
          </motion.p>

        </div>

        {/* MAIN CARD */}

        <motion.div
          {...fadeInUp}
          className="max-w-5xl mx-auto bg-[#F0FDF44D] rounded-xl overflow-hidden shadow-xl shadow-blue-900/5 flex flex-col lg:flex-row border border-slate-100"
        >

          {/* LEFT */}

          <div className="flex-1 p-8 md:p-12 space-y-8">

            <h3 className="text-2xl font-black text-slate-900 font-poppins">
              Your Details
            </h3>

            <div className="space-y-6">

              {/* STATE */}

              <div className="space-y-2">

                <label className="text-sm font-bold text-slate-700">
                  State
                </label>

                <Select
                  value={selectedState}
                  onValueChange={(v) => setSelectedState(String(v))}
                >

                  <SelectTrigger className="py-6 w-full bg-white border-slate-200 rounded-xl">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>

                  <SelectContent>
                    {INDIA_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
              </div>

              {/* TARIFF TYPE */}

              <div className="space-y-2">

                <label className="text-sm font-bold text-slate-700">
                  Tariff Type
                </label>

                <Select
                  value={selectedTariffType}
                  onValueChange={(v) => setSelectedTariffType(v as TariffType)}
                >

                  <SelectTrigger className="py-6 w-full bg-white border-slate-200 rounded-xl">
                    <SelectValue placeholder="Select Tariff Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>

                </Select>

              </div>

              {/* UNITS */}

              <div className="space-y-2">

                <label className="text-sm font-bold text-slate-700">
                  Average Monthly Unit
                  Consumption (kWh)
                </label>

                <Input
                  type="number"
                  value={units}
                  onChange={(e) =>
                    setUnits(
                      e.target.value
                    )
                  }
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />

              </div>

              {/* CONNECTED LOAD */}

              <div className="space-y-2">

                <label className="text-sm font-bold text-slate-700">
                  Connected Load In KW
                  (If Known)
                </label>

                <Input
                  type="number"
                  value={connectedLoad}
                  onChange={(e) =>
                    setConnectedLoad(
                      e.target.value
                    )
                  }
                  min="0"
                  step="0.5"
                  className="h-14 border-slate-200 rounded-xl focus-visible:ring-[#1E88E5]"
                />

              </div>

              {/* BUTTON */}

              <Button
                onClick={
                  calculateSavings
                }
                className="w-full h-14 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-black text-lg rounded-xl shadow-lg transition-all mt-4"
              >
                Calculate Savings
              </Button>

            </div>
          </div>

          {/* RIGHT */}

          <div className="lg:w-[50%] bg-linear-to-r from-[#1E88E5] to-[#42A5F5] p-8 md:p-12 text-white flex flex-col justify-between">

            <div>

              <h3 className="text-2xl font-black font-poppins mb-10">
                Your Estimate
              </h3>

              {!estimate ? (

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="flex-1 flex items-center justify-center text-center"
                >

                  <div>

                    <IconCalculator
                      size={70}
                      className="mx-auto mb-4 text-white/70"
                    />

                    <p className="text-lg text-white/80 font-medium">
                      Fill in your details
                      to see your
                      personalized
                      estimate
                    </p>

                  </div>

                </motion.div>

              ) : showLargeSystemMessage ? (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-8"
                >

                  <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-10 text-center">

                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">

                      <IconBolt
                        size={42}
                        className="text-white"
                      />

                    </div>

                    <h4 className="text-4xl font-black text-white mb-5">
                      You need a 11 KW
                      Solar Plant
                    </h4>

                    <p className="text-white/90 text-lg leading-relaxed">
                      For systems above
                      10 KW, we
                      encourage you to
                      contact us for the
                      best customized
                      pricing.
                    </p>

                    <p className="text-sm text-white/70 mt-8">
                      Note: DCR subsidy
                      is only available
                      for up to 10 KW
                    </p>

                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={
                      openDetailedProposal
                    }
                    className="w-full h-14 bg-white text-[#1E88E5] hover:bg-slate-50 text-lg rounded-xl font-black"
                  >

                    <IconPhone size={20} />

                    Contact for Best
                    Price

                  </Button>

                </motion.div>

              ) : (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-6"
                >

                  {/* RECOMMEND */}

                  <div className="flex">

                    <div className="w-15 rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">

                      <IconBolt
                        size={34}
                        className="text-white"
                      />

                    </div>

                    <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">

                      <p className="text-sm font-semibold text-white/80">
                        We Recommend
                      </p>

                      <h4 className="text-3xl font-black text-white leading-tight mt-1">

                        {estimate.recommendedKW.toFixed(2)}{" "}
                        KW

                      </h4>

                      <p className="text-sm mt-3 text-white">
                        To reduce your
                        monthly bill to{" "}
                        <span className="text-yellow-300 font-bold">
                          Net Zero
                        </span>
                      </p>

                    </div>
                  </div>

                  {/* AVERAGE BILL */}

                  <div className="flex">

                    <div className="w-15 rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">

                      <IconTrendingDown
                        size={28}
                        className="text-white"
                      />

                    </div>

                    <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">

                      <p className="text-xs font-bold opacity-80">
                        Average Monthly Bill
                      </p>

                      <h4 className="text-3xl font-black">
                        ₹
                        {liveMonthlySavings.toLocaleString()}
                      </h4>

                      <p className="text-xs font-bold mt-1 opacity-90">
                        ₹
                        {liveYearlySavings.toLocaleString()}{" "}
                        per year
                      </p>

                    </div>
                  </div>

                  {/* PRICE */}

                  <div className="flex">

                    <div className="w-15 rounded-md bg-white/10 flex items-center justify-center shrink-0 mr-3">

                      <IconCurrencyRupee
                        size={28}
                        className="text-white"
                      />

                    </div>

                    <div className="flex-1 rounded-md bg-white/10 px-6 py-5 backdrop-blur-sm">

                      <p className="text-xs font-bold opacity-80">
                        Net System Cost After Subsidy
                      </p>

                      <h4 className="text-3xl font-black">
                        ₹
                        {estimate.finalPrice.toLocaleString()}
                      </h4>

                      <p className="text-xs font-bold mt-1 opacity-90">
                        With ₹
                        {estimate.subsidy.toLocaleString()}{" "}
                        Govt. Subsidy
                        (DCR)
                      </p>

                    </div>
                  </div>

                </motion.div>
              )}
            </div>

            {/* BOTTOM BUTTON */}

            {!showLargeSystemMessage && (
              <Button
                type="button"
                variant="secondary"
                onClick={
                  openDetailedProposal
                }
                className="w-full h-14 bg-white text-[#1E88E5] hover:bg-slate-50 text-lg rounded-xl mt-10 font-black"
              >
                Get Detailed Proposal
              </Button>
            )}

          </div>
        </motion.div>

        {estimate && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto mt-10 border border-slate-200 bg-[#F6F6F6] p-4 md:p-8 shadow-xl shadow-slate-200/70"
          >
            <div className="mb-5 text-center">
              <h3 className="font-poppins text-3xl md:text-4xl font-black uppercase text-[#555]">
                Net Cash Outflow
              </h3>
            </div>

            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="h-3 w-3 bg-[#F5A623]" />
                  Recovery
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <span className="h-3 w-3 bg-[#FF7078]" />
                  Investment Pending
                </div>
              </div>

              <div className="rounded-md bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                Year {activeCashFlow?.year ?? 25}:{" "}
                <span
                  className={
                    activeCashFlow && activeCashFlow.value < 0
                      ? "text-[#E85961]"
                      : "text-[#D98D08]"
                  }
                >
                  {activeCashFlow && activeCashFlow.value < 0 ? "-" : ""}
                  ₹{formatINR(Math.abs(activeCashFlow?.value ?? 0))}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                className="h-[360px] min-w-[900px] w-full md:h-[520px]"
                role="img"
                aria-label="Net cash outflow over 25 years"
              >
                <rect
                  width={CHART_WIDTH}
                  height={CHART_HEIGHT}
                  fill="#F6F6F6"
                />

                {chartBounds.ticks.map((tick) => {
                  const y = valueToY(tick);

                  return (
                    <g key={tick}>
                      <line
                        x1={CHART_MARGIN.left}
                        x2={CHART_WIDTH - CHART_MARGIN.right}
                        y1={y}
                        y2={y}
                        stroke={tick === 0 ? "#2F2F2F" : "rgba(0,0,0,0.08)"}
                        strokeWidth={tick === 0 ? 2 : 1}
                      />
                      <text
                        x={CHART_MARGIN.left - 12}
                        y={y + 5}
                        textAnchor="end"
                        fill="#3F3F3F"
                        fontSize="18"
                        fontWeight="700"
                      >
                        {tick === 0
                          ? "0"
                          : `${tick < 0 ? "-" : ""}${formatINR(Math.abs(tick))}`}
                      </text>
                    </g>
                  );
                })}

                <line
                  x1={CHART_MARGIN.left}
                  x2={CHART_MARGIN.left}
                  y1={CHART_MARGIN.top - 8}
                  y2={CHART_HEIGHT - CHART_MARGIN.bottom}
                  stroke="#2F2F2F"
                  strokeWidth="2"
                />

                {cashFlowData.map((point, index) => {
                  const x =
                    CHART_MARGIN.left +
                    index * barSlotWidth +
                    (barSlotWidth - barWidth) / 2;
                  const valueY = valueToY(point.value);
                  const y = Math.min(valueY, baselineY);
                  const height = Math.max(Math.abs(valueY - baselineY), 2);
                  const isNegative = point.value < 0;
                  const isActive = point.year === activeCashFlowYear;

                  return (
                    <g key={point.year}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={height}
                        fill={isNegative ? "#FF7078" : "#F5A623"}
                        opacity={isActive ? 1 : 0.96}
                        stroke={isActive ? "#B96F00" : "transparent"}
                        strokeWidth={isActive ? 3 : 0}
                        onMouseEnter={() => setActiveCashFlowYear(point.year)}
                        onFocus={() => setActiveCashFlowYear(point.year)}
                        tabIndex={0}
                        className="cursor-pointer outline-none transition-opacity hover:opacity-80"
                      >
                        <title>
                          Year {point.year}: {point.value < 0 ? "-" : ""}₹
                          {formatINR(Math.abs(point.value))}
                        </title>
                      </rect>
                      <text
                        x={x + barWidth / 2}
                        y={baselineY + 24}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="16"
                        fontWeight="600"
                      >
                        {point.year}
                      </text>
                    </g>
                  );
                })}

                <text
                  x={CHART_MARGIN.left - 86}
                  y={CHART_HEIGHT / 2}
                  fill="#222"
                  fontSize="22"
                  fontWeight="500"
                  textAnchor="middle"
                  transform={`rotate(-90 ${CHART_MARGIN.left - 86} ${CHART_HEIGHT / 2})`}
                >
                  INR
                </text>

                <text
                  x={CHART_MARGIN.left + chartPlotWidth / 2}
                  y={CHART_HEIGHT - 18}
                  fill="#222"
                  fontSize="20"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  Year
                </text>
              </svg>
            </div>
          </motion.div>
        )}

        {/* BOTTOM */}

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
