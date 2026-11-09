# ogstyle-site

The public website for OGSTYLE (ogstyle.app): a landing page and the four
policy pages Razorpay activation and the Play Store listing require.

```
docs/                 ← the site (GitHub Pages: "Deploy from branch", folder /docs)
  index.html          landing
  terms/              Terms of Service
  privacy/            Privacy Policy
  refund-policy/      Refund & Cancellation Policy
  contact/            Contact Us
  style.css  404.html  favicon.svg  .nojekyll
check.sh              pre-publish gate (not part of the site)
```

Plain HTML and CSS: no framework, no build step, no JavaScript, no cookies,
no third-party requests. Any static host works.

## Why a separate repo

The app lives in `trim-time`, whose `docs/` holds internal specs and a
decision log with payment ids — it must never be served. A merge to its
`development` branch is also a Render deploy; a copy edit here should not
redeploy the API.

## The policy pages describe the code

The refund and privacy pages state what the app actually does. Each factual
sentence carries a `<!-- PF-n -->` comment naming an entry in
`trim-time/docs/POLICY-FACTS.md`, which points at the code that makes it
true. When that code changes, the page changes. Customers quote these pages
back; they must never promise what the system does not do.

## Before publishing

```bash
./check.sh     # exits non-zero while any visible placeholder remains
```

- Every `class="fill"` placeholder replaced (effective date, phone, hours,
  providers, retention periods). Effective date = the day the site goes live.
- `LAWYER:` / `CA:` comments reviewed — they mark wording a professional
  should confirm; they are not blockers by themselves.
- Order agreed 2026-11-09: logging fix → app rename to OGSTYLE → this site
  goes live → Razorpay activation review. Do not publish before the rename
  ships: the reviewer compares site, app and KYC names.

## Tamil version (not built)

What it would take: a human translation by someone who writes legal Tamil
(not machine translation), reviewed by a second Tamil speaker; pages under
`/ta/` with `lang="ta"`, Noto Sans Tamil and ~10% more line height; a
language link on each page; a clause that the English version prevails; and
the same version number on both so they move in lockstep. Build effort is
about a day once the translation exists — the translation is the real cost.
