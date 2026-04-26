import { BATCH_6_STATUS, BATCH_6_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_6_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_6_ID;
}
