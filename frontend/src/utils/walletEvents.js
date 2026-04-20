export function onAccountsChanged(callback) {
  if (typeof window === 'undefined' || !window.ethereum) return () => {};
  const handler = (accounts) => callback(accounts[0] || null);
  window.ethereum.on('accountsChanged', handler);
  return () => window.ethereum.removeListener('accountsChanged', handler);
}
export function onChainChanged(callback) {
  if (typeof window === 'undefined' || !window.ethereum) return () => {};
  const handler = (chainId) => callback(parseInt(chainId, 16));
  window.ethereum.on('chainChanged', handler);
  return () => window.ethereum.removeListener('chainChanged', handler);
}
export function onDisconnect(callback) {
  if (typeof window === 'undefined' || !window.ethereum) return () => {};
  window.ethereum.on('disconnect', callback);
  return () => window.ethereum.removeListener('disconnect', callback);
}
