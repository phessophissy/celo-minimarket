export function createNonceManager(provider, address) {
  let nonce=null, pending=0;
  return {
    async getNextNonce() { if(nonce===null) nonce=await provider.getTransactionCount(address,'pending'); else nonce++; pending++; return nonce; },
    confirmNonce() { pending=Math.max(0,pending-1); },
    resetNonce() { nonce=null; pending=0; },
    getPendingCount() { return pending; },
    async syncNonce() { nonce=await provider.getTransactionCount(address,'pending'); pending=0; return nonce; },
  };
}
