import { useState, useEffect } from 'react';

/**
 * PerfOverlay component for the performance feature.
 * Part of the add performance monitoring implementation.
 */
export default function PerfOverlay(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize performance feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="performance-widget performance-perfoverlay" role="region" aria-label="PerfOverlay">
      <div className="performance-content">
        {props.children || (
          <span className="performance-placeholder">PerfOverlay ready</span>
        )}
      </div>
    </div>
  );
}