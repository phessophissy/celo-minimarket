export async function requestPermissions() {
  if (!window.ethereum) return false;
  try {
    await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
    return true;
  } catch { return false; }
}
export async function getPermissions() {
  if (!window.ethereum) return [];
  try {
    return await window.ethereum.request({ method: 'wallet_getPermissions' });
  } catch { return []; }
}
export async function hasAccountPermission() {
  const perms = await getPermissions();
  return perms.some(p => p.parentCapability === 'eth_accounts');
}
