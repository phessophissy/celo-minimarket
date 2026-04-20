export async function connectWallet() {
  if (typeof window === 'undefined' || !window.ethereum) throw new Error('No wallet detected');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  if (!accounts || accounts.length === 0) throw new Error('No accounts returned');
  return { address: accounts[0], provider: window.ethereum };
}
export async function disconnectWallet() {
  // Most wallets don't support programmatic disconnect
  // Just clear local state
  return true;
}
export async function getConnectedAccounts() {
  if (typeof window === 'undefined' || !window.ethereum) return [];
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts || [];
  } catch { return []; }
}
export async function isConnected() {
  const accounts = await getConnectedAccounts();
  return accounts.length > 0;
}
