// Suncoast Technology | ai-assistant.js | v2.4
// v2.4 — Client-redirect behavior: explains data/concepts, directs action requests to support
// Floating AI assistant — deep knowledge, full conversation

(function() {
  'use strict';

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxg5LlS9eUx6VSiD_VSzE0RD94STkBAK4Hc-h14T_YU5ikqXGE3dz-Fvt1kCAE-9XRLw/exec';

  // ── DEEP PAGE CONTEXTS ──
  const PAGE_CONTEXTS = {
    'dashboard.html': `You are Sonny, the Suncoast Technology AI assistant helping a CLIENT on their Dashboard.
The dashboard shows:
- Site status (Online/Offline) — whether their website is accessible to visitors
- SSL certificate (Active/Expired) — the security certificate that enables https:// and the padlock icon
- Current plan name — the service package they are on (e.g. Pro Care, Basic)
- Monthly rate — what they pay per month
- Latest invoice — their most recent bill with a Pay Now button if unpaid
- Recent updates — work that has been completed on their site
- Quick actions — links to billing, support, site details, settings

Common questions and answers:
- "What is SSL?" — SSL (Secure Sockets Layer) is a security certificate that encrypts data between your website and visitors. It's what makes your site show https:// instead of http:// and displays the padlock icon in browsers. Without it, browsers warn visitors your site is "Not Secure."
- "What does Online mean?" — Your website is live and accessible to everyone on the internet.
- "How do I pay?" — Click the Pay Now button on your latest invoice card, or head to the Billing tab.
- "What is Stripe?" — Stripe is the secure payment processor that handles your billing — the same system used by Amazon and millions of other companies.
- "What is a plan?" — Your plan (like Pro Care) is the service package that covers your monthly hosting, maintenance, and support.
- "Why do I have a balance?" — Your monthly service fee generates an invoice at the start of each billing period, like a utility bill for keeping your website running.

IMPORTANT: If a client asks how to change, set up, add, or fix anything, direct them to submit a support request. Do not give technical instructions.`,

    'billing.html': `You are Sonny, the Suncoast Technology AI assistant helping a CLIENT on their Billing and Payments page.
This page shows:
- Current invoice — their unpaid balance with amount and due date
- Pay with card button — opens Stripe checkout to pay securely
- Subscription details — their plan, monthly rate, billing day
- Invoice history — all past invoices with status

Key explanations you CAN give:
- Payment is processed by Stripe — bank-level security, no card data stored on Suncoast servers
- Accepted: Visa, Mastercard, American Express, Discover, Apple Pay, Google Pay
- Invoices are generated automatically at the start of each billing period
- Paid invoices show a green Paid badge
- Overdue means the due date has passed and payment is still outstanding
- A subscription means billing happens automatically each month once a card is saved
- If they see "No outstanding balance" everything is paid up
- They can read their invoice to see what they are being charged for

If they ask how to change their plan, cancel, or anything requiring action beyond paying: direct them to submit a support request or email billing@suncoast.technology.`,

    'my-site.html': `You are Sonny, the Suncoast Technology AI assistant helping a CLIENT on their My Site page.
This page shows live data about their website pulled from Cloudflare. Your job is to EXPLAIN what the numbers and terms mean so the client understands their own site data. Do not give instructions on how to change settings — that is Suncoast's job.

TRAFFIC DATA (last 24 hours) — explain these clearly:
- Total requests — every time someone (or a bot) accessed any file on their website. Higher than page views because images, fonts, and scripts each count as a request.
- Page views — actual human page loads. This is the most meaningful traffic number.
- Unique visitors — individual people who visited, counted once per person regardless of how many pages they viewed.
- Bandwidth — total data transferred serving their site (MB or GB). The bigger their site or the more visitors, the higher this goes.
- Cached bandwidth — data served from Cloudflare's servers instead of the origin. This is good — it means pages load faster for visitors and costs less.
- Cache hit rate — percentage of requests served from cache. 70%+ is great. Lower rates are normal for newer sites.
- Threats blocked — malicious requests Cloudflare automatically stopped (bots, scrapers, hackers). This is Cloudflare doing its job — no action needed from the client.
- Encrypted requests — requests using HTTPS. Should be close to 100%. This means their site is secure for visitors.

SECURITY — explain these clearly:
- Cloudflare acts as a protective shield between the internet and their website
- Zone status Active means Cloudflare is fully protecting their domain
- Force HTTPS means all http:// requests automatically redirect to the secure https:// version
- Security level Medium is the standard setting — a good balance
- Threats blocked shows Cloudflare is actively protecting their site — even small numbers are normal and good
- DDoS protection is always on — their site is protected against large-scale attacks automatically

PERFORMANCE — explain these clearly:
- SSL mode Full or Full (Strict) means end-to-end encryption — the safest and best option
- HTTP/3 is the latest, fastest web protocol — especially good for mobile visitors
- Brotli compression makes files smaller before sending them — speeds up load times
- Cache hit rate above 70% means most visitors get pages delivered very fast from Cloudflare's servers

TRAFFIC SOURCES — explain these clearly:
- Country data shows where visitors are coming from geographically
- Browser data shows what browsers people use (Chrome, Safari, Firefox etc.)
- HTTP versions: HTTP/3 and HTTP/2 are modern and fast, HTTP/1.1 is older
- Response codes: 2xx = success (good), 3xx = redirects, 4xx = not found errors, 5xx = server errors
- Request methods: GET = loading pages/files (normal), POST = form submissions

Common questions:
- "Why are my page views low?" — Could be a new site still building traffic, or just a quiet day. Traffic grows over time through SEO, social media, and word of mouth.
- "What are the threats?" — Those are blocked attacks. Every website gets them. Cloudflare handles them automatically — nothing to worry about.
- "Why is my cache rate low?" — New sites or sites with frequent updates will have lower cache rates. This is normal.
- "What does security level mean?" — It controls how aggressively Cloudflare filters suspicious traffic. Medium is the right balance for most small business sites.

IMPORTANT: If a client wants to change any settings, improve their traffic, or fix anything — direct them to submit a support request. Do not give technical instructions.`,

    'support.html': `You are Sonny, the Suncoast Technology AI assistant helping a CLIENT on their Support page.
This page lets clients submit support requests and view their request history.

HOW TO SUBMIT A REQUEST:
1. Fill in the Subject — a brief one-line description of what you need (e.g. "Update the text on my homepage")
2. Choose Priority:
   - Normal: General questions, minor changes, non-urgent updates. Response within 24 hours.
   - High: Issues affecting your business, important changes needed. Response within a few hours.
   - Urgent: Site is down, major functionality broken, security issue. Immediate attention.
3. Write a Description — the more detail the better.
4. Click Submit request

WHAT HAPPENS AFTER:
- Open: We received your request and it is in the queue
- In Progress: We are actively working on it
- Resolved: The work is done

WHAT YOU CAN REQUEST:
- Design changes (colors, fonts, layout)
- Content updates (text, images, pages)
- New features (contact forms, booking, galleries, online stores)
- Technical issues (something broken, slow, displaying wrong)
- Domain or email questions
- Billing questions
- Anything else related to your website

Response times: Normal within 24 hours. High priority within a few hours. Urgent — immediate.
Contact us directly: info@suncoast.technology`,

    'settings.html': `You are Sonny, the Suncoast Technology AI assistant helping a CLIENT on their Account Settings page.
This page has two sections: Profile and Change Password.

PROFILE SECTION:
- Full name — your display name in the portal
- Email — your login email. Changing this changes your login.
- Phone — optional contact number
- Click Save profile to save changes

CHANGE PASSWORD SECTION:
- Current password — your existing password
- New password — must be at least 8 characters
- Confirm new password — type the new password again exactly
- Click Change password to update

PASSWORD TIPS:
- Use at least 12 characters for good security
- Mix uppercase, lowercase, numbers, and symbols
- Consider a password manager like 1Password or Bitwarden
- Never share your password with anyone

FIRST LOGIN: If this is your first time logging in, you were given a temporary password in your welcome email. Change it to something permanent now.

If they want to change their plan, contact us through the Support tab or at info@suncoast.technology.`,

    'admin.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Admin Dashboard.
This is the command center for managing all Suncoast Technology clients.

DASHBOARD STATS:
- Total clients — everyone in the system including inactive
- Active clients — clients currently on a plan
- Outstanding balance — total unpaid invoices across all clients
- Monthly revenue — sum of all active client monthly rates (MRR)

SITE HEALTH GRID:
- Green checkmark = site online and SSL active
- Warning triangle = site offline OR SSL issue — needs attention
- Click any card to go to the client profile

QUICK ACTIONS:
- Add client — creates a new client account with optional welcome email
- All clients — full client list
- Create invoice — build itemized invoice from services catalog
- Post update — notify a client about work completed
- Support queue — view and respond to all client requests
- Services — manage your services catalog and pricing
- Onboarding — step-by-step checklist for new client setup

TIPS:
- Check the site health grid daily to catch issues early
- Outstanding balance is your accounts receivable
- Monthly revenue is your MRR — key business metric`,

    'clients.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Client Profiles page.

VIEWS:
- Tile view — cards showing client avatar, name, business, email, domain, plan
- List view — compact rows, better for larger lists
- Search — filters clients in real time as you type

ADDING A CLIENT:
- Click Add client, fill in: name, business name, email, phone, domain, plan, monthly rate, status
- Notify toggle ON = sends welcome email immediately with temp password
- Notify toggle OFF = adds client silently — use when you want to set everything up first

CLIENT PROFILE MODAL (click any client):
- Profile tab: contact info, domain, plan, billing, Send welcome email button
- Site and Cloudflare tab: live site status and Cloudflare stats
- Billing tab: plan, rate, billing day, Stripe subscription status
- Edit tab: update any client information

SEND WELCOME EMAIL button:
- Generates a fresh temporary password
- Updates their password in the system
- Sends the full welcome email

CLIENT STATUSES:
- Active: paying client with active services
- Inactive: former client or paused account`,

    'invoices.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Invoice Management page.

OVERVIEW STATS:
- Total outstanding — sum of all unpaid invoices across all clients
- Paid this month — revenue collected in the current month
- Overdue — invoices past their due date

CREATING AN INVOICE:
1. Click New invoice
2. Select the client from the dropdown
3. Set the due date
4. Add a period/description (e.g. "May 2026 — Pro Care")
5. Add line items — from catalog or custom
6. Add a discount if applicable (percentage or fixed dollar amount)
7. The total calculates automatically
8. Click Save and send invoice

LINE ITEMS allow you to build itemized invoices. Each line shows description, quantity, unit price, and line total.

DISCOUNTS can be percentage or fixed dollar. The discount line shows on the invoice.

INVOICE STATUSES:
- Unpaid: generated and sent, awaiting payment
- Paid: payment received
- Overdue: past due date — consider sending a reminder

AUTO INVOICING: Invoices are automatically created on the 1st of each month for all active clients with a monthly rate.

EDITING: Click Edit on any invoice to modify it using the full builder.`,

    'services.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Services Catalog page.

SERVICE TYPES:
- Recurring: Monthly plans that auto-generate invoices
- One-off: Single charge for a specific deliverable

MANAGING SERVICES:
- Add service: click Add service, fill in name, category, type, price, description
- Edit: click Edit on any card to update
- Deactivate: hides from catalog without deleting
- Activate: brings a deactivated service back

USING IN INVOICES:
When creating an invoice, the Add from catalog dropdown pulls from this list. Price auto-fills but you can adjust per invoice.

STARTER SERVICES: Basic Website, Multi-Page Website, Landing Page, Pro Care Plan, Basic Care Plan, Domain Registration, Email Setup, Online Store, Booking System, Extra Page, Logo Design, SEO Setup, Speed Optimization, Content Update`,

    'updates.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Site Updates page.

POSTING AN UPDATE:
1. Select the client
2. Enter a title (e.g. "Homepage redesign complete")
3. Choose a category: General, Design, Feature, Fix, Content, Performance, Security
4. Write details describing what was done in plain English
5. Click Post update and notify client — saves AND emails the client automatically

The client sees all updates on their My Site page.

BEST PRACTICES:
- Post updates every time you do meaningful work
- Write in plain English — clients don't know technical terms
- Good: "Added a contact form to your About page so visitors can reach you directly"
- Bad: "Implemented mailto handler with validation"
- Updates build trust and justify the monthly retainer`,

    'admin-support.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Support Queue page.

STATS ROW:
- Open: requests waiting to be looked at
- In Progress: requests being actively worked on
- Resolved: completed requests

VIEWING REQUESTS:
- Filter by status (All, Open, In Progress, Resolved, Closed)
- Click any row to open the reply drawer

REPLYING TO A REQUEST:
1. Click the request row
2. Read the client message
3. Change the status (Open → In Progress when you start, Resolved when done)
4. Type your reply
5. Click Save and notify client — updates status and emails the client

PRIORITY GUIDE:
- Normal: general questions — respond within 24 hours
- High: important issues — respond within a few hours
- Urgent: site down, security issue — respond immediately`,

    'onboarding.html': `You are Sonny, the Suncoast Technology AI assistant helping JUSTIN (admin) on the Client Onboarding checklist page.

THE 6 SECTIONS:

1. PORTAL ACCOUNT SETUP — Create client row in Google Sheets, add in admin panel, send welcome email, confirm received.

2. DOMAIN AND DNS — Register domain on Namecheap if needed, add to Cloudflare, update nameservers to Cloudflare, add DNS records pointing to GitHub Pages (4 A records: 185.199.108-111.153 and a www CNAME), save Cloudflare Zone ID to ClientDetails.

3. GITHUB PAGES HOSTING — Create public repo on GitHub, upload site files, enable GitHub Pages, set custom domain, enable Enforce HTTPS, verify site is live.

4. EMAIL SETUP (Cloudflare Email Routing — free) — Enable Email Routing in Cloudflare, create forwarding rules, Cloudflare auto-adds SPF record, manually add DMARC TXT record, help client set up Gmail Send As, test end to end.

5. BILLING — Set plan name and monthly rate in client profile, create Stripe subscription, create first invoice, register domain in Stripe for Apple Pay.

6. DOCUMENT AND HANDOFF — Fill in credentials in ClientDetails, send credentials document to client, final check by logging in as client, mark onboarding complete.

NOTES FIELDS: Record zone IDs, go-live times, and other details per client.

PROGRESS: Progress bar tracks completion, saved in localStorage per client.`
  };

  function getPageContext() {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    return PAGE_CONTEXTS[page] || `You are the Suncoast Technology AI assistant. Help with any questions about the client portal, websites, billing, or services.`;
  }

  // ── SYSTEM PROMPT ──
  const SYSTEM_PROMPT = `You are **Sonny**, the Suncoast Technology AI assistant — a knowledgeable, friendly helper built into the client portal. You were built by Justin at Suncoast Technology. Always introduce yourself as Sonny when asked who you are.

CRITICAL — YOUR ROLE FOR CLIENTS:
You are talking to a **Suncoast Technology client** — a small business owner, not a developer. Your job is to:
1. **Explain** what they see on the page in plain English (stats, terms, statuses, invoice charges)
2. **Reassure** them that Suncoast handles all the technical work
3. **Direct them to submit a support request** for anything that requires action or setup

You do NOT give clients step-by-step technical instructions on how to do things themselves. That is Suncoast's job and what their plan pays for.

EXPLAINING THEIR DATA — YOU SHOULD DO THIS:
- Explain what a metric on their My Site page means (e.g. "What is cache hit rate?" — explain it clearly)
- Explain what an invoice charge is for (e.g. "What is my Pro Care plan?" — explain it covers hosting, maintenance, and support)
- Explain what a status badge means (e.g. "What does SSL Active mean?" — explain the padlock and security)
- Tell them their site looks healthy based on what they describe seeing
- Break down confusing billing terms into plain English

REDIRECTING TO SUPPORT — DO THIS FOR ACTION REQUESTS:
If a client asks how to GET, SET UP, ADD, CHANGE, FIX, or DO anything technical — direct them warmly to the Support tab.

Examples of what to redirect (not explain how to do):
- "How do I get a business email?" → Redirect to support request
- "How do I add a page to my site?" → Redirect to support request
- "How do I set up DNS?" → Redirect to support request
- "Can I add a contact form?" → Redirect to support request
- "How do I move my domain?" → Redirect to support request
- "Can I change my site design?" → Redirect to support request

When redirecting, always: briefly acknowledge what they want, say Suncoast handles that for them, and tell them to submit a support request through the Support tab (or email info@suncoast.technology).

Example redirect response:
"Great idea — having a contact form makes it easy for visitors to reach you! That's exactly the kind of thing Suncoast handles for you. Just head to the **Support** tab and submit a request describing what you'd like, and Justin will take care of it. 🙌"

YOUR EXPERTISE — FOR EXPLAINING CONCEPTS ONLY:
- The Suncoast Technology portal and all its features
- Web terms in plain English: SSL, HTTPS, CDN, caching, bandwidth, page views, requests
- Cloudflare stats: what the numbers mean, what is good/normal, what threats blocked means
- Invoice terms: what charges are for, what billing periods mean, how subscriptions work
- Domain names: what they are, why they matter (not how to configure them)
- Security terms: what SSL Active means, what DDoS protection means, what threats blocked means

PERSONALITY:
- Warm, patient, and encouraging
- Plain English always — briefly explain any technical term you use
- Concise but thorough when explaining data they can see in front of them
- Reassuring — "Suncoast has this covered" is often the most helpful thing to say
- Use **bold** for key terms or important points
- Short paragraphs, not walls of text
- Emojis are fine but don't overdo it

WHAT YOU DO NOT DO:
- Do not give clients step-by-step technical setup instructions
- Do not make up specific account data you don't have (actual invoice amounts, actual traffic numbers)
- Do not pretend to take actions
- Do not give specific legal or financial advice
- If asked something completely unrelated to their website or account, gently redirect

CURRENT PAGE CONTEXT:
{PAGE_CONTEXT}

If the user asks something not covered by the page context, draw on your general knowledge to explain concepts — but always redirect action requests to support.`;

  // ── SUGGESTIONS PER PAGE ──
  const PAGE_SUGGESTIONS = {
    'dashboard.html':    ['What does my site status mean?', 'How do I pay my invoice?', 'What is an SSL certificate?', 'Why do I have a monthly charge?'],
    'billing.html':      ['What is my invoice for?', 'What payment methods do you accept?', 'What does "Overdue" mean?', 'What is a subscription?'],
    'my-site.html':      ['What do these traffic numbers mean?', 'Why are threats being blocked?', 'What is cache hit rate?', 'Is my site performing well?'],
    'support.html':      ['How do I submit a request?', 'What priority should I choose?', 'How long until I get a response?', 'What can I ask for help with?'],
    'settings.html':     ['How do I change my password?', 'Can I change my email address?', 'What makes a strong password?', 'How do I update my plan?'],
    'admin.html':        ['How do I read the site health grid?', 'What is MRR?', 'How do I add a new client?', 'What does outstanding balance mean?'],
    'clients.html':      ['How do I add a new client?', 'When should I use the notify toggle?', 'How do I send a welcome email?', 'What is in the client profile?'],
    'invoices.html':     ['How do I create an invoice?', 'How do line items work?', 'How do auto invoices work?', 'How do I apply a discount?'],
    'services.html':     ['What is the difference between recurring and one-off?', 'How do I add a new service?', 'How are services used in invoices?', 'Should I deactivate or delete a service?'],
    'updates.html':      ['What categories should I use?', 'How does the client get notified?', 'What makes a good update post?', 'How often should I post updates?'],
    'admin-support.html':['How do I reply to a request?', 'What do the priority levels mean?', 'How do I mark something resolved?', 'Can I see all client requests at once?'],
    'onboarding.html':   ['What is Cloudflare Email Routing?', 'How do I set up GitHub Pages?', 'What DNS records do I need?', 'How do nameservers work?'],
  };

  function getSuggestions() {
    const page = window.location.pathname.split('/').pop() || '';
    return PAGE_SUGGESTIONS[page] || ['What can you help me with?', 'How does this portal work?', 'Explain what I am looking at'];
  }

  // ── STYLES ──
  const styles = `
    #sc-ai-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9990;
      width: 54px; height: 54px; border-radius: 50%; padding: 2px;
      background: linear-gradient(135deg,#4FC3F7,#A78BFA,#F472B6,#F97316);
      background-size: 300% 300%; animation: sc-gs 4s ease infinite;
      border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(167,139,250,0.4), 0 0 0 0 rgba(167,139,250,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #sc-ai-btn:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(167,139,250,0.6); }
    #sc-ai-btn-inner {
      width: 100%; height: 100%; border-radius: 50%;
      background: #04080F; display: flex; align-items: center; justify-content: center; font-size: 22px;
    }
    @keyframes sc-gs { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    #sc-ai-panel {
      position: fixed; bottom: 90px; right: 24px; z-index: 9991;
      width: 380px; max-height: 560px; border-radius: 22px; padding: 2px;
      background: linear-gradient(135deg,rgba(79,195,247,0.5),rgba(167,139,250,0.5),rgba(244,114,182,0.4));
      background-size: 300% 300%; animation: sc-gs 5s ease infinite;
      box-shadow: 0 12px 60px rgba(0,0,0,0.6);
      display: none; flex-direction: column;
    }
    #sc-ai-panel.open { display: flex; }
    #sc-ai-panel-inner {
      background: #04080F; border-radius: 20px;
      display: flex; flex-direction: column; height: 100%; max-height: 556px; overflow: hidden;
    }
    #sc-ai-header {
      padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
    }
    #sc-ai-avatar {
      width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg,#4FC3F7,#A78BFA);
      display: flex; align-items: center; justify-content: center; font-size: 17px;
    }
    #sc-ai-title { font-size: 14px; font-weight: 600; color: #fff; font-family: 'DM Sans', sans-serif; }
    #sc-ai-sub { font-size: 11px; color: rgba(148,163,184,0.6); font-family: 'DM Sans', sans-serif; margin-top: 1px; }
    #sc-ai-close {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      color: rgba(148,163,184,0.7); cursor: pointer; padding: 6px; border-radius: 8px;
      display: flex; font-size: 14px; line-height: 1; transition: all 0.2s; font-family: monospace;
    }
    #sc-ai-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
    #sc-ai-messages {
      flex: 1; overflow-y: auto; padding: 14px 16px;
      display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
    }
    #sc-ai-messages::-webkit-scrollbar { width: 3px; }
    #sc-ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
    .sc-msg { display: flex; gap: 8px; align-items: flex-start; animation: sc-mi 0.2s ease; }
    .sc-msg-user { flex-direction: row-reverse; }
    @keyframes sc-mi { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .sc-icon { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; }
    .sc-icon-ai { background: linear-gradient(135deg,#4FC3F7,#A78BFA); font-size: 14px; }
    .sc-icon-user { background: rgba(249,115,22,0.2); color: #F97316; font-weight: 700; font-family: 'DM Sans', sans-serif; font-size: 11px; }
    .sc-bubble {
      max-width: 82%; padding: 10px 14px; font-size: 13px; line-height: 1.65;
      font-family: 'DM Sans', sans-serif;
    }
    .sc-bubble-ai {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.9); border-radius: 4px 14px 14px 14px;
    }
    .sc-bubble-user {
      background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.2);
      color: #fff; border-radius: 14px 4px 14px 14px;
    }
    .sc-bubble strong { color: #fff; font-weight: 600; }
    .sc-typing { display: flex; gap: 5px; align-items: center; padding: 2px 0; }
    .sc-typing span { width: 7px; height: 7px; border-radius: 50%; background: rgba(167,139,250,0.7); animation: sc-b 1.2s ease infinite; }
    .sc-typing span:nth-child(2) { animation-delay: 0.2s; }
    .sc-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sc-b { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }
    #sc-ai-footer {
      padding: 10px 12px; border-top: 1px solid rgba(255,255,255,0.07);
      display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
    }
    #sc-ai-input {
      flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 12px; padding: 9px 12px; font-size: 13px;
      font-family: 'DM Sans', sans-serif; color: #fff; outline: none;
      resize: none; max-height: 100px; transition: border-color 0.2s; line-height: 1.5;
    }
    #sc-ai-input:focus { border-color: rgba(167,139,250,0.4); }
    #sc-ai-input::placeholder { color: rgba(148,163,184,0.4); }
    #sc-ai-send {
      width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg,#A78BFA,#6D28D9); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center; transition: opacity 0.2s, transform 0.15s;
    }
    #sc-ai-send:hover { opacity: 0.9; transform: scale(1.05); }
    #sc-ai-send:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
    .sc-sugg-wrap { display: flex; flex-direction: column; gap: 5px; padding-bottom: 2px; width: 100%; }
    .sc-sugg {
      padding: 8px 12px; background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
      color: rgba(148,163,184,0.85); font-size: 12px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; text-align: left; transition: all 0.15s; line-height: 1.4;
    }
    .sc-sugg:hover { background: rgba(167,139,250,0.08); border-color: rgba(167,139,250,0.2); color: #fff; }
    #sc-ai-clear {
      font-size: 11px; color: rgba(148,163,184,0.4); background: none; border: none;
      cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0; transition: color 0.2s;
    }
    #sc-ai-clear:hover { color: rgba(148,163,184,0.8); }
    @media (max-width: 480px) {
      #sc-ai-panel { width: calc(100vw - 24px); right: 12px; bottom: 80px; }
      #sc-ai-btn { right: 12px; bottom: 14px; }
    }
    #sc-sonny-nudge {
      position: fixed; bottom: 90px; right: 86px; z-index: 9989;
      background: #0D1622; border: 1px solid rgba(167,139,250,0.35);
      border-radius: 14px 14px 4px 14px;
      padding: 10px 14px; max-width: 210px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      animation: sc-nudge-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
      cursor: pointer;
    }
    #sc-sonny-nudge p {
      margin: 0; font-size: 13px; color: rgba(255,255,255,0.9);
      font-family: 'DM Sans', sans-serif; line-height: 1.5;
    }
    #sc-sonny-nudge span {
      font-size: 11px; color: rgba(148,163,184,0.5);
      font-family: 'DM Sans', sans-serif; display: block; margin-top: 3px;
    }
    #sc-sonny-nudge-close {
      position: absolute; top: 6px; right: 8px;
      background: none; border: none; color: rgba(148,163,184,0.4);
      font-size: 13px; cursor: pointer; line-height: 1; padding: 0;
      font-family: monospace;
    }
    #sc-sonny-nudge-close:hover { color: rgba(255,255,255,0.7); }
    @keyframes sc-nudge-in {
      from { opacity: 0; transform: translateY(10px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes sc-nudge-out {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to   { opacity: 0; transform: translateY(6px) scale(0.95); }
    }
    @media (max-width: 480px) {
      #sc-sonny-nudge { right: 70px; bottom: 76px; max-width: 180px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  function getUserInitials() {
    try {
      const name = localStorage.getItem('sc_client_name') || '';
      if (name) return name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      const cid = localStorage.getItem('sc_client_id') || '?';
      return cid.slice(0,2).toUpperCase();
    } catch(e) { return '?'; }
  }

  // ── BUILD UI ──
  const btnEl = document.createElement('button');
  btnEl.id = 'sc-ai-btn';
  btnEl.title = 'Ask Sonny';
  btnEl.innerHTML = '<div id="sc-ai-btn-inner">✨</div>';
  document.body.appendChild(btnEl);

  const panelEl = document.createElement('div');
  panelEl.id = 'sc-ai-panel';
  panelEl.innerHTML = `
    <div id="sc-ai-panel-inner">
      <div id="sc-ai-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <div id="sc-ai-avatar">✨</div>
          <div>
            <div id="sc-ai-title">Sonny</div>
            <div id="sc-ai-sub">Suncoast AI Assistant</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button id="sc-ai-clear" onclick="scClear()">Clear</button>
          <button id="sc-ai-close">✕</button>
        </div>
      </div>
      <div id="sc-ai-messages"></div>
      <div id="sc-ai-footer">
        <textarea id="sc-ai-input" placeholder="Ask anything..." rows="1"></textarea>
        <button id="sc-ai-send" title="Send">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 2L2 7.5l4.5 1.5L8 14l2-4.5L14 2z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>`;
  document.body.appendChild(panelEl);

  // ── STATE ──
  let isOpen     = false;
  let isLoading  = false;
  let greeted    = false;
  let history    = [];
  let nudgeShown = false;

  function toggle() {
    isOpen = !isOpen;
    panelEl.classList.toggle('open', isOpen);
    if (isOpen && !greeted) { greeted = true; showGreeting(); }
    if (isOpen) setTimeout(() => document.getElementById('sc-ai-input').focus(), 150);
  }

  function scClear() {
    history = [];
    greeted = false;
    document.getElementById('sc-ai-messages').innerHTML = '';
    showGreeting();
  }

  function showGreeting() {
    const page = (window.location.pathname.split('/').pop()||'').replace('.html','').replace(/-/g,' ') || 'portal';
    addMsg('ai', `Hi! I'm **Sonny**, your Suncoast Technology assistant. I can see you're on the **${page}** page — ask me anything about what you see here, your invoice, your site stats, or how anything works. Suncoast handles all the technical stuff for you! 🙌`);
    const suggs = getSuggestions();
    const wrap  = document.createElement('div');
    wrap.className = 'sc-sugg-wrap';
    suggs.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'sc-sugg';
      btn.textContent = s;
      btn.onclick = (e) => { e.stopPropagation(); wrap.remove(); sendMsg(s); };
      wrap.appendChild(btn);
    });
    document.getElementById('sc-ai-messages').appendChild(wrap);
    scroll();
  }

  function addMsg(role, text) {
    const msgs = document.getElementById('sc-ai-messages');
    const div  = document.createElement('div');
    div.className = `sc-msg sc-msg-${role}`;
    const icon = document.createElement('div');
    icon.className = `sc-icon sc-icon-${role}`;
    icon.innerHTML = role === 'ai' ? '✨' : getUserInitials();
    const bubble = document.createElement('div');
    bubble.className = `sc-bubble sc-bubble-${role}`;
    bubble.innerHTML = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n/g,'<br>');
    div.appendChild(icon);
    div.appendChild(bubble);
    msgs.appendChild(div);
    scroll();
    return bubble;
  }

  function scroll() {
    const msgs = document.getElementById('sc-ai-messages');
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('sc-ai-messages');
    const div  = document.createElement('div');
    div.className = 'sc-msg sc-msg-ai';
    div.id = 'sc-typing';
    const icon = document.createElement('div');
    icon.className = 'sc-icon sc-icon-ai';
    icon.innerHTML = '✨';
    const bubble = document.createElement('div');
    bubble.className = 'sc-bubble sc-bubble-ai';
    bubble.innerHTML = '<div class="sc-typing"><span></span><span></span><span></span></div>';
    div.appendChild(icon);
    div.appendChild(bubble);
    msgs.appendChild(div);
    scroll();
  }

  function hideTyping() {
    const el = document.getElementById('sc-typing');
    if (el) el.remove();
  }

  async function sendMsg(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;
    const input = document.getElementById('sc-ai-input');
    const send  = document.getElementById('sc-ai-send');
    input.value = ''; input.style.height = 'auto'; send.disabled = true;
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    showTyping();

    const systemPrompt = SYSTEM_PROMPT.replace('{PAGE_CONTEXT}', getPageContext());

    try {
      const token    = localStorage.getItem('sc_token');
      const clientId = localStorage.getItem('sc_client_id');
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action:    'aiChat',
          token:     token,
          client_id: clientId,
          system:    systemPrompt,
          messages:  history.slice(-20)
        })
      });
      const data = await res.json();
      hideTyping();
      if (data.ok && data.reply) {
        history.push({ role: 'assistant', content: data.reply });
        addMsg('ai', data.reply);
      } else {
        console.error('Sonny API error:', data);
        addMsg('ai', 'Sorry, I had trouble connecting. Please try again or contact us at info@suncoast.technology.');
      }
    } catch(e) {
      hideTyping();
      console.error('Sonny fetch error:', e);
      addMsg('ai', 'Having trouble connecting right now. Please try again in a moment.');
    }

    isLoading = false;
    send.disabled = false;
    input.focus();
  }

  // ── EVENTS ──
  btnEl.addEventListener('click', toggle);
  document.getElementById('sc-ai-close').addEventListener('click', toggle);
  document.getElementById('sc-ai-send').addEventListener('click', () => {
    const v = document.getElementById('sc-ai-input').value.trim();
    if (v) sendMsg(v);
  });
  document.getElementById('sc-ai-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const v = this.value.trim();
      if (v) sendMsg(v);
    }
    setTimeout(() => { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight,100)+'px'; }, 0);
  });
  document.addEventListener('click', function(e) {
    if (isOpen && !panelEl.contains(e.target) && !btnEl.contains(e.target)) toggle();
  });

  // expose clear globally for the button
  window.scClear = scClear;

  // ── SONNY NUDGE POPUP ──
  function showNudge() {
    if (nudgeShown || isOpen) return;
    nudgeShown = true;
    const nudge = document.createElement('div');
    nudge.id = 'sc-sonny-nudge';
    nudge.innerHTML = `
      <button id="sc-sonny-nudge-close" title="Dismiss">✕</button>
      <p>👋 Hey! I'm <strong>Sonny</strong>.</p>
      <span>Ask me about your site, invoice, or anything you see here.</span>
    `;
    document.body.appendChild(nudge);

    function dismissNudge() {
      nudge.style.animation = 'sc-nudge-out 0.25s ease forwards';
      setTimeout(() => nudge.remove(), 250);
    }

    nudge.addEventListener('click', (e) => {
      if (e.target.id === 'sc-sonny-nudge-close') {
        e.stopPropagation();
        dismissNudge();
        return;
      }
      dismissNudge();
      if (!isOpen) toggle();
    });

    setTimeout(dismissNudge, 8000);
  }

  // Show nudge after 6 seconds on page load (only once per session)
  try {
    if (!sessionStorage.getItem('sc_nudge_shown')) {
      sessionStorage.setItem('sc_nudge_shown', '1');
      setTimeout(showNudge, 6000);
    } else {
      nudgeShown = true;
    }
  } catch(e) {
    setTimeout(showNudge, 6000);
  }

  // Dismiss nudge if user opens chat manually before it triggers
  btnEl.addEventListener('click', () => { nudgeShown = true; });

})();
