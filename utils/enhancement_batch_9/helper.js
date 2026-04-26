import { BATCH_9_STATUS, BATCH_9_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_9_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_9_ID;
}
