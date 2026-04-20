"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectMiniPay = detectMiniPay;
exports.getMiniPayProvider = getMiniPayProvider;
exports.requestMiniPayAccounts = requestMiniPayAccounts;
exports.getMiniPayAddress = getMiniPayAddress;
exports.buildMiniPayTransaction = buildMiniPayTransaction;
exports.verifyCeloNetwork = verifyCeloNetwork;
const constants_1 = require("./constants");
function detectMiniPay() {
    return !!(typeof window !== "undefined" &&
        window.ethereum &&
        window.ethereum.isMiniPay);
}
function getMiniPayProvider() {
    if (detectMiniPay())
        return window.ethereum;
    return null;
}
async function requestMiniPayAccounts() {
    const provider = getMiniPayProvider();
    if (!provider)
        return [];
    const accounts = (await provider.request({
        method: "eth_requestAccounts",
    }));
    return accounts || [];
}
async function getMiniPayAddress() {
    const accounts = await requestMiniPayAccounts();
    return accounts[0] || null;
}
function buildMiniPayTransaction(txParams) {
    if (!detectMiniPay())
        return txParams;
    const tx = { ...txParams };
    delete tx.maxFeePerGas;
    delete tx.maxPriorityFeePerGas;
    delete tx.type;
    return tx;
}
async function verifyCeloNetwork(provider) {
    try {
        const network = await provider.getNetwork();
        return {
            isCelo: network.chainId === constants_1.CHAIN_IDS.MAINNET ||
                network.chainId === constants_1.CHAIN_IDS.ALFAJORES,
            chainId: network.chainId,
            isMainnet: network.chainId === constants_1.CHAIN_IDS.MAINNET,
            isTestnet: network.chainId === constants_1.CHAIN_IDS.ALFAJORES,
        };
    }
    catch {
        return { isCelo: false, chainId: 0, isMainnet: false, isTestnet: false };
    }
}
//# sourceMappingURL=minipay.js.map