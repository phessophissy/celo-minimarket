# 🚀 Deploy CeloMiniMarket NFT Contract via Remix

## Step 1: Prepare Remix

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create a new file called `CeloMiniMarket.sol`
3. Copy the contents from `CeloMiniMarket-NFT-flattened.sol` in this project
4. Paste it into the Remix file

## Step 2: Compile the Contract

1. Click on the **Solidity Compiler** tab (left sidebar)
2. Select compiler version: **0.8.20**
3. Click **Compile CeloMiniMarket.sol**
4. Ensure compilation is successful ✅

## Step 3: Connect Your Wallet to Celo Network

1. Make sure MetaMask (or your wallet) is connected to **Celo Mainnet**
   - Network Name: `Celo Mainnet`
   - RPC URL: `https://rpc.ankr.com/celo`
   - Chain ID: `42220`
   - Currency Symbol: `CELO`
   - Block Explorer: `https://celoscan.io`

2. Or use **Celo Testnet (Alfajores)** for testing:
   - Network Name: `Celo Alfajores Testnet`
   - RPC URL: `https://alfajores-forno.celo-testnet.org`
   - Chain ID: `44787`
   - Currency Symbol: `CELO`
   - Block Explorer: `https://alfajores.celoscan.io`
   - Faucet: https://faucet.celo.org

## Step 4: Deploy the Contract

1. Click on the **Deploy & Run Transactions** tab
2. Select **Environment**: `Injected Provider - MetaMask`
3. Confirm your wallet is connected and showing the correct address
4. Select **Contract**: `CeloMiniMarket`
5. Click **Deploy** (orange button)
6. Confirm the transaction in your wallet
7. Wait for deployment confirmation
8. **COPY THE DEPLOYED CONTRACT ADDRESS** 📋

## Step 5: Update Frontend with New Contract Address

After deployment, you need to update the contract address in your frontend:

### Edit `frontend/src/App.jsx`:

Find this line (around line 7):
```javascript
const MARKET_ADDRESS = '0x1C824627899cFaeB4bb68101efa022917c93b923'
```

Replace it with your new contract address:
```javascript
const MARKET_ADDRESS = 'YOUR_NEW_CONTRACT_ADDRESS_HERE'
```

### Update the ABI:

1. The new ABI is already available at: `frontend/src/abi/CeloMiniMarket-NEW.json`
2. Replace the old ABI:
   ```bash
   cp frontend/src/abi/CeloMiniMarket-NEW.json frontend/src/abi/CeloMiniMarket.json
   ```

## Step 6: Restart Your Frontend

```bash
cd frontend
npm run dev
```

## 🎉 Done!

Your new NFT-based marketplace is now deployed and ready to use!

## Features of the New Contract:

✨ **NFT-Based Products**: Each product is minted as an ERC-721 NFT
🔥 **Burnable**: NFTs are automatically burned when products are purchased
📸 **On-Chain Images**: Product images are stored directly on-chain (base64)
🏷️ **On-Chain Metadata**: Product name and description stored on blockchain
💰 **Native Payment**: Purchases are made with native CELO (not cUSD in current version)

## Notes:

- The contract now uses **native CELO** for payments instead of cUSD
- Each product has a unique `tokenId` instead of just an `id`
- Vendors own the NFT until the product is sold
- Once sold, the NFT is permanently burned 🔥

## Testing Your Deployment:

1. Connect your wallet to the frontend
2. Add a product with an image (max 2MB)
3. Check that the NFT badge shows on the product card
4. Try purchasing a product (it will burn the NFT)
5. Verify the product disappears after purchase

## Troubleshooting:

- **Gas too high?** Image files stored on-chain can be expensive. Consider using smaller images or external storage (IPFS) for production.
- **Transaction fails?** Make sure you have enough CELO for gas fees
- **Can't see products?** Verify the contract address is correct and the ABI is updated
