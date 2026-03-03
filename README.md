# XRP Tracker

Real-time XRP/GBP price tracker using the Kraken WebSocket API.

## Stack

- React 19 + TypeScript + Vite
- shadcn/ui + Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

## How it works

A custom hook (`src/hooks/useXrpPrice.ts`) opens a WebSocket connection to `wss://ws.kraken.com/v2` and subscribes to the Kraken `ticker` channel for `XRP/GBP`. The price updates in real time as trades occur.
