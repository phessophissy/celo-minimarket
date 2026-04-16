import { useState, useEffect, useCallback } from 'react';

const TOAST_TYPES = {
  success: { icon: '✅', color: 'var(--celo-green)' },
  error: { icon: '❌', color: 'var(--celo-red)' },
  warning: { icon: '⚠️', color: 'var(--celo-gold)' },
  info: { icon: 'ℹ️', color: 'var(--celo-blue)' },
};

let addToastGlobal = null;

export function toast(message, type = 'info') {
  if (addToastGlobal) addToastGlobal({ message, type, id: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev, t]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== t.id));
    }, 4000);
  }, []);

  useEffect(() => {
    addToastGlobal = addToast;
    return () => { addToastGlobal = null; };
  }, [addToast]);

  const dismiss = (id) => setToasts(prev => prev.filter(x => x.id !== id));

  return (
    <div className="toast-container">
      {toasts.map(t => {
        const config = TOAST_TYPES[t.type] || TOAST_TYPES.info;
        return (
          <div
            key={t.id}
            className="toast-item"
            style={{ borderLeftColor: config.color }}
            onClick={() => dismiss(t.id)}
          >
            <span className="toast-icon">{config.icon}</span>
            <span className="toast-message">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
