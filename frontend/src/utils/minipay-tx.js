import { detectMiniPay } from '../config/minipay';

/**
 * Build a transaction compatible with MiniPay.
 * MiniPay only supports legacy transactions (not EIP-1559).
 * It also supports feeCurrency for gas-free USDm transactions.
 */
export function buildMiniPayTransaction(txParams) {
  if (!detectMiniPay()) return txParams;

  const miniPayTx = { ...txParams };

  // Remove EIP-1559 fields — MiniPay only supports legacy transactions
  delete miniPayTx.maxFeePerGas;
  delete miniPayTx.maxPriorityFeePerGas;
  delete miniPayTx.type;

  return miniPayTx;
}

/**
 * Check if the current network is Celo mainnet or testnet
 */
export async function verifyCeloNetwork(provider) {
  try {
    const network = await provider.getNetwork();
    const isCelo = network.chainId === 42220 || network.chainId === 44787;
    return {
      isCelo,
      chainId: network.chainId,
      isMainnet: network.chainId === 42220,
      isTestnet: network.chainId === 44787,
    };
  } catch {
    return { isCelo: false, chainId: 0, isMainnet: false, isTestnet: false };
  }
}
