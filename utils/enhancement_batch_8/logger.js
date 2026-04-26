export function logBatchEvent(event) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [Batch 8] ${event}`);
}

export function logBatchError(error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [Batch 8 Error] ${error.message}`);
}
