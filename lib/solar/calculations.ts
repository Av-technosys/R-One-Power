import {
  AREA_PER_KW,
  CO2_PER_KWH,
  CO2_PER_TREE_YEAR,
  CORRECTION_FACTOR,
  COST_PER_KW,
  PANEL_WATTAGE,
  RESIDENTIAL_SUBSIDY_DISCOUNT,
  SUBSIDY_ENABLED,
  TARIFF_INCREASE_RATE,
  TAXES_AND_CHARGES_RATE,
} from "@/lib/solar/constants";
import { STATE_SOLAR_DATA, type StateName } from "@/lib/solar/stateData";
import {
  TARIFF_SLABS,
  TARIFF_TYPES,
  type TariffSlabData,
  type TariffType,
} from "@/lib/solar/tariffRates";

export interface SolarSavingsInput {
  /** State name used to look up average peak sun hours and tariff rates. */
  state: string;
  /** Consumer category used to look up the ₹/unit tariff. */
  tariffType: string;
  /** Average monthly electricity consumption in kWh. Must be greater than 0. */
  monthlyUnits: number;
  /** Connected load in kW; when provided and > 0, overrides consumption-based sizing. */
  connectedLoadKW?: number | null;
}

export interface SolarSavingsResult {
  /** Recommended installed solar capacity in kW. */
  recommendedKW: number;
  /** Installed system cost before subsidy: recommendedKW × COST_PER_KW. */
  grossCost: number;
  /** Residential-only PM Surya Ghar-style subsidy, capped by SUBSIDY_CAP. */
  subsidy: number;
  /** Customer cost after subsidy: grossCost - subsidy. */
  netCost: number;
  /** Estimated annual generation in kWh using state PLF. */
  annualGeneration: number;
  /** Estimated annual bill amount in ₹ before solar, matching Vikram's first-year display. */
  annualSavings: number;
  /** Estimated average monthly bill in ₹ before solar. */
  averageMonthlyBill: number;
  /** Estimated annual bill in ₹ before solar. */
  averageAnnualBill: number;
  /** Years to recover net investment; null when annual savings are zero. */
  paybackYears: number | null;
  /** Approximate roof area required in sq ft. */
  areaSqFt: number;
  /** Estimated kg of grid CO2 avoided per year. */
  co2SavedKg: number;
  /** CO2 savings converted to equivalent trees per year. */
  treesEquivalent: number;
  /** Approximate number of 400 W panels needed, minimum 1. */
  panelCount: number;
  /** Tariff rate used for savings, in ₹/kWh. */
  tariffPerUnit: number;
}

export class SolarCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SolarCalculationError";
  }
}

/**
 * Vikram's simple calculator uses five tariff slabs as block sizes.
 *
 * It starts with fixed/demand monthly charges, allocates monthly units across
 * the five slab blocks, multiplies by slab rates, annualizes, then applies
 * first-year tariff escalation plus taxes/charges.
 */
export function calculateVikramMonthlyBill(
  monthlyUnits: number,
  connectedLoadKW: number,
  tariff: TariffSlabData
): number {
  let slabUnitTally = 0;
  let monthlyBill =
    tariff.fixedCharges * connectedLoadKW + tariff.demandCharge;

  for (let index = 0; index < tariff.slabs.length; index += 1) {
    const remainingUnits = monthlyUnits - slabUnitTally;
    const unitsInSlab =
      remainingUnits >= tariff.slabs[index]
        ? tariff.slabs[index]
        : Math.max(remainingUnits, 0);

    monthlyBill += unitsInSlab * tariff.rates[index];
    slabUnitTally += unitsInSlab;
  }

  const annualBillWithoutEscTax = monthlyBill * 12;
  const annualBillWithEscTax =
    annualBillWithoutEscTax * (1 + TARIFF_INCREASE_RATE) +
    annualBillWithoutEscTax * TAXES_AND_CHARGES_RATE;

  return annualBillWithEscTax / 12;
}

/**
 * Derives required system size from annual consumption and state constraints.
 *
 * Vikram formula:
 * required = (annualUnits × kwhLimit) / (365 × 24 × plf)
 */
export function sizeFromConsumption(
  monthlyUnits: number,
  kwhLimit: number,
  plf: number
): number {
  const unitsPerYear = monthlyUnits * 12;
  return (unitsPerYear * kwhLimit) / (365 * 24 * plf);
}

/**
 * Vikram simple mode treats Residential as subsidy eligible and applies a
 * 30% discount to system cost. Non-Residential categories receive no subsidy.
 */
