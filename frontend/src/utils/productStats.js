export function calculateStats(products) {
  if(!products?.length) return {total:0,available:0,sold:0,inactive:0,totalValueWei:0n,avgPriceWei:0n,uniqueVendors:0};
  const avail=products.filter(p=>p.active&&!p.sold), sold=products.filter(p=>p.sold);
  const prices=products.map(p=>BigInt(p.priceWei)), total=prices.reduce((s,p)=>s+p,0n);
  return {total:products.length,available:avail.length,sold:sold.length,inactive:products.length-avail.length-sold.length,totalValueWei:total,avgPriceWei:total/BigInt(products.length),uniqueVendors:new Set(products.map(p=>p.vendor.toLowerCase())).size};
}
export function calculateVendorStats(products, addr) {
  const vp=products.filter(p=>p.vendor.toLowerCase()===addr.toLowerCase());
  const sp=vp.filter(p=>p.sold), rev=sp.reduce((s,p)=>s+BigInt(p.priceWei),0n);
  return {totalProducts:vp.length,activeProducts:vp.filter(p=>p.active&&!p.sold).length,soldProducts:sp.length,revenueWei:rev};
}
