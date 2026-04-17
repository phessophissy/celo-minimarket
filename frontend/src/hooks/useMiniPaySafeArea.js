import { useState, useEffect } from 'react';
import { detectMiniPay } from '../config/minipay';

/**
 * Hook to manage MiniPay-specific safe area insets.
 * Ensures UI content doesn't overlap with device notches or system bars.
 */
export default function useMiniPaySafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    if (!detectMiniPay()) return;

    // MiniPay runs inside Opera Mini's webview, apply safe area padding
    const computeSafeArea = () => {
      const style = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0', 10),
        bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0', 10),
        left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0', 10),
        right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0', 10),
      });
    };

    computeSafeArea();
    window.addEventListener('resize', computeSafeArea);
    return () => window.removeEventListener('resize', computeSafeArea);
  }, []);

  return safeArea;
}
