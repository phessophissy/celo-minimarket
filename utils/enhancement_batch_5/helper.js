import { BATCH_5_STATUS, BATCH_5_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_5_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_5_ID;
}
