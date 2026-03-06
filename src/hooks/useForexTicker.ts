import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus, PricePoint } from './useTicker'

export interface ForexTickerState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
  history: PricePoint[]
}

const MAX_HISTORY = 100
const POLL_INTERVAL = 5_000 // ms
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string | undefined

/**
 * Derives the ISO quote currency from an OANDA symbol like "OANDA:USD_BRL" → "BRL"
 */
function quoteCurrencyFromSymbol(symbol: string): string {
  // "OANDA:USD_BRL" → "BRL"
  return symbol.split('_').pop() ?? symbol
}

/** Shared rates cache so all hooks share a single poll */
let cachedRates: Record<string, number> = {}
let cacheTime = 0
let inflightPromise: Promise<Record<string, number>> | null = null

async function fetchRates(): Promise<Record<string, number>> {
  if (inflightPromise) return inflightPromise
  inflightPromise = fetch(
    `https://finnhub.io/api/v1/forex/rates?base=USD&token=${API_KEY}`
  )
    .then(r => r.json())
    .then((data: { quote?: Record<string, number> }) => {
      cachedRates = data.quote ?? {}
      cacheTime = Date.now()
      inflightPromise = null
      return cachedRates
    })
    .catch(() => {
      inflightPromise = null
      return cachedRates
    })
  return inflightPromise
}

export function useForexTicker(symbol: string): ForexTickerState {
  const [state, setState] = useState<ForexTickerState>({
    price: null,
    status: 'connecting',
    lastUpdated: null,
    history: [],
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      const id = setTimeout(() => setState(s => ({ ...s, status: 'error' })), 0)
      return () => clearTimeout(id)
    }

    const currency = quoteCurrencyFromSymbol(symbol)

    function applyRate(rates: Record<string, number>) {
      const rate = rates[currency]
      if (rate == null) return
      const now = Date.now()
      setState(s => ({
        ...s,
        status: 'connected',
        price: rate,
        lastUpdated: new Date(),
        history: [...s.history, { time: now, price: rate }].slice(-MAX_HISTORY),
      }))
    }

    // Use cached rates immediately if fresh (< 10s old)
    if (Date.now() - cacheTime < 10_000 && Object.keys(cachedRates).length) {
      applyRate(cachedRates)
    }

    fetchRates().then(applyRate)

    timerRef.current = setInterval(() => {
      fetchRates().then(applyRate)
    }, POLL_INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [symbol])

  return state
}
