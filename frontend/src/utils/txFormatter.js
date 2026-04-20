export function formatTxHash(h,c=6) { return (!h||h.length<c*2+2)?h||'':`${h.slice(0,c+2)}...${h.slice(-c)}`; }
export function formatCeloAmount(wei,dec=4) { if(!wei)return'0'; const v=Number(wei)/1e18; if(v===0)return'0'; if(v<0.0001)return'< 0.0001'; return v.toFixed(dec).replace(/\.?0+$/,''); }
export function formatGasPrice(gp) { return gp?(Number(gp)/1e9).toFixed(2)+' Gwei':'0'; }
export function formatTimeAgo(ts) { const s=Math.floor((Date.now()-ts)/1000); if(s<10)return'just now'; if(s<60)return`${s}s ago`; const m=Math.floor(s/60); if(m<60)return`${m}m ago`; const h=Math.floor(m/60); if(h<24)return`${h}h ago`; return`${Math.floor(h/24)}d ago`; }
export function celoscanTxUrl(h) { return `https://celoscan.io/tx/${h}`; }
export function celoscanAddressUrl(a) { return `https://celoscan.io/address/${a}`; }
