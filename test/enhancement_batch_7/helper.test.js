import { getBatchStatus, validateBatchId } from '../../utils/enhancement_batch_7/helper.js';

describe('Batch 7 Helper Functions', () => {
    it('should return active status', () => {
        const status = getBatchStatus();
        if (status !== 'active') throw new Error('Status validation failed');
    });

    it('should validate the correct batch ID', () => {
        const isValid = validateBatchId(7);
        if (!isValid) throw new Error('ID validation failed');
    });
});
