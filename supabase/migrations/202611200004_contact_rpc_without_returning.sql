begin;

drop function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
);

create function public.submit_contact_request(
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
returns void
language plpgsql
security invoker
set search_path = ''
as $$
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
  );
end;
$$;

revoke all on function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
) from public, authenticated;
grant execute on function public.submit_contact_request(
  public.contact_kind, text, text, text, text, text, text, text, public.locale_code, boolean
) to anon;

commit;
