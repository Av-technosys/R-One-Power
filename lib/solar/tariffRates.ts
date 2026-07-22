import type { StateName } from "@/lib/solar/stateData";

export type TariffType = "Residential" | "Commercial" | "Industrial";

export interface TariffSlabData {
  eligibleNetMeter: boolean;
  slabs: [number, number, number, number, number];
  rates: [number, number, number, number, number];
  fixedCharges: number;
  demandCharge: number;
  wheeling: number;
}

export const TARIFF_TYPES: TariffType[] = [
  "Residential",
  "Commercial",
  "Industrial",
];

/**
 * DISCOM electricity tariff rates (₹/kWh) by state and consumer category.
 * Placeholder values — replace with actual DISCOM rates as needed.
 */
export const TARIFF_RATES: Record<StateName, Record<TariffType, number>> = {
  "Andhra Pradesh": { Residential: 8.5, Commercial: 10.5, Industrial: 9.3 },
  "Arunachal Pradesh": { Residential: 7.3, Commercial: 9.4, Industrial: 8.4 },
  Assam: { Residential: 7.0, Commercial: 9.1, Industrial: 8.1 },
  Bihar: { Residential: 7.4, Commercial: 9.5, Industrial: 8.5 },
  "Chhattisgarh": { Residential: 6.9, Commercial: 9.0, Industrial: 8.0 },
  Goa: { Residential: 7.8, Commercial: 9.9, Industrial: 8.8 },
  Gujarat: { Residential: 6.8, Commercial: 9.0, Industrial: 8.0 },
  Haryana: { Residential: 7.1, Commercial: 9.3, Industrial: 8.3 },
  "Himachal Pradesh": { Residential: 7.0, Commercial: 9.1, Industrial: 8.1 },
  Jharkhand: { Residential: 7.2, Commercial: 9.3, Industrial: 8.2 },
  Karnataka: { Residential: 8.2, Commercial: 10.2, Industrial: 9.0 },
  Kerala: { Residential: 7.8, Commercial: 9.9, Industrial: 8.8 },
  "Madhya Pradesh": { Residential: 6.9, Commercial: 9.1, Industrial: 8.1 },
  Maharashtra: { Residential: 9.5, Commercial: 11.0, Industrial: 9.5 },
  Manipur: { Residential: 7.1, Commercial: 9.1, Industrial: 8.1 },
  Meghalaya: { Residential: 7.2, Commercial: 9.2, Industrial: 8.2 },
  Mizoram: { Residential: 7.1, Commercial: 9.0, Industrial: 8.0 },
  Nagaland: { Residential: 7.1, Commercial: 9.0, Industrial: 8.0 },
  Odisha: { Residential: 7.0, Commercial: 9.2, Industrial: 8.2 },
  Punjab: { Residential: 7.3, Commercial: 9.4, Industrial: 8.4 },
  Rajasthan: { Residential: 7.662, Commercial: 9.5, Industrial: 8.5 },
  Sikkim: { Residential: 7.2, Commercial: 9.2, Industrial: 8.1 },
  "Tamil Nadu": { Residential: 7.5, Commercial: 9.8, Industrial: 8.8 },
  Telangana: { Residential: 8.3, Commercial: 10.3, Industrial: 9.1 },
  Tripura: { Residential: 7.0, Commercial: 9.0, Industrial: 8.0 },
  "Uttar Pradesh": { Residential: 7.0, Commercial: 9.2, Industrial: 8.2 },
  Uttarakhand: { Residential: 7.2, Commercial: 9.3, Industrial: 8.3 },
  "West Bengal": { Residential: 8.0, Commercial: 10.0, Industrial: 8.9 },
  "Andaman and Nicobar Islands": { Residential: 7.4, Commercial: 9.5, Industrial: 8.5 },
  Chandigarh: { Residential: 7.3, Commercial: 9.4, Industrial: 8.4 },
  "Dadra and Nagar Haveli and Daman and Diu": { Residential: 7.5, Commercial: 9.5, Industrial: 8.5 },
  Delhi: { Residential: 7.5, Commercial: 9.6, Industrial: 8.6 },
  "Jammu and Kashmir": { Residential: 7.2, Commercial: 9.3, Industrial: 8.2 },
  Ladakh: { Residential: 7.2, Commercial: 9.2, Industrial: 8.1 },
  Lakshadweep: { Residential: 7.4, Commercial: 9.4, Industrial: 8.4 },
  Puducherry: { Residential: 7.6, Commercial: 9.7, Industrial: 8.7 },
};

/** Editable nested tariff lookup: tariffRates[state][tariffType] = ₹/unit. */
export const tariffRates = TARIFF_RATES;

