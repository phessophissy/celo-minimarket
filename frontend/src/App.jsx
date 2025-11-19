import { useState, useEffect } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import { ethers } from 'ethers'
import marketAbi from './abi/CeloMiniMarket.json'
import './App.css'

const MARKET_ADDRESS = '0x1C824627899cFaeB4bb68101efa022917c93b923'
const CUSD_ADDRESS   = '0x765DE816845861e75A25fCA122bb6898B8B1282a'

const erc20Abi = [
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)"
]

export default function App() {
  const { address, kit, connect, destroy } = useContractKit()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '' })
  const [decimals, setDecimals] = useState(18)
  const [loading, setLoading] = useState(false)

  const provider = kit?.connection?.web3?.currentProvider
    ? (() => {
        const celoProvider = kit.connection.web3.currentProvider
        // Fix for supportsSubscriptions error
        if (celoProvider && typeof celoProvider.supportsSubscriptions !== 'function') {
          celoProvider.supportsSubscriptions = () => false
        }
        return new ethers.providers.Web3Provider(celoProvider)
      })()
    : null

  const getSigner = async () => provider ? await provider.getSigner() : null

  const market = async () => {
    const signer = await getSigner()
    return new ethers.Contract(MARKET_ADDRESS, marketAbi, signer ?? undefined)
  }
  const cusd = async () => {
    const signer = await getSigner()
    return new ethers.Contract(CUSD_ADDRESS, erc20Abi, signer ?? undefined)
  }

  const loadProducts = async () => {
    if (!provider) return
    const m = await market()
    const list = await m.getActiveProducts()
    setProducts(list)
  }

  useEffect(() => {
    if (!provider) return;
    loadProducts()
    }, [provider])

  const addProduct = async (e) => {
    e.preventDefault()
    const priceWei = ethers.utils.parseUnits(form.price || '0', decimals)
    setLoading(true)
    try {
      const m = await market()
      const tx = await m.addProduct(form.name, priceWei, form.description)
      await tx.wait()
      setForm({ name: '', price: '', description: '' })
      await loadProducts()
    } finally { setLoading(false) }
  }

  const buyNow = async (vendor, priceWei) => {
    setLoading(true)
    try {
      const token = await cusd()
      const tx = await token.transfer(vendor, priceWei)
      await tx.wait()
      alert('✅ Payment sent!')
    } finally { setLoading(false) }
  }

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1>🛍️ Celo MiniMarket</h1>
          <p className="tagline">Your Mobile Peer-to-Peer Marketplace</p>
        </div>
        {address
          ? <button className="btn btn-disconnect" onClick={destroy}>
              🔌 Disconnect ({address.slice(0,6)}…)
            </button>
          : <button className="btn btn-connect" onClick={connect}>
              🔗 Connect Wallet
            </button>}
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
          <textarea 
            placeholder="Product Description"
            value={form.description}
            onChange={e=>setForm(f=>({...f,description:e.target.value}))} 
            required
          />
          <button disabled={!address || loading} type="submit" className="btn btn-primary">
            {loading ? '⏳ Adding…' : '✨ Add Product'}
          </button>
        </form>
      </div>

      <div className="section">
        <h2>🛒 Available Products</h2>
        {products.length === 0 && <p className="empty-state">No products listed yet. Be the first vendor! 🚀</p>}
        <div className="products-grid">
          {products.map((p) => (
            <div key={Number(p.id)} className="product-card">
              <h3>{p.name}</h3>
              <p className="product-description">{p.description}</p>
              <p className="product-price">💰 {ethers.utils.formatUnits(p.priceWei, decimals)} cUSD</p>
              <p className="product-vendor">👤 Vendor: {p.vendor.slice(0,8)}...{p.vendor.slice(-6)}</p>
              <button 
                disabled={loading || !address} 
                onClick={() => buyNow(p.vendor, p.priceWei)}
                className="btn btn-secondary"
              >
                {loading ? '⏳ Processing…' : '🛍️ Buy Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



