import { useState, useEffect, useMemo } from 'react'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider } from 'ethers'
import { ethers } from 'ethers'
import axios from 'axios'
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
  // Reown AppKit hooks
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [decimals, setDecimals] = useState(18)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadMethod, setUploadMethod] = useState('url') // 'url' or 'file'

  // Create provider from walletProvider or fallback to public RPC
  const provider = useMemo(() => {
    if (walletProvider) {
      try {
        return new ethers.providers.Web3Provider(walletProvider)
      } catch (error) {
        console.error('Error creating wallet provider:', error)
      }
    }
    // Fallback to public RPC for read-only operations
    return new ethers.providers.JsonRpcProvider(CELO_RPC_URL)
  }, [walletProvider])

  // Get signer for write operations
  const getSigner = async () => {
    if (!walletProvider || !isConnected) {
      throw new Error("Please connect your wallet to perform this action")
    }
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      return ethersProvider.getSigner()
    } catch (error) {
      console.error('Error getting signer:', error)
      throw error
    }
  }

  const market = async () => {
    const signer = await getSigner()
    return new ethers.Contract(MARKET_ADDRESS, marketAbi, signer)
  }

  const cusd = async () => {
    const signer = await getSigner()
    return new ethers.Contract(CUSD_ADDRESS, erc20Abi, signer)
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
    if (!provider) return
    loadProducts()
  }, [provider])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Please upload an image file')
      return
    }

    // Check file size (max 5MB for imgBB free tier)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ Image too large. Please use an image under 5MB.')
      return
    }

    setLoading(true)
    
    try {
      // Convert to base64
      const reader = new FileReader()
      
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1]
          
          // Upload to imgBB (free image hosting)
          const formData = new FormData()
          formData.append('image', base64String)
          
          const response = await fetch('https://api.imgbb.com/1/upload?key=c62d9e2a61b8c8f0e1e64e8c89c1cf93', {
            method: 'POST',
            body: formData
          })
          
          if (!response.ok) {
            throw new Error('Upload failed')
          }
          
          const data = await response.json()
          
          if (data.success && data.data.url) {
            const imageUrl = data.data.url
            setImagePreview(imageUrl)
            setForm(f => ({ ...f, imageUrl }))
            alert('✅ Image uploaded successfully!')
          } else {
            throw new Error('Upload failed')
          }
        } catch (error) {
          console.error('Upload error:', error)
          alert('❌ Failed to upload image. Please try entering a URL manually instead.')
          setUploadMethod('url')
        } finally {
          setLoading(false)
        }
      }
      
      reader.onerror = () => {
        alert('❌ Failed to read file')
        setLoading(false)
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Failed to process image')
      setLoading(false)
    }
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
    if (!isConnected) {
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
    if (!isConnected) {
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
        <button className="btn btn-connect" onClick={() => open()}>
          {isConnected 
            ? `🔌 ${address?.slice(0, 6)}...${address?.slice(-4)}`
            : '🔗 Connect Wallet'}
        </button>
      </div>

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
                <option value="url">Paste Image URL</option>
                <option value="file">Upload Image (Auto)</option>
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
                <p style={{fontSize: '0.85rem', color: '#b0b0b0', marginTop: '0.5rem'}}>
                  💡 Or use "Upload Image (Auto)" option above for automatic hosting
                </p>
              </div>
            ) : (
              <div className="file-upload-container">
                <label htmlFor="image-upload" className="file-upload-label">
                  {loading ? '⏳ Uploading...' : '📁 Choose Image to Upload'}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-upload-input"
                  disabled={loading}
                />
                <p style={{fontSize: '0.85rem', color: '#b0b0b0', marginTop: '0.5rem', textAlign: 'center'}}>
                  📤 Images are automatically uploaded to free hosting (max 5MB)
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
          <button disabled={!isConnected || loading} type="submit" className="btn btn-primary">
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
                disabled={loading || !isConnected} 
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



















