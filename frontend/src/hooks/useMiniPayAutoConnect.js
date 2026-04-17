import { useState, useEffect } from 'react';

/**
 * Hook to auto-connect wallet when running inside MiniPay.
 * MiniPay provides an injected provider that supports implicit connection.
 */
export default function useMiniPayAutoConnect({ connect, isConnected }) {
  const [autoConnected, setAutoConnected] = useState(false);

  useEffect(() => {
    if (isConnected || autoConnected) return;

    const tryAutoConnect = async () => {
      if (window.ethereum?.isMiniPay && connect) {
        try {
          await connect();
          setAutoConnected(true);
          console.log('[MiniPay] Auto-connected wallet');
        } catch (err) {
          console.warn('[MiniPay] Auto-connect failed:', err);
        }
      }
    };

    // Small delay to ensure provider is ready
    const timer = setTimeout(tryAutoConnect, 300);
    return () => clearTimeout(timer);
  }, [connect, isConnected, autoConnected]);

  return { autoConnected };
}
