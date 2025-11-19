import { Buffer } from 'buffer'
import process from 'process'

window.Buffer = Buffer
window.process = process
window.global = window

// Comprehensive fix for multiple wallet extensions
if (typeof window !== 'undefined') {
  // Patch any provider to ensure compatibility
  const patchProvider = (provider) => {
    if (!provider || provider._isPatched) return provider
    
    try {
      // Add missing methods that ethers.js expects
      if (typeof provider.supportsSubscriptions !== 'function') {
        provider.supportsSubscriptions = () => false
      }
      if (typeof provider.on !== 'function') {
        provider.on = () => {}
      }
      if (typeof provider.removeListener !== 'function') {
        provider.removeListener = () => {}
      }
      if (typeof provider.removeAllListeners !== 'function') {
        provider.removeAllListeners = () => {}
      }
      
      // Handle providers array (multiple wallets)
      if (provider.providers && Array.isArray(provider.providers)) {
        provider.providers.forEach(p => patchProvider(p))
      }
      
      provider._isPatched = true
    } catch (error) {
      console.warn('Provider patching error:', error)
    }
    
    return provider
  }

  // Patch existing ethereum provider
  if (window.ethereum) {
    patchProvider(window.ethereum)
  }

  // Intercept ethereum property to patch any new providers
  let currentProvider = window.ethereum
  Object.defineProperty(window, 'ethereum', {
    get() {
      return currentProvider
    },
    set(provider) {
      currentProvider = patchProvider(provider)
    },
    configurable: true,
    enumerable: true
  })

  // Also handle window.web3 if it exists (legacy)
  if (window.web3 && window.web3.currentProvider) {
    patchProvider(window.web3.currentProvider)
  }
}
