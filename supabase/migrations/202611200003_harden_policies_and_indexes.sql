begin;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'site_settings', 'profiles', 'profile_translations', 'experiences', 'experience_translations',
    'education', 'education_translations', 'skills', 'skill_translations', 'media_assets',
    'media_translations', 'projects', 'project_translations', 'services', 'service_translations',
    'topics', 'topic_translations', 'articles', 'article_topics', 'article_translations',
    'resume_files', 'contact_requests', 'contact_notes', 'slug_redirects'
  ] loop
    execute format('drop policy if exists %I on public.%I', table_name || '_admin_all', table_name);
    execute format(
      'create policy %I on public.%I for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))',
      table_name || '_admin_all', table_name
    );
  end loop;
end;
$$;

drop policy if exists admin_users_read_self on public.admin_users;
drop policy if exists admin_users_admin_all on public.admin_users;

create policy admin_users_select
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy admin_users_insert
  on public.admin_users for insert to authenticated
  with check ((select private.is_admin()));

create policy admin_users_update
  on public.admin_users for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy admin_users_delete
  on public.admin_users for delete to authenticated
  using ((select private.is_admin()));

alter policy site_settings_public_read on public.site_settings to anon;
alter policy profiles_public_read on public.profiles to anon;
alter policy profile_translations_public_read on public.profile_translations to anon;
alter policy experiences_public_read on public.experiences to anon;
alter policy experience_translations_public_read on public.experience_translations to anon;
alter policy education_public_read on public.education to anon;
alter policy education_translations_public_read on public.education_translations to anon;
alter policy skills_public_read on public.skills to anon;
alter policy skill_translations_public_read on public.skill_translations to anon;
alter policy media_assets_public_read on public.media_assets to anon;
alter policy media_translations_public_read on public.media_translations to anon;
alter policy projects_public_read on public.projects to anon;
alter policy project_translations_public_read on public.project_translations to anon;
alter policy services_public_read on public.services to anon;
alter policy service_translations_public_read on public.service_translations to anon;
alter policy topics_public_read on public.topics to anon;
alter policy topic_translations_public_read on public.topic_translations to anon;
alter policy articles_public_read on public.articles to anon;
alter policy article_translations_public_read on public.article_translations to anon;
alter policy article_topics_public_read on public.article_topics to anon;
alter policy resume_files_public_read on public.resume_files to anon;
alter policy slug_redirects_public_read on public.slug_redirects to anon;

create or replace function public.submit_contact_request(
  p_kind public.contact_kind,
  p_name text,
  p_email text,
  p_company text,
  p_message text,
  p_budget text,
  p_timeline text,
  p_source_path text,
  p_source_locale public.locale_code,
  p_consent boolean
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare request_id uuid;
begin
  if not p_consent then
    raise exception 'privacy_consent_required' using errcode = '22023';
  end if;

  insert into public.contact_requests (
    kind, name, email, company, message, budget, timeline,
    source_path, source_locale, consent_at
  ) values (
    p_kind,
    trim(p_name),
    lower(trim(p_email)),
    nullif(trim(p_company), ''),
    trim(p_message),
    nullif(trim(p_budget), ''),
    nullif(trim(p_timeline), ''),
    nullif(trim(p_source_path), ''),
    p_source_locale,
    timezone('utc', now())
  )
  returning id into request_id;

  return request_id;
end;
$$;

revoke all on function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
) from public, authenticated;
grant execute on function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
) to anon;

create policy contact_requests_public_insert
  on public.contact_requests for insert to anon
  with check (status = 'new');

grant insert (kind, name, email, company, message, budget, timeline, source_path, source_locale, consent_at)
  on public.contact_requests to anon;

drop policy if exists portfolio_objects_admin_select on storage.objects;
drop policy if exists portfolio_objects_admin_insert on storage.objects;
drop policy if exists portfolio_objects_admin_update on storage.objects;
drop policy if exists portfolio_objects_admin_delete on storage.objects;

create policy portfolio_objects_admin_select
  on storage.objects for select to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select private.is_admin()));

create policy portfolio_objects_admin_insert
  on storage.objects for insert to authenticated
  with check (bucket_id in ('portfolio-public', 'portfolio-private') and (select private.is_admin()));

create policy portfolio_objects_admin_update
  on storage.objects for update to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select private.is_admin()))
  with check (bucket_id in ('portfolio-public', 'portfolio-private') and (select private.is_admin()));

create policy portfolio_objects_admin_delete
  on storage.objects for delete to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select private.is_admin()));

drop function public.is_admin();

create index admin_users_created_by_idx on public.admin_users (created_by);
create index article_topics_topic_id_idx on public.article_topics (topic_id);
create index articles_cover_media_id_idx on public.articles (cover_media_id);
create index contact_notes_author_id_idx on public.contact_notes (author_id);
create index projects_cover_media_id_idx on public.projects (cover_media_id);

commit;
