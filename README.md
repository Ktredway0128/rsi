# Refined Service Institute (RSI)

A full-stack SaaS training platform for fine dining front-of-house staff. Built and launched solo.

Live at [refinedserviceinstitute.com](https://refinedserviceinstitute.com)

---

## Overview

RSI is a hospitality training platform designed for fine dining restaurants and hotels. Properties subscribe monthly or annually and their staff complete a structured certification program covering service fundamentals, beverage knowledge, pairing and suggestion, tableside mechanics, and the guest journey.

Built by a certified sommelier with 20 years of fine dining experience at $300+ per cover restaurants across the Bay Area, LA, Scottsdale, and Nashville.

---

## Tech Stack

- **Frontend** — React + Vite, Tailwind CSS
- **Backend / Database** — Supabase (PostgreSQL)
- **Authentication** — Supabase Auth with email confirmation via Resend
- **Payments** — Stripe (subscriptions, webhooks, automated access code delivery)
- **Email** — Resend (transactional email, DKIM verified custom domain)
- **Deployment** — Netlify (auto-deploy from GitHub, serverless functions)

---

## Features

### Training Platform
- 6 structured modules with content, images, and video
- Sequential module locking — each module unlocks after the previous is completed
- Content timer — 10 minutes minimum per module
- Checkpoint questions — 3 per module, all must pass to advance
- Reflection exercise with 3.5 minute timer and 100 character minimum
- 4 service scenarios per module with sequential reveal and 60 second timers

### Exam & Certification
- 40-question randomized exam drawn from a pool of 145 questions
- 80% required to pass
- 3 attempts — if all 3 fail, all progress resets automatically
- Individual completion certificate with print functionality
- Establishment certificate with shareable URL parameters

### Payments & Access
- Stripe monthly and annual subscriptions
- Netlify serverless webhook — generates unique property access code and sends via Resend on first payment
- Subscription cancellation automatically deactivates access code via Supabase
- Access code system — each property gets a unique code their staff uses at signup

### Authentication
- Signup, login, email confirmation, password reset
- Auth-aware navbar
- DEV_MODE bypass for demo account

### Dashboard
- Progress tracking across all 6 modules
- Certified state with certificate access
- Exam unlock after all modules completed

---

## Architecture

```
src/
  pages/          # All route-level components
  components/     # Shared UI components
  context/        # Auth context
  lib/            # Supabase client

netlify/
  functions/      # Stripe webhook serverless function
```

---

## Pricing

- **Monthly** — $350/month, unlimited staff
- **Annual** — $3,500/year (2 months free)
- **In-Person Local** — $275/server, minimum 5 (Maricopa County)
- **In-Person Travel** — $375/server, minimum 8 plus travel
- **Enterprise** — contact for multi-location pricing

---

## Local Development

```bash
git clone https://github.com/Ktredway0128/rsi.git
cd rsi-web
npm install
npm run dev
```

Requires a `.env` file with:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Author

Kyle Tredway — Full Stack Engineer, Certified Sommelier
[LinkedIn](https://www.linkedin.com/in/kyle-tredway-944412387/) · [GitHub](https://github.com/Ktredway0128) · [tredwaydev.com](https://tredwaydev.com)