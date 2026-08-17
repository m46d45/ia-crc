-- Public site-visit log for the footer counter.
create table if not exists site_visit (
  id bigserial primary key,
  visitor_id text not null,
  path text not null default '/',
  created_at timestamptz not null default now()
);

create index if not exists site_visit_visitor_id on site_visit (visitor_id);
create index if not exists site_visit_created_at on site_visit (created_at);
