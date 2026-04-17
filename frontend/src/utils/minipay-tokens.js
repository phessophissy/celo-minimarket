import { ethers } from 'ethers';
import { MINIPAY_CONFIG } from '../config/minipay';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

/**
 * Get stablecoin balances for a given address on Celo.
 * Useful for MiniPay users who primarily use stablecoins.
 */
export async function getStablecoinBalances(address, provider) {
  const balances = {};

  for (const [symbol, tokenAddress] of Object.entries(MINIPAY_CONFIG.supportedTokens)) {
    try {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(address),
        contract.decimals(),
      ]);
      balances[symbol] = {
        raw: balance.toString(),
        formatted: ethers.utils.formatUnits(balance, decimals),
        decimals,
      };
    } catch (err) {
      console.warn(`Failed to fetch ${symbol} balance:`, err);
      balances[symbol] = { raw: '0', formatted: '0.0', decimals: 18 };
    }
  }

  return balances;
}

/**
 * Format a stablecoin amount for display
 */
export function formatStablecoin(amount, decimals = 18, maxDecimals = 2) {
  const formatted = ethers.utils.formatUnits(amount, decimals);
  const num = parseFloat(formatted);
  return num.toFixed(maxDecimals);
}
