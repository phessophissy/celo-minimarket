export async function getCurrentChainId(provider) {
  const network = await provider.getNetwork();
  return Number(network.chainId);
}
export function isCeloMainnet(chainId) { return Number(chainId) === 42220; }
export function isCeloTestnet(chainId) { return Number(chainId) === 44787; }
export function isSupportedChain(chainId) { return isCeloMainnet(chainId) || isCeloTestnet(chainId); }
export async function switchToCelo(provider) {
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: '0xa4ec' }]);
    return true;
  } catch (err) {
    if (err.code === 4902) {
      await provider.send('wallet_addEthereumChain', [{
        chainId: '0xa4ec', chainName: 'Celo Mainnet',
        nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
        rpcUrls: ['https://forno.celo.org'],
        blockExplorerUrls: ['https://celoscan.io'],
      }]);
      return true;
    }
    throw err;
  }
}
