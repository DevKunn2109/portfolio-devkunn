create table public.bakery_content (
  kind text not null check (kind in ('product', 'slide', 'article')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 100),
  title text not null check (length(title) between 1 and 160),
  summary text not null default '',
  image text not null default '',
  video text not null default '',
  "group" text not null default '' check ("group" in ('', 'sale', 'bestseller', 'new')),
  price integer check (price >= 0),
  body text not null default '',
  published boolean not null default false,
  position integer not null default 0,
  primary key (kind, slug)
);

create table public.bakery_inquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  quantity integer not null check (quantity between 1 and 100000),
  area text not null check (length(area) between 1 and 120),
  delivery_date date,
  phone text not null check (phone ~ '^0[0-9]{9}$'),
  status text not null default 'new' check (status in ('new', 'handled'))
);

alter table public.bakery_content enable row level security;
alter table public.bakery_inquiries enable row level security;
revoke all on public.bakery_content, public.bakery_inquiries from anon, authenticated;
grant select, insert, update on public.bakery_content, public.bakery_inquiries to service_role;

insert into public.bakery_content (kind, slug, title, summary, image, body, published)
values
  ('product','crepe-sau-rieng','Crepe sầu riêng','Lớp vỏ crepe mỏng, mềm, ôm phần nhân sầu riêng.','/crepe-sau-rieng.webp','',true),
  ('slide','crepe-sau-rieng',E'Bánh crepe\nsầu riêng','Vỏ crepe mềm, nhân sầu riêng thơm béo. Tìm bánh Minh Châu tại Cần Thơ và Pleiku.','/crepe-sau-rieng.webp','',true),
  ('article','dat-banh-crepe-sau-rieng-theo-so-luong','Đặt bánh crepe sầu riêng theo số lượng cần chuẩn bị gì?','Ba thông tin giúp tiệm tư vấn quy cách hộp, giá và lịch nhận bánh.','/crepe-sau-rieng.webp',E'Hãy ước tính số bánh bạn cần và cho tiệm biết mục đích đặt bánh.\n\nCung cấp ngày dự kiến nhận và khu vực giao để tiệm kiểm tra lịch.\n\nChờ tiệm xác nhận số lượng, giá và lịch nhận trước khi chốt đơn.',true);

insert into public.bakery_content (kind, slug, title, summary, image, position, published)
values ('slide','dat-banh-si',E'Đặt bánh sỉ\ncùng Minh Châu','Trao đổi số lượng, ngày nhận và khu vực giao bánh với tiệm.','/can-bep.webp',1,true);
