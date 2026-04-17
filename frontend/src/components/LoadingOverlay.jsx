import { useState, useEffect } from 'react';

/**
 * LoadingOverlay component for the loading feature.
 * Part of the add loading states and skeleton screens implementation.
 */
export default function LoadingOverlay(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize loading feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="loading-widget loading-loadingoverlay" role="region" aria-label="LoadingOverlay">
      <div className="loading-content">
        {props.children || (
          <span className="loading-placeholder">LoadingOverlay ready</span>
        )}
      </div>
    </div>
  );
}