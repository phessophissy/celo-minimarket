import { useState, useEffect, useMemo } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import { ethers } from 'ethers'
import marketArtifact from './abi/CeloMiniMarket.json'
import './App.css'

const MARKET_ADDRESS = '0xABD9E2A3bc4bdf520C82CcBC287095a125C56225'
const CUSD_ADDRESS   = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const marketAbi = marketArtifact.abi // Extract ABI from Hardhat artifact


const CELO_RPC_URL = 'https://rpc.ankr.com/celo'
const erc20Abi = [
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)"
]

export default function App() {
  const { address, kit, connect, destroy } = useContractKit()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [decimals, setDecimals] = useState(18)
  const [loading, setLoading] = useState(false)
  const [providerError, setProviderError] = useState(null)
  const [connectedAccount, setConnectedAccount] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadMethod, setUploadMethod] = useState('url') // 'url' or 'file'

  // Wait for wallet to properly connect and get account
  useEffect(() => {
    const getAccount = async () => {
      if (!kit?.connection?.web3?.currentProvider) {
        setConnectedAccount(null)
        return
      }

      try {
        const provider = kit.connection.web3.currentProvider
        
        // Try multiple methods to get the account
        let account = null
        
        // Method 1: Use address from ContractKit
        if (address && ethers.utils.isAddress(address)) {
          account = address
        }
        // Method 2: Check provider.selectedAddress
        else if (provider.selectedAddress && ethers.utils.isAddress(provider.selectedAddress)) {
          account = provider.selectedAddress
        }
        // Method 3: Request accounts from provider
        else if (provider.request) {
          try {
            const accounts = await provider.request({ method: 'eth_accounts' })
            if (accounts && accounts.length > 0 && ethers.utils.isAddress(accounts[0])) {
              account = accounts[0]
            }
          } catch (err) {
            console.warn('Could not get accounts:', err)
          }
        }
        // Method 4: Legacy web3 accounts
        else if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' })
            if (accounts && accounts.length > 0 && ethers.utils.isAddress(accounts[0])) {
              account = accounts[0]
            }
          } catch (err) {
            console.warn('Could not get accounts from window.ethereum:', err)
          }
        }

        setConnectedAccount(account)
      } catch (error) {
        console.error('Error getting account:', error)
        setConnectedAccount(null)
      }
    }

    getAccount()
  }, [address, kit?.connection?.web3?.currentProvider])

  const provider = useMemo(() => {
    if (!kit?.connection?.web3?.currentProvider) return null
    
    try {
      const celoProvider = kit.connection.web3.currentProvider
      
      // Comprehensive fix for supportsSubscriptions error
      if (celoProvider) {
        if (typeof celoProvider.supportsSubscriptions !== 'function') {
          celoProvider.supportsSubscriptions = () => false
        }
        if (typeof celoProvider.on !== 'function') {
          celoProvider.on = () => {}
        }
        if (typeof celoProvider.removeListener !== 'function') {
          celoProvider.removeListener = () => {}
        }
        if (typeof celoProvider.removeAllListeners !== 'function') {
          celoProvider.removeAllListeners = () => {}
        }
      }

      const web3Provider = new ethers.providers.Web3Provider(celoProvider, 'any')
      setProviderError(null)
      return web3Provider
    } catch (error) {
      console.error('Provider initialization error:', error)
      setProviderError(error.message)
      return null
    }
  }, [kit?.connection?.web3?.currentProvider])

    const getSigner = async () => {
    // Force use of wallet provider directly, bypass any RPC
    if (!window.ethereum) {
      console.error("No wallet detected")
      return null
    }
    
    if (!connectedAccount || !ethers.utils.isAddress(connectedAccount)) {
      console.warn('No valid connected account:', connectedAccount)
      return null
    }

    try {
      // Create fresh provider directly from wallet, NOT from ContractKit
      const walletProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      const signer = await walletProvider.getSigner()
      console.log('Using wallet signer:', await signer.getAddress())
      return signer
    } catch (error) {
      console.error('Error getting signer:', error)
      return null
    }
  }

    const market = async () => {
    const signer = await getSigner()
    if (!signer) {
      // For write operations, we MUST have a signer
      throw new Error("Please connect your wallet to perform this action")
    }
    return new ethers.Contract(MARKET_ADDRESS, marketAbi, signer)
  }
  const cusd = async () => {
    const signer = await getSigner()
    if (!signer && !provider) {
      throw new Error('No provider or signer available')
    }
    return new ethers.Contract(CUSD_ADDRESS, erc20Abi, signer ?? provider)
  }

  const loadProducts = async () => {
    if (!provider) return
    try {
      // Use provider for read-only operations
      const m = new ethers.Contract(MARKET_ADDRESS, marketAbi, provider)
      const list = await m.getActiveProducts()
      console.log("Raw getActiveProducts response:", list, "Type:", typeof list, "IsArray:", Array.isArray(list))
      
      // Ensure list is an array
      if (Array.isArray(list)) {
        setProducts(list)
      } else {
        console.warn('getActiveProducts did not return an array:', list)
        setProducts([])
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setProducts([]) // Set empty array on error
    }
  }

  useEffect(() => {
    if (!provider) return;
    loadProducts()
    }, [provider])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      
      // For on-chain storage, we'll just use preview locally
      // but require users to use URLs for actual submission
      setImagePreview(base64String)
      
      // Don't set imageUrl - force user to use URL method
      alert('⚠️ On-chain image storage is too expensive. Please use "Image URL" method instead.\n\nUpload your image to a free service like:\n• imgur.com\n• cloudinary.com\n• imgbb.com\n\nThen paste the URL here.')
      
      // Reset to URL method
      setUploadMethod('url')
    }
    reader.readAsDataURL(file)
  }

  const handleImageUrlChange = (url) => {
    setForm(f => ({ ...f, imageUrl: url }))
    setImagePreview(url)
  }

  const clearImage = () => {
    setForm(f => ({ ...f, imageUrl: '' }))
    setImagePreview(null)
  }

  const addProduct = async (e) => {
    e.preventDefault()
    if (!connectedAccount) {
      alert('❌ Please connect your wallet first!')
      return
    }
    
    if (!form.imageUrl) {
      alert('❌ Please upload a product image')
      return
    }
    
    const priceWei = ethers.utils.parseUnits(form.price || '0', decimals)
    setLoading(true)
    try {
      const m = await market()
      // Now passes imageUrl as separate parameter for on-chain NFT storage
      const tx = await m.addProduct(form.name, priceWei, form.description, form.imageUrl)
      console.log('Transaction sent:', tx.hash)
      await tx.wait()
      console.log('Transaction confirmed! NFT minted!')
      alert('✅ Product added successfully as NFT! 🎉')
      setForm({ name: '', price: '', description: '', imageUrl: '' })
      setImagePreview(null)
      await loadProducts()
    } catch (error) {
      console.error('Error adding product:', error)
      alert('❌ Failed to add product: ' + (error.message || error))
    } finally { 
      setLoading(false) 
    }
  }

  const buyNow = async (tokenId, priceWei) => {
    if (!connectedAccount) {
      alert('❌ Please connect your wallet first!')
      return
    }
    setLoading(true)
    try {
      const m = await market()
      // Purchase product and burn NFT
      const tx = await m.purchaseProduct(tokenId, { value: priceWei })
      console.log('Purchase transaction sent:', tx.hash)
      await tx.wait()
      console.log('Purchase confirmed! NFT burned!')
      alert('✅ Purchase successful! Product NFT has been burned. 🔥')
      await loadProducts()
    } catch (error) {
      console.error('Error purchasing product:', error)
      alert('❌ Failed to purchase: ' + (error.message || error))
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <div className="app-container">
      {/* Floating Balloons */}
      <div className="balloon"></div>
      <div className="balloon"></div>
      <div className="balloon"></div>
      <div className="balloon"></div>
      <div className="balloon"></div>
      <div className="balloon"></div>
      
      <div className="header">
        <div className="header-content">
          <img src="/logo.svg" alt="Celo MiniMarket Logo" className="header-logo" />
          <div>
            <h1>Celo MiniMarket</h1>
            <p className="tagline">Your Mobile Peer-to-Peer Marketplace</p>
          </div>
        </div>
        {connectedAccount
          ? <button className="btn btn-disconnect" onClick={destroy}>
              🔌 Disconnect ({connectedAccount.slice(0,6)}…)
            </button>
          : <button className="btn btn-connect" onClick={connect}>
              🔗 Connect Wallet
            </button>}
      </div>

      {providerError && (
        <div className="error-box">
          ⚠️ Provider Error: {providerError}. Try disabling conflicting wallet extensions or refreshing the page.
        </div>
      )}

      <div className="description-card">
        <h2>📱 About This Platform</h2>
        <p className="description-text">
          Celo MiniMarket is a lightweight peer-to-peer mobile marketplace that enables small local vendors 
          to list products and receive payments in Celo stable tokens (like cUSD), without needing a bank account. 
          Buyers can browse nearby products, place orders, and pay instantly on-chain with low fees.
        </p>
      </div>

      <div className="section">
        <h2>➕ Add Product</h2>
        <form onSubmit={addProduct} className="form">
          <input 
            placeholder="Product Name" 
            value={form.name}
            onChange={e=>setForm(f=>({...f,name:e.target.value}))} 
            required
          />
          <input 
            placeholder="Price (cUSD)" 
            type="number" 
            step="0.01" 
            min="0"
            value={form.price}
            onChange={e=>setForm(f=>({...f,price:e.target.value}))} 
            required
          />
          
          <div className="image-upload-section">
            <label className="upload-method-toggle">
              <span>Upload method:</span>
              <select 
                value={uploadMethod} 
                onChange={(e) => {
                  setUploadMethod(e.target.value)
                  clearImage()
                }}
                className="upload-method-select"
              >
                <option value="url">Image URL (Recommended)</option>
                <option value="file">Upload File (Not Supported - Use URL)</option>
              </select>
            </label>

            {uploadMethod === 'url' ? (
              <div>
                <input
                  type="text"
                  placeholder="Product Image URL (e.g., https://i.imgur.com/abc123.jpg)"
                  value={form.imageUrl}
                  onChange={e => handleImageUrlChange(e.target.value)}
                />
                <p style={{fontSize: '0.85rem', color: '#a5d6a7', marginTop: '0.5rem'}}>
                  💡 Upload your image to imgur.com, imgbb.com, or cloudinary.com, then paste the URL here
                </p>
              </div>
            ) : (
              <div className="file-upload-container">
                <label htmlFor="image-upload" className="file-upload-label">
                  📷 Choose Image (Max 100KB - On-Chain Storage)
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-upload-input"
                />
                <p style={{fontSize: '0.85rem', color: '#a5d6a7', marginTop: '0.5rem', textAlign: 'center'}}>
                  ⚠️ For on-chain storage, use very small images (&lt;100KB). Consider using image URLs for larger images.
                </p>
              </div>
            )}

            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button 
                  type="button" 
                  onClick={clearImage}
                  className="btn btn-clear-image"
                >
                  ❌ Clear Image
                </button>
              </div>
            )}
          </div>

          <textarea 
            placeholder="Product Description"
            value={form.description}
            onChange={e=>setForm(f=>({...f,description:e.target.value}))} 
            required
          />
          <button disabled={!connectedAccount || loading} type="submit" className="btn btn-primary">
            {loading ? '⏳ Adding…' : '✨ Add Product'}
          </button>
        </form>
      </div>

      <div className="section">
        <h2>🛒 Available Products</h2>
        {products.length === 0 && <p className="empty-state">No products listed yet. Be the first vendor! 🚀</p>}
        <div className="products-grid">
          {Array.isArray(products) && products.map((p) => (
            <div key={Number(p.tokenId)} className="product-card">
              {p.imageData && (
                <img 
                  src={p.imageData} 
                  alt={p.name} 
                  className="product-image"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <h3>{p.name}</h3>
              <p className="product-description">{p.description}</p>
              <div className="nft-badge">🎨 NFT #{Number(p.tokenId)}</div>
              <p className="product-price">💰 {ethers.utils.formatUnits(p.priceWei, decimals)} cUSD</p>
              <p className="product-vendor">👤 Vendor: {p.vendor.slice(0,8)}...{p.vendor.slice(-6)}</p>
              <button 
                disabled={loading || !connectedAccount} 
                onClick={() => buyNow(p.tokenId, p.priceWei)}
                className="btn btn-secondary"
              >
                {loading ? '⏳ Processing…' : '🛍️ Buy Now & Burn NFT'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



















