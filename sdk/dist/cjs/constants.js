"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_STABLECOINS = exports.RPC_URLS = exports.CHAIN_IDS = exports.CONTRACTS = void 0;
exports.CONTRACTS = {
    CeloMiniMarket: "0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4",
    cUSD: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
    USDT: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
};
exports.CHAIN_IDS = {
    MAINNET: 42220,
    ALFAJORES: 44787,
};
exports.RPC_URLS = {
    MAINNET: "https://forno.celo.org",
    ALFAJORES: "https://alfajores-forno.celo-testnet.org",
};
exports.SUPPORTED_STABLECOINS = {
    cUSD: exports.CONTRACTS.cUSD,
    USDC: exports.CONTRACTS.USDC,
    USDT: exports.CONTRACTS.USDT,
};
//# sourceMappingURL=constants.js.map