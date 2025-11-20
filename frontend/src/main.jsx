import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContractKitProvider, Alfajores, Mainnet } from '@celo-tools/use-contractkit'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'Celo MiniMarket',
        description: 'On-chain community marketplace',
        url: 'https://celo-minimarket.vercel.app',
        icon: 'https://celo-minimarket.vercel.app/logo.svg',
      }}
      networks={[Mainnet, Alfajores]}
      network={{
        ...Mainnet,
        rpcUrl: 'https://rpc.ankr.com/celo'
      }}
    >
      <App />
    </ContractKitProvider>
  </React.StrictMode>
)


