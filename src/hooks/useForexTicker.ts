import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus, PricePoint } from './useTicker'

export interface ForexTickerState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
  history: PricePoint[]
}

const MAX_HISTORY = 100
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string | undefined

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

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`)
    wsRef.current = ws

    ws.onopen = () => {
      setState(s => ({ ...s, status: 'connected' }))
      ws.send(JSON.stringify({ type: 'subscribe', symbol }))
    }

    ws.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data as string) as FinnhubMessage
      if (msg.type !== 'trade' || !msg.data?.length) return

      // Use the last trade in the batch
      const trade = msg.data[msg.data.length - 1]
      if (trade.p == null) return

      const now = Date.now()
      setState(s => ({
        ...s,
        price: trade.p,
        lastUpdated: new Date(),
        history: [...s.history, { time: now, price: trade.p }].slice(-MAX_HISTORY),
      }))
    }

    ws.onerror = () => setState(s => ({ ...s, status: 'error' }))
    ws.onclose = () => setState(s => ({ ...s, status: 'disconnected' }))

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'unsubscribe', symbol }))
      }
      ws.close()
    }
  }, [symbol])

  return state
}

interface FinnhubTrade {
  p: number   // price
  s: string   // symbol
  t: number   // timestamp ms
  v: number   // volume
}

interface FinnhubMessage {
  type: string
  data?: FinnhubTrade[]
}
