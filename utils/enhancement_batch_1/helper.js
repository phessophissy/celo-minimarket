import { BATCH_1_STATUS, BATCH_1_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_1_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_1_ID;
}
