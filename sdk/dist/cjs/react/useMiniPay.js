"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiniPay = useMiniPay;
const react_1 = require("react");
const minipay_1 = require("../minipay");
function useMiniPay() {
    const [isMiniPay, setIsMiniPay] = (0, react_1.useState)(false);
    const [miniPayAddress, setMiniPayAddress] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const detect = async () => {
            try {
                if ((0, minipay_1.detectMiniPay)()) {
                    setIsMiniPay(true);
                    const accounts = (await window.ethereum.request({
                        method: "eth_accounts",
                    }));
                    if (accounts?.[0])
                        setMiniPayAddress(accounts[0]);
                }
            }
            catch (err) {
                console.warn("MiniPay detection error:", err);
            }
            finally {
                setIsLoading(false);
            }
        };
        detect();
    }, []);
    const connectMiniPay = (0, react_1.useCallback)(async () => {
        if (!(0, minipay_1.detectMiniPay)())
            return null;
        try {
            const accounts = (await window.ethereum.request({
                method: "eth_requestAccounts",
            }));
            if (accounts?.[0]) {
                setMiniPayAddress(accounts[0]);
                return accounts[0];
            }
        }
        catch (err) {
            console.error("MiniPay connect error:", err);
        }
        return null;
    }, []);
    return { isMiniPay, miniPayAddress, isLoading, connectMiniPay };
}
//# sourceMappingURL=useMiniPay.js.map