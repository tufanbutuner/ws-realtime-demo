import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SaltProvider } from '@salt-ds/core'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SaltProvider>
      <App />
    </SaltProvider>
  </StrictMode>,
)