const flatSlab = (
  rate: number,
  fixedCharges = 0,
  demandCharge = 0
): TariffSlabData => ({
  eligibleNetMeter: true,
  slabs: [2_147_483_647, 10, 10, 10, 10],
  rates: [rate, 0, 0, 0, 0],
  fixedCharges,
  demandCharge,
  wheeling: 0,
});

/**
 * Vikram-style tariff data used for slab billing.
 *
 * Rajasthan is seeded with the exact public calculator values. Other states use
 * editable flat-rate placeholders so the same slab logic is applied everywhere.
 */
export const TARIFF_SLABS: Record<StateName, Record<TariffType, TariffSlabData>> = {
  "Andhra Pradesh": {
    Residential: flatSlab(8.5),
    Commercial: flatSlab(10.5, 75),
    Industrial: flatSlab(9.3, 75),
  },
  "Arunachal Pradesh": {
    Residential: flatSlab(7.3),
    Commercial: flatSlab(9.4),
    Industrial: flatSlab(8.4),
  },
  Assam: {
    Residential: flatSlab(7.0),
    Commercial: flatSlab(9.1),
    Industrial: flatSlab(8.1),
  },
  Bihar: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 100, 2_147_483_647, 10, 10],
      rates: [5.75, 6, 6.25, 0, 0],
      fixedCharges: 20,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [100, 200, 2_147_483_647, 10, 10],
      rates: [6, 6.5, 7, 0, 0],
      fixedCharges: 30,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: flatSlab(6.05, 200),
  },
  "Chhattisgarh": {
    Residential: flatSlab(6.9),
    Commercial: flatSlab(9.0),
    Industrial: flatSlab(8.0),
  },
  Goa: {
    Residential: flatSlab(7.8),
    Commercial: flatSlab(9.9),
    Industrial: flatSlab(8.8),
  },
  Gujarat: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 100, 200, 250, 2_147_483_647],
      rates: [3.05, 3.5, 4.15, 4.25, 5.2],
      fixedCharges: 0,
      demandCharge: 70,
      wheeling: 0,
    },
    Commercial: flatSlab(4, 150),
    Industrial: flatSlab(4.3, 475),
  },
  Haryana: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 150, 300, 500, 2_147_483_647],
      rates: [3.85, 6.1, 6.4, 6.7, 7.15],
      fixedCharges: 0,
      demandCharge: 285,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [100, 200, 500, 2_147_483_647, 10],
      rates: [7.5, 8, 8.35, 8.8, 0],
      fixedCharges: 190,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: flatSlab(7.35, 185),
  },
  "Himachal Pradesh": {
    Residential: flatSlab(7.0),
    Commercial: flatSlab(9.1),
    Industrial: flatSlab(8.1),
  },
  Jharkhand: {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.3),
    Industrial: flatSlab(8.2),
  },
  Karnataka: { Residential: flatSlab(8.2), Commercial: flatSlab(10.2), Industrial: flatSlab(9) },
  Kerala: {
    Residential: flatSlab(7.8),
    Commercial: {
      eligibleNetMeter: true,
      slabs: [300, 350, 400, 500, 2_147_483_647],
      rates: [5.5, 6.2, 6.5, 6.7, 7.5],
      fixedCharges: 0,
      demandCharge: 80,
      wheeling: 0,
    },
    Industrial: flatSlab(8.8),
  },
  "Madhya Pradesh": {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 50, 200, 10, 10],
      rates: [3.65, 4.35, 5.6, 6.1, 0],
      fixedCharges: 180,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: flatSlab(6.5, 280),
    Industrial: flatSlab(0, 490, 4.6),
  },
  Maharashtra: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [100, 200, 200, 500, 10],
      rates: [2.98, 6.73, 9.69, 11.17, 12.45],
      fixedCharges: 0,
      demandCharge: 160,
      wheeling: 1.18,
    },
    Commercial: flatSlab(12.97, 235),
    Industrial: flatSlab(7.13, 235),
  },
  Manipur: {
    Residential: flatSlab(7.1),
    Commercial: flatSlab(9.1),
    Industrial: flatSlab(8.1),
  },
  Meghalaya: {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.2),
    Industrial: flatSlab(8.2),
  },
  Mizoram: {
    Residential: flatSlab(7.1),
    Commercial: flatSlab(9.0),
    Industrial: flatSlab(8.0),
  },
  Nagaland: {
    Residential: flatSlab(7.1),
    Commercial: flatSlab(9.0),
    Industrial: flatSlab(8.0),
  },
  Odisha: {
    Residential: flatSlab(7.0),
    Commercial: flatSlab(9.2),
    Industrial: flatSlab(8.2),
  },
  Punjab: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [100, 300, 2_147_483_647, 10, 10],
      rates: [4.52, 6.14, 6.56, 0, 0],
      fixedCharges: 52,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [100, 2_147_483_647, 10, 10, 10],
      rates: [6.53, 6.75, 0, 0, 0],
      fixedCharges: 190,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: flatSlab(6.14, 188),
  },
  Rajasthan: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 150, 300, 500, 2_147_483_647],
      rates: [3.85, 6.1, 6.4, 6.7, 7.15],
      fixedCharges: 0,
      demandCharge: 285,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [100, 200, 500, 2_147_483_647, 10],
      rates: [7.55, 8, 8.35, 8.8, 0],
      fixedCharges: 125,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: {
      eligibleNetMeter: true,
      slabs: [2_147_483_647, 10, 10, 10, 10],
      rates: [7.3, 0, 0, 0, 0],
      fixedCharges: 185,
      demandCharge: 0,
      wheeling: 0,
    },
  },
  Sikkim: {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.2),
    Industrial: flatSlab(8.1),
  },
  "Tamil Nadu": {
    Residential: {
      eligibleNetMeter: true,
      slabs: [100, 100, 300, 10, 10],
      rates: [0, 3.5, 4.6, 6.6, 0],
      fixedCharges: 30,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: flatSlab(6.35, 70),
    Industrial: flatSlab(6.35, 350),
  },
  Telangana: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [200, 100, 100, 400, 10],
      rates: [5, 7.2, 8.5, 9, 9.5],
      fixedCharges: 0,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [100, 200, 200, 10, 10],
      rates: [7.5, 8.9, 9.4, 10, 0],
      fixedCharges: 60,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: flatSlab(6.65, 390),
  },
  Tripura: {
    Residential: flatSlab(7.0),
    Commercial: flatSlab(9.0),
    Industrial: flatSlab(8.0),
  },
  "Uttar Pradesh": {
    Residential: {
      eligibleNetMeter: true,
      slabs: [50, 100, 200, 300, 2_147_483_647],
      rates: [2.6, 3.4, 5.6, 7.1, 9],
      fixedCharges: 0,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: flatSlab(7.5, 75),
    Industrial: flatSlab(8.4, 75),
  },
  Uttarakhand: {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.3),
    Industrial: flatSlab(8.3),
  },
  "West Bengal": {
    Residential: {
      eligibleNetMeter: true,
      slabs: [180, 300, 600, 900, 2_147_483_647],
      rates: [5.3, 5.97, 6.97, 7.31, 8.99],
      fixedCharges: 15,
      demandCharge: 0,
      wheeling: 0,
    },
    Commercial: {
      eligibleNetMeter: true,
      slabs: [180, 300, 450, 900, 2_147_483_647],
      rates: [6.19, 7.39, 8.02, 8.45, 8.94],
      fixedCharges: 15,
      demandCharge: 0,
      wheeling: 0,
    },
    Industrial: flatSlab(7.13, 384),
  },
  "Andaman and Nicobar Islands": {
    Residential: flatSlab(7.4),
    Commercial: flatSlab(9.5),
    Industrial: flatSlab(8.5),
  },
  Chandigarh: {
    Residential: flatSlab(7.3),
    Commercial: flatSlab(9.4),
    Industrial: flatSlab(8.4),
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    Residential: flatSlab(7.5),
    Commercial: flatSlab(9.5),
    Industrial: flatSlab(8.5),
  },
  Delhi: {
    Residential: {
      eligibleNetMeter: true,
      slabs: [200, 200, 400, 400, 10],
      rates: [4, 5.95, 7.3, 8.1, 8.75],
      fixedCharges: 0,
      demandCharge: 100,
      wheeling: 0,
    },
    Commercial: flatSlab(8.5, 115),
    Industrial: flatSlab(7.4, 125),
  },
  "Jammu and Kashmir": {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.3),
    Industrial: flatSlab(8.2),
  },
  Ladakh: {
    Residential: flatSlab(7.2),
    Commercial: flatSlab(9.2),
    Industrial: flatSlab(8.1),
  },
  Lakshadweep: {
    Residential: flatSlab(7.4),
    Commercial: flatSlab(9.4),
    Industrial: flatSlab(8.4),
  },
  Puducherry: {
    Residential: flatSlab(7.6),
    Commercial: flatSlab(9.7),
    Industrial: flatSlab(8.7),
  },
};

/** Editable nested slab lookup: tariffSlabs[state][tariffType]. */
export const tariffSlabs = TARIFF_SLABS;
