-- Papers submitted by members from IA-CRC conversations (not only formal projects).

create table if not exists publications (
  id text primary key,
  doi text,
  url text not null,
  title text not null,
  authors text not null,
  year text,
  container text,
  submitter_name text not null,
  submitter_email text not null,
  institution text,
  note text,
  created_at timestamptz not null default now()
);

create unique index if not exists publications_doi_uidx
  on publications (doi)
  where doi is not null;
