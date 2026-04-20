export const ERROR_CODES = {
  INSUFFICIENT_FUNDS: { title:'Insufficient Balance', message:'Not enough CELO for this transaction.', action:'Add funds and try again.' },
  USER_REJECTED: { title:'Cancelled', message:'You cancelled the transaction.', action:'Try again when ready.' },
  NETWORK_ERROR: { title:'Network Error', message:'Cannot connect to Celo.', action:'Check your connection.' },
  PRODUCT_NOT_FOUND: { title:'Not Found', message:'Product does not exist.', action:'Refresh the page.' },
  PRODUCT_SOLD: { title:'Already Sold', message:'This product was purchased.', action:'Browse other products.' },
  PRODUCT_INACTIVE: { title:'Unavailable', message:'Product deactivated by vendor.', action:'Browse other products.' },
};
export function parseContractError(err) {
  const m=(err?.message||'').toLowerCase();
  if(m.includes('insufficient funds')) return ERROR_CODES.INSUFFICIENT_FUNDS;
  if(m.includes('user rejected')||m.includes('action_rejected')) return ERROR_CODES.USER_REJECTED;
  if(m.includes('not found')) return ERROR_CODES.PRODUCT_NOT_FOUND;
  if(m.includes('already sold')) return ERROR_CODES.PRODUCT_SOLD;
  if(m.includes('not active')) return ERROR_CODES.PRODUCT_INACTIVE;
  return {title:'Error',message:m.slice(0,200),action:'Try again.'};
}
