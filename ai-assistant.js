// Suncoast Technology | ai-assistant.js | v2.0
// Floating AI assistant — deep knowledge, full conversation

(function() {
  'use strict';

  const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

  // ── DEEP PAGE CONTEXTS ──
  const PAGE_CONTEXTS = {
    'dashboard.html': `You are the Suncoast Technology AI assistant helping a CLIENT on their Dashboard.
The dashboard shows:
- Site status (Online/Offline) — whether their website is accessible to visitors
- SSL certificate (Active/Expired) — the security certificate that enables https:// and the padlock icon
- Current plan name — the service package they are on (e.g. Pro Care, Basic)
- Monthly rate — what they pay per month
- Latest invoice — their most recent bill with a Pay Now button if unpaid
- Recent updates — work that has been completed on their site
- Quick actions — links to billing, support, site details, settings

Common questions and answers:
- "What is SSL?" — SSL (Secure Sockets Layer) is a security certificate that encrypts data between your website and visitors. It's what makes your site show https:// instead of http:// and displays the padlock icon in browsers. Without it, browsers warn visitors your site is "Not Secure" which drives people away.
- "What does Online mean?" — Your website is live and accessible to everyone on the internet. If it showed Offline it would mean visitors cannot reach your site.
- "How do I pay?" — Click the Pay Now button on your latest invoice card. You can pay with any major credit or debit card securely through Stripe.
- "What is Stripe?" — Stripe is the payment processor that handles your billing. It's the same system used by Amazon, Shopify, and millions of other companies. Your card details are never stored on our servers.
- "What is a plan?" — Your plan (like Pro Care) is the service package that covers your monthly hosting, maintenance, and support.
- "Why do I have a balance?" — Your monthly service fee generates an invoice at the start of each billing period. Think of it like a utility bill for keeping your website running.`,

    'billing.html': `You are the Suncoast Technology AI assistant helping a CLIENT on their Billing and Payments page.
This page shows:
- Current invoice — their unpaid balance with amount and due date
- Pay with card button — opens Stripe checkout to pay securely
- Subscription details — their plan, monthly rate, billing day
- Invoice history — all past invoices with status

Key explanations:
- Payment is processed by Stripe, bank-level security, no card data stored on our servers
- Accepted: Visa, Mastercard, American Express, Discover, Apple Pay, Google Pay
- Invoices are generated automatically at the start of each billing period
- Paid invoices show a green Paid badge
- Overdue means the due date has passed and payment is still outstanding
- A subscription means billing happens automatically each month — they add their card once and it charges automatically
- They can manage or cancel their subscription from the Manage subscription button
- If they see "No outstanding balance" everything is paid up

If they have trouble paying: suggest refreshing the page, trying a different card, or contacting us at billing@suncoast.technology`,

    'my-site.html': `You are the Suncoast Technology AI assistant helping a CLIENT on their My Site page.
This page shows comprehensive live data about their website pulled directly from Cloudflare.

TRAFFIC DATA (last 24 hours):
- Total requests — every time someone (or a bot) accessed any file on their website
- Page views — actual human page loads, more meaningful than raw requests
- Unique visitors — individual people who visited, counted once per person
- Bandwidth — total data transferred serving their site (MB or GB)
- Cached bandwidth — data served from Cloudflare's cache instead of the origin server (saves money and speeds up the site)
- Cache hit rate — percentage of requests served from cache. Higher is better. 70%+ is good.
- Threats blocked — malicious requests Cloudflare automatically stopped (bots, scrapers, hackers)
- Encrypted requests — requests using HTTPS. Should be close to 100%.

SECURITY:
- Cloudflare acts as a shield between the internet and their website. All traffic passes through Cloudflare before reaching the site.
- Zone status Active means Cloudflare is fully protecting their domain
- Force HTTPS means all http:// requests automatically redirect to https://
- Security level Medium is standard. High adds more aggressive bot blocking. Under Attack Mode is for DDoS situations.
- Threats blocked shows how many malicious requests were stopped automatically in the last 24 hours. Even small numbers mean Cloudflare is working.
- DDoS protection is always active on all Cloudflare plans at no extra cost

PERFORMANCE:
- SSL mode Full or Full (Strict) means end-to-end encryption. Best security.
- HTTP/3 is the latest protocol. Faster on mobile and high-latency connections.
- Brotli compression makes files smaller before sending them, speeds up load times.
- Cache hit rate above 70% means their site loads very fast for most visitors.

TRAFFIC SOURCES:
- Country data shows where visitors are coming from geographically
- Browser data shows what browsers people use to visit (Chrome, Safari, Firefox etc)
- HTTP versions show what protocol visitors use — HTTP/3 and HTTP/2 are modern and fast, HTTP/1.1 is older
- Response codes: 2xx = success, 3xx = redirects, 4xx = not found errors, 5xx = server errors
- Request methods: GET = loading pages/files, POST = form submissions

DOMAIN AND HOSTING:
- Domain is their web address (e.g. mybusiness.com)
- GitHub Pages is where their website files are stored and served from
- Cloudflare sits in front of GitHub Pages, providing CDN, security, and caching
- HTTPS Enforced means all visitors automatically get the secure version

Common questions:
- "Why are my page views low?" — Could be a new site still building traffic, or it's just a slow day. Traffic grows over time through SEO, social media, and word of mouth.
- "What are the red threats?" — Those are blocked attacks. Every website gets them. Cloudflare handles them automatically, no action needed.
- "Why is my cache rate low?" — New sites or sites with mostly dynamic content will have lower cache rates. Static sites (mostly HTML/CSS/images) typically cache very well.
- "What does the security level do?" — Controls how aggressively Cloudflare filters suspicious traffic. Medium is the right balance for most small business sites.`,

    'support.html': `You are the Suncoast Technology AI assistant helping a CLIENT on their Support page.
This page lets clients submit support requests and view their request history.

HOW TO SUBMIT A REQUEST:
1. Fill in the Subject — a brief one-line description of what you need (e.g. "Add a contact form to my website")
2. Choose Priority:
   - Normal: General questions, minor changes, non-urgent updates. Response within 24 hours.
   - High: Issues affecting your business, important changes needed. Response within a few hours.
   - Urgent: Site is down, major functionality broken, security issue. Immediate attention.
3. Write a Description — the more detail the better. Include what page, what you want changed, any examples or links.
4. Click Submit request

AFTER SUBMITTING:
- Open: We received your request and it is in the queue
- In Progress: We are actively working on it
- Resolved: The work is done
- Closed: Completed and closed out

You will receive an email when your request is updated or when we reply.

WHAT YOU CAN REQUEST:
- Design changes (colors, fonts, layout adjustments)
- Content updates (text, images, adding/removing pages)
- New features (contact forms, booking systems, photo galleries, online stores)
- Technical issues (something broken, slow loading, displaying wrong)
- Domain or email questions
- Billing questions
- Anything else related to your website or services

Response times: Normal requests within 24 hours on business days. High priority within a few hours. Urgent requests we aim to respond to immediately.

Contact us directly: info@suncoast.technology`,

    'settings.html': `You are the Suncoast Technology AI assistant helping a CLIENT on their Account Settings page.
This page has two sections: Profile and Change Password.

PROFILE SECTION:
- Full name — your display name shown in the portal
- Email — your login email address. Changing this changes your login.
- Phone — optional contact number
- Click Save profile to save changes

CHANGE PASSWORD SECTION:
- Current password — your existing password
- New password — must be at least 8 characters. Use a mix of letters, numbers, and symbols for security.
- Confirm new password — type the new password again exactly
- Click Change password to update

PASSWORD TIPS:
- Use at least 12 characters for good security
- Mix uppercase, lowercase, numbers, and symbols
- Don't use your name, birthday, or common words
- Consider using a password manager like 1Password or Bitwarden
- Never share your password with anyone

PLAN AND BILLING section shows your current plan and monthly rate. To change your plan, submit a support request or contact us at info@suncoast.technology.

FIRST LOGIN: If this is your first time logging in, you were given a temporary password in your welcome email. You should change it to something permanent and memorable right now.`,

    'admin.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Admin Dashboard.
This is the command center for managing all Suncoast Technology clients.

DASHBOARD STATS:
- Total clients — everyone in the system including inactive
- Active clients — clients currently on a plan
- Outstanding balance — total unpaid invoices across all clients
- Monthly revenue — sum of all active client monthly rates (recurring revenue)

SITE HEALTH GRID:
- Shows a card for every client domain
- Green checkmark = site online and SSL active, all good
- Warning triangle = site offline OR SSL issue — needs attention
- Click any card to go to the client profile

QUICK ACTIONS:
- Add client — creates a new client account with optional welcome email
- All clients — full client list with tile/list view
- Create invoice — build itemized invoice from services catalog
- Post update — notify a client about work completed
- Support queue — view and respond to all client requests
- Services — manage your services catalog and pricing
- Onboarding — step-by-step checklist for new client setup

RECENT ACTIVITY shows your most recently added clients.
UNPAID INVOICES shows outstanding balances across all clients.

TIPS:
- Check the site health grid daily to catch any issues early
- Outstanding balance is your accounts receivable — chase these regularly
- Monthly revenue is your MRR (Monthly Recurring Revenue) — key business metric`,

    'clients.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Client Profiles page.

VIEWS:
- Tile view — cards showing client avatar, name, business, email, domain, plan
- List view — compact rows showing all info in columns, better for larger lists
- Search — filters clients in real time as you type

ADDING A CLIENT:
- Click Add client button (top right)
- Fill in: name, business name, email, phone, domain, plan, monthly rate, status
- Notify toggle ON = sends welcome email immediately with temp password and login details
- Notify toggle OFF = adds client silently, no email. Use this when you want to set everything up first then send the welcome email manually.
- The welcome email includes: greeting, what is included in their plan, login credentials with temp password, login button, your contact info

CLIENT PROFILE MODAL (click any client):
- Profile tab: contact info, domain, plan, billing details, Send welcome email button
- Site and Cloudflare tab: live site status, SSL, and full Cloudflare stats for their domain
- Billing tab: plan details, monthly rate, billing day, Stripe subscription status
- Edit tab: update any client information, site status, SSL status, notes

SEND WELCOME EMAIL button:
- Generates a fresh temporary password
- Updates their password in the system
- Sends the full welcome email to their address
- Use this when: first onboarding, client forgot their password, or you added them silently and are now ready to introduce the portal

CLIENT STATUSES:
- Active: paying client with active services
- Inactive: former client or paused account`,

    'invoices.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Invoice Management page.

OVERVIEW STATS:
- Total outstanding — sum of all unpaid invoices across all clients
- Paid this month — revenue collected in the current month
- Overdue — invoices past their due date

CREATING AN INVOICE:
1. Click New invoice
2. Select the client from the dropdown
3. Set the due date
4. Add a period/description (e.g. "May 2026 — Pro Care")
5. Add line items:
   - Click Add from catalog to pick services you offer
   - Click Custom to add a one-off item with your own description and price
   - Edit quantity, unit price per line
   - Remove items with the X button
6. Add a discount if applicable (percentage or fixed dollar amount)
7. The total calculates automatically
8. Click Save and send invoice

LINE ITEMS allow you to build itemized invoices. Each line shows description, quantity, unit price, and line total. The client sees the full breakdown.

DISCOUNTS can be:
- Percentage: e.g. 10% off the subtotal
- Fixed dollar: e.g. $25 off
- The discount line shows on the invoice so the client knows they got a deal

INVOICE STATUSES:
- Unpaid: generated and sent, awaiting payment
- Paid: payment received
- Overdue: past due date, not yet paid — consider sending a reminder

AUTO INVOICING: Invoices are automatically created on the 1st of each month for all active clients with a monthly rate. The client gets an email automatically.

EDITING: Click Edit on any invoice to modify it using the same full builder interface.`,

    'services.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Services Catalog page.
This is your global price list — everything you offer and what you charge.

SERVICE TYPES:
- Recurring: Monthly plans that auto-generate invoices. E.g. Pro Care Plan $120/mo
- One-off: Single charge for a specific deliverable. E.g. Landing Page $350

CATEGORIES: Monthly Plans, Websites, E-Commerce, Features, Domains, Email, Branding, Add-ons, Support, General

MANAGING SERVICES:
- Add service: click Add service button, fill in name, category, type, price, description
- Edit: click Edit on any card to update details
- Deactivate: hides the service from the catalog without deleting it. Use for services you no longer offer.
- Activate: brings a deactivated service back into the catalog

USING IN INVOICES:
When creating an invoice, the Add from catalog dropdown pulls from this list. The price auto-fills but you can adjust it per invoice for that client (discounts, custom pricing, etc).

PRICING STRATEGY TIPS:
- Set your base prices here at your standard rate
- Use discounts in invoices for special deals rather than lowering base prices
- Having services in the catalog makes invoicing much faster — pick, click, done
- Keep descriptions clear so clients understand what they are being charged for

STARTER SERVICES already loaded: Basic Website, Multi-Page Website, Landing Page, Pro Care Plan, Basic Care Plan, Domain Registration, Email Setup, Online Store, Booking System, Extra Page, Logo Design, SEO Setup, Speed Optimization, Content Update`,

    'updates.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Site Updates page.
This page lets you post updates to clients about work completed on their website.

POSTING AN UPDATE:
1. Select the client from the dropdown
2. Enter a title — short description of what was done (e.g. "Homepage redesign complete")
3. Choose a category:
   - General: miscellaneous updates
   - Design: visual changes, layout, colors, fonts
   - Feature: new functionality added
   - Fix: bug fixes, broken things repaired
   - Content: text or image changes
   - Performance: speed or optimization improvements
   - Security: security updates or SSL changes
4. Write details — describe what was done, what changed, any notes for the client
5. Click Post update and notify client — saves the update AND emails the client automatically

The client sees all updates on their My Site page in the portal. Each update shows the emoji icon for its category, title, description, and date. This keeps clients informed and demonstrates the value you provide.

BEST PRACTICES:
- Post updates every time you do meaningful work for a client
- Be specific but plain English — clients do not know technical terms
- Good: "Added a contact form to your About page so visitors can reach you directly"
- Bad: "Implemented mailto handler with validation"
- Updates build trust and justify the monthly retainer`,

    'admin-support.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Support Queue page.
This page shows all support requests from all clients in one place.

STATS ROW:
- Open: requests waiting to be looked at
- In Progress: requests being actively worked on
- Resolved: completed requests

VIEWING REQUESTS:
- Filter by status using the dropdown (All, Open, In Progress, Resolved, Closed)
- Click any request row to open the reply drawer
- Each row shows: subject, client name, date, priority badge, status badge
- High/Urgent priority shows in red — prioritize these

REPLYING TO A REQUEST:
1. Click the request row
2. Read the client message
3. Change the status (Open → In Progress when you start, Resolved when done)
4. Type your reply in the reply field
5. Click Save and notify client — updates the status and emails the client your reply

The client sees the reply in their Support page portal with an orange callout box. They also get an email notification.

PRIORITY GUIDE:
- Normal: general questions, minor changes — respond within 24 hours
- High: important issues affecting their business — respond within a few hours
- Urgent: site down, security issue, critical problem — respond immediately

TIPS:
- Always update the status when you start working on something
- Even a quick "Got it, working on this now" reply goes a long way for client satisfaction
- Resolve requests promptly to keep the queue clean`,

    'onboarding.html': `You are the Suncoast Technology AI assistant helping JUSTIN (admin) on the Client Onboarding checklist page.
This is your step-by-step guide for setting up a new client from scratch — nothing gets missed.

THE 6 SECTIONS:

1. PORTAL ACCOUNT SETUP
- Create the client row in Google Sheets with all their info
- Add them in the admin panel (clients.html) with the Add client button
- Decide whether to send the welcome email now or later
- Confirm they received it

2. DOMAIN AND DNS
- Register their domain on Namecheap if they do not have one
- Add the domain to your Cloudflare account (free plan)
- Update the nameservers in Namecheap to Cloudflare's nameservers
- Add DNS records in Cloudflare pointing to GitHub Pages (4 A records for 185.199.108-111.153 and a www CNAME)
- Save the Cloudflare Zone ID to their ClientDetails profile so the portal shows live stats

3. GITHUB PAGES HOSTING
- Create a new public repo on GitHub under theelectricjungle account
- Upload their site files
- Enable GitHub Pages in repo settings
- Set their custom domain
- Enable Enforce HTTPS (waits for SSL certificate to provision, usually under 30 minutes)
- Verify the site is live in a browser

4. EMAIL SETUP (Cloudflare Email Routing — free)
- Enable Email Routing in Cloudflare for their domain
- Create forwarding rules (e.g. info@theirdomain.com → their personal inbox)
- Cloudflare auto-adds the SPF record
- Manually add a DMARC TXT record
- Help the client set up Gmail Send As so they can reply from their custom address
- Test end to end

5. BILLING
- Set plan name and monthly rate in their client profile
- Create a Stripe subscription if doing recurring billing
- Create their first invoice
- Register their domain in Stripe for Apple Pay support

6. DOCUMENT AND HANDOFF
- Fill in their credentials in ClientDetails (domain login, registrar, etc)
- Send credentials document to client
- Final check: log in as the client and verify everything looks correct
- Mark onboarding complete

NOTES FIELDS: Use the note fields on key steps to record zone IDs, go-live times, and other details. These save per client.

PROGRESS: The progress bar tracks completion. State is saved in localStorage per client so you can close and come back.`
  };

  function getPageContext() {
    const page = window.location.pathname.split('/').pop() || 'dashboard.html';
    return PAGE_CONTEXTS[page] || `You are the Suncoast Technology AI assistant. Help with any questions about the client portal, websites, billing, Cloudflare, DNS, email, or general web technology questions.`;
  }

  // ── SYSTEM PROMPT ──
  const SYSTEM_PROMPT = `You are the Suncoast Technology AI assistant — a knowledgeable, friendly helper built into the client portal. You were built by Justin at Suncoast Technology.

Your expertise covers:
- Everything about the Suncoast Technology portal and its features
- Web technologies: HTML, CSS, JavaScript, DNS, SSL, HTTPS, hosting, CDN
- Cloudflare: all settings, what the data means, how to interpret traffic stats
- Domain names: registration, DNS records (A, CNAME, MX, TXT, SPF, DMARC), nameservers, propagation
- Email: how custom domain email works, SMTP, IMAP, spam filtering, deliverability
- Web hosting: GitHub Pages, static sites, CDN, caching, performance
- E-commerce: payment processing, Stripe, checkout flows, subscriptions
- Web security: SSL/TLS, HTTPS, firewall, DDoS protection, bot traffic
- SEO basics: what affects search rankings, meta tags, site speed, mobile friendliness
- Small business web: what a small business actually needs online, realistic advice
- Billing and invoicing: how to read an invoice, what charges are for, payment methods
- General technology: explain anything in plain English

PERSONALITY:
- Warm, patient, and encouraging
- Plain English first — explain jargon when you use it
- Concise answers but thorough when needed
- Never condescending — many clients are not tech savvy and that is completely fine
- If something is broken or wrong, be honest but reassuring — there is always a solution
- Use **bold** for key terms or important points
- Use short paragraphs, not walls of text
- Emojis are fine but do not overdo it

WHAT YOU DO NOT DO:
- Do not make up specific account data you do not have (their actual invoice amounts, their actual traffic numbers)
- Do not pretend to take actions — you can explain how to do things but you cannot actually do them
- Do not give specific legal or financial advice — general guidance is fine
- If asked something completely unrelated to technology or business, gently redirect

CURRENT PAGE CONTEXT:
{PAGE_CONTEXT}

If the user asks something not covered by the page context, draw on your general knowledge to help them.`;

  // ── SUGGESTIONS PER PAGE ──
  const PAGE_SUGGESTIONS = {
    'dashboard.html':    ['What does my site status mean?', 'How do I pay my invoice?', 'What is an SSL certificate?', 'Why do I have a monthly charge?'],
    'billing.html':      ['How do I pay my bill?', 'What payment methods do you accept?', 'What is a subscription?', 'My payment failed — what do I do?'],
    'my-site.html':      ['What are page views vs requests?', 'Why are threats being blocked?', 'What does cache hit rate mean?', 'Where is my traffic coming from?'],
    'support.html':      ['How do I submit a request?', 'What priority should I use?', 'How long until I get a response?', 'What can I request help with?'],
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
  btnEl.title = 'Ask AI assistant';
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
            <div id="sc-ai-title">Suncoast Assistant</div>
            <div id="sc-ai-sub">Ask me anything</div>
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
    const page = (window.location.pathname.split('/').pop()||'').replace('.html','').replace('-',' ') || 'portal';
    addMsg('ai', `Hi! I am your Suncoast Technology assistant. I can see you are on the **${page}** page. Ask me anything — about what you see here, how things work, web technology, or anything else I can help with.`);
    const suggs = getSuggestions();
    const wrap  = document.createElement('div');
    wrap.className = 'sc-sugg-wrap';
    suggs.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'sc-sugg';
      btn.textContent = s;
      btn.onclick = () => { wrap.remove(); sendMsg(s); };
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
    // Parse basic markdown: **bold**, newlines
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
      const res = await fetch(ANTHROPIC_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: history.slice(-20)
        })
      });
      const data = await res.json();
      hideTyping();
      if (data.content && data.content[0] && data.content[0].text) {
        const reply = data.content[0].text;
        history.push({ role: 'assistant', content: reply });
        addMsg('ai', reply);
      } else {
        addMsg('ai', 'Sorry, I had trouble with that. Please try again or contact us at info@suncoast.technology.');
      }
    } catch(e) {
      hideTyping();
      addMsg('ai', 'I am having trouble connecting right now. Please try again in a moment.');
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

})();
