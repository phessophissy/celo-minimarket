import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './config/appkit' // Initialize AppKit
import { initFarcasterSDK, signalReady } from './config/farcaster' // Farcaster Mini App SDK

// Create a client for react-query (required by AppKit)
const queryClient = new QueryClient()

// Initialize Farcaster SDK if running as Mini App
initFarcasterSDK().then((isMiniApp) => {
  console.log('Farcaster Mini App initialized:', isMiniApp)
})

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App onReady={signalReady} />
    </QueryClientProvider>
  </React.StrictMode>
)



