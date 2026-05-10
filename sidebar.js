// Suncoast Technology | sidebar.js | v1.1
// Shared sidebar component — inject on every admin/client page
// v1.1 — Added mobile hamburger menu with overlay

(function () {

  const VERSION = 'v1.1';

  const ADMIN_NAV = [
    { href: 'admin.html',         label: 'Dashboard',  icon: '<rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/>' },
    { href: 'clients.html',       label: 'Clients',    icon: '<circle cx="6" cy="5" r="2.5"/><path d="M1 13c0-2.76 2.24-5 5-5"/><circle cx="12" cy="8" r="2"/><path d="M9.5 13c0-1.93 1.12-3 2.5-3s2.5 1.07 2.5 3"/>' },
    { href: 'invoices.html',      label: 'Invoices',   icon: '<path d="M3 1h10a1 1 0 011 1v12l-2-1.5L10 14l-2-1.5L6 14l-2-1.5L2 14V2a1 1 0 011-1z"/><path d="M5 5h6M5 8h6M5 11h3"/>' },
    { href: 'analytics.html',     label: 'Analytics',  icon: '<path d="M1 12l4-4 3 3 4-5 3 3"/><path d="M1 15h14"/>' },
    { href: 'services.html',      label: 'Services',   icon: '<path d="M8 1l1.9 3.9 4.1.6-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.1-.6z"/>' },
    { href: 'contracts.html',     label: 'Contracts',  icon: '<path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V5L9 1z"/><path d="M9 1v4h4M5 8h6M5 11h4"/>' },
    { href: 'updates.html',       label: 'Updates',    icon: '<circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4l2.5 1.5"/>' },
    { href: 'admin-support.html', label: 'Support',    icon: '<path d="M14 10.5a2 2 0 01-2 2H4.5L1.5 15V3.5a2 2 0 012-2h8.5a2 2 0 012 2v7z"/>' },
    { href: 'onboarding.html',    label: 'Onboarding', icon: '<path d="M13 2.5l-7 7-3-3"/><path d="M8 14A6 6 0 108 2"/>' },
    { href: 'email-log.html',     label: 'Email log',  icon: '<rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M1 4l7 5.5L15 4"/>' },
  ];

  const CLIENT_NAV = [
    { href: 'dashboard.html', label: 'Dashboard', icon: '<rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/>' },
    { href: 'billing.html',   label: 'Billing',   icon: '<rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M1 7h14"/>' },
    { href: 'my-site.html',   label: 'My site',   icon: '<circle cx="8" cy="8" r="6.5"/><path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4 10.5 8s-2.5 6.5-2.5 6.5M1.5 8h13"/>' },
    { href: 'support.html',   label: 'Support',   icon: '<path d="M14 10.5a2 2 0 01-2 2H4.5L1.5 15V3.5a2 2 0 012-2h8.5a2 2 0 012 2v7z"/>' },
    { href: 'settings.html',  label: 'Settings',  icon: '<circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"/>' },
  ];

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'admin.html';
  }

  function isAdminPage() {
    const adminPages = ADMIN_NAV.map(n => n.href);
    return adminPages.includes(currentPage());
  }

  function buildNavLinks(navItems) {
    const page = currentPage();
    return navItems.map(item => {
      const active = page === item.href ? ' active' : '';
      return `<a href="${item.href}" class="nav-item${active}">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">${item.icon}</svg>
        ${item.label}
      </a>`;
    }).join('');
  }

  function getUserInfo() {
    try {
      return {
        name: localStorage.getItem('sc_name') || 'User',
        initials: (localStorage.getItem('sc_name') || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        isAdmin: localStorage.getItem('sc_is_admin') === 'true'
      };
    } catch(e) {
      return { name: 'User', initials: 'U', isAdmin: false };
    }
  }

  function buildMobileStyles() {
    return `
      <style id="sc-sidebar-mobile-styles">
        /* ── Mobile hamburger ── */
        .sc-hamburger {
          display: none;
          position: fixed;
          top: 12px;
          left: 12px;
          z-index: 999;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.3);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          color: #F97316;
        }
        .sc-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(4,8,15,0.97);
          backdrop-filter: blur(20px);
          flex-direction: column;
          overflow-y: auto;
        }
        .sc-mobile-overlay.open { display: flex; }
        .sc-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .sc-mobile-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          font-size: 24px;
          padding: 4px 8px;
          border-radius: 6px;
        }
        .sc-mobile-nav {
          flex: 1;
          padding: 16px 0;
        }
        .sc-mobile-nav a {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }
        .sc-mobile-nav a:hover,
        .sc-mobile-nav a.active {
          color: #fff;
          background: rgba(255,255,255,0.04);
        }
        .sc-mobile-nav a.active { color: #F97316; }
        .sc-mobile-nav a svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .sc-mobile-nav a.active svg { opacity: 1; }
        .sc-mobile-footer {
          padding: 20px 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .sc-hamburger { display: flex; }
          aside.sidebar { display: none !important; }
          .shell { grid-template-columns: 1fr !important; }
          .main { padding: 80px 16px 40px !important; }
        }
      </style>
    `;
  }

  function buildSidebar() {
    const user = getUserInfo();
    const nav = isAdminPage() ? ADMIN_NAV : CLIENT_NAV;
    const sectionLabel = isAdminPage() ? 'Admin' : 'Menu';

    return `
      <div class="sidebar-brand">
        <svg class="brand-mark" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" fill="#0D1B2A" stroke="rgba(249,115,22,0.3)" stroke-width="1"/>
          <path d="M7 22 Q18 10 29 22" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M5 25 Q18 7 31 25" stroke="#FBBF24" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5"/>
          <circle cx="18" cy="27" r="3" fill="#F97316"/>
        </svg>
        <div>
          <div class="brand-name">Suncoast <em>Technology</em></div>
          <div class="brand-sub">${isAdminPage() ? 'Admin Panel' : 'Client Portal'}</div>
        </div>
      </div>
      <nav class="nav">
        <div class="nav-label">${sectionLabel}</div>
        ${buildNavLinks(nav)}
      </nav>
      <div class="sidebar-footer">
        <div class="user-row">
          <div class="user-avatar">${user.initials}</div>
          <div class="user-name">
            ${user.name}
            <div style="font-size:10px;color:rgba(148,163,184,0.3);margin-top:2px;">${VERSION}</div>
          </div>
          <button class="logout-btn" onclick="scSidebarLogout()" title="Log out">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"/>
              <path d="M11 11l3-3-3-3M14 8H6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>`;
  }

  function buildMobileOverlay() {
    const user = getUserInfo();
    const nav = isAdminPage() ? ADMIN_NAV : CLIENT_NAV;
    const page = currentPage();

    const links = nav.map(item => {
      const active = page === item.href ? ' active' : '';
      return `<a href="${item.href}" class="${active}" onclick="document.getElementById('scMobileOverlay').classList.remove('open');document.body.style.overflow=''">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">${item.icon}</svg>
        ${item.label}
      </a>`;
    }).join('');

    return `
      <div class="sc-mobile-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" fill="#0D1B2A" stroke="rgba(249,115,22,0.3)" stroke-width="1"/>
            <path d="M7 22 Q18 10 29 22" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="18" cy="27" r="3" fill="#F97316"/>
          </svg>
          <span style="font-size:14px;font-weight:500;color:#fff;">Suncoast <em style="color:#F97316;font-style:normal;">Technology</em></span>
        </div>
        <button class="sc-mobile-close" onclick="document.getElementById('scMobileOverlay').classList.remove('open');document.body.style.overflow=''">✕</button>
      </div>
      <nav class="sc-mobile-nav">${links}</nav>
      <div class="sc-mobile-footer">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="user-avatar">${user.initials}</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.6);">${user.name}</div>
        </div>
        <button onclick="scSidebarLogout()" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#FCA5A5;padding:6px 14px;border-radius:8px;font-size:12px;cursor:pointer;">Log out</button>
      </div>`;
  }

  function inject() {
    const target = document.getElementById('sc-sidebar');
    if (!target) return;

    // Inject sidebar content
    target.innerHTML = buildSidebar();

    // Inject mobile styles
    document.head.insertAdjacentHTML('beforeend', buildMobileStyles());

    // Inject hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'sc-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    document.body.appendChild(hamburger);

    // Inject mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'sc-mobile-overlay';
    overlay.id = 'scMobileOverlay';
    overlay.innerHTML = buildMobileOverlay();
    document.body.appendChild(overlay);

    // Hamburger click handler
    hamburger.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // Global logout
  window.scSidebarLogout = function () {
    const API = 'https://script.google.com/macros/s/AKfycbyxg5LlS9eUx6VSiD_VSzE0RD94STkBAK4Hc-h14T_YU5ikqXGE3dz-Fvt1kCAE-9XRLw/exec';
    const token = localStorage.getItem('sc_token');
    fetch(API, { method: 'POST', body: JSON.stringify({ action: 'logout', token }) });
    localStorage.clear();
    window.location.href = 'login.html';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
