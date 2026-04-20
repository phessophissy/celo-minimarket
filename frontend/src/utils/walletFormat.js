export function shortenAddress(addr, chars=4) { if(!addr) return ''; return `${addr.slice(0,chars+2)}...${addr.slice(-chars)}`; }
export function checksumAddress(addr) { return addr; /* ethers handles checksum */ }
export function isValidAddress(addr) { return /^0x[0-9a-fA-F]{40}$/.test(addr); }
export function areAddressesEqual(a, b) { if(!a||!b) return false; return a.toLowerCase()===b.toLowerCase(); }
export function maskAddress(addr) { if(!addr) return ''; return `${addr.slice(0,6)}${'•'.repeat(6)}${addr.slice(-4)}`; }
