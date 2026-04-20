export async function estimateGasWithMargin(contract, method, args, opts = {}) {
  const { marginPercent = 20 } = opts;
  try {
    const est = await contract[method].estimateGas(...args, opts);
    return (est * BigInt(100 + marginPercent)) / 100n;
  } catch (e) { console.warn(`Gas estimate failed for ${method}:`, e.message); return null; }
}
export async function buildTxOptions(contract, method, args, overrides = {}) {
  const gas = await estimateGasWithMargin(contract, method, args, overrides);
  return { ...overrides, ...(gas ? { gasLimit: gas } : {}) };
}
export async function sendTransaction(contract, method, args, options = {}) {
  const txOpts = await buildTxOptions(contract, method, args, options);
  const tx = await contract[method](...args, txOpts);
  return { hash: tx.hash, wait: () => tx.wait(), tx };
}
export async function waitForConfirmation(tx, timeoutMs = 60000) {
  return Promise.race([tx.wait(), new Promise((_,rej) => setTimeout(()=>rej(new Error('TX confirmation timeout')), timeoutMs))]);
}
