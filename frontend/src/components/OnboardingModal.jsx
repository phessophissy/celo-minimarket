import { useState, useEffect } from 'react';

/**
 * OnboardingModal component for the onboarding feature.
 * Part of the add user onboarding walkthrough implementation.
 */
export default function OnboardingModal(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize onboarding feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="onboarding-widget onboarding-onboardingmodal" role="region" aria-label="OnboardingModal">
      <div className="onboarding-content">
        {props.children || (
          <span className="onboarding-placeholder">OnboardingModal ready</span>
        )}
      </div>
    </div>
  );
}