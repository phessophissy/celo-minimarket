# Quick Start: Reown AppKit Integration

## For Developers New to This Project

### 1. Clone & Install
```bash
git clone <repository-url>
cd celo-minimarket-github
cd frontend
npm install
```

### 2. Setup Environment
Create `frontend/.env` file:
```env
VITE_REOWN_PROJECT_ID=3fbb6bba6f1de962d911bb5b5c9ddd26
```

> **Get Your Own Project ID (Recommended):**
> 1. Visit https://cloud.reown.com
> 2. Sign up (free)
> 3. Create new project
> 4. Copy Project ID
> 5. Replace in `.env` file

### 3. Run Development Server
```bash
npm run dev
```
Visit http://localhost:5173

### 4. Test Wallet Connection
1. Click "Connect Wallet" button
2. Choose your wallet (MetaMask, Valora, etc.)
3. Approve connection
4. You should see your address in the header

### 5. Test Adding Product
1. Connect wallet
2. Fill in product form
3. Click "Add Product"
4. Approve transaction in wallet
5. Wait for confirmation

## Supported Wallets

✅ MetaMask  
✅ Valora (Celo mobile wallet)  
✅ Coinbase Wallet  
✅ Rainbow Wallet  
✅ Any WalletConnect-compatible wallet  
✅ 100+ other wallets via AppKit  

## Networks Configured

- **Celo Mainnet** (Chain ID: 42220)
- **Celo Alfajores Testnet** (Chain ID: 44787)

## Key Files Modified

- `frontend/src/config/appkit.js` - AppKit configuration
- `frontend/src/main.jsx` - Provider setup
- `frontend/src/App.jsx` - Wallet hooks integration
- `frontend/.env` - Environment variables

## Common Issues

**Can't connect wallet:**
- Make sure your wallet supports Celo network
- Add Celo Mainnet to MetaMask manually if needed
- Try refreshing the page

**Transaction fails:**
- Ensure you're on Celo Mainnet (Chain ID 42220)
- Check you have CELO for gas fees
- Verify contract address is correct

**AppKit modal won't open:**
- Check console for errors
- Verify Project ID is set in `.env`
- Clear browser cache and try again

## Build for Production

```bash
npm run build
```

Output in `dist/` folder ready to deploy.

## Environment Variables for Production

When deploying to Vercel, Netlify, etc., add:
```
VITE_REOWN_PROJECT_ID=your_project_id_here
```

## Need Help?

- Read [REOWN_APPKIT_INTEGRATION.md](./REOWN_APPKIT_INTEGRATION.md) for details
- Check [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) for what changed
- Visit https://docs.reown.com/appkit for AppKit docs

## Code Examples

### Connect Wallet
```jsx
import { useAppKit } from '@reown/appkit/react'

const { open } = useAppKit()
<button onClick={() => open()}>Connect</button>
```

### Get Account
```jsx
import { useAppKitAccount } from '@reown/appkit/react'

const { address, isConnected } = useAppKitAccount()
console.log(address) // 0x1234...
console.log(isConnected) // true/false
```

### Send Transaction
```jsx
import { useAppKitProvider } from '@reown/appkit/react'
import { ethers } from 'ethers'

const { walletProvider } = useAppKitProvider('eip155')
const provider = new ethers.providers.Web3Provider(walletProvider)
const signer = provider.getSigner()
const tx = await contract.connect(signer).someFunction()
await tx.wait()
```

---

Happy coding! 🚀
