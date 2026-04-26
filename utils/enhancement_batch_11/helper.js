import { BATCH_11_STATUS, BATCH_11_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_11_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_11_ID;
}
