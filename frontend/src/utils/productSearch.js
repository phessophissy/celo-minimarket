export function calculateRelevance(product, query) {
  if(!query) return 0;
  const terms=query.toLowerCase().split(/\s+/), name=product.name.toLowerCase(), desc=(product.description||'').toLowerCase();
  let score=0;
  for(const t of terms) { if(name===t)score+=100; else if(name.startsWith(t))score+=50; else if(name.includes(t))score+=25; if(desc.includes(t))score+=10; }
  return score;
}
export function searchProducts(products, query) {
  if(!query?.trim()) return products;
  return products.map(p=>({product:p,score:calculateRelevance(p,query)})).filter(s=>s.score>0).sort((a,b)=>b.score-a.score).map(s=>s.product);
}
export function buildSuggestions(products, partial, max=5) {
  if(!partial||partial.length<2) return [];
  const l=partial.toLowerCase(), matches=new Set();
  for(const p of products) { if(matches.size>=max)break; if(p.name.toLowerCase().includes(l)) matches.add(p.name); }
  return Array.from(matches);
}
