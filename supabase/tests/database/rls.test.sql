begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;

select plan(13);

select has_table('public', 'projects', 'projects table exists');
select has_table('public', 'project_translations', 'project translations table exists');
select has_table('public', 'contact_requests', 'contact requests table exists');
select has_table('public', 'contact_notes', 'private contact notes table exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.projects'::regclass),
  'RLS is enabled for projects'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.contact_requests'::regclass),
  'RLS is enabled for contact requests'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.contact_notes'::regclass),
  'RLS is enabled for contact notes'
);

select results_eq(
  $$select policyname::text from pg_policies where schemaname = 'public' and tablename = 'projects' order by 1$$,
  array['projects_admin_all', 'projects_public_read']::text[],
  'projects has only public-read and admin policies'
);
select results_eq(
  $$select policyname::text from pg_policies where schemaname = 'public' and tablename = 'contact_requests' order by 1$$,
  array['contact_requests_admin_all', 'contact_requests_public_insert']::text[],
  'contact requests allow constrained public insert but no public read'
);
select results_eq(
  $$select policyname::text from pg_policies where schemaname = 'public' and tablename = 'contact_notes' order by 1$$,
  array['contact_notes_admin_all']::text[],
  'contact notes are admin-only'
);

select has_function(
  'public',
  'submit_contact_request',
  array['contact_kind', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'locale_code', 'boolean'],
  'contact submission uses a constrained RPC'
);
select col_is_unique('public', 'project_translations', array['locale', 'slug'], 'project slug is unique within a locale');
select col_is_unique('public', 'article_translations', array['locale', 'slug'], 'article slug is unique within a locale');

select * from finish();
rollback;