export function calculateSubsidy(
  grossCost: number,
  tariffType: TariffType
): number {
  if (!SUBSIDY_ENABLED || tariffType !== "Residential") {
    return 0;
  }

  return grossCost * RESIDENTIAL_SUBSIDY_DISCOUNT;
}

function isTariffType(value: string): value is TariffType {
  return (TARIFF_TYPES as string[]).includes(value);
}

/**
 * Pure solar savings calculator. All assumptions are local/static, and this
 * function performs no I/O, no API calls, and no UI work.
 *
 * Calculation flow mirrors Vikram Solar's public simple calculator:
 * 1. Look up state PLF/load/kWh limits and tariff slab data.
 * 2. requiredKW = annualUnits × kwhLimit / (365 × 24 × plf).
 * 3. If connected load is known, cap recommendation using loadLimit.
 * 4. netCost = recommendedKW × COST_PER_KW, less 30% for Residential.
 * 5. monthlyBill = slab bill with tariff escalation and taxes.
 *
 * @throws {SolarCalculationError} when inputs are invalid or lookup keys are missing.
 */
export function calculateSolarSavings(
  input: SolarSavingsInput
): SolarSavingsResult {
  const { state, tariffType, monthlyUnits, connectedLoadKW } = input;

  if (!Number.isFinite(monthlyUnits) || monthlyUnits <= 0) {
    throw new SolarCalculationError(
      "monthlyUnits must be a positive number"
    );
  }

  if (!isTariffType(tariffType)) {
    throw new SolarCalculationError(
      `Unknown tariffType: "${tariffType}". Expected one of: ${TARIFF_TYPES.join(", ")}.`
    );
  }

  const stateData = STATE_SOLAR_DATA[state as StateName];

  if (!stateData) {
    throw new SolarCalculationError(
      `Unknown state: "${state}". Add it to STATE_SOLAR_DATA.`
    );
  }

  if (!Number.isFinite(stateData.plf) || stateData.plf <= 0) {
    throw new SolarCalculationError(
      `Invalid plf for state "${state}". Expected a positive number.`
    );
  }

  const tariffData = TARIFF_SLABS[state as StateName]?.[tariffType];

  if (!tariffData) {
    throw new SolarCalculationError(
      `No tariff rate for state "${state}" and tariffType "${tariffType}".`
    );
  }

  // Step 2: size the system from connected load or consumption.
  const hasConnectedLoad =
    connectedLoadKW !== null &&
    connectedLoadKW !== undefined &&
    Number.isFinite(connectedLoadKW) &&
    connectedLoadKW > 0;

  const connectedLoad = hasConnectedLoad ? connectedLoadKW : 0;
  const requiredKW =
    sizeFromConsumption(monthlyUnits, stateData.kwhLimit, stateData.plf) *
    CORRECTION_FACTOR;
  const connectedLoadLimit = connectedLoad * stateData.loadLimit;
  const recommendedKW =
    connectedLoad > 0 && requiredKW >= connectedLoadLimit
      ? connectedLoad
      : requiredKW;

  // Steps 3–5: cost, subsidy, and bill.
  const grossCost = recommendedKW * COST_PER_KW;
  const subsidy = calculateSubsidy(grossCost, tariffType);
  const netCost = grossCost - subsidy;
  const averageMonthlyBill = calculateVikramMonthlyBill(
    monthlyUnits,
    connectedLoad,
    tariffData
  );
  const averageAnnualBill = averageMonthlyBill * 12;

  // Steps 6–8: generation, first-year bill amount, and simple payback.
  const annualGeneration = recommendedKW * 365 * 24 * stateData.plf;
  const annualSavings = averageAnnualBill;
  const paybackYears =
    annualSavings > 0 ? netCost / annualSavings : null;

  // Steps 9–12: area, environmental impact, and panel count.
  const areaSqFt = Math.round(recommendedKW * AREA_PER_KW);
  const co2SavedKg = annualGeneration * CO2_PER_KWH;
  const treesEquivalent = Math.round(co2SavedKg / CO2_PER_TREE_YEAR);
  const panelCount = Math.max(
    1,
    Math.round(recommendedKW / PANEL_WATTAGE)
  );

  return {
    recommendedKW,
    grossCost,
    subsidy,
    netCost,
    annualGeneration,
    annualSavings,
    paybackYears,
    areaSqFt,
    co2SavedKg,
    treesEquivalent,
    panelCount,
    averageMonthlyBill,
    averageAnnualBill,
    tariffPerUnit: averageMonthlyBill / monthlyUnits,
  };
}
