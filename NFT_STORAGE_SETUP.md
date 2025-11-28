# NFT.Storage Setup for IPFS Image Uploads

The app now supports direct file uploads to IPFS using NFT.Storage!

## Get Your Free API Key

1. Go to [NFT.Storage](https://nft.storage)
2. Click **"Login"** (top right)
3. Sign in with your email or GitHub
4. Go to **"API Keys"** in the dashboard
5. Click **"+ New Key"**
6. Name it (e.g., "celo-minimarket")
7. Copy the API key

## Add Your API Key

Edit `frontend/src/App.jsx` and replace the demo key:

```javascript
const NFT_STORAGE_KEY = 'YOUR_ACTUAL_API_KEY_HERE'
```

## How It Works

- Users upload images directly from their browser
- Images are stored on IPFS (decentralized, permanent storage)
- Only the IPFS URL (small string) is stored on-chain
- **No gas limit errors!** ✅
- **Free storage!** ✅
- **Decentralized!** ✅

## Features

- ✅ Upload files up to 10MB
- ✅ Images stored on IPFS forever
- ✅ No need for imgur or other services
- ✅ Truly decentralized storage
- ✅ Free (NFT.Storage is free for public data)

## Alternative: Use Image URLs

Users can still paste image URLs directly if they prefer!
