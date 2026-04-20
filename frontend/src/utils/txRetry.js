export function isRetryableError(err) {
  const m = (err?.message||'').toLowerCase();
  return ['nonce','timeout','etimedout','econnreset','rate limit','429','502','503'].some(p=>m.includes(p));
}
export async function withRetry(fn, opts = {}) {
  const { maxRetries=3, backoffMs=2000, onRetry=null, label='op' } = opts;
  let last;
  for (let i=1;i<=maxRetries;i++) {
    try { return await fn(i); } catch(e) {
      last=e;
      if(i<maxRetries && isRetryableError(e)) { const d=backoffMs*i; if(onRetry)onRetry(i,d,e); await new Promise(r=>setTimeout(r,d)); }
      else throw e;
    }
  }
  throw last;
}
export async function batchExecute(tasks, concurrency=3) {
  const results=[]; const running=new Set();
  for (const task of tasks) {
    const p=Promise.resolve().then(()=>task()).then(v=>({status:'fulfilled',value:v}),e=>({status:'rejected',reason:e}));
    results.push(p); running.add(p); p.finally(()=>running.delete(p));
    if(running.size>=concurrency) await Promise.race(running);
  }
  return Promise.all(results);
}
