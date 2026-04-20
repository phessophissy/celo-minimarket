function parseLogs(receipt, iface, eventName) {
  if(!receipt?.logs) return [];
  return receipt.logs.map(l=>{try{return iface.parseLog({topics:l.topics,data:l.data})}catch{return null}}).filter(e=>e&&e.name===eventName);
}
export function parseProductAddedEvents(receipt, iface) {
  return parseLogs(receipt,iface,'ProductAdded').map(e=>({event:'ProductAdded',tokenId:e.args.tokenId.toString(),vendor:e.args.vendor,name:e.args.name,priceWei:e.args.priceWei.toString()}));
}
export function parseProductPurchasedEvents(receipt, iface) {
  return parseLogs(receipt,iface,'ProductPurchased').map(e=>({event:'ProductPurchased',tokenId:e.args.tokenId.toString(),buyer:e.args.buyer,vendor:e.args.vendor,price:e.args.price.toString()}));
}
export function parseProductToggledEvents(receipt, iface) {
  return parseLogs(receipt,iface,'ProductStatusToggled').map(e=>({event:'ProductStatusToggled',tokenId:e.args.tokenId.toString(),active:e.args.active}));
}
