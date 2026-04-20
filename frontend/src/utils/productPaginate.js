export function paginateProducts(products, page=1, pageSize=12) {
  const total=products.length, pages=Math.ceil(total/pageSize), cur=Math.max(1,Math.min(page,pages||1));
  const start=(cur-1)*pageSize, end=Math.min(start+pageSize,total);
  return {items:products.slice(start,end),currentPage:cur,totalPages:pages,totalItems:total,hasNext:cur<pages,hasPrev:cur>1};
}
export function getPageNumbers(cur, total, max=7) {
  if(total<=max) return Array.from({length:total},(_,i)=>i+1);
  let s=Math.max(1,cur-Math.floor(max/2)), e=Math.min(total,s+max-1);
  if(e-s<max-1) s=Math.max(1,e-max+1);
  return Array.from({length:e-s+1},(_,i)=>s+i);
}
export function getNextBatch(products, loaded, size=12) {
  const batch=products.slice(loaded,loaded+size);
  return {items:batch,loadedCount:loaded+batch.length,hasMore:loaded+batch.length<products.length};
}
