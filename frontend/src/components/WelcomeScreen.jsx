import { useState, useEffect } from 'react';

/**
 * WelcomeScreen component for the onboarding feature.
 * Part of the add user onboarding walkthrough implementation.
 */
export default function WelcomeScreen(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize onboarding feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="onboarding-widget onboarding-welcomescreen" role="region" aria-label="WelcomeScreen">
      <div className="onboarding-content">
        {props.children || (
          <span className="onboarding-placeholder">WelcomeScreen ready</span>
        )}
      </div>
    </div>
  );
}