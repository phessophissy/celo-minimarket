export function isMiniPay() { return typeof window!=='undefined' && window.ethereum?.isMiniPay === true; }
export function isMetaMask() { return typeof window!=='undefined' && window.ethereum?.isMetaMask === true && !window.ethereum?.isMiniPay; }
export function hasInjectedProvider() { return typeof window!=='undefined' && !!window.ethereum; }
export function getProviderName() { if(isMiniPay()) return 'MiniPay'; if(isMetaMask()) return 'MetaMask'; if(hasInjectedProvider()) return 'Browser Wallet'; return 'None'; }
export function getWalletIcon(name) {
  const icons = { MiniPay:'📱', MetaMask:'🦊', 'Browser Wallet':'🌐', None:'❌' };
  return icons[name] || '💰';
}
export function canAutoConnect() { return isMiniPay(); }
