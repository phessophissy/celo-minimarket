import { useState, useEffect } from 'react';

/**
 * SkipLink component for the accessibility feature.
 * Part of the improve accessibility with ARIA labels implementation.
 */
export default function SkipLink(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize accessibility feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="accessibility-widget accessibility-skiplink" role="region" aria-label="SkipLink">
      <div className="accessibility-content">
        {props.children || (
          <span className="accessibility-placeholder">SkipLink ready</span>
        )}
      </div>
    </div>
  );
}