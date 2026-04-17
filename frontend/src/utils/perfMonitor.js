/**
 * perfMonitor - performance utilities for Celo MiniMarket.
 * Part of the add performance monitoring implementation.
 * 
 * This module provides utility functions for the performance feature,
 * integrating with the existing frontend architecture.
 */

/**
 * Feature configuration for performance.
 */
export const performanceConfig = {
  name: 'performance',
  version: '1.0.0',
  enabled: true,
  debug: false,
};

/**
 * Initialize the performance feature.
 * Sets up required state and event listeners.
 * @returns {Object} Initialization result
 */
export function initperfMonitor() {
  console.log('[performance] Initializing perfMonitor');
  return {
    initialized: true,
    timestamp: Date.now(),
    config: performanceConfig,
  };
}

/**
 * Check if the performance feature is available.
 * @returns {boolean} Feature availability
 */
export function isperfMonitorAvailable() {
  return typeof window !== 'undefined' && performanceConfig.enabled;
}

/**
 * Get the current state of the performance feature.
 * @returns {Object} Current feature state
 */
export function getperfMonitorState() {
  return {
    active: isperfMonitorAvailable(),
    config: performanceConfig,
    timestamp: Date.now(),
  };
}

/**
 * Reset the performance feature to its default state.
 */
export function resetperfMonitor() {
  console.log('[performance] Resetting perfMonitor');
}

/**
 * Validate input data for the performance feature.
 * @param {any} data - Data to validate
 * @returns {Object} Validation result with valid flag and optional error
 */
export function validateperfMonitorData(data) {
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
export function formatperfMonitorData(data) {
  if (typeof data === 'number') return data.toLocaleString();
  if (typeof data === 'string') return data.trim();
  if (Array.isArray(data)) return data.length + ' items';
  return String(data);
}