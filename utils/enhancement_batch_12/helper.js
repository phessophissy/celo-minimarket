import { BATCH_12_STATUS, BATCH_12_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_12_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_12_ID;
}
