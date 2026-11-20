# Test results — foundation slice

Run date: 2026-11-20 (Asia/Bangkok)

## Passed

- `npm run lint` — no ESLint errors or warnings.
- `npm run typecheck` — strict TypeScript check passed.
- `npm run build` — production build completed with Next.js 16.4.6.
- Build output confirms `/vi` and `/en` are statically generated with `generateStaticParams`.
- Generated HTML contains the expected Vietnamese and English primary headings.
- Generated `robots.txt` contains `Disallow: /`, protecting all placeholder content from indexing.
- `npm audit` reported zero known vulnerabilities at installation time.

## Verified in implementation

- Each locale has the correct server-rendered `<html lang>` value.
- The root route redirects to `/vi`.
- The locale switch targets the equivalent home page.
- Keyboard focus styles, a skip link and `prefers-reduced-motion` handling are present.
- Mobile breakpoints cover navigation, hero, project, service, about and footer layouts.
- CV, contact and article areas use truthful unavailable/empty states and do not expose broken actions.

## Not yet verified

- Browser-based visual QA could not be completed because the connected browser could not reach the workspace's local development server; both loopback and LAN attempts timed out.
- Supabase auth, RLS, CRUD, publishing, preview, contact submission and file storage are not part of this first slice.
- No Lighthouse or Core Web Vitals score is claimed.
- Screen-reader testing and a full keyboard walkthrough remain for the release-quality slice.

## Data foundation — 2026-11-20

Passed against Supabase project `xvmqbyouaojkhmwidvfi`:

- Four ordered migrations applied successfully: schema, RLS/Storage/contact RPC, policy hardening/indexes, and the contact RPC return-value fix.
- 25 public tables exist and have RLS enabled.
- Security Advisor reports no findings after policy hardening.
- Anonymous fixture testing confirmed that a draft project and translation stay hidden while their published equivalents are readable.
- Anonymous clients have no `SELECT` privilege on contact requests or internal notes.
- The public contact RPC inserted a constrained request successfully; the transaction was rolled back and left no fixture data.
- Public and private portfolio Storage buckets exist with a 20 MiB limit and restricted MIME types.
- Generated database types are stored in `src/lib/supabase/database.types.ts`.
- Lint, strict typecheck and a clean production build pass after the data changes.

Performance Advisor currently reports only unused-index informational notices. This is expected while all content tables are empty; index usefulness should be reviewed after representative data and query traffic exist.
