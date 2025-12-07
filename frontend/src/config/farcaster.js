import { sdk } from '@farcaster/miniapp-sdk'

// Check if running in Farcaster Mini App context
let isFarcasterMiniApp = false

export async function initFarcasterSDK() {
  try {
    // Check if we're in a Mini App environment
    isFarcasterMiniApp = await sdk.isInMiniApp()
    
    if (isFarcasterMiniApp) {
      console.log('Running as Farcaster Mini App')
      
      // Get context information
      const context = sdk.context
      if (context) {
        console.log('Farcaster context:', context)
        console.log('User FID:', context.user?.fid)
        console.log('Platform:', context.client?.platformType)
      }
    } else {
      console.log('Running as standalone web app')
    }
    
    return isFarcasterMiniApp
  } catch (error) {
    console.log('Not in Farcaster Mini App context:', error)
    return false
  }
}

export async function signalReady() {
  if (isFarcasterMiniApp) {
    try {
      await sdk.actions.ready()
      console.log('Farcaster Mini App ready signal sent')
    } catch (error) {
      console.error('Error signaling ready:', error)
    }
  }
}

export function getIsFarcasterMiniApp() {
  return isFarcasterMiniApp
}

// Get Farcaster user info if available
export function getFarcasterUser() {
  if (isFarcasterMiniApp && sdk.context?.user) {
    return sdk.context.user
  }
  return null
}

// Get safe area insets for mobile UI
export function getSafeAreaInsets() {
  if (isFarcasterMiniApp && sdk.context?.client?.safeAreaInsets) {
    return sdk.context.client.safeAreaInsets
  }
  return { top: 0, bottom: 0, left: 0, right: 0 }
}

// Open Farcaster profile
export async function viewFarcasterProfile(fid) {
  if (isFarcasterMiniApp) {
    try {
      await sdk.actions.viewProfile({ fid })
    } catch (error) {
      console.error('Error viewing profile:', error)
    }
  }
}

// Compose a cast (share)
export async function composeCast(text, embeds = []) {
  if (isFarcasterMiniApp) {
    try {
      const result = await sdk.actions.composeCast({
        text,
        embeds
      })
      return result
    } catch (error) {
      console.error('Error composing cast:', error)
      return null
    }
  }
  return null
}

// Open external URL
export async function openExternalUrl(url) {
  if (isFarcasterMiniApp) {
    try {
      await sdk.actions.openUrl(url)
    } catch (error) {
      console.error('Error opening URL:', error)
      // Fallback to window.open
      window.open(url, '_blank')
    }
  } else {
    window.open(url, '_blank')
  }
}

// Export the SDK for advanced usage
export { sdk }
