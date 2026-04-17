import { useState, useEffect } from 'react';

/**
 * HotkeyDisplay component for the keyboard feature.
 * Part of the add keyboard navigation map implementation.
 */
export default function HotkeyDisplay(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize keyboard feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="keyboard-widget keyboard-hotkeydisplay" role="region" aria-label="HotkeyDisplay">
      <div className="keyboard-content">
        {props.children || (
          <span className="keyboard-placeholder">HotkeyDisplay ready</span>
        )}
      </div>
    </div>
  );
}