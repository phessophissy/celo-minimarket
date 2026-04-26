import { getBatchStatus, validateBatchId } from '../../utils/enhancement_batch_13/helper.js';

describe('Batch 13 Helper Functions', () => {
    it('should return active status', () => {
        const status = getBatchStatus();
        if (status !== 'active') throw new Error('Status validation failed');
    });

    it('should validate the correct batch ID', () => {
        const isValid = validateBatchId(13);
        if (!isValid) throw new Error('ID validation failed');
    });
});
