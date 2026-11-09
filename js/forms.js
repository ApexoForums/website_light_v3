(function () {
  function sanitize(val) {
    if (typeof val !== 'string') return val;
    return val.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '').trim().slice(0, 5000);
  }
  var RATE_LIMIT_MS = 60000;
  function isRateLimited(formId) {
    try {
      var key = 'af_rl_' + formId;
      var last = parseInt(localStorage.getItem(key) || '0', 10);
      if (Date.now() - last < RATE_LIMIT_MS) return true;
      localStorage.setItem(key, String(Date.now()));
      return false;
    } catch (e) { return false; }
  }
  window.submitToWeb3Forms = async function (event, form, subject) {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';
    var formId = form.id || form.className.replace(/\s+/g,'-') || subject;
    if (isRateLimited(formId)) {
      if (btn) { btn.textContent = 'Please wait 60s before resubmitting'; setTimeout(() => { btn.textContent = originalText; }, 4000); }
      return false;
    }
    var honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.value) return false;
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    const raw = Object.fromEntries(new FormData(form).entries());
    const data = {};
    Object.keys(raw).forEach(function(k) { data[k] = sanitize(raw[k]); });
    data.access_key = '525a153e-4acf-412b-97c3-90cf0f36e6a9';
    data.subject = sanitize(subject) + (data.enquiry_type ? ': ' + sanitize(data.enquiry_type) : '');
    data.from_name = 'Apexo Forums Website';
    if (!data.to) data.to = 'aastha@apexoac.com';
    delete data.botcheck;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        if (btn) btn.textContent = 'Sent ✓';
        form.reset();
        setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = originalText; } }, 4000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = 'Failed — try again'; }
      setTimeout(() => { if (btn) btn.textContent = originalText; }, 4000);
      if (window.__APEXO_DEBUG__) console.error('Form error:', err);
    }
    return false;
  };
})();
