export function exportToCSV(products) {
  const h='Token ID,Name,Price (CELO),Vendor,Status,Description';
  const rows=products.map(p=>[p.tokenId,`"${p.name.replace(/"/g,'""')}"`,Number(p.priceWei)/1e18,p.vendor,p.sold?'Sold':p.active?'Active':'Inactive',`"${(p.description||'').replace(/"/g,'""')}"`].join(','));
  return [h,...rows].join('\n');
}
export function exportToJSON(products) {
  return JSON.stringify(products.map(p=>({tokenId:p.tokenId,name:p.name,priceCelo:Number(p.priceWei)/1e18,vendor:p.vendor,status:p.sold?'sold':p.active?'active':'inactive',description:p.description||''})),null,2);
}
export function downloadFile(content, filename, mime='text/plain') {
  const blob=new Blob([content],{type:mime}), url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
