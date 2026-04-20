export const NETWORKS = {
  42220: { chainId: 42220, name: 'Celo Mainnet', rpcUrl: 'https://forno.celo.org', explorer: 'https://celoscan.io', isTestnet: false },
  44787: { chainId: 44787, name: 'Celo Alfajores', rpcUrl: 'https://alfajores-forno.celo-testnet.org', explorer: 'https://alfajores.celoscan.io', isTestnet: true },
};
export function getNetwork(id) { return NETWORKS[id]||null; }
export function isSupported(id) { return id in NETWORKS; }
export function getExplorerTxUrl(id,hash) { const n=NETWORKS[id]; return n?`${n.explorer}/tx/${hash}`:''; }
export function getExplorerAddressUrl(id,addr) { const n=NETWORKS[id]; return n?`${n.explorer}/address/${addr}`:''; }
