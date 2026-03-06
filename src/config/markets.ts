export interface Market {
  /** "forex" uses Finnhub/OANDA WS; "crypto" uses Kraken WS */
  type: "forex" | "crypto";
  /** Symbol passed to the appropriate hook */
  symbol: string;
  /** Short label shown in the panel header e.g. "USD / BRL" */
  label: string;
  /** Abbreviation shown in the sidebar e.g. "BRL" */
  abbr: string;
  /** Full name */
  name: string;
  /** Sidebar grouping */
  region: string;
}

export const EMERGING_MARKETS: Market[] = [
  // Latin America
  { type: "forex", symbol: "OANDA:USD_BRL", label: "USD / BRL", abbr: "BRL", name: "Brazilian Real",       region: "Latin America" },
  { type: "forex", symbol: "OANDA:USD_MXN", label: "USD / MXN", abbr: "MXN", name: "Mexican Peso",         region: "Latin America" },
  { type: "forex", symbol: "OANDA:USD_COP", label: "USD / COP", abbr: "COP", name: "Colombian Peso",       region: "Latin America" },
  { type: "forex", symbol: "OANDA:USD_CLP", label: "USD / CLP", abbr: "CLP", name: "Chilean Peso",         region: "Latin America" },
  // Asia
  { type: "forex", symbol: "OANDA:USD_INR", label: "USD / INR", abbr: "INR", name: "Indian Rupee",         region: "Asia" },
  { type: "forex", symbol: "OANDA:USD_IDR", label: "USD / IDR", abbr: "IDR", name: "Indonesian Rupiah",    region: "Asia" },
  { type: "forex", symbol: "OANDA:USD_PHP", label: "USD / PHP", abbr: "PHP", name: "Philippine Peso",      region: "Asia" },
  { type: "forex", symbol: "OANDA:USD_THB", label: "USD / THB", abbr: "THB", name: "Thai Baht",            region: "Asia" },
  // EMEA
  { type: "forex", symbol: "OANDA:USD_ZAR", label: "USD / ZAR", abbr: "ZAR", name: "South African Rand",   region: "EMEA" },
  { type: "forex", symbol: "OANDA:USD_TRY", label: "USD / TRY", abbr: "TRY", name: "Turkish Lira",         region: "EMEA" },
  { type: "forex", symbol: "OANDA:USD_EGP", label: "USD / EGP", abbr: "EGP", name: "Egyptian Pound",       region: "EMEA" },
  { type: "forex", symbol: "OANDA:USD_NGN", label: "USD / NGN", abbr: "NGN", name: "Nigerian Naira",       region: "EMEA" },
  // Crypto
  { type: "crypto", symbol: "XRP/USD", label: "XRP / USD", abbr: "XRP", name: "Ripple",   region: "Crypto" },
  { type: "crypto", symbol: "BTC/USD", label: "BTC / USD", abbr: "BTC", name: "Bitcoin",  region: "Crypto" },
  { type: "crypto", symbol: "ADA/USD", label: "ADA / USD", abbr: "ADA", name: "Cardano",  region: "Crypto" },
];
