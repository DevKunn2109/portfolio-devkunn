begin;

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
security definer
set search_path = ''
as $$
declare
  request_id uuid;
begin
  if not p_consent then
    raise exception 'privacy_consent_required' using errcode = '22023';
  end if;

  if length(trim(p_name)) not between 2 and 120
    or length(trim(p_email)) not between 3 and 320
    or position('@' in p_email) < 2
    or length(trim(p_message)) not between 20 and 5000 then
    raise exception 'invalid_contact_request' using errcode = '22023';
  end if;

  if exists (
    select 1
    from public.contact_requests
    where lower(email) = lower(trim(p_email))
      and md5(message) = md5(trim(p_message))
      and created_at > timezone('utc', now()) - interval '2 minutes'
  ) then
    raise exception 'duplicate_contact_request' using errcode = '23505';
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
) from public;
grant execute on function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
) to anon, authenticated;

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
    execute format('alter table public.%I enable row level security', table_name);
    execute format(
      'create policy %I on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
      table_name || '_admin_all', table_name
    );
  end loop;
end;
$$;

create policy admin_users_read_self
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy admin_users_admin_all
  on public.admin_users for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy site_settings_public_read
  on public.site_settings for select to anon, authenticated
  using (is_public);

create policy profiles_public_read
  on public.profiles for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy profile_translations_public_read
  on public.profile_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.profiles profile
      where profile.id = profile_id
        and profile.status = 'published'
        and profile.published_at <= timezone('utc', now())
    )
  );

create policy experiences_public_read
  on public.experiences for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy experience_translations_public_read
  on public.experience_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.experiences experience
      where experience.id = experience_id
        and experience.status = 'published'
        and experience.published_at <= timezone('utc', now())
    )
  );

create policy education_public_read
  on public.education for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy education_translations_public_read
  on public.education_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.education education_item
      where education_item.id = education_id
        and education_item.status = 'published'
        and education_item.published_at <= timezone('utc', now())
    )
  );

create policy skills_public_read
  on public.skills for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy skill_translations_public_read
  on public.skill_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.skills skill
      where skill.id = skill_id
        and skill.status = 'published'
        and skill.published_at <= timezone('utc', now())
    )
  );

create policy media_assets_public_read
  on public.media_assets for select to anon, authenticated
  using (is_public and status = 'published' and published_at <= timezone('utc', now()));

create policy media_translations_public_read
  on public.media_translations for select to anon, authenticated
  using (
    exists (
      select 1 from public.media_assets asset
      where asset.id = media_id
        and asset.is_public
        and asset.status = 'published'
        and asset.published_at <= timezone('utc', now())
    )
  );

create policy projects_public_read
  on public.projects for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy project_translations_public_read
  on public.project_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.projects project
      where project.id = project_id
        and project.status = 'published'
        and project.published_at <= timezone('utc', now())
    )
  );

create policy services_public_read
  on public.services for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy service_translations_public_read
  on public.service_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.services service
      where service.id = service_id
        and service.status = 'published'
        and service.published_at <= timezone('utc', now())
    )
  );

create policy topics_public_read
  on public.topics for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy topic_translations_public_read
  on public.topic_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.topics topic
      where topic.id = topic_id
        and topic.status = 'published'
        and topic.published_at <= timezone('utc', now())
    )
  );

create policy articles_public_read
  on public.articles for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()));

create policy article_translations_public_read
  on public.article_translations for select to anon, authenticated
  using (
    status = 'published'
    and published_at <= timezone('utc', now())
    and exists (
      select 1 from public.articles article
      where article.id = article_id
        and article.status = 'published'
        and article.published_at <= timezone('utc', now())
    )
  );

create policy article_topics_public_read
  on public.article_topics for select to anon, authenticated
  using (
    exists (
      select 1 from public.articles article
      where article.id = article_id
        and article.status = 'published'
        and article.published_at <= timezone('utc', now())
    )
    and exists (
      select 1 from public.topics topic
      where topic.id = topic_id
        and topic.status = 'published'
        and topic.published_at <= timezone('utc', now())
    )
  );

create policy resume_files_public_read
  on public.resume_files for select to anon, authenticated
  using (status = 'published' and published_at <= timezone('utc', now()) and bucket_id = 'portfolio-public');

create policy slug_redirects_public_read
  on public.slug_redirects for select to anon, authenticated
  using (true);

revoke all on all tables in schema public from anon, authenticated;

grant select on public.site_settings, public.profiles, public.profile_translations,
  public.experiences, public.experience_translations, public.education,
  public.education_translations, public.skills, public.skill_translations,
  public.media_assets, public.media_translations, public.projects,
  public.project_translations, public.services, public.service_translations,
  public.topics, public.topic_translations, public.articles,
  public.article_translations, public.article_topics, public.resume_files,
  public.slug_redirects to anon, authenticated;

grant select, insert, update, delete on all tables in schema public to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'portfolio-public', 'portfolio-public', true, 20971520,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
  ),
  (
    'portfolio-private', 'portfolio-private', false, 20971520,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
  )
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy portfolio_objects_admin_select
  on storage.objects for select to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select public.is_admin()));

create policy portfolio_objects_admin_insert
  on storage.objects for insert to authenticated
  with check (bucket_id in ('portfolio-public', 'portfolio-private') and (select public.is_admin()));

create policy portfolio_objects_admin_update
  on storage.objects for update to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select public.is_admin()))
  with check (bucket_id in ('portfolio-public', 'portfolio-private') and (select public.is_admin()));

create policy portfolio_objects_admin_delete
  on storage.objects for delete to authenticated
  using (bucket_id in ('portfolio-public', 'portfolio-private') and (select public.is_admin()));

commit;
