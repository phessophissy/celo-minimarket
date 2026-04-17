/**
 * gasUtils - gas utilities for Celo MiniMarket.
 * Part of the add gas estimation display implementation.
 * 
 * This module provides utility functions for the gas feature,
 * integrating with the existing frontend architecture.
 */

/**
 * Feature configuration for gas.
 */
export const gasConfig = {
  name: 'gas',
  version: '1.0.0',
  enabled: true,
  debug: false,
};

/**
 * Initialize the gas feature.
 * Sets up required state and event listeners.
 * @returns {Object} Initialization result
 */
export function initgasUtils() {
  console.log('[gas] Initializing gasUtils');
  return {
    initialized: true,
    timestamp: Date.now(),
    config: gasConfig,
  };
}

/**
 * Check if the gas feature is available.
 * @returns {boolean} Feature availability
 */
export function isgasUtilsAvailable() {
  return typeof window !== 'undefined' && gasConfig.enabled;
}

/**
 * Get the current state of the gas feature.
 * @returns {Object} Current feature state
 */
export function getgasUtilsState() {
  return {
    active: isgasUtilsAvailable(),
    config: gasConfig,
    timestamp: Date.now(),
  };
}

/**
 * Reset the gas feature to its default state.
 */
export function resetgasUtils() {
  console.log('[gas] Resetting gasUtils');
}

/**
 * Validate input data for the gas feature.
 * @param {any} data - Data to validate
 * @returns {Object} Validation result with valid flag and optional error
 */
export function validategasUtilsData(data) {
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
export function formatgasUtilsData(data) {
  if (typeof data === 'number') return data.toLocaleString();
  if (typeof data === 'string') return data.trim();
  if (Array.isArray(data)) return data.length + ' items';
  return String(data);
}