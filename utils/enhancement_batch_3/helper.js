import { BATCH_3_STATUS, BATCH_3_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_3_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_3_ID;
}
