import { BATCH_10_STATUS, BATCH_10_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_10_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_10_ID;
}
