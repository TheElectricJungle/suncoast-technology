// Suncoast Technology | sidebar.js | v1.2
// Shared sidebar component — inject into <div id="sidebarMount"></div>
// Add <script src="sidebar.js"></script> at bottom of every portal page
// Active item auto-detected from current URL

(function () {

  const VERSION = 'v1.2';

  const ADMIN_NAV = [
    { href: 'admin.html',         label: 'Dashboard',   icon: '<rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/>' },
    { href: 'clients.html',       label: 'Clients',     icon: '<circle cx="6" cy="5" r="2.5"/><path d="M1 13c0-2.76 2.24-5 5-5"/><circle cx="12" cy="8" r="2"/><path d="M9.5 13c0-1.93 1.12-3 2.5-3s2.5 1.07 2.5 3"/>' },
    { href: 'invoices.html',      label: 'Invoices',    icon: '<path d="M3 1h10a1 1 0 011 1v12l-2-1.5L10 14l-2-1.5L6 14l-2-1.5L2 14V2a1 1 0 011-1z"/><path d="M5 5h6M5 8h6M5 11h3"/>' },
    { href: 'services.html',      label: 'Services',    icon: '<path d="M8 1l1.9 3.9 4.1.6-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.1-.6z"/>' },
    { href: 'analytics.html',     label: 'Analytics',   icon: '<path d="M1 12l4-4 3 3 4-5 3 3"/><path d="M1 15h14"/>' },
    { href: 'contracts.html',     label: 'Contracts',   icon: '<path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V5L9 1z"/><path d="M9 1v4h4M5 8h6M5 11h4"/>' },
    { href: 'updates.html',       label: 'Updates',     icon: '<circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4l2.5 1.5"/>' },
    { href: 'admin-support.html', label: 'Support',     icon: '<path d="M14 10.5a2 2 0 01-2 2H4.5L1.5 15V3.5a2 2 0 012-2h8.5a2 2 0 012 2v7z"/>' },
    { href: 'onboarding.html',    label: 'Onboarding',  icon: '<path d="M13 2.5l-7 7-3-3"/><path d="M8 14A6 6 0 108 2"/>' },
    { href: 'email-log.html',     label: 'Email Log',   icon: '<rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M1 4l7 5.5L15 4"/>' },
  ];

  const page = (window.location.pathname.split('/').pop() || 'admin.html');

  // ── CSS ────────────────────────────────────────────────────
  const css = `
    .sc-sidebar {
      width: 240px;
      min-height: 100vh;
      background: #04080F;
      border-right: 1px solid rgba(255,255,255,0.06);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0; left: 0; bottom: 0;
      z-index: 200;
      transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    }
    .sc-sidebar-brand {
      padding: 22px 20px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      flex-shrink: 0;
    }
    .sc-sidebar-brand a {
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: -0.3px;
      font-family: 'Inter', sans-serif;
    }
    .sc-sidebar-brand em { color: #F97316; font-style: normal; }
    .sc-sidebar-brand .sc-portal-label {
      font-size: 10px;
      color: rgba(148,163,184,0.4);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
    }
    .sc-nav {
      flex: 1;
      padding: 12px 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .sc-nav-section {
      font-size: 9px;
      font-weight: 700;
      color: rgba(148,163,184,0.35);
      text-transform: uppercase;
      letter-spacing: 1.2px;
      padding: 10px 10px 4px;
      font-family: 'Inter', sans-serif;
    }
    .sc-nav a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 9px;
      color: rgba(148,163,184,0.65);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    .sc-nav a:hover {
      background: rgba(255,255,255,0.05);
      color: #fff;
    }
    .sc-nav a.active {
      background: rgba(249,115,22,0.1);
      color: #F97316;
    }
    .sc-nav a svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .sc-sidebar-footer {
      padding: 14px 14px 18px;
      border-top: 1px solid rgba(255,255,255,0.06);
      flex-shrink: 0;
    }
    .sc-logout-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 9px 10px;
      border-radius: 9px;
      border: none;
      background: transparent;
      color: rgba(148,163,184,0.5);
      font-size: 13px;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
      text-align: left;
    }
    .sc-logout-btn:hover {
      background: rgba(239,68,68,0.08);
      color: #ef4444;
    }
    .sc-version {
      font-size: 10px;
      color: rgba(148,163,184,0.2);
      text-align: center;
      margin-top: 8px;
      font-family: 'Inter', sans-serif;
    }

    /* ── MOBILE HAMBURGER ── */
    .sc-hamburger {
      display: none;
      position: fixed;
      top: 14px;
      left: 14px;
      z-index: 300;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(4,8,15,0.92);
      backdrop-filter: blur(12px);
      cursor: pointer;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      padding: 10px;
    }
    .sc-hamburger span {
      display: block;
      width: 100%;
      height: 1.5px;
      background: #fff;
      border-radius: 2px;
      transition: transform 0.22s, opacity 0.22s;
    }
    .sc-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .sc-hamburger.open span:nth-child(2) { opacity: 0; }
    .sc-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    .sc-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 199;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(2px);
    }
    .sc-backdrop.open { display: block; }

    /* ── PAGE BODY OFFSET ── */
    .portal-shell {
      padding-left: 240px;
    }

    @media (max-width: 900px) {
      .sc-sidebar {
        transform: translateX(-100%);
      }
      .sc-sidebar.mobile-open {
        transform: translateX(0);
      }
      .sc-hamburger {
        display: flex;
      }
      .portal-shell {
        padding-left: 0;
      }
    }
  `;

  // ── HTML ───────────────────────────────────────────────────
  const navItems = ADMIN_NAV.map(item => {
    const isActive = page === item.href;
    return `<a href="${item.href}" class="${isActive ? 'active' : ''}">
      <svg viewBox="0 0 16 16"><${item.icon.includes('<') ? '' : 'path d="'}${item.icon}${item.icon.includes('<') ? '' : '"/'}</svg>
      ${item.label}
    </a>`;
  }).join('');

  // Build SVG icons properly
  const navItemsHtml = ADMIN_NAV.map(item => {
    const isActive = page === item.href;
    return `<a href="${item.href}" class="${isActive ? 'active' : ''}" onclick="if(window.innerWidth<=900)closeSidebar()">
      <svg viewBox="0 0 16 16">${item.icon}</svg>
      ${item.label}
    </a>`;
  }).join('');

  const html = `
    <style>${css}</style>

    <button class="sc-hamburger" id="scHamburger" onclick="toggleSidebar()">
      <span></span><span></span><span></span>
    </button>
    <div class="sc-backdrop" id="scBackdrop" onclick="closeSidebar()"></div>

    <aside class="sc-sidebar" id="scSidebar">
      <div class="sc-sidebar-brand">
        <a href="admin.html">Suncoast <em>Technology</em></a>
        <div class="sc-portal-label">Admin Portal</div>
      </div>

      <nav class="sc-nav">
        <div class="sc-nav-section">Navigation</div>
        ${navItemsHtml}
      </nav>

      <div class="sc-sidebar-footer">
        <button class="sc-logout-btn" onclick="scLogout()">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10.5 11l3-3-3-3M13.5 8H6"/>
          </svg>
          Log out
        </button>
        <div class="sc-version">sidebar.js ${VERSION}</div>
      </div>
    </aside>
  `;

  // ── INJECT ────────────────────────────────────────────────
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  const mount = document.getElementById('sidebarMount');
  if (mount) {
    // Remove the width placeholder div — sidebar is now fixed position
    mount.style.display = 'none';
    mount.insertAdjacentHTML('afterend', `
      <button class="sc-hamburger" id="scHamburger" onclick="toggleSidebar()">
        <span></span><span></span><span></span>
      </button>
      <div class="sc-backdrop" id="scBackdrop" onclick="closeSidebar()"></div>
      <aside class="sc-sidebar" id="scSidebar">
        <div class="sc-sidebar-brand">
          <a href="admin.html">Suncoast <em>Technology</em></a>
          <div class="sc-portal-label">Admin Portal</div>
        </div>
        <nav class="sc-nav">
          <div class="sc-nav-section">Navigation</div>
          ${navItemsHtml}
        </nav>
        <div class="sc-sidebar-footer">
          <button class="sc-logout-btn" onclick="scLogout()">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10.5 11l3-3-3-3M13.5 8H6"/>
            </svg>
            Log out
          </button>
          <div class="sc-version">sidebar.js ${VERSION}</div>
        </div>
      </aside>
    `);
  }

  // ── FIX MAIN CONTENT OFFSET ───────────────────────────────
  // Since sidebar is fixed, main content needs left padding on desktop
  const shell = document.querySelector('.portal-shell');
  if (shell) {
    shell.style.paddingLeft = window.innerWidth > 900 ? '240px' : '0';
    window.addEventListener('resize', () => {
      shell.style.paddingLeft = window.innerWidth > 900 ? '240px' : '0';
    });
  }

  // ── MOBILE TOGGLE ─────────────────────────────────────────
  window.toggleSidebar = function () {
    const sidebar  = document.getElementById('scSidebar');
    const backdrop = document.getElementById('scBackdrop');
    const burger   = document.getElementById('scHamburger');
    const isOpen   = sidebar.classList.contains('mobile-open');
    sidebar.classList.toggle('mobile-open', !isOpen);
    backdrop.classList.toggle('open', !isOpen);
    burger.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  window.closeSidebar = function () {
    document.getElementById('scSidebar').classList.remove('mobile-open');
    document.getElementById('scBackdrop').classList.remove('open');
    document.getElementById('scHamburger').classList.remove('open');
    document.body.style.overflow = '';
  };

  // ── LOGOUT ────────────────────────────────────────────────
  window.scLogout = function () {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_client_id');
    localStorage.removeItem('sc_is_admin');
    location.href = '/login.html';
  };

})();
