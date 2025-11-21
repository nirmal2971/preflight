const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function handle(res){
  const text = await res.text().catch(()=>null);
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(body?.error || res.statusText || 'API error');
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function fetchChecks(){ const r = await fetch(`${API_ROOT}/api/checks`); return handle(r); }
export async function createCheck(payload){
  const r = await fetch(`${API_ROOT}/api/checks`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  return handle(r);
}
export async function updateCheck(id, payload){
  const r = await fetch(`${API_ROOT}/api/checks/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  return handle(r);
}
export async function deleteCheck(id){
  const r = await fetch(`${API_ROOT}/api/checks/${id}`, { method:'DELETE' });
  return handle(r);
}
