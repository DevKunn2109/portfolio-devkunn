begin;

create extension if not exists pgcrypto with schema extensions;

create type public.content_status as enum ('draft', 'published', 'archived');
create type public.project_kind as enum ('personal', 'academic', 'client', 'other');
create type public.contact_kind as enum ('recruitment', 'project', 'other');
create type public.contact_status as enum ('new', 'in_conversation', 'qualified', 'won', 'closed');
create type public.media_kind as enum ('image', 'document', 'other');

create domain public.locale_code as text check (value in ('vi', 'en'));
create domain public.slug_text as text check (value ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid references auth.users(id) on delete set null
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (length(key) between 1 and 80),
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  location text check (location is null or length(location) <= 160),
  timezone text check (timezone is null or length(timezone) <= 80),
  public_email text check (public_email is null or length(public_email) <= 320),
  availability text check (availability is null or length(availability) <= 160),
  social_links jsonb not null default '[]'::jsonb check (jsonb_typeof(social_links) = 'array'),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table public.profile_translations (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  locale public.locale_code not null,
  display_name text not null check (length(display_name) between 1 and 120),
  role text not null check (length(role) between 1 and 160),
  headline text check (headline is null or length(headline) <= 240),
  short_bio text check (short_bio is null or length(short_bio) <= 600),
  bio jsonb not null default '[]'::jsonb check (jsonb_typeof(bio) = 'array'),
  meta_title text check (meta_title is null or length(meta_title) <= 70),
  meta_description text check (meta_description is null or length(meta_description) <= 170),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (profile_id, locale),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  organization text not null check (length(organization) between 1 and 160),
  location text check (location is null or length(location) <= 160),
  website_url text check (website_url is null or length(website_url) <= 500),
  started_on date not null,
  ended_on date,
  is_current boolean not null default false,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check ((is_current and ended_on is null) or not is_current),
  check (ended_on is null or ended_on >= started_on),
  check (status <> 'published' or published_at is not null)
);

create table public.experience_translations (
  experience_id uuid not null references public.experiences(id) on delete cascade,
  locale public.locale_code not null,
  title text not null check (length(title) between 1 and 160),
  summary text check (summary is null or length(summary) <= 1000),
  highlights jsonb not null default '[]'::jsonb check (jsonb_typeof(highlights) = 'array'),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (experience_id, locale),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null check (length(institution) between 1 and 160),
  started_on date,
  ended_on date,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (ended_on is null or started_on is null or ended_on >= started_on),
  check (status <> 'published' or published_at is not null)
);

create table public.education_translations (
  education_id uuid not null references public.education(id) on delete cascade,
  locale public.locale_code not null,
  qualification text not null check (length(qualification) between 1 and 200),
  field_of_study text check (field_of_study is null or length(field_of_study) <= 200),
  description text check (description is null or length(description) <= 1000),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (education_id, locale),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text not null check (length(category) between 1 and 80),
  proficiency smallint check (proficiency is null or proficiency between 1 and 5),
  evidence_url text check (evidence_url is null or length(evidence_url) <= 500),
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table public.skill_translations (
  skill_id uuid not null references public.skills(id) on delete cascade,
  locale public.locale_code not null,
  label text not null check (length(label) between 1 and 100),
  description text check (description is null or length(description) <= 600),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (skill_id, locale),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  kind public.media_kind not null default 'other',
  bucket_id text not null check (bucket_id in ('portfolio-public', 'portfolio-private')),
  object_path text not null check (length(object_path) between 1 and 500),
  mime_type text not null check (length(mime_type) between 1 and 160),
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  is_public boolean not null default false,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (bucket_id, object_path),
  check (not is_public or bucket_id = 'portfolio-public'),
  check (status <> 'published' or published_at is not null)
);

create table public.media_translations (
  media_id uuid not null references public.media_assets(id) on delete cascade,
  locale public.locale_code not null,
  alt_text text not null check (length(alt_text) between 1 and 300),
  caption text check (caption is null or length(caption) <= 600),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (media_id, locale)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  kind public.project_kind not null default 'other',
  cover_media_id uuid references public.media_assets(id) on delete set null,
  demo_url text check (demo_url is null or length(demo_url) <= 500),
  source_url text check (source_url is null or length(source_url) <= 500),
  technology_stack text[] not null default '{}',
  started_on date,
  ended_on date,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (ended_on is null or started_on is null or ended_on >= started_on),
  check (status <> 'published' or published_at is not null)
);

create table public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale public.locale_code not null,
  slug public.slug_text not null,
  title text not null check (length(title) between 1 and 180),
  summary text not null check (length(summary) between 1 and 700),
  context jsonb not null default '[]'::jsonb check (jsonb_typeof(context) = 'array'),
  scope jsonb not null default '[]'::jsonb check (jsonb_typeof(scope) = 'array'),
  role_description jsonb not null default '[]'::jsonb check (jsonb_typeof(role_description) = 'array'),
  solution jsonb not null default '[]'::jsonb check (jsonb_typeof(solution) = 'array'),
  challenges jsonb not null default '[]'::jsonb check (jsonb_typeof(challenges) = 'array'),
  verified_results jsonb not null default '[]'::jsonb check (jsonb_typeof(verified_results) = 'array'),
  limitations jsonb not null default '[]'::jsonb check (jsonb_typeof(limitations) = 'array'),
  meta_title text check (meta_title is null or length(meta_title) <= 70),
  meta_description text check (meta_description is null or length(meta_description) <= 170),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (project_id, locale),
  unique (locale, slug),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table public.service_translations (
  service_id uuid not null references public.services(id) on delete cascade,
  locale public.locale_code not null,
  slug public.slug_text not null,
  title text not null check (length(title) between 1 and 160),
  summary text not null check (length(summary) between 1 and 700),
  needs jsonb not null default '[]'::jsonb check (jsonb_typeof(needs) = 'array'),
  scope jsonb not null default '[]'::jsonb check (jsonb_typeof(scope) = 'array'),
  deliverables jsonb not null default '[]'::jsonb check (jsonb_typeof(deliverables) = 'array'),
  process jsonb not null default '[]'::jsonb check (jsonb_typeof(process) = 'array'),
  meta_title text check (meta_title is null or length(meta_title) <= 70),
  meta_description text check (meta_description is null or length(meta_description) <= 170),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (service_id, locale),
  unique (locale, slug),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table public.topic_translations (
  topic_id uuid not null references public.topics(id) on delete cascade,
  locale public.locale_code not null,
  slug public.slug_text not null,
  name text not null check (length(name) between 1 and 100),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (topic_id, locale),
  unique (locale, slug),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  cover_media_id uuid references public.media_assets(id) on delete set null,
  reading_minutes smallint check (reading_minutes is null or reading_minutes > 0),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (status <> 'published' or published_at is not null)
);

create table public.article_translations (
  article_id uuid not null references public.articles(id) on delete cascade,
  locale public.locale_code not null,
  slug public.slug_text not null,
  title text not null check (length(title) between 1 and 180),
  excerpt text not null check (length(excerpt) between 1 and 700),
  content jsonb not null default '[]'::jsonb check (jsonb_typeof(content) = 'array'),
  meta_title text check (meta_title is null or length(meta_title) <= 70),
  meta_description text check (meta_description is null or length(meta_description) <= 170),
  status public.content_status not null default 'draft',
  reviewed_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (article_id, locale),
  unique (locale, slug),
  check (status <> 'published' or (reviewed_at is not null and published_at is not null))
);

create table public.article_topics (
  article_id uuid not null references public.articles(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  primary key (article_id, topic_id)
);

create table public.resume_files (
  id uuid primary key default gen_random_uuid(),
  locale public.locale_code not null,
  bucket_id text not null default 'portfolio-public' check (bucket_id in ('portfolio-public', 'portfolio-private')),
  object_path text not null check (length(object_path) between 1 and 500),
  file_name text not null check (length(file_name) between 1 and 180),
  mime_type text not null default 'application/pdf' check (mime_type = 'application/pdf'),
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (bucket_id, object_path),
  check (status <> 'published' or (published_at is not null and bucket_id = 'portfolio-public'))
);

create unique index one_published_resume_per_locale on public.resume_files (locale) where status = 'published';

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  kind public.contact_kind not null,
  name text not null check (length(name) between 2 and 120),
  email text not null check (length(email) between 3 and 320),
  company text check (company is null or length(company) <= 160),
  message text not null check (length(message) between 20 and 5000),
  budget text check (budget is null or length(budget) <= 120),
  timeline text check (timeline is null or length(timeline) <= 160),
  source_path text check (source_path is null or length(source_path) <= 500),
  source_locale public.locale_code,
  consent_at timestamptz not null,
  status public.contact_status not null default 'new',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.contact_notes (
  id uuid primary key default gen_random_uuid(),
  contact_request_id uuid not null references public.contact_requests(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  note text not null check (length(note) between 1 and 5000),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.slug_redirects (
  id uuid primary key default gen_random_uuid(),
  locale public.locale_code not null,
  content_type text not null check (content_type in ('project', 'service', 'article', 'topic')),
  old_slug public.slug_text not null,
  new_slug public.slug_text not null,
  http_status smallint not null default 308 check (http_status in (301, 308)),
  created_at timestamptz not null default timezone('utc', now()),
  unique (locale, content_type, old_slug),
  check (old_slug <> new_slug)
);

create index profile_translations_public_idx on public.profile_translations (locale, status, published_at desc);
create index experience_translations_public_idx on public.experience_translations (locale, status, published_at desc);
create index education_translations_public_idx on public.education_translations (locale, status, published_at desc);
create index skill_translations_public_idx on public.skill_translations (locale, status, published_at desc);
create index projects_public_idx on public.projects (status, is_featured, sort_order, published_at desc);
create index project_translations_public_idx on public.project_translations (locale, status, published_at desc);
create index services_public_idx on public.services (status, sort_order, published_at desc);
create index service_translations_public_idx on public.service_translations (locale, status, published_at desc);
create index articles_public_idx on public.articles (status, published_at desc);
create index article_translations_public_idx on public.article_translations (locale, status, published_at desc);
create index contact_requests_workflow_idx on public.contact_requests (status, created_at desc);
create index contact_notes_request_idx on public.contact_notes (contact_request_id, created_at desc);
create index slug_redirects_lookup_idx on public.slug_redirects (locale, content_type, old_slug);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'site_settings', 'profiles', 'profile_translations', 'experiences', 'experience_translations',
    'education', 'education_translations', 'skills', 'skill_translations', 'media_assets',
    'media_translations', 'projects', 'project_translations', 'services', 'service_translations',
    'topics', 'topic_translations', 'articles', 'article_translations', 'resume_files',
    'contact_requests', 'contact_notes'
  ] loop
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name, table_name
    );
  end loop;
end;
$$;

comment on table public.admin_users is 'Invite-only administrators. Bootstrap the first row with a trusted server-side operation.';
comment on table public.contact_notes is 'Private internal notes; never exposed to anon or non-admin users.';
comment on column public.article_translations.content is 'Validated CMS block array. Reject unknown or executable block types in the application.';
comment on column public.project_translations.verified_results is 'Only owner-approved, evidence-backed outcomes belong here.';

commit;
