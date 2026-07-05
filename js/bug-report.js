const SUPABASE_URL = 'https://qgjdaologsmrviaikzej.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamRhb2xvZ3NtcnZpYWlremVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTQxMzQsImV4cCI6MjA5NzM5MDEzNH0.gOya9F8I45uRFOLH6uFLFADSPda1YUDOjJkrnP2lCyw';

(function () {
  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/hartlepower-demo/css/bug-report.css';
  document.head.appendChild(link);

  // Inject HTML
  document.body.insertAdjacentHTML('beforeend', `
<div id="feedbackMenu" style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
      <div id="feedbackOptions" style="display:none;flex-direction:column;gap:8px;align-items:flex-end;">
        <button id="bugBtn" onclick="openReport('bug')" style="background:#E05252;">
          <svg width="14" height="14" fill="none" viewBox="0 0 256 256" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M128,136v48" fill="none"/><circle cx="128" cy="104" r="8" fill="currentColor"/><path d="M232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Z" fill="none"/></svg>
          Report bug
        </button>
        <button id="ideaBtn" onclick="openReport('idea')" style="background:#1A9B8C;color:#fff;border:none;border-radius:12px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 16px rgba(26,155,140,0.4);">
          <svg width="14" height="14" fill="none" viewBox="0 0 256 256" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="120" r="72" fill="none"/><path d="M96,232h64" fill="none"/><path d="M112,232v-48h32v48" fill="none"/></svg>
          Suggest idea
        </button>
      </div>
      <button id="feedbackToggle" onclick="toggleFeedback()" style="background:#1C1C1C;color:#fff;border:none;border-radius:12px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
        <svg width="14" height="14" fill="none" viewBox="0 0 256 256" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><line x1="40" y1="128" x2="216" y2="128"/><line x1="40" y1="64" x2="216" y2="64"/><line x1="40" y1="192" x2="216" y2="192"/></svg>
        Feedback
      </button>
    </div>

    <div id="bugOverlay" onclick="if(event.target===this)closeBugReport()">
      <div id="bugModal">
        <div id="bugForm">
          <h3 id="modalTitle">Report a bug</h3>
          <p id="modalSubtitle">Tell Jaydon what broke. Josh will fix it.</p>

          <div class="bug-field">
            <label>Page / area</label>
            <input type="text" id="bug-page" placeholder="e.g. Tenant portal → Maintenance">
          </div>

          <div class="bug-field">
            <label>What happened?</label>
            <textarea id="bug-desc" placeholder="Describe what went wrong..."></textarea>
          </div>

          <div class="bug-field">
            <label>Steps to reproduce (optional)</label>
            <textarea id="bug-steps" placeholder="1. Click...&#10;2. Then...&#10;3. Expected..." style="min-height:60px;"></textarea>
          </div>

          <div class="bug-field">
            <label>Severity</label>
            <div class="bug-severity">
              <button class="sev-btn low" onclick="setSeverity('low',this)">Low — minor</button>
              <button class="sev-btn medium active" onclick="setSeverity('medium',this)">Medium — annoying</button>
              <button class="sev-btn high" onclick="setSeverity('high',this)">High — broken</button>
            </div>
          </div>

          <div class="bug-actions">
            <button class="bug-cancel" onclick="closeBugReport()">Cancel</button>
            <button class="bug-submit" onclick="submitBug()">Submit bug</button>
          </div>
        </div>

        <div id="bugSuccess">
          <div style="font-size:40px;margin-bottom:12px;">✓</div>
          <h3 id="successTitle">Bug logged</h3>
          <p id="successMsg">Josh will pick it up and fix it.<br>Keep testing.</p>
          <button onclick="closeBugReport()" style="margin-top:16px;padding:10px 24px;background:#1A9B8C;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;">Got it</button>
        </div>
      </div>
    </div>
  `);

  let currentSeverity = 'medium';

  let currentMode = 'bug';

  window.toggleFeedback = function() {
    const opts = document.getElementById('feedbackOptions');
    opts.style.display = opts.style.display === 'none' ? 'flex' : 'none';
  };

  window.openReport = function(mode) {
    currentMode = mode;
    document.getElementById('feedbackOptions').style.display = 'none';
    document.getElementById('bugOverlay').classList.add('open');
    document.getElementById('bugForm').style.display = 'block';
    document.getElementById('bugSuccess').style.display = 'none';
    document.getElementById('bug-page').value = document.title.replace(' — HartlePower', '').replace('HartlePower', 'Homepage');
    document.getElementById('bug-desc').value = '';
    document.getElementById('bug-steps').value = '';
    if (mode === 'idea') {
      document.getElementById('modalTitle').textContent = 'Suggest an idea';
      document.getElementById('modalSubtitle').textContent = 'Feature ideas, improvements, anything. Josh will review it.';
      document.getElementById('bug-page').placeholder = 'e.g. Tenant portal';
      document.getElementById('bug-desc').placeholder = 'Describe your idea...';
      document.getElementById('bug-steps').closest('.bug-field').style.display = 'none';
      document.querySelectorAll('.sev-btn').forEach(b => b.closest('.bug-field') && (b.closest('.bug-field').style.display = 'none'));
    } else {
      document.getElementById('modalTitle').textContent = 'Report a bug';
      document.getElementById('modalSubtitle').textContent = 'Tell Jaydon what broke. Josh will fix it.';
      document.getElementById('bug-page').placeholder = 'e.g. Tenant portal → Maintenance';
      document.getElementById('bug-desc').placeholder = 'Describe what went wrong...';
      document.getElementById('bug-steps').closest('.bug-field').style.display = 'block';
      document.querySelectorAll('.sev-btn').forEach(b => b.closest && b.closest('.bug-field') && (b.closest('.bug-field').style.display = 'block'));
    }
  };

  window.openBugReport = function() { openReport('bug'); };

  window.closeBugReport = function () {
    document.getElementById('bugOverlay').classList.remove('open');
  };

  window.setSeverity = function (level, el) {
    document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    currentSeverity = level;
  };

  window.submitBug = async function () {
    const page = document.getElementById('bug-page').value.trim();
    const desc = document.getElementById('bug-desc').value.trim();
    if (!page || !desc) { alert('Please fill in page and description'); return; }

    await fetch(`${SUPABASE_URL}/rest/v1/hp_bugs`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page,
        description: (currentMode === 'idea' ? '[IDEA] ' : '') + desc,
        steps: currentMode === 'bug' ? (document.getElementById('bug-steps').value.trim() || null) : null,
        severity: currentMode === 'idea' ? 'idea' : currentSeverity,
        url: window.location.href,
        status: 'open'
      })
    });

    document.getElementById('bugForm').style.display = 'none';
    document.getElementById('bugSuccess').style.display = 'block';
    if (currentMode === 'idea') {
      document.getElementById('successTitle').textContent = 'Idea logged';
      document.getElementById('successMsg').innerHTML = 'Josh will review it.<br>Good thinking.';
    } else {
      document.getElementById('successTitle').textContent = 'Bug logged';
      document.getElementById('successMsg').innerHTML = 'Josh will pick it up and fix it.<br>Keep testing.';
    }
  };
})();
