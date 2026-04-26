import { BATCH_14_STATUS, BATCH_14_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_14_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_14_ID;
}
