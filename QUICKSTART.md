#  Quick Start Guide

## 1. Deploy Smart Contract

\\ash
# Compile
npx hardhat compile

# Deploy to Celo Mainnet
npx hardhat run scripts/deploy.js --network celo
\
**Save the contract address!**

## 2. Update Frontend

Edit \rontend/src/App.jsx\ line 6:
\\javascript
const MARKET_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
\
## 3. Run Frontend

\\ash
cd frontend
npm run dev
\
Visit: http://localhost:5173

## 4. Deploy Frontend

\\ash
cd frontend
npm run build
# Deploy dist/ folder to Vercel/Netlify
\
Done! 
