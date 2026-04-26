import { getBatchStatus, validateBatchId } from '../../utils/enhancement_batch_10/helper.js';

describe('Batch 10 Helper Functions', () => {
    it('should return active status', () => {
        const status = getBatchStatus();
        if (status !== 'active') throw new Error('Status validation failed');
    });

    it('should validate the correct batch ID', () => {
        const isValid = validateBatchId(10);
        if (!isValid) throw new Error('ID validation failed');
    });
});
