export const CONTRACT_ADDRESSES = {
  42220: { CeloMiniMarket: '0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4' },
  44787: { CeloMiniMarket: null },
};
export function getContractAddress(chainId, name) { return CONTRACT_ADDRESSES[chainId]?.[name]||null; }
export function isDeployed(chainId, name) { return getContractAddress(chainId,name)!==null; }
