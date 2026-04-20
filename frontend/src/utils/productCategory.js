const CATS = {
  'Food & Grains':['rice','flour','garri','fufu','yam','cassava','bread','plantain'],
  'Spices':['pepper','spice','curry','thyme','ginger','cinnamon','clove','vanilla'],
  'Oils':['oil','butter','shea'],
  'Beverages':['tea','juice','water','milk','zobo','kunu'],
  'Fruits':['mango','banana','pineapple','watermelon','pawpaw','orange','avocado','guava','coconut','fig','dates'],
  'Vegetables':['tomato','onion','cabbage','spinach','lettuce','carrot','potato','okra'],
  'Nuts & Seeds':['cashew','almond','walnut','peanut','groundnut','sesame','chia','melon seed','egusi'],
  'Protein':['fish','catfish','meat','stockfish','crayfish','kilishi','suya'],
  'Snacks':['chin chin','puff puff','buns','chips','pie'],
};
export function categorizeProduct(name) { const l=name.toLowerCase(); for(const[c,kws]of Object.entries(CATS)){if(kws.some(k=>l.includes(k)))return c;} return'Other'; }
export function groupByCategory(products) { const g={}; products.forEach(p=>{const c=categorizeProduct(p.name);(g[c]=g[c]||[]).push(p);}); return g; }
export function getCategoryNames() { return [...Object.keys(CATS),'Other']; }
export function getCategoryCounts(products) { const g=groupByCategory(products); return Object.entries(g).map(([n,i])=>({name:n,count:i.length})).sort((a,b)=>b.count-a.count); }
