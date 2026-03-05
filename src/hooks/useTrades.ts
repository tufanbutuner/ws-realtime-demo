import { useEffect, useRef, useState } from 'react'
import type { ConnectionStatus } from './useTicker'

export interface Trade {
  id: string
  time: Date
  price: number
  qty: number
  side: 'buy' | 'sell'
  ord_type: string
}

export interface TradesState {
  trades: Trade[]
  status: ConnectionStatus
  updatesPerMin: number
}

const WS_URL = 'wss://ws.kraken.com/v2'
const MAX_TRADES = 200

export function useTrades(symbol: string): TradesState {
  const [state, setState] = useState<TradesState>({ trades: [], status: 'connecting', updatesPerMin: 0 })
  const updateTimestamps = useRef<number[]>([])

  useEffect(() => {
    const ws = new WebSocket(WS_URL)

    ws.onopen = () => {
      setState(s => ({ ...s, status: 'connected' }))
      ws.send(JSON.stringify({
        method: 'subscribe',
        params: { channel: 'trade', symbol: [symbol], snapshot: true },
      }))
    }

    ws.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data as string) as KrakenTradeMessage
      if (msg.channel !== 'trade' || !Array.isArray(msg.data)) return

      const incoming: Trade[] = msg.data.map((t, i) => ({
        id: `${t.trade_id ?? t.timestamp}-${i}`,
        time: new Date(t.timestamp),
        price: t.price,
        qty: t.qty,
        side: t.side,
        ord_type: t.ord_type ?? '',
      }))

      const now = Date.now()
      updateTimestamps.current = [...updateTimestamps.current, now].filter(t => now - t < 60_000)
      const updatesPerMin = updateTimestamps.current.length

      setState(s => ({
        ...s,
        trades: [...incoming, ...s.trades].slice(0, MAX_TRADES),
        updatesPerMin,
      }))
    }

    ws.onerror = () => setState(s => ({ ...s, status: 'error' }))
    ws.onclose = () => setState(s => ({ ...s, status: 'disconnected' }))

    return () => { ws.close() }
  }, [symbol])

  return state
}

interface KrakenTradeEvent {
  trade_id?: number
  timestamp: string
  price: number
  qty: number
  side: 'buy' | 'sell'
  ord_type?: string
}

interface KrakenTradeMessage {
  channel?: string
  type?: string
  data?: KrakenTradeEvent[]
}
