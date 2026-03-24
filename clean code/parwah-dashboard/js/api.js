// ===== PARWAH API UTILITY =====
const BASE_URL = 'http://76.13.242.151:9000/api';

const api = {
  _getToken() {
    return localStorage.getItem('parwah_token');
  },

  _getHeaders(extra = {}) {
    const headers = { 'Content-Type': 'application/json', ...extra };
    const token = this._getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  // ✅ FIX: Only logout on 403 (Forbidden/Access Denied).
  // 401 (Unauthorized) is treated as a regular error and shown to user.
  _handleUnauthorized(status) {
    if (status === 403) {
      localStorage.removeItem('parwah_token');
      localStorage.removeItem('parwah_role');
      localStorage.removeItem('parwah_user');
      window.location.href = 'login.html';
      return true;
    }
    return false;
  },

  // ✅ FIX: Safe JSON reader — never throws, returns null on empty/non-JSON bodies
  async _safeJson(res) {
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;
    const text = await res.text();
    if (!text || text.trim() === '') return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  },

  async request(method, endpoint, body = null, opts = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      method,
      headers: this._getHeaders(opts.headers || {}),
    };
    if (body !== null) config.body = JSON.stringify(body);

    let res;

    // ✅ FIX: Network-level errors (no server response) are caught separately
    // so they NEVER trigger the unauthorized redirect.
    try {
      res = await fetch(url, config);
    } catch (networkErr) {
      throw new Error('Network error: Unable to reach the server. Please check your connection.');
    }

    // ✅ FIX: Unauthorized check happens immediately after fetch,
    // BEFORE any body parsing, using the actual HTTP status code only.
    if (this._handleUnauthorized(res.status)) {
      return null; // redirect is already queued, caller should handle null
    }

    // ✅ FIX: Parse body safely — empty bodies (201, 204) won't crash
    const data = await this._safeJson(res);

    // ✅ FIX: Only throw for non-OK status, using parsed message if available.
    // This means 400, 404, 500 etc. all throw a readable error,
    // but DO NOT wipe the token or redirect.
    if (!res.ok) {
      const msg =
        data?.message ||
        data?.error ||
        data?.errorMessage ||
        `Request failed with status ${res.status}`;
      throw new Error(msg);
    }

    return data;
  },

  get(endpoint, opts)         { return this.request('GET',    endpoint, null, opts); },
  post(endpoint, body, opts)  { return this.request('POST',   endpoint, body, opts); },
  put(endpoint, body, opts)   { return this.request('PUT',    endpoint, body, opts); },
  patch(endpoint, body, opts) { return this.request('PATCH',  endpoint, body, opts); },
  delete(endpoint, opts)      { return this.request('DELETE', endpoint, null, opts); },
};

// ===========================
// AUTH HELPERS
// ===========================
const Auth = {
  isLoggedIn() {
    return !!localStorage.getItem('parwah_token');
  },
  getRole() {
    return localStorage.getItem('parwah_role');
  },
  getUser() {
    const u = localStorage.getItem('parwah_user');
    return u ? JSON.parse(u) : null;
  },

  setSession(token, role, user) {
    localStorage.setItem('parwah_token', token);
    localStorage.setItem('parwah_role', role);
    localStorage.setItem('parwah_user', JSON.stringify(user));
  },

  clearSession() {
    localStorage.clear();
    sessionStorage.clear();
  },

  redirectToDashboard() {
    const root = (window.PARWAH_CONFIG && window.PARWAH_CONFIG.root) || './';
    window.location.href = root + 'parwah-dashboard/index.html';
  },

  requireAuth(allowedRole = null) {
    const root = (window.PARWAH_CONFIG && window.PARWAH_CONFIG.root) || './';
    
    if (!this.isLoggedIn()) {
      // Immediate block to prevent flash
      document.documentElement.style.display = 'none';
      window.location.href = root + 'login.html';
      return false;
    }

    if (allowedRole && this.getRole() !== allowedRole) {
      window.location.href = root + 'parwah-dashboard/index.html';
      return false;
    }

    // Auth success - ensure content is shown if it was hidden
    document.documentElement.style.visibility = 'visible';
    return true;
  },
};

// ===========================
// UI HELPERS
// ===========================
const UI = {
  showAlert(container, message, type = 'error') {
    const icons = { error: '⚠️', success: '✅', info: 'ℹ️', warning: '⚡' };
    const el = document.createElement('div');
    el.className = `alert alert-${type}`;
    el.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;
    container.innerHTML = '';
    container.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.remove(); }, 5000);
  },

  setLoading(btn, loading, text = 'Loading...') {
    if (!btn) return;
    if (loading) {
      btn.dataset.origText = btn.innerHTML;
      btn.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:6px;"></span>${text}`;
      btn.disabled = true;
    } else {
      btn.innerHTML = btn.dataset.origText || text;
      btn.disabled = false;
    }
  },

  formatDate(isoString) {
  if (!isoString) return 'N/A';

  // ✅ FIX: Java LocalDateTime has no timezone suffix (no Z, no +XX:XX)
  // Appending 'Z' would wrongly treat it as UTC and shift the time.
  // Instead, replace the 'T' separator and let the browser parse it as local time,
  // OR manually parse to avoid any browser inconsistency entirely.
  let str = String(isoString).trim();

  // If it already has timezone info, parse directly
  // If not (Java LocalDateTime format), treat as local time by replacing T with space
  const hasTimezone = str.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(str);
  if (!hasTimezone) {
    // Truncate to microseconds → milliseconds (JS only supports ms)
    str = str.replace('T', ' ').replace(/(\.\d{3})\d*$/, '$1');
  }

  const d = new Date(str);
  if (isNaN(d.getTime())) return String(isoString); // fallback: show raw string

  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
},


  getInitials(name) {
    return (name || '?')
      .trim()
      .split(/\s+/)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },
  gradeToRoman(grade) {
    const gradeMap = {
      'NURSERY': 'Nursery',
      'LKG': 'LKG',
      'UKG': 'UKG',
      'FIRST': 'I',
      'SECOND': 'II',
      'THIRD': 'III',
      'FOURTH': 'IV',
      'FIFTH': 'V',
      'SIXTH': 'VI',
      'SEVENTH': 'VII',
      'EIGHTH': 'VIII',
      'NINTH': 'IX',
      'TENTH': 'X',
      'ELEVENTH': 'XI',
      'TWELFTH': 'XII',
    };
    return gradeMap[grade] || grade;
  },
};
