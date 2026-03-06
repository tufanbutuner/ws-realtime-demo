export interface Market {
  symbol: string;   // Kraken symbol e.g. "SOL/USD"
  label: string;    // Display name e.g. "Solana"
  abbr: string;     // Ticker abbreviation e.g. "SOL"
  region: string;   // Thematic grouping
}

/** Most-traded emerging-market / altcoin pairs on Kraken */
export const EMERGING_MARKETS: Market[] = [
  { symbol: "SOL/USD",  label: "Solana",       abbr: "SOL",  region: "Layer 1"  },
  { symbol: "DOT/USD",  label: "Polkadot",     abbr: "DOT",  region: "Layer 1"  },
  { symbol: "AVAX/USD", label: "Avalanche",    abbr: "AVAX", region: "Layer 1"  },
  { symbol: "MATIC/USD",label: "Polygon",      abbr: "MATIC",region: "Layer 2"  },
  { symbol: "LINK/USD", label: "Chainlink",    abbr: "LINK", region: "DeFi"     },
  { symbol: "UNI/USD",  label: "Uniswap",      abbr: "UNI",  region: "DeFi"     },
  { symbol: "ATOM/USD", label: "Cosmos",       abbr: "ATOM", region: "Layer 1"  },
  { symbol: "NEAR/USD", label: "NEAR Protocol",abbr: "NEAR", region: "Layer 1"  },
  { symbol: "FIL/USD",  label: "Filecoin",     abbr: "FIL",  region: "Storage"  },
  { symbol: "ALGO/USD", label: "Algorand",     abbr: "ALGO", region: "Layer 1"  },
  { symbol: "ICP/USD",  label: "Internet Computer", abbr: "ICP", region: "Layer 1" },
  { symbol: "XLM/USD",  label: "Stellar",      abbr: "XLM",  region: "Payments" },
];
