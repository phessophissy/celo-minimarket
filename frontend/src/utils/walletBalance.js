export async function getCeloBalance(provider, address) {
  const bal = await provider.getBalance(address);
  return { wei: bal, celo: Number(bal) / 1e18, formatted: (Number(bal) / 1e18).toFixed(4) + ' CELO' };
}
export function isBalanceSufficient(balanceWei, requiredWei, gasCostWei = 0n) {
  return BigInt(balanceWei) >= BigInt(requiredWei) + BigInt(gasCostWei);
}
export function formatBalance(wei, decimals = 4) {
  const val = Number(wei) / 1e18;
  if (val === 0) return '0 CELO';
  if (val < 0.0001) return '< 0.0001 CELO';
  return val.toFixed(decimals) + ' CELO';
}
export function balanceToUSD(celoAmount, celoPrice) { return (celoAmount * celoPrice).toFixed(2); }
