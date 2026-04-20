"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiniPayAutoConnect = useMiniPayAutoConnect;
const react_1 = require("react");
const minipay_1 = require("../minipay");
function useMiniPayAutoConnect({ connect, isConnected, }) {
    const [autoConnected, setAutoConnected] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (isConnected || autoConnected)
            return;
        const tryAutoConnect = async () => {
            if ((0, minipay_1.detectMiniPay)() && connect) {
                try {
                    await connect();
                    setAutoConnected(true);
                }
                catch (err) {
                    console.warn("[MiniPay] Auto-connect failed:", err);
                }
            }
        };
        const timer = setTimeout(tryAutoConnect, 300);
        return () => clearTimeout(timer);
    }, [connect, isConnected, autoConnected]);
    return { autoConnected };
}
//# sourceMappingURL=useMiniPayAutoConnect.js.map