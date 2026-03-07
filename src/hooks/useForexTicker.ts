import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus, PricePoint } from './useTicker'

export interface ForexTickerState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
  history: PricePoint[]
}

const MAX_HISTORY = 100
const POLL_INTERVAL = 60_000 // ms — free plan: 5 req/min
const API_KEY = import.meta.env.VITE_POLYGON_API_KEY as string | undefined

/**
 * Converts an OANDA symbol like "OANDA:USD_BRL" to a Polygon forex ticker "C:USDBRL"
 */
function toPolygonTicker(symbol: string): string {
  const pair = symbol.includes(':') ? symbol.split(':')[1] : symbol
  return 'C:' + pair.replace('_', '')
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
    if (!symbol) return

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      setState(s => ({ ...s, status: 'error' }))
      return
    }

    setState({ price: null, status: 'connecting', lastUpdated: null, history: [] })

    const ticker = toPolygonTicker(symbol)

    async function poll() {
      try {
        const res = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${API_KEY}`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json() as PolygonAggsResponse
        const close = data.results?.[0]?.c
        if (close == null) throw new Error('No price data')
        const now = Date.now()
        setState(s => ({
          ...s,
          status: 'connected',
          price: close,
          lastUpdated: new Date(),
          history: [...s.history, { time: now, price: close }].slice(-MAX_HISTORY),
        }))
      } catch {
        setState(s => ({ ...s, status: 'error' }))
      }
    }

    poll()
    timerRef.current = setInterval(poll, POLL_INTERVAL)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [symbol])

  return state
}

interface PolygonAggsResponse {
  results?: { c: number }[]
}
