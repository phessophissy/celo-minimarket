"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeloMiniMarket = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("./abi");
const constants_1 = require("./constants");
const minipay_1 = require("./minipay");
function parseProduct(raw) {
    return {
        tokenId: raw.tokenId.toNumber(),
        vendor: raw.vendor,
        name: raw.name,
        priceWei: raw.priceWei.toString(),
        priceCUSD: ethers_1.ethers.utils.formatUnits(raw.priceWei, 18),
        description: raw.description,
        imageData: raw.imageData,
        active: raw.active,
        sold: raw.sold,
    };
}
function parseTupleProduct(tuple) {
    return {
        tokenId: tuple[0].toNumber(),
        vendor: tuple[1],
        name: tuple[2],
        priceWei: tuple[3].toString(),
        priceCUSD: ethers_1.ethers.utils.formatUnits(tuple[3], 18),
        description: tuple[4],
        imageData: tuple[5],
        active: tuple[6],
        sold: tuple[7],
    };
}
class CeloMiniMarket {
    constructor(config = {}) {
        /** @internal */
        this.signer = null;
        this.address = config.contractAddress || constants_1.CONTRACTS.CeloMiniMarket;
        const rpcUrl = config.rpcUrl || constants_1.RPC_URLS.MAINNET;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl, config.chainId || constants_1.CHAIN_IDS.MAINNET);
        this.contract = new ethers_1.ethers.Contract(this.address, abi_1.CELO_MINIMARKET_ABI, this.provider);
    }
    connect(signerOrProvider) {
        const instance = Object.create(CeloMiniMarket.prototype);
        Object.assign(instance, this);
        if (ethers_1.ethers.Signer.isSigner(signerOrProvider)) {
            instance.signer = signerOrProvider;
            instance.contract = this.contract.connect(signerOrProvider);
        }
        else {
            instance.contract = this.contract.connect(signerOrProvider);
        }
        return instance;
    }
    static fromProvider(provider, config = {}) {
        const address = config.contractAddress || constants_1.CONTRACTS.CeloMiniMarket;
        const instance = Object.create(CeloMiniMarket.prototype);
        instance.address = address;
        instance.provider = provider;
        instance.signer = provider.getSigner();
        instance.contract = new ethers_1.ethers.Contract(address, abi_1.CELO_MINIMARKET_ABI, provider.getSigner());
        return instance;
    }
    static forMiniPay(config = {}) {
        if (!(0, minipay_1.detectMiniPay)())
            return null;
        const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        return CeloMiniMarket.fromProvider(provider, config);
    }
    // ── Read Methods ──
    async getActiveProducts() {
        const raw = await this.contract.getActiveProducts();
        return raw.map(parseProduct);
    }
    async getProduct(tokenId) {
        const tuple = await this.contract.getProduct(tokenId);
        return parseTupleProduct(tuple);
    }
    async getProductsCount() {
        const count = await this.contract.productsCount();
        return count.toNumber();
    }
    async getTokenURI(tokenId) {
        return this.contract.tokenURI(tokenId);
    }
    async getOwner(tokenId) {
        return this.contract.ownerOf(tokenId);
    }
    async getBalance(address) {
        const balance = await this.contract.balanceOf(address);
        return balance.toNumber();
    }
    // ── Write Methods ──
    requireSigner() {
        if (!this.signer) {
            throw new Error("CeloMiniMarket: No signer connected. Use .connect(signer) or CeloMiniMarket.fromProvider().");
        }
        return this.signer;
    }
    async addProduct(params) {
        this.requireSigner();
        const priceWei = ethers_1.ethers.utils.parseUnits(params.priceInCUSD, 18);
        const tx = await this.contract.addProduct(params.name, priceWei, params.description, params.imageData);
        return { hash: tx.hash, wait: () => tx.wait() };
    }
    async purchaseProduct(tokenId, priceWei) {
        this.requireSigner();
        let txOverrides = {
            value: ethers_1.ethers.BigNumber.from(priceWei),
        };
        txOverrides = (0, minipay_1.buildMiniPayTransaction)(txOverrides);
        const tx = await this.contract.purchaseProduct(tokenId, txOverrides);
        return { hash: tx.hash, wait: () => tx.wait() };
    }
    async toggleProduct(tokenId, active) {
        this.requireSigner();
        const tx = await this.contract.toggleProduct(tokenId, active);
        return { hash: tx.hash, wait: () => tx.wait() };
    }
    // ── Event Listeners ──
    onProductAdded(callback) {
        const handler = (tokenId, vendor, name, priceWei) => {
            callback(tokenId.toNumber(), vendor, name, priceWei.toString());
        };
        this.contract.on("ProductAdded", handler);
        return () => this.contract.off("ProductAdded", handler);
    }
    onProductPurchased(callback) {
        const handler = (tokenId, buyer, vendor, price) => {
            callback(tokenId.toNumber(), buyer, vendor, price.toString());
        };
        this.contract.on("ProductPurchased", handler);
        return () => this.contract.off("ProductPurchased", handler);
    }
    onProductStatusToggled(callback) {
        const handler = (tokenId, active) => {
            callback(tokenId.toNumber(), active);
        };
        this.contract.on("ProductStatusToggled", handler);
        return () => this.contract.off("ProductStatusToggled", handler);
    }
    removeAllListeners() {
        this.contract.removeAllListeners();
    }
}
exports.CeloMiniMarket = CeloMiniMarket;
//# sourceMappingURL=client.js.map