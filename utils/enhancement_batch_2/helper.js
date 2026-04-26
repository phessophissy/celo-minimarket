import { BATCH_2_STATUS, BATCH_2_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_2_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_2_ID;
}
