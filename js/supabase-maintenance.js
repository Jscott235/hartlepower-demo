const SUPABASE_URL = 'https://qgjdaologsmrviaikzej.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamRhb2xvZ3NtcnZpYWlremVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTQxMzQsImV4cCI6MjA5NzM5MDEzNH0.gOya9F8I45uRFOLH6uFLFADSPda1YUDOjJkrnP2lCyw';

const HP_DB = {
  async fetchAll() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hp_maintenance?order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    return res.json();
  },

  async insert(data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hp_maintenance`, {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hp_maintenance?id=eq.${id}`, {
      method: 'PATCH',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify({ ...data, updated_at: new Date().toISOString() })
    });
    return res.json();
  },

  subscribe(callback) {
    // Poll every 3 seconds for real-time feel without websocket complexity
    let lastCheck = new Date().toISOString();
    const poll = setInterval(async () => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/hp_maintenance?updated_at=gt.${lastCheck}&order=updated_at.desc`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      const rows = await res.json();
      if (rows.length > 0) {
        lastCheck = rows[0].updated_at;
        callback(rows);
      }
    }, 3000);
    return () => clearInterval(poll);
  }
};

function formatTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' }) + ' at ' + d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
}

function statusBadge(status) {
  const map = {
    'open': 'tag-gold',
    'awaiting_confirmation': 'tag-teal',
    'confirmed': 'tag-green',
    'reschedule_requested': 'tag-gold',
    'resolved': 'tag-green'
  };
  const labels = {
    'open': 'Open',
    'awaiting_confirmation': 'Visit proposed',
    'confirmed': 'Visit confirmed',
    'reschedule_requested': 'Reschedule requested',
    'resolved': 'Resolved'
  };
  return `<span class="tag ${map[status] || 'tag-grey'}">${labels[status] || status}</span>`;
}
