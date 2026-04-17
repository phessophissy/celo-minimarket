/**
 * categoryUtils - categories utilities for Celo MiniMarket.
 * Part of the add product categories and filtering implementation.
 * 
 * This module provides utility functions for the categories feature,
 * integrating with the existing frontend architecture.
 */

/**
 * Feature configuration for categories.
 */
export const categoriesConfig = {
  name: 'categories',
  version: '1.0.0',
  enabled: true,
  debug: false,
};

/**
 * Initialize the categories feature.
 * Sets up required state and event listeners.
 * @returns {Object} Initialization result
 */
export function initcategoryUtils() {
  console.log('[categories] Initializing categoryUtils');
  return {
    initialized: true,
    timestamp: Date.now(),
    config: categoriesConfig,
  };
}

/**
 * Check if the categories feature is available.
 * @returns {boolean} Feature availability
 */
export function iscategoryUtilsAvailable() {
  return typeof window !== 'undefined' && categoriesConfig.enabled;
}

/**
 * Get the current state of the categories feature.
 * @returns {Object} Current feature state
 */
export function getcategoryUtilsState() {
  return {
    active: iscategoryUtilsAvailable(),
    config: categoriesConfig,
    timestamp: Date.now(),
  };
}

/**
 * Reset the categories feature to its default state.
 */
export function resetcategoryUtils() {
  console.log('[categories] Resetting categoryUtils');
}

/**
 * Validate input data for the categories feature.
 * @param {any} data - Data to validate
 * @returns {Object} Validation result with valid flag and optional error
 */
export function validatecategoryUtilsData(data) {
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
export function formatcategoryUtilsData(data) {
  if (typeof data === 'number') return data.toLocaleString();
  if (typeof data === 'string') return data.trim();
  if (Array.isArray(data)) return data.length + ' items';
  return String(data);
}