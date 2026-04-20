export function parseProduct(raw) {
  return { tokenId:Number(raw.tokenId||raw[0]), vendor:raw.vendor||raw[1], name:raw.name||raw[2], priceWei:BigInt(raw.priceWei||raw[3]), description:raw.description||raw[4], imageData:raw.imageData||raw[5], active:Boolean(raw.active??raw[6]), sold:Boolean(raw.sold??raw[7]) };
}
export function parseProducts(arr) { return arr.map(parseProduct); }
export function formatPrice(wei) { const c=Number(wei)/1e18; if(c>=1)return c.toFixed(2)+' CELO'; if(c>=0.01)return c.toFixed(4)+' CELO'; return c.toFixed(6)+' CELO'; }
export function getProductStatus(p) { if(p.sold)return'sold'; if(!p.active)return'inactive'; return'available'; }
export function isOwnProduct(p,addr) { return addr&&p.vendor.toLowerCase()===addr.toLowerCase(); }
