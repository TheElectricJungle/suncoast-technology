// Suncoast Technology | ai-assistant.js | v1.0
// Floating AI assistant widget — inject on any portal page

(function() {
  'use strict';

  const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

  // ── PAGE CONTEXT — what the AI knows about each page ──
  const PAGE_CONTEXTS = {
    'dashboard.html': `You are helping a client on their Dashboard page of the Suncoast Technology client portal.
      This page shows: site status (online/offline), SSL certificate status, current plan name, monthly rate, latest invoice with pay button, recent updates, and quick action links.
      Common questions: What does "Online" mean? (their website is live and accessible). What is SSL? (security certificate that makes their site secure with https). What is an invoice? (a bill for their services). How do I pay? (click the Pay Now button on the invoice card).`,

    'billing.html': `You are helping a client on their Billing & Payments page of the Suncoast Technology client portal.
      This page shows: current unpaid invoice with amount and due date, subscription details including plan name and monthly rate, and full invoice history.
      Common questions: How do I pay my invoice? (click Pay with card button). What is a subscription? (automatic monthly billing). Why do I have a balance? (monthly service fee). What payment methods are accepted? (all major credit and debit cards via Stripe). Is my payment secure? (yes, processed by Stripe which is bank-level secure).`,

    'my-site.html': `You are helping a client on their My Site page of the Suncoast Technology client portal.
      This page shows: live site status, SSL certificate status, Cloudflare protection stats including requests, page views, threats blocked, bandwidth used, security level, DNS records, domain details, and hosting information.
      Key explanations: 
      - "Check needed" on Cloudflare means Always Use HTTPS may be off — their web developer can fix this.
      - SSL Active means their site has a valid security certificate and shows the padlock in browsers.
      - Requests are how many times someone visited the site in the last 24 hours.
      - Page views are how many pages were viewed.
      - Threats blocked means Cloudflare automatically stopped malicious traffic.
      - Bandwidth is how much data was transferred.
      - Security level Medium means standard protection is active.
      - DNS records are the technical settings that make their domain point to their website.
      - GitHub Pages is where their website files are hosted.
      - Cloudflare is the service that protects and speeds up their site.`,

    'support.html': `You are helping a client on their Support page of the Suncoast Technology client portal.
      This page lets clients submit support requests and see their request history.
      How to submit a request: fill in the subject (brief description), choose priority (Normal for regular requests, High for important issues, Urgent for things that need immediate attention), describe what you need in the description box, then click Submit request.
      Priority guide: Normal = general questions or non-urgent changes. High = something affecting your business. Urgent = site is down or major issue.
      After submitting: you will see it in Your Requests below with a status. Open means we have received it. In Progress means we are working on it. Resolved means it is complete.
      Response times: we respond within 24 hours on business days.`,

    'settings.html': `You are helping a client on their Account Settings page of the Suncoast Technology client portal.
      This page lets clients update their profile (name, email, phone) and change their password.
      How to update profile: edit the fields and click Save profile.
      How to change password: enter current password, new password, confirm new password, click Change password. Password must be at least 8 characters.
      Plan and billing section shows their current plan and monthly rate — to change their plan they should contact Suncoast Technology.`,

    'admin.html': `You are helping the admin (Justin at Suncoast Technology) on the Admin Dashboard.
      This page shows: total clients, active clients, outstanding balance, monthly revenue, site status for all managed client sites, recent client activity, unpaid invoices, and quick action links.
      The site health grid shows a status card for every client domain — green checkmark means all good, warning triangle means there is an issue with site status or SSL.
      Quick actions link to all admin functions.`,

    'clients.html': `You are helping the admin on the Client Profiles page.
      This page shows all clients in tile or list view. Click any client to open their full profile modal with tabs for Profile, Site and Cloudflare, Billing, and Edit.
      Add client button opens a form to create a new client — you can toggle whether to send them a welcome email immediately or add them silently and send the email later from their profile.
      The Site and Cloudflare tab in the client profile shows live Cloudflare stats for that client domain including zone status, SSL mode, traffic, threats, and bandwidth.
      Send welcome email button generates a fresh temporary password and sends the full welcome email to the client.`,

    'invoices.html': `You are helping the admin on the Invoice Management page.
      This page shows all invoices across all clients with total outstanding, paid this month, and overdue counts.
      New invoice button creates an invoice for any client. Edit button lets you update invoice details and mark as paid.
      Status options: Unpaid (client owes money), Paid (settled), Overdue (past due date).
      Invoices are automatically created every 1st of the month for active clients with a monthly rate.`,

    'services.html': `You are helping the admin on the Services Catalog page.
      This page manages the global list of services and pricing that can be used when creating invoices.
      Service types: Recurring (monthly plans that auto-generate invoices) and One-off (single charges for specific work).
      Add service button creates a new service. Edit lets you update name, category, type, price, and description. Deactivate hides a service from the catalog without deleting it.
      Categories include Monthly Plans, Websites, E-Commerce, Features, Domains, Email, Branding, Add-ons, Support.`,

    'updates.html': `You are helping the admin on the Site Updates page.
      This page lets you post updates to clients about work completed on their site. Select the client, enter a title, choose a category, describe what was done, and click Post update and notify client — this saves the update and emails the client automatically.
      Categories: General, Design, Feature, Fix, Content, Performance, Security.
      Recent updates on the right shows all updates posted across all clients.`,

    'admin-support.html': `You are helping the admin on the Support Queue page.
      This page shows all support requests from all clients. Stats at top show open, in progress, and resolved counts.
      Click any request to open the reply drawer — you can update the status and send a reply to the client. Saving notifies the client by email.
      Filter dropdown lets you view requests by status.`,

    'onboarding.html': `You are helping the admin on the Client Onboarding checklist page.
      This interactive checklist walks through every step of setting up a new client — portal account, domain and DNS, GitHub Pages hosting, email setup with Cloudflare Email Routing, Stripe billing, and final handoff.
      Select a client from the dropdown to load their specific checklist. Check off each step as you complete it. Progress is saved automatically per client. Notes fields let you record zone IDs, go-live times, and other details.
      Reset button clears all checkboxes for a fresh start.`
  };

  // ── DETECT CURRENT PAGE ──
  function getPageContext() {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    return PAGE_CONTEXTS[page] || `You are a helpful assistant for the Suncoast Technology client portal. Help users understand the portal features and answer questions about their website, billing, and services.`;
  }

  // ── STYLES ──
  const styles = `
    #sc-ai-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9998;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(135deg, #4FC3F7, #A78BFA, #F472B6, #F97316);
      background-size: 300% 300%;
      animation: sc-ai-spin 4s ease infinite;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(167,139,250,0.35);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #sc-ai-btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(167,139,250,0.5); }
    #sc-ai-btn-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #04080F;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    @keyframes sc-ai-spin {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    #sc-ai-panel {
      position: fixed;
      bottom: 92px;
      right: 28px;
      z-index: 9999;
      width: 360px;
      max-height: 520px;
      border-radius: 20px;
      padding: 2px;
      background: linear-gradient(135deg, rgba(79,195,247,0.5), rgba(167,139,250,0.5), rgba(244,114,182,0.4));
      background-size: 300% 300%;
      animation: sc-ai-spin 5s ease infinite;
      box-shadow: 0 8px 48px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
    }
    #sc-ai-panel.open { display: flex; }
    #sc-ai-panel-inner {
      background: #04080F;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: 516px;
      overflow: hidden;
    }
    #sc-ai-header {
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #sc-ai-header-left { display: flex; align-items: center; gap: 10px; }
    #sc-ai-avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, #4FC3F7, #A78BFA);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    #sc-ai-title { font-size: 14px; font-weight: 500; color: #fff; font-family: 'DM Sans', sans-serif; }
    #sc-ai-sub { font-size: 11px; color: rgba(148,163,184,0.6); font-family: 'DM Sans', sans-serif; margin-top: 1px; }
    #sc-ai-close {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      color: rgba(148,163,184,0.7); cursor: pointer; padding: 6px; border-radius: 8px;
      display: flex; font-size: 16px; line-height: 1; transition: all 0.2s;
    }
    #sc-ai-close:hover { color: #fff; }
    #sc-ai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }
    #sc-ai-messages::-webkit-scrollbar { width: 4px; }
    #sc-ai-messages::-webkit-scrollbar-track { background: transparent; }
    #sc-ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
    .sc-msg {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      animation: sc-msg-in 0.2s ease;
    }
    @keyframes sc-msg-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .sc-msg-user { flex-direction: row-reverse; }
    .sc-msg-icon {
      width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 12px;
    }
    .sc-msg-icon-ai { background: linear-gradient(135deg, #4FC3F7, #A78BFA); }
    .sc-msg-icon-user { background: rgba(249,115,22,0.2); color: #F97316; font-weight: 600; font-family: 'DM Sans', sans-serif; }
    .sc-msg-bubble {
      max-width: 78%;
      padding: 10px 13px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.65;
      font-family: 'DM Sans', sans-serif;
    }
    .sc-msg-bubble-ai {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.9);
      border-radius: 4px 14px 14px 14px;
    }
    .sc-msg-bubble-user {
      background: rgba(249,115,22,0.12);
      border: 1px solid rgba(249,115,22,0.2);
      color: #fff;
      border-radius: 14px 4px 14px 14px;
    }
    .sc-typing {
      display: flex; gap: 4px; align-items: center; padding: 4px 0;
    }
    .sc-typing span {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(167,139,250,0.6);
      animation: sc-bounce 1.2s ease infinite;
    }
    .sc-typing span:nth-child(2) { animation-delay: 0.2s; }
    .sc-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sc-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    #sc-ai-input-area {
      padding: 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.07);
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    #sc-ai-input {
      flex: 1;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 12px;
      padding: 9px 13px;
      font-size: 13px;
      font-family: 'DM Sans', sans-serif;
      color: #fff;
      outline: none;
      resize: none;
      max-height: 100px;
      transition: border-color 0.2s;
      line-height: 1.5;
    }
    #sc-ai-input:focus { border-color: rgba(167,139,250,0.4); }
    #sc-ai-input::placeholder { color: rgba(148,163,184,0.4); }
    #sc-ai-send {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #A78BFA, #6D28D9);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.2s, transform 0.15s;
    }
    #sc-ai-send:hover { opacity: 0.9; transform: scale(1.05); }
    #sc-ai-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .sc-suggestions {
      display: flex; flex-direction: column; gap: 6px; padding: 0 0 4px;
    }
    .sc-suggestion-btn {
      padding: 8px 12px; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
      color: rgba(148,163,184,0.8); font-size: 12px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; text-align: left; transition: all 0.15s;
    }
    .sc-suggestion-btn:hover { background: rgba(167,139,250,0.08); border-color: rgba(167,139,250,0.2); color: #fff; }
    @media (max-width: 480px) {
      #sc-ai-panel { width: calc(100vw - 32px); right: 16px; bottom: 80px; }
      #sc-ai-btn { right: 16px; bottom: 16px; }
    }
  `;

  // ── INJECT STYLES ──
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // ── GET USER INITIALS ──
  function getUserInitials() {
    try {
      const name = localStorage.getItem('sc_client_name') || localStorage.getItem('sc_name') || '?';
      return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    } catch(e) { return '?'; }
  }

  // ── SUGGESTIONS PER PAGE ──
  function getPageSuggestions() {
    const page = window.location.pathname.split('/').pop() || '';
    const suggestions = {
      'dashboard.html':    ['What does my site status mean?', 'How do I pay my invoice?', 'What is SSL?'],
      'billing.html':      ['How do I pay my bill?', 'What payment methods do you accept?', 'Is my payment secure?'],
      'my-site.html':      ['Why does Cloudflare say check needed?', 'What are page views?', 'What does threats blocked mean?'],
      'support.html':      ['How do I submit a request?', 'What priority should I choose?', 'How long until I get a response?'],
      'settings.html':     ['How do I change my password?', 'Can I change my email address?', 'How do I update my plan?'],
      'clients.html':      ['How do I add a new client?', 'How do I send a welcome email?', 'What does the notify toggle do?'],
      'invoices.html':     ['How do I create an invoice?', 'How do auto invoices work?', 'How do I mark an invoice paid?'],
      'services.html':     ['What is a recurring service?', 'How do I add a new service?', 'What is the difference between recurring and one-off?'],
      'admin.html':        ['What does outstanding balance mean?', 'How do I read the site status grid?', 'Where do I add a new client?'],
    };
    return suggestions[page] || ['What can you help me with?', 'How does this portal work?', 'How do I contact support?'];
  }

  // ── BUILD HTML ──
  const btnEl = document.createElement('button');
  btnEl.id = 'sc-ai-btn';
  btnEl.title = 'Ask AI assistant';
  btnEl.innerHTML = '<div id="sc-ai-btn-inner">✨</div>';
  document.body.appendChild(btnEl);

  const panelEl = document.createElement('div');
  panelEl.id = 'sc-ai-panel';
  panelEl.innerHTML = `
    <div id="sc-ai-panel-inner">
      <div id="sc-ai-header">
        <div id="sc-ai-header-left">
          <div id="sc-ai-avatar">✨</div>
          <div>
            <div id="sc-ai-title">Suncoast Assistant</div>
            <div id="sc-ai-sub">Ask me anything about this page</div>
          </div>
        </div>
        <button id="sc-ai-close">✕</button>
      </div>
      <div id="sc-ai-messages"></div>
      <div id="sc-ai-input-area">
        <textarea id="sc-ai-input" placeholder="Ask a question..." rows="1"></textarea>
        <button id="sc-ai-send">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 2L2 7.5l4.5 1.5L8 14l2-4.5L14 2z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>`;
  document.body.appendChild(panelEl);

  // ── STATE ──
  let isOpen      = false;
  let isLoading   = false;
  let hasGreeted  = false;
  const history   = [];

  // ── TOGGLE ──
  function togglePanel() {
    isOpen = !isOpen;
    panelEl.classList.toggle('open', isOpen);
    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      showGreeting();
    }
    if (isOpen) setTimeout(() => document.getElementById('sc-ai-input').focus(), 100);
  }

  function showGreeting() {
    const msgs = document.getElementById('sc-ai-messages');
    const page = window.location.pathname.split('/').pop() || 'portal';
    const pageName = page.replace('.html','').replace('-',' ');
    addMessage('ai', `Hi! I am your Suncoast Technology assistant. I can see you are on the ${pageName} page. Ask me anything about what you see here or how to use it.`);

    // Add suggestion buttons
    const sugDiv = document.createElement('div');
    sugDiv.className = 'sc-suggestions';
    getPageSuggestions().forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'sc-suggestion-btn';
      btn.textContent = s;
      btn.onclick = () => { sugDiv.remove(); sendMessage(s); };
      sugDiv.appendChild(btn);
    });
    msgs.appendChild(sugDiv);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── ADD MESSAGE ──
  function addMessage(role, text) {
    const msgs = document.getElementById('sc-ai-messages');
    const div  = document.createElement('div');
    div.className = `sc-msg sc-msg-${role}`;

    const icon = document.createElement('div');
    icon.className = `sc-msg-icon sc-msg-icon-${role}`;
    icon.innerHTML = role === 'ai' ? '✨' : getUserInitials();

    const bubble = document.createElement('div');
    bubble.className = `sc-msg-bubble sc-msg-bubble-${role}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    div.appendChild(icon);
    div.appendChild(bubble);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return bubble;
  }

  // ── TYPING INDICATOR ──
  function showTyping() {
    const msgs = document.getElementById('sc-ai-messages');
    const div  = document.createElement('div');
    div.className = 'sc-msg sc-msg-ai';
    div.id = 'sc-typing-indicator';

    const icon = document.createElement('div');
    icon.className = 'sc-msg-icon sc-msg-icon-ai';
    icon.innerHTML = '✨';

    const bubble = document.createElement('div');
    bubble.className = 'sc-msg-bubble sc-msg-bubble-ai';
    bubble.innerHTML = '<div class="sc-typing"><span></span><span></span><span></span></div>';

    div.appendChild(icon);
    div.appendChild(bubble);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('sc-typing-indicator');
    if (el) el.remove();
  }

  // ── SEND MESSAGE ──
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;

    const input = document.getElementById('sc-ai-input');
    const send  = document.getElementById('sc-ai-send');
    input.value = '';
    input.style.height = 'auto';
    send.disabled = true;

    addMessage('user', text);
    history.push({ role: 'user', content: text });

    showTyping();

    try {
      const response = await fetch(ANTHROPIC_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a friendly, helpful assistant built into the Suncoast Technology client portal. You help clients and the admin understand what they are looking at and how to use the portal.

${getPageContext()}

Keep answers concise and in plain English. Avoid technical jargon unless necessary. If you use jargon, explain it simply. Use short paragraphs. You can use **bold** for key terms. Be warm and encouraging. If someone seems confused or frustrated, be extra patient. Never make up specific account data — you don't have access to their actual account details, only the page context.

If asked something unrelated to the portal or web services, gently redirect to how you can help with their portal or website.`,
          messages: history.slice(-10) // Keep last 10 messages for context
        })
      });

      const data = await response.json();
      hideTyping();

      if (data.content && data.content[0]) {
        const reply = data.content[0].text;
        history.push({ role: 'assistant', content: reply });
        addMessage('ai', reply);
      } else {
        addMessage('ai', 'Sorry, I had trouble with that. Try asking again or contact us at info@suncoast.technology.');
      }
    } catch(e) {
      hideTyping();
      addMessage('ai', 'I am having trouble connecting right now. Please try again in a moment.');
    }

    isLoading = false;
    send.disabled = false;
    document.getElementById('sc-ai-input').focus();
  }

  // ── EVENT LISTENERS ──
  btnEl.addEventListener('click', togglePanel);
  document.getElementById('sc-ai-close').addEventListener('click', togglePanel);

  document.getElementById('sc-ai-send').addEventListener('click', () => {
    const val = document.getElementById('sc-ai-input').value.trim();
    if (val) sendMessage(val);
  });

  document.getElementById('sc-ai-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const val = this.value.trim();
      if (val) sendMessage(val);
    }
    // Auto resize
    setTimeout(() => {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    }, 0);
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (isOpen && !panelEl.contains(e.target) && !btnEl.contains(e.target)) {
      togglePanel();
    }
  });

})();
