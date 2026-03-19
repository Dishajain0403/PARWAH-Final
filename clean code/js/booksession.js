// ── Concern pill toggle ──────────────────────────────────────
    document.querySelectorAll('.concern-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.concern-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    // ── Set minimum date to today ────────────────────────────────
    const dateInput = document.getElementById('prefDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    // ── Form validation & submit ─────────────────────────────────
    document.getElementById('bookingForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const alertEl = document.getElementById('formAlert');
      const firstName  = document.getElementById('firstName').value.trim();
      const lastName   = document.getElementById('lastName').value.trim();
      const email      = document.getElementById('email').value.trim();
      const phone      = document.getElementById('phone').value.trim();
      const concern    = document.querySelector('input[name="concern"]:checked');
      const prefDate   = document.getElementById('prefDate').value;
      const prefTime   = document.getElementById('prefTime').value;

      // Clear previous alert
      alertEl.className = 'hidden';
      alertEl.textContent = '';

      if (!firstName || !lastName || !email || !phone || !concern || !prefDate || !prefTime) {
        alertEl.className = 'alert alert-error';
        alertEl.textContent = '⚠️ Please fill in all required fields before continuing.';
        alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alertEl.className = 'alert alert-error';
        alertEl.textContent = '⚠️ Please enter a valid email address.';
        return;
      }

      // Success — proceed to payment (placeholder)
      alertEl.className = 'alert alert-success';
      alertEl.textContent = '✅ Details confirmed! Redirecting to secure payment…';
      alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // TODO: Replace with actual payment gateway redirect
      // setTimeout(() => { window.location.href = 'payment.html'; }, 1500);
    });