const STORAGE_KEY = 'celo_minimarket_wallet';
export function saveWalletState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ address: state.address, provider: state.provider, connectedAt: Date.now() })); } catch(e) { console.warn('Failed to save wallet state:', e); }
}
export function loadWalletState() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function clearWalletState() { try { localStorage.removeItem(STORAGE_KEY); } catch(e) { console.warn('Failed to clear wallet state:', e); } }
export function wasRecentlyConnected(maxAgeMs = 86400000) {
  const s = loadWalletState();
  return s && (Date.now() - s.connectedAt) < maxAgeMs;
}
