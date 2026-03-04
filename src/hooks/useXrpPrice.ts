import { useEffect, useRef, useState } from 'react'

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface PricePoint {
  time: number
  price: number
}

export interface XrpPriceState {
  price: number | null
  high: number | null
  low: number | null
  volume: number | null
  trades: number | null
  updatesPerMin: number
  status: ConnectionStatus
  lastUpdated: Date | null
  history: PricePoint[]
}

const WS_URL = 'wss://ws.kraken.com/v2'
const MAX_HISTORY = 100

const SUBSCRIBE_MSG = JSON.stringify({
  method: 'subscribe',
  params: {
    channel: 'ticker',
    symbol: ['XRP/GBP'],
  },
})

export function useXrpPrice(): XrpPriceState {
  const [state, setState] = useState<XrpPriceState>({
    price: null,
    high: null,
    low: null,
    volume: null,
    trades: null,
    updatesPerMin: 0,
    status: 'connecting',
    lastUpdated: null,
    history: [],
  })
  const wsRef = useRef<WebSocket | null>(null)
  const updateTimestamps = useRef<number[]>([])

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      setState(s => ({ ...s, status: 'connected' }))
      ws.send(SUBSCRIBE_MSG)
    }

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as string) as KrakenMessage
      if (data.channel === 'ticker' && Array.isArray(data.data)) {
        const ticker = data.data[0]
        if (!ticker) return
        const now = Date.now()

        // Track update timestamps for updates/min calculation
        updateTimestamps.current = [...updateTimestamps.current, now].filter(t => now - t < 60_000)
        const updatesPerMin = updateTimestamps.current.length

        setState(s => ({
          ...s,
          price: ticker.last ?? s.price,
          high: ticker.high ?? s.high,
          low: ticker.low ?? s.low,
          volume: ticker.volume ?? s.volume,
          trades: ticker.trades ?? s.trades,
          updatesPerMin,
          lastUpdated: new Date(),
          history: ticker.last !== undefined
            ? [...s.history, { time: now, price: ticker.last }].slice(-MAX_HISTORY)
            : s.history,
        }))
      }
    }

    ws.onerror = () => {
      setState(s => ({ ...s, status: 'error' }))
    }

    ws.onclose = () => {
      setState(s => ({ ...s, status: 'disconnected' }))
    }

    return () => {
      ws.close()
    }
  }, [])

  return state
}

interface KrakenTickerData {
  last?: number
  high?: number
  low?: number
  volume?: number
  trades?: number
  [key: string]: unknown
}

interface KrakenMessage {
  channel?: string
  type?: string
  data?: KrakenTickerData[]
  [key: string]: unknown
}
