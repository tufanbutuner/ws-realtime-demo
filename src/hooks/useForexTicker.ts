import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus, PricePoint } from './useTicker'

export interface ForexTickerState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
  history: PricePoint[]
}

const MAX_HISTORY = 100
const API_KEY = import.meta.env.VITE_POLYGON_API_KEY as string | undefined

/**
 * Converts an OANDA symbol like "OANDA:USD_BRL" to a Polygon forex ticker "C.USDBRL"
 */
function toPolygonTicker(symbol: string): string {
  // "OANDA:USD_BRL" → ["USD", "BRL"] → "C.USDBRL"
  const pair = symbol.includes(':') ? symbol.split(':')[1] : symbol
  return 'C.' + pair.replace('_', '')
}

export function useForexTicker(symbol: string): ForexTickerState {
  const [state, setState] = useState<ForexTickerState>({
    price: null,
    status: 'connecting',
    lastUpdated: null,
    history: [],
  })
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      setState(s => ({ ...s, status: 'error' }))
      return
    }

    const ticker = toPolygonTicker(symbol)
    const ws = new WebSocket('wss://socket.polygon.io/forex')
    wsRef.current = ws

    ws.onopen = () => {
      // Polygon requires auth before subscribe
    }

    ws.onmessage = (event: MessageEvent) => {
      const messages = JSON.parse(event.data as string) as PolygonMessage[]
      for (const msg of messages) {
        if (msg.ev === 'connected') {
          ws.send(JSON.stringify({ action: 'auth', params: API_KEY }))
        } else if (msg.ev === 'auth_success') {
          setState(s => ({ ...s, status: 'connected' }))
          ws.send(JSON.stringify({ action: 'subscribe', params: ticker }))
        } else if (msg.ev === 'auth_failed') {
          setState(s => ({ ...s, status: 'error' }))
        } else if (msg.ev === 'C' && msg.p != null) {
          // Forex quote: p = ask price, b = bid price — use mid
          const bid = msg.b ?? msg.p
          const ask = msg.p
          const mid = (bid + ask) / 2
          const now = Date.now()
          setState(s => ({
            ...s,
            price: mid,
            lastUpdated: new Date(),
            history: [...s.history, { time: now, price: mid }].slice(-MAX_HISTORY),
          }))
        }
      }
    }

    ws.onerror = () => setState(s => ({ ...s, status: 'error' }))
    ws.onclose = () => setState(s => ({ ...s, status: 'disconnected' }))

    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [symbol])

  return state
}

interface PolygonMessage {
  ev?: string
  // Forex quote fields
  p?: number  // ask price
  b?: number  // bid price
  s?: string  // symbol
  t?: number  // timestamp
}
