# 🚀 Deployment Guide - Celo MiniMarket

## Step-by-Step Mainnet Deployment

### Phase 1: Prepare Environment

1. **Verify your setup:**
   ```bash
   cd celo-minimarket
   cat .env  # Check private key is set
   ```

2. **Get CELO for gas:**
   - Need ~0.1 CELO for deployment + operations
   - Buy from exchange or bridge from another network
   - Send to your wallet address

### Phase 2: Deploy Smart Contract

1. **Compile contract:**
   ```bash
   npx hardhat compile
   ```
   
   You should see: ✓ Compiled successfully

2. **Deploy to Celo Mainnet:**
   ```bash
   npx hardhat run scripts/deploy.js --network celo
   ```

3. **Save the contract address:**
   ```
   ✅ CeloMiniMarket deployed at: 0xYOUR_CONTRACT_ADDRESS
   ```
   Copy this address - you'll need it!

4. **Verify on Celoscan (Optional but recommended):**
   ```bash
   npx hardhat verify --network celo YOUR_CONTRACT_ADDRESS
   ```

### Phase 3: Configure Frontend

1. **Copy the ABI:**
   ```bash
   cp artifacts/contracts/CeloMiniMarket.sol/CeloMiniMarket.json frontend/src/abi/
   ```

2. **Update contract address:**
   
   Edit `frontend/src/App.jsx` line 6:
   ```javascript
   const MARKET_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS'
   ```

3. **Test locally:**
   ```bash
   cd frontend
   npm run dev
   ```
   
   Open http://localhost:5173 and test:
   - Connect wallet
   - Add a test product
   - Verify it appears in the list

### Phase 4: Deploy Frontend

#### Option A: Vercel (Recommended)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow prompts:
   - Login to Vercel
   - Set project name
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Get your URL:**
   ```
   ✅ Deployed to: https://your-project.vercel.app
   ```

#### Option B: Netlify

1. **Build:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy:**
   - Go to https://app.netlify.com
   - Drag & drop the `dist/` folder
   - Or use Netlify CLI

#### Option C: GitHub Pages

1. **Update `vite.config.js`:**
   ```javascript
   export default {
     base: '/celo-minimarket/'
   }
   ```

2. **Build and deploy:**
   ```bash
   cd frontend
   npm run build
   # Push dist/ to gh-pages branch
   ```

### Phase 5: Post-Deployment

1. **Update main.jsx with your domain:**
   ```javascript
   url: 'https://your-actual-domain.com',
   ```

2. **Test on mainnet:**
   - Connect with real wallet
   - Add a product (costs gas)
   - Try buying with cUSD

3. **Share your marketplace:**
   - Post contract address on Celoscan
   - Share frontend URL
   - Add to Celo ecosystem directories

## 🎯 Deployment Checklist

**Before Deployment:**
- [ ] Contract compiled without errors
- [ ] Private key has CELO for gas (~0.1 CELO)
- [ ] Tested on Alfajores testnet first
- [ ] `.env` never committed to git

**After Contract Deployment:**
- [ ] Contract address saved
- [ ] Contract verified on Celoscan
- [ ] ABI copied to frontend
- [ ] Contract address updated in App.jsx

**After Frontend Deployment:**
- [ ] Built successfully
- [ ] Deployed to hosting
- [ ] Tested wallet connection
- [ ] Verified products display
- [ ] Tested buying flow

## 🔒 Security Notes

- **Never share your private key**
- **Keep .env in .gitignore**
- **Test on testnet first**
- **Verify contract on Celoscan**
- **Start with small amounts**

## 📊 Monitoring

**Contract Activity:**
- View on Celoscan: `https://celoscan.io/address/YOUR_CONTRACT_ADDRESS`
- Monitor transactions
- Check events

**Frontend Analytics (Optional):**
- Add Google Analytics
- Add Plausible
- Monitor user activity

## 🆘 Common Issues

**"Insufficient funds":**
- Need CELO for gas
- Need cUSD for buying products

**"Wrong network":**
- Switch wallet to Celo Mainnet
- Chain ID must be 42220

**"Transaction reverted":**
- Check you're the product vendor
- Verify price is > 0
- Ensure product ID exists

**Frontend not loading:**
- Check build output
- Verify hosting configuration
- Check browser console for errors

## 📈 Next Steps

1. **Add analytics** - Track usage
2. **Implement search** - Filter products
3. **Add images** - IPFS integration
4. **Build community** - Market to users
5. **Iterate** - Based on feedback

---

**Need help?** Check Celo Discord or GitHub issues.
