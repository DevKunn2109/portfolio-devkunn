# Product brief — Personal portfolio V1

Status: foundation approved from the supplied brief; personal facts still require owner input.

## Product outcome

The portfolio serves two public audiences and one private operator:

- Recruiters can understand the developer's positioning, inspect verified work and obtain the correct CV.
- Potential clients can understand appropriate services and submit a qualified enquiry.
- The owner can manage bilingual profile, project, service, article, CV, SEO and enquiry content.

## V1 scope

Public: locale-aware home, about, projects/case studies, services, articles, CV, contact and privacy pages.

Admin: invite-only authentication; profile, CV, project, service, article, translation and SEO management; enquiry status and private notes; draft, preview, publish and archive lifecycle.

Platform: Next.js App Router, strict TypeScript and Supabase PostgreSQL/Auth/Storage. Server-rendered public content, RLS, reproducible migrations, locale-specific metadata and safe cache invalidation.

## Assumptions

- Vietnamese is the default locale; English is available at the equivalent `/en` route.
- Brand name, biography, email, social links, experience, education, testimonials and measured project outcomes are unknown.
- `CommerceFlow API` and `DevKunCare` are working project names only. Their category, ownership, role and results are not assumed.
- Until owner content is supplied, pages are `noindex` and `robots.txt` disallows crawling.
- A missing CV is shown as unavailable; no broken download link is rendered.
- No production deployment or external data mutation is part of the current slice.

## Sitemap

Every public route exists under `/vi` and `/en`:

- `/` redirects to `/vi`
- `/[locale]`
- `/[locale]/about`
- `/[locale]/projects` and `/[locale]/projects/[slug]`
- `/[locale]/services`
- `/[locale]/articles` and `/[locale]/articles/[slug]`
- `/[locale]/cv`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/admin/*` and `/preview/*` are private and excluded from indexing

## Primary journeys

### Recruiter

Landing page → positioning and evidence → project case study → web CV or locale-matched PDF → contact.

### Potential client

Landing page → relevant service and process → evidence in case study → qualified enquiry with optional budget and timeline → clear submission state.

## Delivery slices

1. Foundation: product brief, design tokens, locale structure, accessible bilingual home and placeholder safety. **Implemented.**
2. Data foundation: Supabase schema, migrations, seed content and RLS tests.
3. Public content: project, service, article, about, CV and privacy routes backed by published data.
4. Enquiries: validated public form, abuse protection, source capture and admin workflow.
5. Administration: invite-only auth, CRUD, translation workflow, protected preview and publishing/cache invalidation.
6. Release quality: SEO artefacts, media optimisation, end-to-end coverage, accessibility and measured performance.

## Acceptance criteria for slice 1

- `/` redirects to `/vi`; `/vi` and `/en` server-render equivalent home pages.
- Personal facts remain explicit placeholders and the site is not indexable.
- Layout works at desktop and mobile widths with keyboard focus and reduced-motion support.
- Lint, strict typecheck and production build pass.
