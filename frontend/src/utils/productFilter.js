export function filterByStatus(products, status) {
  if(status==='available') return products.filter(p=>p.active&&!p.sold);
  if(status==='sold') return products.filter(p=>p.sold);
  if(status==='inactive') return products.filter(p=>!p.active&&!p.sold);
  return products;
}
export function filterByPriceRange(products, minWei, maxWei) {
  return products.filter(p=>{ const pr=BigInt(p.priceWei); if(minWei&&pr<BigInt(minWei))return false; if(maxWei&&pr>BigInt(maxWei))return false; return true; });
}
export function filterByVendor(products, addr) { if(!addr)return products; const l=addr.toLowerCase(); return products.filter(p=>p.vendor.toLowerCase()===l); }
export function filterBySearch(products, query) {
  if(!query?.trim()) return products;
  const terms=query.toLowerCase().split(/\s+/);
  return products.filter(p=>{ const t=`${p.name} ${p.description}`.toLowerCase(); return terms.every(w=>t.includes(w)); });
}
export function applyFilters(products, f={}) {
  let r=products; if(f.status)r=filterByStatus(r,f.status); if(f.search)r=filterBySearch(r,f.search); if(f.vendor)r=filterByVendor(r,f.vendor);
  if(f.minPrice||f.maxPrice)r=filterByPriceRange(r,f.minPrice||null,f.maxPrice||null); return r;
}
