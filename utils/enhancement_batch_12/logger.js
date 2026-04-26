export function logBatchEvent(event) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [Batch 12] ${event}`);
}

export function logBatchError(error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [Batch 12 Error] ${error.message}`);
}
