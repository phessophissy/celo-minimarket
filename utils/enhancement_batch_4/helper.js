import { BATCH_4_STATUS, BATCH_4_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_4_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_4_ID;
}
