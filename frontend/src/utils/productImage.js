export function isValidDataUri(img) { return typeof img==='string'&&img.startsWith('data:image/'); }
export function getImageMimeType(uri) { const m=uri.match(/^data:(image\/[a-z+]+);/i); return m?m[1]:null; }
export function estimateImageSizeKB(uri) { if(!uri)return 0; const b=uri.split(',')[1]; return b?Math.ceil(b.length*3/4/1024):0; }
export function getPlaceholderColor(name) { let h=0; for(let i=0;i<name.length;i++) h=name.charCodeAt(i)+((h<<5)-h); return`hsl(${Math.abs(h)%360},60%,40%)`; }
export function createPlaceholderSvg(name, sz=200) {
  const c=getPlaceholderColor(name), ini=name.charAt(0).toUpperCase();
  return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}"><rect width="100%" height="100%" fill="${c}"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="${sz*.4}" font-family="sans-serif" fill="white">${ini}</text></svg>`)}`;
}
