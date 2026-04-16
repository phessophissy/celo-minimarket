import { ethers } from 'ethers';

export function formatCUSD(weiAmount, decimals = 18) {
  const formatted = ethers.utils.formatUnits(weiAmount, decimals);
  const num = parseFloat(formatted);
  if (num === 0) return '0.00';
  if (num < 0.01) return formatted;
  return num.toFixed(2);
}

export function shortenAddress(addr, chars = 4) {
  if (!addr) return '';
  return `${addr.slice(0, chars + 2)}...${addr.slice(-chars)}`;
}

export function formatTimestamp(ts) {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

export function isValidImageUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch { return false; }
}
