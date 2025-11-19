import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContractKitProvider, Mainnet, NetworkNames } from '@celo-tools/use-contractkit'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'Celo MiniMarket',
        description: 'On-chain community marketplace',
        url: 'https://yourdomain.com',
        icon: 'https://placehold.co/64',
      }}
      network={{
        name: NetworkNames.Mainnet,
        rpcUrl: 'https://forno.celo.org',
        explorer: 'https://celoscan.io',
        chainId: 42220,
      }}
      networks={[Mainnet]}
      defaultNetwork={Mainnet}
    >
      <App />
    </ContractKitProvider>
  </React.StrictMode>
)
