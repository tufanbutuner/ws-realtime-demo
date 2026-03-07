import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus } from './useTicker'

export interface ForexTickerState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
}

const POLL_INTERVAL = 60_000 // ms — free plan: 5 req/min

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
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!symbol) return

    setState({ price: null, status: 'connecting', lastUpdated: null })

    const ticker = toPolygonTicker(symbol)

    async function poll() {
      try {
        const res = await fetch(`/api/polygon/v2/aggs/ticker/${ticker}/prev`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json() as PolygonAggsResponse
        const close = data.results?.[0]?.c
        if (close == null) throw new Error('No price data')
        setState(s => ({
          ...s,
          status: 'connected',
          price: close,
          lastUpdated: new Date(),
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
