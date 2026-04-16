import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function StatsBar({ products, provider, marketAddress, marketAbi }) {
  const [totalVolume, setTotalVolume] = useState('0');

  useEffect(() => {
    async function fetchStats() {
      if (!provider || !marketAddress) return;
      try {
        const contract = new ethers.Contract(marketAddress, marketAbi, provider);
        const count = await contract.productsCount();
        const volume = products.reduce((sum, p) => {
          return sum.add ? sum.add(p.priceWei) : ethers.BigNumber.from(sum).add(p.priceWei);
        }, ethers.BigNumber.from(0));
        setTotalVolume(ethers.utils.formatUnits(volume, 18));
      } catch (err) {
        console.error('Stats error:', err);
      }
    }
    fetchStats();
  }, [products, provider, marketAddress, marketAbi]);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">🛍️</div>
        <div className="stat-value">{products.length}</div>
        <div className="stat-label">Active Listings</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-value">{parseFloat(totalVolume).toFixed(2)}</div>
        <div className="stat-label">Total Value (cUSD)</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⛓️</div>
        <div className="stat-value">Celo</div>
        <div className="stat-label">Blockchain</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚡</div>
        <div className="stat-value">&lt;5s</div>
        <div className="stat-label">Block Time</div>
      </div>
    </div>
  );
}
