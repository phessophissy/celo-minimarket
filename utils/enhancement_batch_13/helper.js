import { BATCH_13_STATUS, BATCH_13_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_13_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_13_ID;
}
