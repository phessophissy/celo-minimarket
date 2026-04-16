import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './config/appkit'
import { initFarcasterSDK, signalReady } from './config/farcaster'
import './styles/index.css'

const queryClient = new QueryClient()

initFarcasterSDK().then((isMiniApp) => {
  console.log('Farcaster Mini App:', isMiniApp)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App onReady={signalReady} />
    </QueryClientProvider>
  </React.StrictMode>
)
