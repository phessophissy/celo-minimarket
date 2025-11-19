import { Buffer } from 'buffer'
import process from 'process'

window.Buffer = Buffer
window.process = process
window.global = window

// Fix for MetaMask/Celo provider compatibility with ethers.js
if (typeof window !== 'undefined') {
  // Patch ethereum provider when it becomes available
  const patchProvider = (provider) => {
    if (provider && !provider._isPatched) {
      if (typeof provider.supportsSubscriptions !== 'function') {
        provider.supportsSubscriptions = () => false
      }
      provider._isPatched = true
    }
    return provider
  }

  // Patch existing ethereum provider
  if (window.ethereum) {
    patchProvider(window.ethereum)
  }

  // Watch for ethereum provider initialization
  Object.defineProperty(window, 'ethereum', {
    get() {
      return this._ethereum
    },
    set(provider) {
      this._ethereum = patchProvider(provider)
    },
    configurable: true
  })
}
