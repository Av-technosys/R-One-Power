/**
 * Per-state assumptions used by the savings calculator.
 *
 * `sunHours`: average peak sun hours per day (kWh generated per kWp per day).
 * `plf`, `loadLimit`, and `kwhLimit` mirror Vikram Solar's simple calculator.
 */
export interface StateSolarData {
  code: string;
  sunHours: number;
  plf: number;
  loadLimit: number;
  kwhLimit: number;
  transformerCap: number;
}

export const STATE_SOLAR_DATA = {
  Rajasthan: { code: "RJ", sunHours: 5.5, plf: 0.18, loadLimit: 0.8, kwhLimit: 1, transformerCap: 0.3 },
  Gujarat: { code: "GJ", sunHours: 5.3, plf: 0.19, loadLimit: 0.5, kwhLimit: 1, transformerCap: 0.3 },
  Maharashtra: { code: "MH", sunHours: 4.8, plf: 0.18, loadLimit: 1, kwhLimit: 1, transformerCap: 0.4 },
  "Tamil Nadu": { code: "TN", sunHours: 4.9, plf: 0.16, loadLimit: 1, kwhLimit: 0.9, transformerCap: 0.3 },
  Karnataka: { code: "KN", sunHours: 4.9, plf: 0.16, loadLimit: 1.5, kwhLimit: 1, transformerCap: 0.3 },
  "Uttar Pradesh": { code: "UP", sunHours: 4.7, plf: 0.16, loadLimit: 1, kwhLimit: 0.9, transformerCap: 0.15 },
  "West Bengal": { code: "WB", sunHours: 4.4, plf: 0.16, loadLimit: 0.9, kwhLimit: 0.9, transformerCap: 0.3 },
  Delhi: { code: "DL", sunHours: 4.8, plf: 0.17, loadLimit: 1, kwhLimit: 1, transformerCap: 0.15 },
  "Madhya Pradesh": { code: "MP", sunHours: 5.0, plf: 0.16, loadLimit: 1, kwhLimit: 1, transformerCap: 0.3 },
  Punjab: { code: "PB", sunHours: 4.6, plf: 0.17, loadLimit: 0.8, kwhLimit: 1, transformerCap: 0.3 },
  Haryana: { code: "HR", sunHours: 4.9, plf: 0.17, loadLimit: 1, kwhLimit: 1, transformerCap: 0.15 },
  Bihar: { code: "BR", sunHours: 4.5, plf: 0.15, loadLimit: 1, kwhLimit: 1, transformerCap: 0.15 },
  "Andhra Pradesh": { code: "AP", sunHours: 5.1, plf: 0.16, loadLimit: 0.9, kwhLimit: 1, transformerCap: 0.6 },
  Telangana: { code: "TG", sunHours: 5.0, plf: 0.17, loadLimit: 1, kwhLimit: 1, transformerCap: 0.3 },
  Kerala: { code: "KL", sunHours: 4.3, plf: 0.15, loadLimit: 0.9, kwhLimit: 1, transformerCap: 0.3 },
} as const satisfies Record<string, StateSolarData>;

/** Editable lookup table alias for average peak sun hours by state. */
export const stateSolarData = STATE_SOLAR_DATA;

export type StateName = keyof typeof STATE_SOLAR_DATA;
