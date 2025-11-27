# Quick Start: Deploy New Contract

## ⚡ Fast Track (3 Steps)

### 1️⃣ Deploy via Remix
- Open the file: `CeloMiniMarket-NFT-flattened.sol`
- Copy its contents to [Remix IDE](https://remix.ethereum.org)
- Compile with Solidity 0.8.20
- Deploy to Celo network
- **Copy the deployed contract address**

### 2️⃣ Update Frontend
Run this command with your new contract address:

```bash
./update-contract-address.sh 0xYOUR_NEW_CONTRACT_ADDRESS
```

### 3️⃣ Restart Frontend
```bash
cd frontend
npm run dev
```

## 📚 Full Instructions
See `REMIX_DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.

## 🎯 What Changed in the New Contract?

### NFT Features:
- ✅ Each product is an ERC-721 NFT
- ✅ Product images stored on-chain (base64)
- ✅ Product names stored on-chain
- ✅ NFTs are burned when purchased
- ✅ On-chain metadata (name, description, image)

### Payment Changes:
- ⚠️ Now uses **native CELO** instead of cUSD
- Users pay with CELO when purchasing products
- Payment is sent directly to vendor
- NFT is automatically burned after purchase

## 🔍 Manual Update (Alternative)

If you prefer to update manually:

1. Edit `frontend/src/App.jsx` line 7:
   ```javascript
   const MARKET_ADDRESS = '0xYOUR_NEW_ADDRESS'
   ```

2. Update ABI:
   ```bash
   cp frontend/src/abi/CeloMiniMarket-NEW.json frontend/src/abi/CeloMiniMarket.json
   ```

## 🎨 UI Enhancements Included

- Floating transparent balloons animation
- Enhanced gradient backgrounds
- NFT badges on product cards
- Image upload with preview
- Modern sleek design
- Improved responsive layout

Happy deploying! 🚀
