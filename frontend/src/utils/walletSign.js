export async function signMessage(signer, message) {
  try {
    const signature = await signer.signMessage(message);
    return { signature, message, success: true };
  } catch (err) {
    return { signature: null, message, success: false, error: err.message };
  }
}
export async function verifySignature(message, signature, expectedAddress) {
  try {
    const { ethers } = await import('ethers');
    const recovered = ethers.verifyMessage(message, signature);
    return recovered.toLowerCase() === expectedAddress.toLowerCase();
  } catch { return false; }
}
