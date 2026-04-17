import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect and interact with MiniPay wallet.
 * MiniPay injects window.ethereum with isMiniPay flag.
 */
export default function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [miniPayAddress, setMiniPayAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detect = async () => {
      try {
        if (window.ethereum && window.ethereum.isMiniPay) {
          setIsMiniPay(true);
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts && accounts.length > 0) {
            setMiniPayAddress(accounts[0]);
          }
        }
      } catch (err) {
        console.warn('MiniPay detection error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    detect();
  }, []);

  const connectMiniPay = useCallback(async () => {
    if (!window.ethereum?.isMiniPay) return null;
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts?.[0]) {
        setMiniPayAddress(accounts[0]);
        return accounts[0];
      }
    } catch (err) {
      console.error('MiniPay connect error:', err);
    }
    return null;
  }, []);

  return { isMiniPay, miniPayAddress, isLoading, connectMiniPay };
}
