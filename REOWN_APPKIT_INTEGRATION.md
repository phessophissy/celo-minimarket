# Reown AppKit Integration Guide

## Overview
Celo MiniMarket has been successfully migrated from `@celo-tools/use-contractkit` to **Reown AppKit** (formerly WalletConnect AppKit). This provides a modern, well-maintained wallet connection solution with support for multiple wallets.

## What Changed

### 1. Dependencies Updated
**Removed:**
- `@celo-tools/use-contractkit` (deprecated)
- `@celo/contractkit` (old SDK)

**Added:**
- `@reown/appkit` - Core AppKit SDK
- `@reown/appkit-adapter-ethers5` - Ethers v5 adapter
- `@tanstack/react-query` - Required for AppKit
- `viem` - Modern Ethereum library

### 2. Configuration
A new configuration file was created at `src/config/appkit.js`:
- Configures Celo Mainnet and Alfajores testnet
- Sets up project metadata
- Initializes the Ethers5 adapter
- Customizes theme with Celo branding

### 3. Provider Setup
**Before:** `main.jsx` used `ContractKitProvider`
**After:** Uses `QueryClientProvider` with AppKit auto-initialized via import

### 4. Hook Changes
**Before:**
```jsx
const { address, kit, connect, destroy } = useContractKit()
```

**After:**
```jsx
const { open } = useAppKit()
const { address, isConnected } = useAppKitAccount()
const { walletProvider } = useAppKitProvider('eip155')
```

### 5. Wallet Connection
- **Connect:** Call `open()` to show the AppKit modal
- **Disconnect:** Click the connected address button to access disconnect
- **Account:** Use `address` and `isConnected` from `useAppKitAccount()`

### 6. Provider & Signer
The provider now:
- Uses `walletProvider` from AppKit when connected
- Falls back to public RPC for read-only operations
- Creates signers from the wallet provider for transactions

## Configuration

### Environment Variables
Create a `.env` file in the `frontend/` directory:

```env
VITE_REOWN_PROJECT_ID=your_project_id_here
```

**Get Your Project ID:**
1. Visit https://cloud.reown.com
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Update `.env` file

> A default project ID is included for testing, but you should create your own for production.

## Features

### Supported Wallets
Reown AppKit supports:
- MetaMask
- Valora (Celo's mobile wallet)
- Coinbase Wallet
- WalletConnect-compatible wallets
- Rainbow Wallet
- And many more...

### Network Support
- ✅ Celo Mainnet (Chain ID: 42220)
- ✅ Celo Alfajores Testnet (Chain ID: 44787)

### Theme Customization
The AppKit modal is themed with Celo colors:
- Accent color: `#FBCC5C` (Celo yellow)
- Border radius: `2px` (minimal design)
- Light mode by default

## Usage

### Connect Wallet
```jsx
import { useAppKit } from '@reown/appkit/react'

function MyComponent() {
  const { open } = useAppKit()
  
  return <button onClick={() => open()}>Connect Wallet</button>
}
```

### Get Connected Account
```jsx
import { useAppKitAccount } from '@reown/appkit/react'

function MyComponent() {
  const { address, isConnected } = useAppKitAccount()
  
  if (!isConnected) return <p>Please connect wallet</p>
  return <p>Connected: {address}</p>
}
```

### Get Provider for Transactions
```jsx
import { useAppKitProvider } from '@reown/appkit/react'
import { ethers } from 'ethers'

function MyComponent() {
  const { walletProvider } = useAppKitProvider('eip155')
  
  const sendTransaction = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
    const signer = ethersProvider.getSigner()
    // Use signer for transactions...
  }
}
```

## Development

### Running the App
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
npm run preview  # Preview production build
```

## Migration Benefits

1. **Better Maintenance:** Reown AppKit is actively maintained
2. **More Wallets:** Support for 100+ wallets out of the box
3. **Better UX:** Modern, responsive wallet selection modal
4. **Cross-Platform:** Works on mobile and desktop
5. **Security:** Regular security updates and audits
6. **Analytics:** Optional usage analytics via Reown Cloud
7. **Future-Proof:** Built on modern Web3 standards

## Troubleshooting

### "Project ID is required"
Make sure you've set `VITE_REOWN_PROJECT_ID` in your `.env` file.

### Wallet Not Connecting
1. Check if you're on the correct network (Celo Mainnet or Alfajores)
2. Try refreshing the page
3. Clear browser cache and reconnect
4. Make sure your wallet supports Celo network

### Transaction Failing
1. Ensure you're connected to the correct network
2. Check you have sufficient CELO for gas fees
3. Verify contract address is correct
4. Check console for detailed error messages

## Resources

- [Reown AppKit Docs](https://docs.reown.com/appkit/overview)
- [Reown Cloud Dashboard](https://cloud.reown.com)
- [Celo Documentation](https://docs.celo.org)
- [Ethers.js v5 Docs](https://docs.ethers.org/v5/)

## Support

For issues related to:
- **AppKit:** https://github.com/reown-com/appkit
- **Celo:** https://discord.gg/celo
- **This Project:** Open an issue on the repository

---

**Note:** This integration uses Ethers v5 adapter. If you upgrade to Ethers v6, you'll need to use `@reown/appkit-adapter-ethers` instead.
