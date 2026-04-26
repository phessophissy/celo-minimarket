import { BATCH_7_STATUS, BATCH_7_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_7_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_7_ID;
}
