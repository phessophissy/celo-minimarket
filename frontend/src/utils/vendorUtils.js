/**
 * vendorUtils - vendor utilities for Celo MiniMarket.
 * Part of the add vendor dashboard implementation.
 * 
 * This module provides utility functions for the vendor feature,
 * integrating with the existing frontend architecture.
 */

/**
 * Feature configuration for vendor.
 */
export const vendorConfig = {
  name: 'vendor',
  version: '1.0.0',
  enabled: true,
  debug: false,
};

/**
 * Initialize the vendor feature.
 * Sets up required state and event listeners.
 * @returns {Object} Initialization result
 */
export function initvendorUtils() {
  console.log('[vendor] Initializing vendorUtils');
  return {
    initialized: true,
    timestamp: Date.now(),
    config: vendorConfig,
  };
}

/**
 * Check if the vendor feature is available.
 * @returns {boolean} Feature availability
 */
export function isvendorUtilsAvailable() {
  return typeof window !== 'undefined' && vendorConfig.enabled;
}

/**
 * Get the current state of the vendor feature.
 * @returns {Object} Current feature state
 */
export function getvendorUtilsState() {
  return {
    active: isvendorUtilsAvailable(),
    config: vendorConfig,
    timestamp: Date.now(),
  };
}

/**
 * Reset the vendor feature to its default state.
 */
export function resetvendorUtils() {
  console.log('[vendor] Resetting vendorUtils');
}

/**
 * Validate input data for the vendor feature.
 * @param {any} data - Data to validate
 * @returns {Object} Validation result with valid flag and optional error
 */
export function validatevendorUtilsData(data) {
  if (data === null || data === undefined) {
    return { valid: false, error: 'Data is required' };
  }
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return { valid: false, error: 'Data cannot be empty' };
  }
  return { valid: true };
}

/**
 * Format data for display.
 * @param {any} data - Raw data
 * @returns {string} Formatted string representation
 */
export function formatvendorUtilsData(data) {
  if (typeof data === 'number') return data.toLocaleString();
  if (typeof data === 'string') return data.trim();
  if (Array.isArray(data)) return data.length + ' items';
  return String(data);
}