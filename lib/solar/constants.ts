/** Vikram simple-calculator default system cost in ₹ per kW. */
export const COST_PER_KW = 55_000;

/** Vikram simple-calculator roof area assumption in sq ft per kW. */
export const AREA_PER_KW = 95;

/**
 * Performance ratio (0–1) accounting for inverter losses, temperature
 * derating, soiling, and wiring losses. Applied to theoretical generation.
 */
export const PERFORMANCE_RATIO = 0.88;

/** kg of CO₂ avoided per kWh of solar electricity generated (grid displacement). */
export const CO2_PER_KWH = 0.82;

/** kg of CO₂ absorbed by one tree per year (used for trees-equivalent metric). */
export const CO2_PER_TREE_YEAR = 21;

/** Vikram calculator module capacity in kW (0.33 kW = 330 W). */
export const PANEL_WATTAGE = 0.33;

/** Sizing correction factor applied to raw system size (10 % buffer). */
export const SIZING_CORRECTION_FACTOR = 1.1;

/** Minimum recommended system size in kW. */
export const MIN_SYSTEM_KW = 0.5;

/** Rounding increment for recommended system size in kW. */
export const SYSTEM_SIZE_ROUNDING_KW = 0.5;

/** Days per month used to derive average daily consumption. */
export const DAYS_PER_MONTH = 30;

/** Simple-calculator annual tariff escalation used for year-one bill display. */
export const TARIFF_INCREASE_RATE = 0.03;

/** Simple-calculator taxes and charges percentage applied to the base bill. */
export const TAXES_AND_CHARGES_RATE = 0.12;

/** Vikram simple-calculator correction factor. */
export const CORRECTION_FACTOR = 1;

/** Vikram simple-calculator Residential subsidy multiplier (30% off net cost). */
export const RESIDENTIAL_SUBSIDY_DISCOUNT = 0.3;

/** PM Surya Ghar subsidy rate for the first 2 kW (₹/kW). */
export const SUBSIDY_RATE_FIRST_2_KW = 30_000;

/** PM Surya Ghar subsidy rate for the 3rd kW (₹/kW). */
export const SUBSIDY_RATE_THIRD_KW = 18_000;

/** Maximum total PM Surya Ghar subsidy cap in ₹. */
export const SUBSIDY_CAP = 78_000;

/** kW threshold above which subsidy applies only to the first 3 kW. */
export const SUBSIDY_MAX_KW = 3;

/**
 * Master toggle for PM Surya Ghar subsidy (Residential only).
 * Set to `false` to disable subsidy across all calculations.
 */
export const SUBSIDY_ENABLED = true;
