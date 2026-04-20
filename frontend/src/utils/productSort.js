export function sortProducts(products, sortBy='newest') {
  const s=[...products];
  switch(sortBy) {
    case'newest': s.sort((a,b)=>b.tokenId-a.tokenId); break;
    case'oldest': s.sort((a,b)=>a.tokenId-b.tokenId); break;
    case'price-low': s.sort((a,b)=>Number(a.priceWei-b.priceWei)); break;
    case'price-high': s.sort((a,b)=>Number(b.priceWei-a.priceWei)); break;
    case'name': s.sort((a,b)=>a.name.localeCompare(b.name)); break;
  }
  return s;
}
export function getSortOptions() {
  return [{value:'newest',label:'Newest First'},{value:'oldest',label:'Oldest First'},{value:'price-low',label:'Price: Low→High'},{value:'price-high',label:'Price: High→Low'},{value:'name',label:'Name A-Z'}];
}
