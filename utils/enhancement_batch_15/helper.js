import { BATCH_15_STATUS, BATCH_15_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_15_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_15_ID;
}
