"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCeloMiniMarket = useCeloMiniMarket;
const react_1 = require("react");
const client_1 = require("../client");
function useCeloMiniMarket({ provider, contractAddress, } = {}) {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const getClient = (0, react_1.useCallback)(() => {
        if (provider) {
            return client_1.CeloMiniMarket.fromProvider(provider, { contractAddress });
        }
        return new client_1.CeloMiniMarket({ contractAddress });
    }, [provider, contractAddress]);
    const refetch = (0, react_1.useCallback)(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const client = getClient();
            const active = await client.getActiveProducts();
            setProducts(active);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch products");
        }
        finally {
            setIsLoading(false);
        }
    }, [getClient]);
    (0, react_1.useEffect)(() => {
        refetch();
    }, [refetch]);
    const addProduct = (0, react_1.useCallback)(async (params) => {
        const client = getClient();
        return client.addProduct(params);
    }, [getClient]);
    const purchaseProduct = (0, react_1.useCallback)(async (tokenId, priceWei) => {
        const client = getClient();
        return client.purchaseProduct(tokenId, priceWei);
    }, [getClient]);
    const toggleProduct = (0, react_1.useCallback)(async (tokenId, active) => {
        const client = getClient();
        return client.toggleProduct(tokenId, active);
    }, [getClient]);
    const getProduct = (0, react_1.useCallback)(async (tokenId) => {
        const client = getClient();
        return client.getProduct(tokenId);
    }, [getClient]);
    return {
        products,
        isLoading,
        error,
        refetch,
        addProduct,
        purchaseProduct,
        toggleProduct,
        getProduct,
    };
}
//# sourceMappingURL=useCeloMiniMarket.js.map