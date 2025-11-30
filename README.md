# Celo MiniMarket 🛒

Ultra-minimal, on-chain marketplace on Celo Mainnet with full storage.

> **🎉 Now powered by Reown AppKit!** Modern wallet connection supporting 100+ wallets including MetaMask, Valora, WalletConnect, and more. [See integration guide](./REOWN_APPKIT_INTEGRATION.md)

## 📁 Project Structure

```
celo-minimarket/
├── contracts/           # Smart contracts
│   └── CeloMiniMarket.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── frontend/           # React frontend
│   └── src/
│       ├── abi/       # Contract ABI
│       ├── App.jsx    # Main app
│       └── main.jsx   # Entry point
├── .env               # Environment variables
└── hardhat.config.js  # Hardhat configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js & npm installed
- CELO and cUSD in your wallet
- Private key ready for deployment

### 1. Smart Contract Deployment

Compile the contract:
```bash
npx hardhat compile
```

Deploy to Celo Mainnet:
```bash
npx hardhat run scripts/deploy.js --network celo
```

**Important:** Copy the deployed contract address!

### 2. Update Frontend Configuration

After deployment, update the contract address in `frontend/src/App.jsx`:

```javascript
const MARKET_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
```

Also copy the ABI from `artifacts/contracts/CeloMiniMarket.sol/CeloMiniMarket.json` to `frontend/src/abi/CeloMiniMarket.json`.

### 3. Run Frontend

```bash
cd frontend
npm install  # Install dependencies (including Reown AppKit)
npm run dev
```

**First time setup:** Create `frontend/.env` file with your Reown project ID:
```env
VITE_REOWN_PROJECT_ID=your_project_id_here
```
Get a free project ID at [cloud.reown.com](https://cloud.reown.com)

Visit `http://localhost:5173`

### 4. Build for Production

```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## 🔑 Environment Variables

Create `.env` file in root:
```
CELO_MAINNET_RPC=https://forno.celo.org
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

**⚠️ Never commit `.env` to git!**

## 💰 Token Addresses

- **cUSD (Mainnet):** `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **Network:** Celo Mainnet (Chain ID: 42220)
- **Explorer:** https://celoscan.io

## 📝 Smart Contract Features

- **addProduct:** Vendors add products with name, price, description
- **toggleProduct:** Vendors activate/deactivate their products
- **getActiveProducts:** Fetch all active products
- **On-chain storage:** All data stored on Celo blockchain

## 🌐 Frontend Features

- **Modern Wallet Connection:** Reown AppKit with support for 100+ wallets
- Connect Celo wallet (MetaMask, Valora, WalletConnect, and more)
- Add products to marketplace
- Browse active products
- Buy products with cUSD (direct transfer to vendor)
- Mobile-responsive design

## ✅ Pre-Launch Checklist

- [ ] Tested on Alfajores testnet
- [ ] Got CELO & cUSD on mainnet
- [ ] Deployed contract to mainnet
- [ ] Copied contract address to frontend
- [ ] Copied ABI to frontend
- [ ] Built and tested frontend locally
- [ ] Deployed frontend to hosting platform

## 🔧 Optional Improvements

- Add product images (IPFS)
- Implement search/filter
- Add vendor profiles
- Display wallet balance
- Add notifications (react-toastify)
- Contract verification on Celoscan

## 📚 Resources

- [Reown AppKit Integration Guide](./REOWN_APPKIT_INTEGRATION.md)
- [Reown Cloud (Get Project ID)](https://cloud.reown.com)
- [Celo Docs](https://docs.celo.org)
- [Hardhat](https://hardhat.org)
- [Celoscan](https://celoscan.io)
- [Faucet (Testnet)](https://faucet.celo.org)

## 🆘 Troubleshooting

**Contract deployment fails:**
- Check you have CELO in your wallet for gas
- Verify `.env` has correct private key
- Ensure RPC URL is correct

**Frontend can't connect:**
- Install Celo-compatible wallet (MetaMask with Celo network)
- Add Celo Mainnet to your wallet
- Check contract address is correct in App.jsx

**Transactions fail:**
- Ensure you have cUSD for payments
- Check you're on Celo Mainnet (Chain ID 42220)
- Verify contract ABI matches deployed contract

## 📄 License

MIT
