import { getBatchStatus, validateBatchId } from '../../utils/enhancement_batch_14/helper.js';

describe('Batch 14 Helper Functions', () => {
    it('should return active status', () => {
        const status = getBatchStatus();
        if (status !== 'active') throw new Error('Status validation failed');
    });

    it('should validate the correct batch ID', () => {
        const isValid = validateBatchId(14);
        if (!isValid) throw new Error('ID validation failed');
    });
});
