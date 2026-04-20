export function formatReceipt(receipt) {
  if (!receipt) return null;
  return {
    hash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed?.toString(),
    status: receipt.status === 1 ? 'success' : 'reverted',
    from: receipt.from,
    to: receipt.to,
    effectiveGasPrice: receipt.gasPrice?.toString(),
    logs: receipt.logs?.length || 0,
  };
}
export function isSuccessful(receipt) { return receipt && receipt.status === 1; }
export function getTxCost(receipt) {
  if (!receipt?.gasUsed || !receipt?.gasPrice) return null;
  const cost = BigInt(receipt.gasUsed) * BigInt(receipt.gasPrice);
  return { wei: cost, celo: Number(cost) / 1e18 };
}
