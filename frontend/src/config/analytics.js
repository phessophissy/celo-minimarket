export const ANALYTICS_EVENTS = {
  PRODUCT_VIEWED: 'product_viewed',
  PRODUCT_LISTED: 'product_listed',
  PRODUCT_PURCHASED: 'product_purchased',
  WALLET_CONNECTED: 'wallet_connected',
  WALLET_DISCONNECTED: 'wallet_disconnected',
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
  PAGE_VIEWED: 'page_viewed',
  ERROR_OCCURRED: 'error_occurred',
};
export function trackEvent(event, properties = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties);
  }
  if (process.env.NODE_ENV === 'development') {
    console.debug('[Analytics]', event, properties);
  }
}
