export function logBatchEvent(event) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [Batch 4] ${event}`);
}

export function logBatchError(error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [Batch 4 Error] ${error.message}`);
}
