import { getBatchStatus, validateBatchId } from '../../utils/enhancement_batch_6/helper.js';

describe('Batch 6 Helper Functions', () => {
    it('should return active status', () => {
        const status = getBatchStatus();
        if (status !== 'active') throw new Error('Status validation failed');
    });

    it('should validate the correct batch ID', () => {
        const isValid = validateBatchId(6);
        if (!isValid) throw new Error('ID validation failed');
    });
});
