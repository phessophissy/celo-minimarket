import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { celo, celoAlfajores } from '@reown/appkit/networks'

// Get your projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '7f100a30681d28871c0aaa5d1f6d1121'

const metadata = {
  name: 'Celo MiniMarket',
  description: 'Decentralized marketplace on Celo blockchain',
  url: 'https://celo-minimarket.vercel.app',
  icons: ['https://celo-minimarket.vercel.app/logo.svg']
}

// Create the networks configuration
const networks = [celo, celoAlfajores]

// Create the Ethers5 adapter
const ethers5Adapter = new Ethers5Adapter()

// Create the AppKit instance
export const appKit = createAppKit({
  adapters: [ethers5Adapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: []
  },
  defaultNetwork: celo,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#FBCC5C', // Celo yellow
    '--w3m-border-radius-master': '2px'
  }
})

export { projectId, metadata }
