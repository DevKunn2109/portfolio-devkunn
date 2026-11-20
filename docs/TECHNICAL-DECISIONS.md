# Technical decisions

## Baseline

- Next.js 16.4.6 with App Router and React 19.3.1.
- TypeScript strict mode and ESLint 9 flat configuration.
- Supabase JavaScript 2.119.2 is pinned for the upcoming data slice.
- Node 22 or newer is declared; the development environment currently uses Node 24.

## Architecture direction

- Server Components are the default. Client Components are introduced only for interaction that needs browser state.
- Shared entities and locale translations will be separate in PostgreSQL. Translation records own locale-specific slug, metadata and publication state.
- Public queries will be exposed through server-only repository functions and must include publication constraints in addition to RLS.
- Administration will use Supabase Auth with no public sign-up. Every mutation rechecks admin membership on the server.
- Preview links will be signed, short-lived and non-indexable. Publishing will invalidate affected route tags.
- Content blocks will be a validated, finite block schema; arbitrary HTML or executable code is not accepted.

## Design system

- Canvas `#F8F7F4`, ink `#202529`, accent `#256B68`.
- Editorial serif display type is paired with a system sans-serif stack that supports Vietnamese without a remote font dependency.
- Wide spacing, structured asymmetry and custom project previews avoid a repetitive card grid.
- Animation is decorative, subtle and disabled under `prefers-reduced-motion`.

## Placeholder policy

The current build intentionally uses `Tên của bạn / Your name`, unavailable CV/contact states and unverified project labels. Robots are blocked and metadata is `noindex` until real identity and content are approved.

## Data foundation

- Shared entities and locale-specific translations use separate tables. Each translation owns its slug, metadata, review timestamp and publication state.
- Draft, published and archived states are database enums. Translations cannot be published without review and publication timestamps.
- Public RLS policies expose only published rows whose publication time has arrived. Administrative policies use `is_admin()` and the application must still recheck authorization on the server.
- Public contact access uses a constrained `submit_contact_request` RPC. Visitors cannot directly select or insert into the request table, set workflow status, or access internal notes.
- `portfolio-public` stores only assets intended for direct public delivery. Draft media belongs in `portfolio-private` and requires a signed URL or administrator session.
- CMS rich content is stored as validated JSON block arrays. The application must reject unknown or executable block types.
