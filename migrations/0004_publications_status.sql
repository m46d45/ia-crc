-- Extend publications for kind, date sort, and moderation status.
alter table publications add column if not exists kind text;
alter table publications add column if not exists date_sort text;
alter table publications add column if not exists status text not null default 'approved';

create index if not exists publications_status_idx on publications (status);
create index if not exists publications_submitter_email_idx on publications (submitter_email);
create index if not exists publications_created_at_idx on publications (created_at);
