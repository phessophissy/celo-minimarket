import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for the images feature.
 * Manages feature state and provides control functions.
 */
export default function useImages(options) {
  options = options || {};
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(function() {
    setIsActive(true);
    return function() { setIsActive(false); };
  }, []);

  var toggle = useCallback(function() {
    setIsActive(function(prev) { return !prev; });
  }, []);

  var reset = useCallback(function() {
    setData(null);
    setError(null);
  }, []);

  var update = useCallback(function(newData) {
    setData(newData);
    setError(null);
  }, []);

  return { isActive: isActive, data: data, error: error, toggle: toggle, reset: reset, update: update };
}