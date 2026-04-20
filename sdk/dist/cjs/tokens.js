"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStablecoinBalances = getStablecoinBalances;
exports.formatStablecoin = formatStablecoin;
exports.parseStablecoin = parseStablecoin;
const ethers_1 = require("ethers");
const abi_1 = require("./abi");
const constants_1 = require("./constants");
async function getStablecoinBalances(address, provider) {
    const balances = {};
    const entries = Object.entries(constants_1.SUPPORTED_STABLECOINS);
    const results = await Promise.allSettled(entries.map(async ([symbol, tokenAddress]) => {
        const contract = new ethers_1.ethers.Contract(tokenAddress, abi_1.ERC20_ABI, provider);
        const [balance, decimals] = await Promise.all([
            contract.balanceOf(address),
            contract.decimals(),
        ]);
        return {
            symbol,
            balance: {
                raw: balance.toString(),
                formatted: ethers_1.ethers.utils.formatUnits(balance, decimals),
                decimals,
            },
        };
    }));
    for (const result of results) {
        if (result.status === "fulfilled") {
            balances[result.value.symbol] = result.value.balance;
        }
    }
    return balances;
}
function formatStablecoin(amount, decimals = 18, maxDecimals = 2) {
    const formatted = ethers_1.ethers.utils.formatUnits(amount, decimals);
    return parseFloat(formatted).toFixed(maxDecimals);
}
function parseStablecoin(amount, decimals = 18) {
    return ethers_1.ethers.utils.parseUnits(amount, decimals);
}
//# sourceMappingURL=tokens.js.map