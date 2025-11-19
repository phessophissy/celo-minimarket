import { useState, useEffect } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import { ethers } from 'ethers'
import marketAbi from './abi/CeloMiniMarket.json'

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
    ? new ethers.BrowserProvider(kit.connection.web3.currentProvider)
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
    const priceWei = ethers.parseUnits(form.price || '0', decimals)
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
    <div style={{ maxWidth: 720, margin: '2rem auto', padding: '1rem' }}>
      <header style={{ display:'flex', justifyContent:'space-between' }}>
        <h1>Celo MiniMarket</h1>
        {address
          ? <button onClick={destroy}>Disconnect ({address.slice(0,6)}…)</button>
          : <button onClick={connect}>Connect Wallet</button>}
      </header>

      <section style={{ marginTop: 24 }}>
        <h2>Add Product</h2>
        <form onSubmit={addProduct} style={{ display:'grid', gap:10 }}>
          <input placeholder="Name" value={form.name}
                 onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
          <input placeholder="Price (cUSD)" type="number" step="0.01" min="0"
                 value={form.price}
                 onChange={e=>setForm(f=>({...f,price:e.target.value}))} required/>
          <textarea placeholder="Description"
                    value={form.description}
                    onChange={e=>setForm(f=>({...f,description:e.target.value}))} required/>
          <button disabled={!address || loading} type="submit">
            {loading ? 'Adding…' : 'Add Product'}
          </button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Products</h2>
        {products.length === 0 && <p>No products yet.</p>}
        {products.map((p) => (
          <div key={Number(p.id)} style={{ border:'1px solid #ddd', borderRadius:12, padding:12, marginTop:12 }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><b>{ethers.formatUnits(p.priceWei, decimals)} cUSD</b></p>
            <small>Vendor: {p.vendor}</small><br/>
            <button disabled={loading || !address} onClick={() => buyNow(p.vendor, p.priceWei)}>
              {loading ? 'Processing…' : 'Buy Now'}
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

