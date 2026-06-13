/* EBSPL Auth — shared auth module for all prototype pages */
(function () {
  var KEY = 'ebspl_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function saveUser(u) {
    localStorage.setItem(KEY, JSON.stringify(u));
  }
  function logout() {
    localStorage.removeItem(KEY);
    window.location.href = '/';
  }

  /* ── Navigate to login page if not authed ── */
  function requireAuth() {
    if (!getUser()) {
      var segs = window.location.pathname.split('/').filter(Boolean);
      var up = segs.length > 1 ? '../'.repeat(segs.length - 1) : '';
      window.location.replace(up + 'login_ebspl_2/code.html');
    }
  }

  /* ── Toast ── */
  function toast(msg, type) {
    var c = document.getElementById('ebspl-toasts');
    if (!c) {
      c = document.createElement('div');
      c.id = 'ebspl-toasts';
      c.style.cssText = 'position:fixed;top:20px;right:20px;z-index:100000;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
      document.body.appendChild(c);
    }
    var colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6', warn: '#f59e0b' };
    var t = document.createElement('div');
    t.style.cssText = 'background:' + (colors[type] || colors.success) + ';color:#fff;padding:12px 18px;border-radius:10px;' +
      'font-weight:600;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.15);max-width:320px;pointer-events:auto;' +
      'animation:ebsplSlide .2s ease;font-family:Inter,sans-serif;';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function () { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(function () { if (t.parentNode) t.remove(); }, 300); }, 3200);
  }

  /* ── Modal ── */
  function modal(title, bodyHtml, onConfirm) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99998;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:16px;padding:32px;max-width:480px;width:90%;box-shadow:0 24px 60px rgba(0,0,0,.2);font-family:Inter,sans-serif;">' +
      '<h2 style="font-size:18px;font-weight:700;margin:0 0 8px;">' + title + '</h2>' +
      '<div style="color:#64748b;font-size:14px;margin-bottom:24px;">' + bodyHtml + '</div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
      '<button id="ebspl-modal-cancel" style="padding:10px 20px;border:1px solid #e2e8f0;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px;background:#fff;">Cancel</button>' +
      '<button id="ebspl-modal-confirm" style="padding:10px 24px;background:#ec5b13;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px;">Confirm</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#ebspl-modal-cancel').onclick = function () { overlay.remove(); };
    overlay.querySelector('#ebspl-modal-confirm').onclick = function () { overlay.remove(); if (onConfirm) onConfirm(); };
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  /* ── Google Sign-In picker (uses profiles.js if loaded) ── */
  function googleSignIn(callback) {
    var profiles = (window.EBSPL_PROFILES && window.EBSPL_PROFILES.all) || [];
    var googleProfiles = profiles.filter(function (p) { return p.loginMethod === 'google'; });
    /* Fallback if profiles.js not loaded */
    if (!googleProfiles.length) {
      googleProfiles = [
        { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', role: 'Client', initial: 'PS', avatarColor: '#4285f4' },
        { name: 'James Okonkwo', email: 'j.okonkwo@gmail.com', role: 'Client', initial: 'JO', avatarColor: '#34a853' },
        { name: 'Sarah Chen', email: 's.chen@gmail.com', role: 'Admin', initial: 'SC', avatarColor: '#7b1fa2' }
      ];
    }

    /* Group by role for the picker */
    var byRole = {};
    googleProfiles.forEach(function (p) {
      if (!byRole[p.role]) byRole[p.role] = [];
      byRole[p.role].push(p);
    });
    var roleOrder = ['Admin', 'Accountant', 'Client', 'User'];

    var rows = '';
    roleOrder.forEach(function (role) {
      if (!byRole[role]) return;
      rows += '<div style="padding:6px 12px 2px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;">' + role + '</div>';
      byRole[role].forEach(function (p, idx) {
        var init = p.initial || p.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
        var color = p.avatarColor || '#4285f4';
        rows += '<div data-email="' + p.email + '" class="g-picker-row" style="display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background .12s;" ' +
          'onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'transparent\'">' +
          '<div style="width:36px;height:36px;border-radius:50%;background:' + color + ';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;">' + init + '</div>' +
          '<div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + p.name + '</div>' +
          '<div style="font-size:12px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + p.email + '</div></div>' +
          '<span style="font-size:10px;font-weight:700;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:20px;flex-shrink:0;">' + p.role + '</span></div>';
      });
    });

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:16px;max-width:400px;width:92%;box-shadow:0 24px 64px rgba(0,0,0,.25);overflow:hidden;">' +
      '<div style="display:flex;align-items:center;gap:10px;padding:20px 16px 12px;border-bottom:1px solid #f1f5f9;">' +
      '<img src="https://www.google.com/favicon.ico" style="width:18px;height:18px;" onerror="this.style.display=\'none\'" alt="G">' +
      '<h2 style="font-size:16px;font-weight:700;margin:0;">Choose a Google account</h2></div>' +
      '<div style="max-height:380px;overflow-y:auto;">' + rows + '</div>' +
      '<div style="padding:12px 16px;border-top:1px solid #f1f5f9;">' +
      '<button onclick="this.closest(\'[style*=\\\"position:fixed\\\"]\').remove()" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;background:#fff;">Cancel</button></div></div>';
    document.body.appendChild(overlay);

    overlay.querySelectorAll('.g-picker-row').forEach(function (row) {
      row.addEventListener('click', function () {
        var email = row.getAttribute('data-email');
        var prof = (window.EBSPL_PROFILES && window.EBSPL_PROFILES.getByEmail(email)) ||
          googleProfiles.filter(function (p) { return p.email === email; })[0];
        if (!prof) return;
        var init = prof.initial || prof.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
        var userObj = { name: prof.name, email: prof.email, role: prof.role, initial: init, loginMethod: 'google' };
        if (prof.company) userObj.company = prof.company;
        overlay.remove();
        saveUser(userObj);
        if (callback) callback(userObj);
      });
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  /* ── SSO Sign-In ── */
  function ssoSignIn(callback) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:16px;padding:28px;max-width:360px;width:92%;box-shadow:0 24px 60px rgba(0,0,0,.22);">' +
      '<h2 style="font-size:17px;font-weight:700;margin:0 0 6px;">Single Sign-On</h2>' +
      '<p style="font-size:13px;color:#64748b;margin:0 0 20px;">Enter your company domain to continue.</p>' +
      '<input id="sso-d" type="text" placeholder="company.com" style="width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;box-sizing:border-box;">' +
      '<button id="sso-go" style="margin-top:12px;width:100%;padding:12px;background:#ec5b13;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">Continue with SSO</button>' +
      '<button onclick="this.closest(\'[style*=\\\"position:fixed\\\"]\').remove()" style="margin-top:8px;width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;background:#fff;">Cancel</button></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#sso-go').addEventListener('click', function () {
      var domain = overlay.querySelector('#sso-d').value.trim() || 'company.com';
      var userObj = { name: 'SSO User', email: 'sso@' + domain, role: 'Admin', initial: 'SU', loginMethod: 'sso', domain: domain };
      overlay.remove();
      saveUser(userObj);
      if (callback) callback(userObj);
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  /* ── DOM helpers ── */
  function replaceText(root, from, to) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue.indexOf(from) !== -1) nodes.push(n);
    }
    nodes.forEach(function (nd) {
      nd.nodeValue = nd.nodeValue.split(from).join(to);
    });
  }

  function injectLogoutBar(user) {
    if (document.getElementById('ebspl-auth-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'ebspl-auth-bar';
    bar.innerHTML =
      '<div style="display:flex;align-items:center;gap:10px;background:#1e293b;color:#f8fafc;' +
      'padding:10px 16px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.25);font-family:Inter,sans-serif;font-size:13px;">' +
      '<div style="width:30px;height:30px;border-radius:50%;background:#ec5b13;color:#fff;display:flex;align-items:center;' +
      'justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">' +
      (user.initial || '?') + '</div>' +
      '<div><div style="font-weight:700;line-height:1.2;">' + user.name + '</div>' +
      '<div style="font-size:11px;opacity:.6;">' + (user.role || 'User') + (user.company ? ' · ' + user.company : '') + '</div></div>' +
      '<div style="width:1px;height:28px;background:rgba(255,255,255,.15);margin:0 4px;"></div>' +
      '<button onclick="window.ebsplAuth.logout()" style="background:transparent;border:none;color:#f87171;cursor:pointer;' +
      'font-weight:700;font-size:12px;display:flex;align-items:center;gap:4px;padding:0;">' +
      '<span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;">logout</span> Sign out</button></div>';
    bar.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999;';
    document.body.appendChild(bar);
  }

  /* ── Enable standalone buttons ── */
  function enableButtons() {
    document.querySelectorAll('button').forEach(function (btn) {
      if (btn.type === 'submit' || btn.dataset.ebsplWired) return;
      var text = btn.textContent.trim();
      var lower = text.toLowerCase();
      var actionWords = ['create', 'add', 'new', 'upload', 'download', 'export', 'generate', 'send', 'save', 'submit', 'apply', 'filter', 'reconcile', 'match', 'approve', 'reject', 'mark', 'run', 'file'];
      var isAction = actionWords.some(function (w) { return lower.indexOf(w) !== -1; });
      if (!isAction || text.length > 60) return;
      btn.dataset.ebsplWired = '1';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        modal(
          text,
          'This will execute <strong>' + text + '</strong>. In the live system this action connects to the backend API.',
          function () { toast(text + ' — completed successfully!', 'success'); }
        );
      });
    });
  }

  /* ── Init for standalone HTML pages ── */
  function init() {
    /* Check auth guard */
    var bodyEl = document.querySelector('body');
    var needsAuth = bodyEl && (bodyEl.getAttribute('data-require-auth') !== null);

    document.addEventListener('DOMContentLoaded', function () {
      var user = getUser();

      if (needsAuth && !user) {
        requireAuth();
        return;
      }

      if (user) {
        /* Replace name/initials for static HTML pages (not React SPAs) */
        var isReactPage = !!document.querySelector('[data-react-spa]') || !!document.querySelector('#root script');
        replaceText(document.body, 'John Smith', user.name);
        var initials = user.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
        replaceText(document.body, ' JS ', ' ' + initials + ' ');
        document.querySelectorAll('[alt]').forEach(function (el) {
          if (el.getAttribute('alt').indexOf('John Smith') !== -1) {
            el.setAttribute('alt', el.getAttribute('alt').split('John Smith').join(user.name));
          }
        });
        injectLogoutBar(user);
      }
      enableButtons();
    });

    /* inject animation style */
    var style = document.createElement('style');
    style.textContent = '@keyframes ebsplSlide{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(style);
  }

  init();

  /* ── Public API ── */
  window.ebsplAuth = {
    save: saveUser,
    get: getUser,
    logout: logout,
    requireAuth: requireAuth,
    googleSignIn: googleSignIn,
    ssoSignIn: ssoSignIn,
    toast: toast,
    modal: modal
  };
})();
