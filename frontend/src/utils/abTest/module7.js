// AB testing - Module 7
// Provides ab testing functionality (part 7)

const MODULE_NAME = 'abTest-module-7';

/**
 * Create a ab testing handler (variant 7)
 * @param {Object} config - Configuration options
 * @returns {Object} Handler instance with lifecycle methods
 */
export function createAbTestHandler7(config = {}) {
  const options = {
    enabled: true,
    maxRetries: 3,
    timeout: config.timeout || 5000,
    batchSize: config.batchSize || 10,
    ...config,
  };

  const internalState = {
    active: false,
    processedCount: 0,
    errorCount: 0,
    lastActivity: null,
    buffer: [],
  };

  function timestamp() {
    return new Date().toISOString();
  }

  return {
    initialize() {
      internalState.active = true;
      internalState.lastActivity = timestamp();
      return this;
    },

    async processItem(item) {
      if (!internalState.active) {
        throw new Error(`${MODULE_NAME}: Handler not initialized`);
      }
      internalState.lastActivity = timestamp();
      try {
        const result = {
          input: item,
          module: MODULE_NAME,
          timestamp: timestamp(),
          sequence: ++internalState.processedCount,
        };
        if (typeof item === 'object' && item !== null) {
          result.data = { ...item, _processed: true, _module: MODULE_NAME };
        } else {
          result.data = { value: item, _processed: true };
        }
        return result;
      } catch (error) {
        internalState.errorCount++;
        throw error;
      }
    },

    async processBatch(items) {
      const results = [];
      const batches = [];
      for (let i = 0; i < items.length; i += options.batchSize) {
        batches.push(items.slice(i, i + options.batchSize));
      }
      for (const batch of batches) {
        const batchResults = await Promise.all(
          batch.map(item => this.processItem(item))
        );
        results.push(...batchResults);
      }
      return results;
    },

    buffer(item) {
      internalState.buffer.push({ item, addedAt: timestamp() });
      if (internalState.buffer.length >= options.batchSize) {
        return this.flush();
      }
      return null;
    },

    async flush() {
      const items = internalState.buffer.splice(0).map(b => b.item);
      if (items.length === 0) return [];
      return this.processBatch(items);
    },

    getStats() {
      return {
        module: MODULE_NAME,
        active: internalState.active,
        processed: internalState.processedCount,
        errors: internalState.errorCount,
        buffered: internalState.buffer.length,
        lastActivity: internalState.lastActivity,
        errorRate: internalState.processedCount > 0
          ? (internalState.errorCount / internalState.processedCount * 100).toFixed(2) + '%'
          : '0%',
      };
    },

    reset() {
      internalState.processedCount = 0;
      internalState.errorCount = 0;
      internalState.buffer = [];
      internalState.lastActivity = timestamp();
    },

    async shutdown() {
      if (internalState.buffer.length > 0) {
        await this.flush();
      }
      internalState.active = false;
    },

    isHealthy() {
      if (!internalState.active) return false;
      if (internalState.processedCount > 10) {
        return (internalState.errorCount / internalState.processedCount) < 0.5;
      }
      return true;
    },
  };
}

/**
 * Transform data for ab testing module 7
 */
export function transformAbTestData7(data, opts = {}) {
  const { flatten = false, filterNulls = true, sortKey = null } = opts;
  let result = data;
  if (Array.isArray(result) && filterNulls) {
    result = result.filter(item => item !== null && item !== undefined);
  }
  if (Array.isArray(result) && sortKey) {
    result = [...result].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') return va.localeCompare(vb);
      return va - vb;
    });
  }
  if (flatten && Array.isArray(result)) {
    result = result.flat(Infinity);
  }
  return result;
}

export const ABTEST_MODULE_7_DEFAULTS = {
  MAX_ITEMS: 1000,
  DEFAULT_TIMEOUT: 5000,
  RETRY_DELAY: 1000,
  BATCH_SIZE: 50,
  VERSION: '1.0.7',
};
