import { useState, useEffect } from 'react';

/**
 * DraftBanner component for the autosave feature.
 * Part of the add form autosave with drafts implementation.
 */
export default function DraftBanner(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize autosave feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="autosave-widget autosave-draftbanner" role="region" aria-label="DraftBanner">
      <div className="autosave-content">
        {props.children || (
          <span className="autosave-placeholder">DraftBanner ready</span>
        )}
      </div>
    </div>
  );
}