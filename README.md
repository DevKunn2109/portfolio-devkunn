# DevKun Portfolio

Bilingual personal portfolio foundation built with Next.js App Router and strict TypeScript.

## Local setup

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` when Supabase integration begins.
4. Run `npm run dev`, then open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Current state

Slice 1 implements the bilingual, responsive and accessible home experience plus the product and technical brief. All personal facts are placeholders, crawling is disabled, CV download is intentionally unavailable and no contact data is submitted.

See `docs/PRODUCT-BRIEF.md` for scope, sitemap, journeys and delivery slices. See `docs/TECHNICAL-DECISIONS.md` for architecture and design decisions.

## Information needed from the owner

- Preferred public name/brand, role wording, biography and location/timezone visibility.
- Verified experience, education, skills with evidence, certifications and social/contact links.
- Project category, context, role, permitted images/links and verified outcomes for each case study.
- Vietnamese and English CV PDFs.
- Confirmed service boundaries and preferred enquiry budget/timeline options.
- Privacy contact and retention policy confirmation.

## Production

Do not deploy this placeholder build. Remove the global crawler block only after real content, privacy wording, public Supabase policies and release checks have been approved.

## Supabase development

Reproducible database files live in `supabase/`:

- `supabase/migrations/` contains ordered schema and RLS migrations.
- `supabase/tests/database/` contains pgTAP policy and contract tests.
- `supabase/seed.sql` is intentionally empty until owner-approved content exists.

Public registration remains disabled. Create an administrator through a trusted Supabase Dashboard or server-side workflow, then add that user's UUID to `public.admin_users` with a service-role operation. Never expose the service-role key to browser code.
