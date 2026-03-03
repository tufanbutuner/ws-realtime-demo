import { useEffect, useRef, useState } from 'react'

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface XrpPriceState {
  price: number | null
  status: ConnectionStatus
  lastUpdated: Date | null
}

const WS_URL = 'wss://ws.kraken.com/v2'

const SUBSCRIBE_MSG = JSON.stringify({
  method: 'subscribe',
  params: {
    channel: 'ticker',
    symbol: ['XRP/GBP'],
  },
})

export function useXrpPrice(): XrpPriceState {
  const [price, setPrice] = useState<number | null>(null)
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      setStatus('connected')
      ws.send(SUBSCRIBE_MSG)
    }

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as string) as KrakenMessage
      if (data.channel === 'ticker' && data.type === 'update' && Array.isArray(data.data)) {
        const ticker = data.data[0]
        if (ticker?.last !== undefined) {
          setPrice(ticker.last)
          setLastUpdated(new Date())
        }
      }
    }

    ws.onerror = () => {
      setStatus('error')
    }

    ws.onclose = () => {
      setStatus('disconnected')
    }

    return () => {
      ws.close()
    }
  }, [])

  return { price, status, lastUpdated }
}

interface KrakenTickerData {
  last: number
  [key: string]: unknown
}

interface KrakenMessage {
  channel?: string
  type?: string
  data?: KrakenTickerData[]
  [key: string]: unknown
}
