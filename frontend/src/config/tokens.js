export const CELO_TOKENS = {
  CELO: { address: '0x471EcE3750Da237f93B8E339c536989b8978a438', symbol: 'CELO', decimals: 18, name: 'Celo Native Asset' },
  cUSD: { address: '0x765DE816845861e75A25fCA122bb6898B8B1282a', symbol: 'cUSD', decimals: 18, name: 'Celo Dollar' },
  cEUR: { address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', symbol: 'cEUR', decimals: 18, name: 'Celo Euro' },
  cREAL: { address: '0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787', symbol: 'cREAL', decimals: 18, name: 'Celo Real' },
};
export function getTokenBySymbol(s) { return CELO_TOKENS[s] || null; }
export function getTokenByAddress(a) { const l=a.toLowerCase(); return Object.values(CELO_TOKENS).find(t=>t.address.toLowerCase()===l)||null; }
