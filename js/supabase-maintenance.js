const SUPABASE_URL = 'https://qgjdaologsmrviaikzej.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamRhb2xvZ3NtcnZpYWlremVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTQxMzQsImV4cCI6MjA5NzM5MDEzNH0.gOya9F8I45uRFOLH6uFLFADSPda1YUDOjJkrnP2lCyw';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function sbFetch(table, params='') {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params}`, { headers });
  return r.json();
}
async function sbInsert(table, data) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method:'POST', headers, body: JSON.stringify(data) });
  return r.json();
}
async function sbUpdate(table, id, data) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method:'PATCH', headers, body: JSON.stringify({...data, updated_at: new Date().toISOString()}) });
  return r.json();
}
async function sbDelete(table, filter='') {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}${filter}`, { method:'DELETE', headers });
}

const HP_DB = {
  fetchAll: () => sbFetch('hp_maintenance', '?order=created_at.desc'),
  insert: (d) => sbInsert('hp_maintenance', d),
  update: (id, d) => sbUpdate('hp_maintenance', id, d),
  subscribe(cb) {
    let last = new Date().toISOString();
    const t = setInterval(async () => {
      const rows = await sbFetch('hp_maintenance', `?updated_at=gt.${last}&order=updated_at.desc`);
      if (rows.length) { last = rows[0].updated_at; cb(rows); }
    }, 3000);
    return () => clearInterval(t);
  }
};

const HP_BOOKINGS = {
  fetchAll: () => sbFetch('hp_bookings', '?order=created_at.desc'),
  insert: (d) => sbInsert('hp_bookings', d),
  subscribe(cb) {
    let last = new Date().toISOString();
    const t = setInterval(async () => {
      const rows = await sbFetch('hp_bookings', `?created_at=gt.${last}&order=created_at.desc`);
      if (rows.length) { last = rows[0].created_at; cb(rows); }
    }, 3000);
    return () => clearInterval(t);
  }
};

const HP_NOTICES = {
  fetchAll: () => sbFetch('hp_notices', '?order=created_at.desc'),
  insert: (d) => sbInsert('hp_notices', d),
  subscribe(cb) {
    let last = new Date().toISOString();
    const t = setInterval(async () => {
      const rows = await sbFetch('hp_notices', `?created_at=gt.${last}&order=created_at.desc`);
      if (rows.length) { last = rows[0].created_at; cb(rows); }
    }, 3000);
    return () => clearInterval(t);
  }
};

const HP_PROSPECTS = {
  fetchAll: () => sbFetch('hp_prospects', '?order=created_at.desc'),
  insert: (d) => sbInsert('hp_prospects', d),
  update: (id, d) => sbUpdate('hp_prospects', id, d),
  subscribe(cb) {
    let last = new Date().toISOString();
    const t = setInterval(async () => {
      const rows = await sbFetch('hp_prospects', `?created_at=gt.${last}&order=created_at.desc`);
      if (rows.length) { last = rows[0].created_at; cb(rows); }
    }, 3000);
    return () => clearInterval(t);
  }
};

// ── Demo reset ────────────────────────────────────────────────────
async function DEMO_RESET() {
  if (!confirm('Reset all live demo data? This will clear bookings, notices, prospects and maintenance requests added during the demo.')) return;

  // Delete demo-added rows (keep seeds by deleting rows created in last 2 hours)
  const cutoff = new Date(Date.now() - 2*60*60*1000).toISOString();
  await sbDelete('hp_maintenance', `?created_at=gt.${cutoff}`);
  await sbDelete('hp_bookings', `?created_at=gt.${cutoff}`);
  await sbDelete('hp_notices', `?created_at=gt.${cutoff}`);
  await sbDelete('hp_prospects', `?created_at=gt.${cutoff}`);

  // Re-seed maintenance
  await sbInsert('hp_maintenance', [
    { tenant:'Sarah Mitchell', business:'Mitchell Creative', room:'Room 7', building:'Greenbank', issue:'Radiator making noise', description:'The radiator has been making a loud clicking noise since Monday, especially in the morning.', status:'open', priority:'medium' },
    { tenant:'James Whitfield', business:'Tees Valley Web', room:'Room 9', building:'Business Hub', issue:'Flickering light', description:'The overhead light in the main office area flickers intermittently.', status:'open', priority:'low' }
  ]);

  alert('Demo reset. All portals will refresh within 3 seconds.');
  setTimeout(() => location.reload(), 1500);
}

// ── Helpers ───────────────────────────────────────────────────────
function formatTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' }) + ' at ' + d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
}

function statusBadge(s) {
  const cls = { open:'tag-gold', 'awaiting_confirmation':'tag-teal', confirmed:'tag-green', reschedule_requested:'tag-gold', resolved:'tag-green', 'in-progress':'tag-teal' };
  const lbl = { open:'Open', 'awaiting_confirmation':'Visit proposed', confirmed:'Visit confirmed', reschedule_requested:'Reschedule requested', resolved:'Resolved', 'in-progress':'In progress' };
  return `<span class="tag ${cls[s]||'tag-grey'}">${lbl[s]||s}</span>`;
}
