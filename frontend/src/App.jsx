import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { ethers } from 'ethers'
import marketArtifact from './abi/CeloMiniMarket.json'
import { getIsFarcasterMiniApp, getSafeAreaInsets, composeCast, getFarcasterUser, signalReady } from './config/farcaster'
import { detectMiniPay } from './config/minipay'
import {
  Footer, StatsBar, SearchBar, ProductCard,
  ToastContainer, toast, ThemeToggle, NetworkBadge,
  EmptyState, QuickAmounts, CeloParticles,
  ConfirmModal
} from './components'

const MARKET_ADDRESS = '0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4'
const CUSD_ADDRESS   = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const marketAbi = marketArtifact.abi
const CELO_RPC_URL = 'https://rpc.ankr.com/celo'

export default function App({ onReady }) {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')

  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [decimals] = useState(18)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadMethod, setUploadMethod] = useState('url')
  const [appReady, setAppReady] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [buyModal, setBuyModal] = useState(null)

  const isFarcasterMiniApp = getIsFarcasterMiniApp()
  const isMiniPay = detectMiniPay()
  const hideConnectBtn = isMiniPay

  const provider = useMemo(() => {
    if (walletProvider) {
      try { return new ethers.providers.Web3Provider(walletProvider) }
      catch (e) { console.error('Provider error:', e) }
    }
    return new ethers.providers.JsonRpcProvider(CELO_RPC_URL)
  }, [walletProvider])

  const getSigner = async () => {
    if (!walletProvider || !isConnected) throw new Error('Connect wallet first')
    return new ethers.providers.Web3Provider(walletProvider).getSigner()
  }

  const market = async () => new ethers.Contract(MARKET_ADDRESS, marketAbi, await getSigner())

  const loadProducts = useCallback(async () => {
    if (!provider) return
    try {
      const m = new ethers.Contract(MARKET_ADDRESS, marketAbi, provider)
      const list = await m.getActiveProducts()
      setProducts(Array.isArray(list) ? list : [])
    } catch (err) {
      console.error('Load error:', err)
      setProducts([])
    }
  }, [provider])

  useEffect(() => { loadProducts() }, [loadProducts])

  // Auto-connect when running inside MiniPay
  useEffect(() => {
    if (isMiniPay && !isConnected && window.ethereum?.isMiniPay) {
      open({ view: 'Connect' }).catch(() => {})
    }
  }, [isMiniPay, isConnected, open])

  useEffect(() => {
    if (!appReady) { setAppReady(true); signalReady() }
  }, [appReady])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.priceWei.sub(b.priceWei).toNumber()); break
      case 'price-high':
        result.sort((a, b) => b.priceWei.sub(a.priceWei).toNumber()); break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: break
    }
    return result
  }, [products, searchQuery, sortBy])

  const shareToFarcaster = async (product) => {
    if (!isFarcasterMiniApp) return
    const text = `Check out "${product.name}" for ${ethers.utils.formatUnits(product.priceWei, decimals)} cUSD on Celo MiniMarket! 🛒`
    const result = await composeCast(text, ['https://celo-minimarket.vercel.app'])
    if (result?.cast) toast('Shared to Farcaster!', 'success')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast('Please upload an image file', 'error'); return }
    if (file.size > 10 * 1024 * 1024) { toast('Image too large (max 10MB)', 'error'); return }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'ml_default')
      const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.secure_url) {
        setImagePreview(data.secure_url)
        setForm(f => ({ ...f, imageUrl: data.secure_url }))
        toast('Image uploaded!', 'success')
      } else throw new Error('Upload failed')
    } catch (err) {
      toast('Upload failed — try pasting a URL instead', 'warning')
      setUploadMethod('url')
    } finally { setLoading(false) }
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
    if (!isConnected) { toast('Connect your wallet first!', 'warning'); return }
    if (!form.imageUrl) { toast('Please add a product image', 'warning'); return }
    const priceWei = ethers.utils.parseUnits(form.price || '0', decimals)
    setLoading(true)
    try {
      const m = await market()
      const tx = await m.addProduct(form.name, priceWei, form.description, form.imageUrl)
      toast('Transaction sent — confirming...', 'info')
      await tx.wait()
      toast('Product listed as NFT! 🎉', 'success')
      setForm({ name: '', price: '', description: '', imageUrl: '' })
      setImagePreview(null)
      await loadProducts()
    } catch (err) {
      toast('Failed to add product: ' + (err.reason || err.message), 'error')
    } finally { setLoading(false) }
  }

  const confirmBuy = (tokenId, priceWei) => {
    if (!isConnected) { toast('Connect your wallet first!', 'warning'); return }
    const product = products.find(p => Number(p.tokenId) === Number(tokenId))
    setBuyModal({ tokenId, priceWei, product })
  }

  const executeBuy = async () => {
    if (!buyModal) return
    setLoading(true)
    try {
      const m = await market()
      const tx = await m.purchaseProduct(buyModal.tokenId, { value: buyModal.priceWei })
      toast('Purchase sent — confirming...', 'info')
      await tx.wait()
      toast('Purchase complete! NFT burned 🔥', 'success')
      setBuyModal(null)
      await loadProducts()
    } catch (err) {
      toast('Purchase failed: ' + (err.reason || err.message), 'error')
    } finally { setLoading(false) }
  }

  return (
    <>
      <CeloParticles />
      <ToastContainer />

      <ConfirmModal
        isOpen={!!buyModal}
        title="Confirm Purchase"
        message={buyModal ? `Buy "${buyModal.product?.name}" for ${ethers.utils.formatUnits(buyModal.priceWei, decimals)} cUSD?` : ''}
        onConfirm={executeBuy}
        onCancel={() => setBuyModal(null)}
        loading={loading}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="header">
          <div className="header-content">
            <img src="/logo.svg" alt="Celo MiniMarket" className="header-logo" />
            <h1>Celo MiniMarket</h1>
          </div>
          <div className="header-nav">
            <NetworkBadge isConnected={isConnected} />
            <ThemeToggle />
            <button className="btn btn-connect" onClick={() => open()}>
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>

        <div className="description-card animate-fadeInUp">
          <h2>Peer-to-Peer Commerce on Celo</h2>
          <p className="description-text">
            List products, receive cUSD payments instantly, and trade as NFTs — all on
            the carbon-negative Celo blockchain. No bank account needed.
          </p>
        </div>

        <StatsBar products={products} provider={provider} marketAddress={MARKET_ADDRESS} marketAbi={marketAbi} />

        <div className="section animate-fadeInUp">
          <h2>➕ List a Product</h2>
          <form onSubmit={addProduct} className="form">
            <input placeholder="Product Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <input placeholder="Price (cUSD)" type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
            <QuickAmounts onSelect={(v) => setForm(f => ({ ...f, price: v }))} />

            <div className="image-upload-section">
              <label className="upload-method-toggle">
                <span>Image:</span>
                <select value={uploadMethod} onChange={e => { setUploadMethod(e.target.value); clearImage() }} className="upload-method-select">
                  <option value="url">🔗 Paste URL</option>
                  <option value="file">☁️ Upload</option>
                </select>
              </label>

              {uploadMethod === 'url' ? (
                <input type="text" placeholder="Image URL (e.g. https://i.imgur.com/...)" value={form.imageUrl} onChange={e => handleImageUrlChange(e.target.value)} />
              ) : (
                <div className="file-upload-container">
                  <label htmlFor="image-upload" className="file-upload-label">
                    {loading ? '⏳ Uploading...' : '📁 Choose Image'}
                  </label>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="file-upload-input" disabled={loading} />
                </div>
              )}

              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button type="button" onClick={clearImage} className="btn btn-danger btn-clear-image">✕ Remove</button>
                </div>
              )}
            </div>

            <textarea placeholder="Product Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            <button disabled={!isConnected || loading} type="submit" className="btn btn-primary">
              {loading ? <><span className="loading-spinner" /> Listing...</> : '✨ List Product'}
            </button>
          </form>
        </div>

        <div className="section animate-fadeInUp">
          <h2>🛒 Marketplace</h2>
          <SearchBar onSearch={setSearchQuery} onSort={setSortBy} />
          {filteredProducts.length === 0 ? (
            <EmptyState
              icon={searchQuery ? '🔍' : '🛒'}
              title={searchQuery ? 'No matching products' : 'No products listed yet'}
              subtitle={searchQuery ? 'Try a different search term' : 'Be the first vendor — list your product now! 🚀'}
            />
          ) : (
            <div className="products-grid">
              {filteredProducts.map(p => (
                <ProductCard
                  key={Number(p.tokenId)}
                  product={p}
                  decimals={decimals}
                  loading={loading}
                  isConnected={isConnected}
                  onBuy={confirmBuy}
                  onShare={shareToFarcaster}
                  isFarcaster={isFarcasterMiniApp}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  )
}
