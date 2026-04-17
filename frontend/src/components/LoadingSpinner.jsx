import { useState, useEffect } from 'react';

/**
 * LoadingSpinner component for the loading feature.
 * Part of the add loading states and skeleton screens implementation.
 */
export default function LoadingSpinner(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize loading feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="loading-widget loading-loadingspinner" role="region" aria-label="LoadingSpinner">
      <div className="loading-content">
        {props.children || (
          <span className="loading-placeholder">LoadingSpinner ready</span>
        )}
      </div>
    </div>
  );
}