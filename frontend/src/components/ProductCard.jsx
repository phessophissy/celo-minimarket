import { ethers } from 'ethers';

export default function ProductCard({ product, decimals, loading, isConnected, onBuy, onShare, isFarcaster }) {
  const priceFormatted = ethers.utils.formatUnits(product.priceWei, decimals);
  const vendorShort = `${product.vendor.slice(0, 6)}...${product.vendor.slice(-4)}`;

  return (
    <div className="product-card">
      {product.imageData && (
        <div className="product-image-wrapper">
          <img
            src={product.imageData}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="product-card-body">
        <div className="product-card-header">
          <h3>{product.name}</h3>
          <span className="nft-badge">🎨 NFT #{Number(product.tokenId)}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          <span className="price-amount">{parseFloat(priceFormatted).toFixed(2)}</span>
          <span className="price-currency">cUSD</span>
        </p>
        <p className="product-vendor">👤 {vendorShort}</p>
        <div className="product-actions">
          <button
            disabled={loading || !isConnected}
            onClick={() => onBuy(product.tokenId, product.priceWei)}
            className="btn btn-secondary"
          >
            {loading ? <span className="loading-spinner" /> : '🛍️'} Buy Now
          </button>
          {isFarcaster && (
            <button onClick={() => onShare(product)} className="btn btn-share">
              📣 Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
