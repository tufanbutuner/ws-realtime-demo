export interface Market {
  /** Finnhub symbol e.g. "OANDA:USD_BRL" */
  symbol: string;
  /** Short label shown in the panel header e.g. "USD / BRL" */
  label: string;
  /** Abbreviation shown in the sidebar e.g. "BRL" */
  abbr: string;
  /** Full country/currency name */
  name: string;
  /** Thematic grouping */
  region: string;
}

/**
 * Emerging-market forex pairs, all quoted against USD via OANDA on Finnhub.
 * Finnhub symbol format: "OANDA:BASE_QUOTE"
 */
export const EMERGING_MARKETS: Market[] = [
  // Latin America
  { symbol: "OANDA:USD_BRL", label: "USD / BRL", abbr: "BRL", name: "Brazilian Real",      region: "Latin America" },
  { symbol: "OANDA:USD_MXN", label: "USD / MXN", abbr: "MXN", name: "Mexican Peso",        region: "Latin America" },
  { symbol: "OANDA:USD_COP", label: "USD / COP", abbr: "COP", name: "Colombian Peso",      region: "Latin America" },
  { symbol: "OANDA:USD_CLP", label: "USD / CLP", abbr: "CLP", name: "Chilean Peso",        region: "Latin America" },
  // Asia
  { symbol: "OANDA:USD_INR", label: "USD / INR", abbr: "INR", name: "Indian Rupee",        region: "Asia" },
  { symbol: "OANDA:USD_IDR", label: "USD / IDR", abbr: "IDR", name: "Indonesian Rupiah",   region: "Asia" },
  { symbol: "OANDA:USD_PHP", label: "USD / PHP", abbr: "PHP", name: "Philippine Peso",     region: "Asia" },
  { symbol: "OANDA:USD_THB", label: "USD / THB", abbr: "THB", name: "Thai Baht",           region: "Asia" },
  // EMEA
  { symbol: "OANDA:USD_ZAR", label: "USD / ZAR", abbr: "ZAR", name: "South African Rand",  region: "EMEA" },
  { symbol: "OANDA:USD_TRY", label: "USD / TRY", abbr: "TRY", name: "Turkish Lira",        region: "EMEA" },
  { symbol: "OANDA:USD_EGP", label: "USD / EGP", abbr: "EGP", name: "Egyptian Pound",      region: "EMEA" },
  { symbol: "OANDA:USD_NGN", label: "USD / NGN", abbr: "NGN", name: "Nigerian Naira",      region: "EMEA" },
];
