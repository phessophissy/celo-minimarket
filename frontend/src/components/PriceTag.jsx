import { ethers } from 'ethers';

export default function PriceTag({ priceWei, decimals = 18, size = 'md' }) {
  const formatted = ethers.utils.formatUnits(priceWei, decimals);
  const num = parseFloat(formatted);

  return (
    <div className={`price-tag price-tag-${size}`}>
      <span className="price-tag-amount">{num < 0.01 ? formatted : num.toFixed(2)}</span>
      <span className="price-tag-symbol">cUSD</span>
    </div>
  );
}
