export async function getCurrentGasPrice(provider) {
  try { const f=await provider.getFeeData(); return {gasPrice:f.gasPrice,maxFeePerGas:f.maxFeePerGas,maxPriorityFeePerGas:f.maxPriorityFeePerGas}; }
  catch(e) { console.warn('Gas price fetch failed:',e.message); return null; }
}
export function estimateTxCost(gasLimit, gasPrice) {
  if(!gasLimit||!gasPrice) return null;
  const cost=BigInt(gasLimit)*BigInt(gasPrice);
  return { wei:cost, celo:Number(cost)/1e18, formatted:(Number(cost)/1e18).toFixed(6)+' CELO' };
}
export async function hasEnoughBalance(provider, address, value, gasLimit, gasPrice) {
  const bal=await provider.getBalance(address);
  return bal >= BigInt(value||0)+BigInt(gasLimit)*BigInt(gasPrice);
}
