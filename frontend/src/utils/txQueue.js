export function createTxQueue() {
  const q=[]; let processing=false;
  async function next() { if(!q.length){processing=false;return;} processing=true; const{task,resolve,reject}=q.shift(); try{resolve(await task())}catch(e){reject(e)} next(); }
  return {
    enqueue(task) { return new Promise((res,rej)=>{q.push({task,resolve:res,reject:rej}); if(!processing) next();}); },
    get length() { return q.length; },
    get isProcessing() { return processing; },
    clear() { q.length=0; processing=false; },
  };
}
