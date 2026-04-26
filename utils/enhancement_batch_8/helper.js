import { BATCH_8_STATUS, BATCH_8_ID } from './constants.js';

export function getBatchStatus() {
    return BATCH_8_STATUS;
}

export function validateBatchId(id) {
    return id === BATCH_8_ID;
}
