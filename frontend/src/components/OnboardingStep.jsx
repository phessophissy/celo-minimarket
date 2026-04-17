import { useState, useEffect } from 'react';

/**
 * OnboardingStep component for the onboarding feature.
 * Part of the add user onboarding walkthrough implementation.
 */
export default function OnboardingStep(props) {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize onboarding feature state
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  if (!isActive) return null;

  return (
    <div className="onboarding-widget onboarding-onboardingstep" role="region" aria-label="OnboardingStep">
      <div className="onboarding-content">
        {props.children || (
          <span className="onboarding-placeholder">OnboardingStep ready</span>
        )}
      </div>
    </div>
  );
}