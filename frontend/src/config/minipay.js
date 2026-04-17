// MiniPay wallet configuration
// MiniPay is a stablecoin wallet by Opera, built on Celo
// Docs: https://docs.celo.org/build-on-celo/build-on-minipay/overview

export const MINIPAY_CONFIG = {
  // Supported stablecoins in MiniPay
  supportedTokens: {
    cUSD: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    USDC: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
    USDT: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
  },
  // Celo chain ID
  chainId: 42220,
  // Celo Sepolia testnet chain ID
  testnetChainId: 44787,
  // RPC endpoints
  rpcUrl: 'https://forno.celo.org',
  testnetRpcUrl: 'https://alfajores-forno.celo-testnet.org',
};

/**
 * Check if the current environment is MiniPay
 */
export function detectMiniPay() {
  return !!(
    typeof window !== 'undefined' &&
    window.ethereum &&
    window.ethereum.isMiniPay
  );
}

/**
 * Get the MiniPay provider if available
 */
export function getMiniPayProvider() {
  if (detectMiniPay()) {
    return window.ethereum;
  }
  return null;
}
