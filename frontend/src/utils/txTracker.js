export const TX_STATES = { PENDING:'pending', CONFIRMING:'confirming', CONFIRMED:'confirmed', FAILED:'failed', TIMEOUT:'timeout' };
export function createTxTracker() {
  const txs=new Map(), listeners=new Set();
  const notify=(h,s,d)=>listeners.forEach(fn=>{try{fn(h,s,d)}catch(e){console.error(e)}});
  return {
    states: TX_STATES,
    track(hash,meta={}) { const e={hash,state:TX_STATES.PENDING,timestamp:Date.now(),metadata:meta,receipt:null,error:null}; txs.set(hash,e); notify(hash,TX_STATES.PENDING,e); return e; },
    updateState(hash,state,extra={}) { const e=txs.get(hash); if(!e)return; Object.assign(e,{state,...extra}); notify(hash,state,e); },
    get(hash) { return txs.get(hash)||null; },
    getAll() { return Array.from(txs.values()); },
    getPending() { return this.getAll().filter(t=>t.state===TX_STATES.PENDING||t.state===TX_STATES.CONFIRMING); },
    getRecent(n=10) { return this.getAll().sort((a,b)=>b.timestamp-a.timestamp).slice(0,n); },
    onUpdate(fn) { listeners.add(fn); return ()=>listeners.delete(fn); },
    clear() { txs.clear(); },
  };
}
