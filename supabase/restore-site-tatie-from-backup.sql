-- =====================================================
-- RESTAURATION CIBLEE DU CMS SITE TATIE
-- Source: db_cluster-26-11-2025@03-04-53.backup
-- Usage: executer ce script dans le SQL Editor d'un NOUVEAU projet Supabase
-- =====================================================

begin;

create extension if not exists pgcrypto;

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  type text not null,
  "order" integer not null default 0,
  visible boolean not null default true,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_pages_slug on public.pages(slug);
create index if not exists idx_sections_page_id on public.sections(page_id);
create index if not exists idx_sections_order on public.sections("order");

alter table public.pages enable row level security;
alter table public.sections enable row level security;

drop policy if exists "Public read pages" on public.pages;
create policy "Public read pages"
on public.pages for select
using (true);

drop policy if exists "Public read sections" on public.sections;
create policy "Public read sections"
on public.sections for select
using (true);

drop policy if exists "Service role full access pages" on public.pages;
create policy "Service role full access pages"
on public.pages for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Service role full access sections" on public.sections;
create policy "Service role full access sections"
on public.sections for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  type
)
values (
  'site-images',
  'site-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  'STANDARD'
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  type = excluded.type;

drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'site-images');

drop policy if exists "Admin Upload" on storage.objects;
create policy "Admin Upload"
on storage.objects for insert
with check (bucket_id = 'site-images');

drop policy if exists "Admin Update" on storage.objects;
create policy "Admin Update"
on storage.objects for update
using (bucket_id = 'site-images');

drop policy if exists "Admin Delete" on storage.objects;
create policy "Admin Delete"
on storage.objects for delete
using (bucket_id = 'site-images');

delete from public.sections;
delete from public.pages;

insert into public.pages (id, slug, title, created_at, updated_at) values
('737d6ef0-3faf-465a-9f63-cc89dfadd9e8', 'home', 'Accueil', '2025-11-15 13:51:27.491131+00', '2025-11-15 13:51:27.491131+00'),
('f3352106-e3b8-4154-82d5-d2472e5bbdb2', 'naturopathie', 'Naturopathie', '2025-11-15 13:51:27.491131+00', '2025-11-15 13:51:27.491131+00'),
('76fc9bfa-e850-4810-bf7f-803c908f6ef8', 'massage-assis', 'Massage Assis', '2025-11-15 13:51:27.491131+00', '2025-11-15 13:51:27.491131+00'),
('7fa5448b-fe7a-4f96-bb08-50c00698c1ed', 'about', 'À propos', '2025-11-15 13:51:27.491131+00', '2025-11-15 13:51:27.491131+00'),
('bba17e03-730f-4b2f-8949-9a6c562ecb6f', 'contact', 'Contact', '2025-11-15 13:51:27.491131+00', '2025-11-15 13:51:27.491131+00');

insert into public.sections (id, page_id, type, "order", visible, data, created_at, updated_at) values
('5135b92a-24e9-4a48-ae77-97ff1d58cde3', '76fc9bfa-e850-4810-bf7f-803c908f6ef8', 'cta', 2, true, '{"title": "Offrez-vous une pause détente", "description": "30 minutes pour relâcher toutes vos tensions", "primaryButtonUrl": "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras", "primaryButtonText": "Réserver sur Resalib", "secondaryButtonUrl": "tel:0781660929", "secondaryButtonText": "Appeler"}'::jsonb, '2025-11-18 10:12:52.533146+00', '2025-11-18 10:12:52.533146+00'),
('78851942-1761-4328-b46d-5aef33e4672a', '7fa5448b-fe7a-4f96-bb08-50c00698c1ed', 'hero', 0, true, '{"title": "À propos", "ctaLink": "", "ctaText": "", "subtitle": "Mon parcours et ma vision de la naturopathie"}'::jsonb, '2025-11-18 10:12:52.82085+00', '2025-11-18 10:12:52.82085+00'),
('56cfc056-89cd-42ca-a917-62267394b3b0', '7fa5448b-fe7a-4f96-bb08-50c00698c1ed', 'about', 1, true, '{"title": "Qui suis-je ?", "content": "Après plusieurs années dans le domaine de la santé, j''ai découvert la naturopathie et son approche préventive et naturelle.\n\nFormée à l''École Aesculape d''Aix-en-Provence, j''ai acquis une solide expertise en nutrition, phytothérapie, aromathérapie et techniques de bien-être.\n\nMa mission : vous accompagner avec bienveillance dans votre recherche d''équilibre et de vitalité.", "imageAlt": "Alaïs Tavernier", "imageUrl": "https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg", "subtitle": "Alaïs Tavernier, naturopathe certifiée"}'::jsonb, '2025-11-18 10:12:52.82085+00', '2025-11-18 10:12:52.82085+00'),
('28e7034f-f2fe-434f-a976-e48f7e592814', 'bba17e03-730f-4b2f-8949-9a6c562ecb6f', 'hero', 0, true, '{"title": "Contactez-moi", "ctaLink": "", "ctaText": "", "subtitle": "Je suis à votre écoute pour répondre à vos questions"}'::jsonb, '2025-11-18 10:12:53.216066+00', '2025-11-18 10:12:53.216066+00'),
('573ddb21-3423-4c0a-a85c-fbad5c6826c7', 'bba17e03-730f-4b2f-8949-9a6c562ecb6f', 'plain_text', 1, true, '{"title": "", "content": "📧 Email : contact@alais-naturopathe.fr\n📱 Téléphone : 07 81 66 09 29\n📍 Adresse : Vacqueyras\n\nN''hésitez pas à me contacter pour toute question ou pour prendre rendez-vous.", "alignment": "left"}'::jsonb, '2025-11-18 10:12:53.216066+00', '2025-11-18 10:12:53.216066+00'),
('f8b8bfe3-4b91-4cb5-b7ef-0cf5cdc94c25', 'f3352106-e3b8-4154-82d5-d2472e5bbdb2', 'hero', 0, true, '{"title": "La Naturopathie", "ctaLink": "#/contact", "ctaText": "Prendre rendez-vous", "subtitle": "Une approche naturelle et globale pour devenir acteur de votre bien-être"}'::jsonb, '2025-11-18 10:12:52.285361+00', '2025-11-18 10:12:52.285361+00'),
('ade3467e-7c49-483e-9dfa-14e4a0203c5d', 'f3352106-e3b8-4154-82d5-d2472e5bbdb2', 'about', 1, true, '{"title": "Qu''est-ce que la naturopathie ?", "content": "La naturopathie est une approche holistique qui vise à maintenir ou rétablir la santé par des moyens naturels. Elle s''appuie sur trois piliers fondamentaux :\n\n• L''alimentation : équilibre nutritionnel adapté\n• L''activité physique : mouvement et vitalité\n• La gestion émotionnelle : équilibre psychique", "imageAlt": "Naturopathie", "imageUrl": "https://raw.githubusercontent.com/taomfnbd/image2/main/4.svg", "subtitle": "Une médecine traditionnelle reconnue par l''OMS"}'::jsonb, '2025-11-18 10:12:52.285361+00', '2025-11-18 10:12:52.285361+00'),
('4b3bfffb-d7be-430f-bdae-920c9590849f', 'f3352106-e3b8-4154-82d5-d2472e5bbdb2', 'cta', 2, true, '{"title": "Envie de commencer ?", "description": "Prenez rendez-vous pour votre première consultation", "primaryButtonUrl": "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras", "primaryButtonText": "Réserver sur Resalib", "secondaryButtonUrl": "tel:0781660929", "secondaryButtonText": "Appeler"}'::jsonb, '2025-11-18 10:12:52.285361+00', '2025-11-18 10:12:52.285361+00'),
('5ebc4bbf-f30f-4a88-9a44-70f1ac8d18f0', '76fc9bfa-e850-4810-bf7f-803c908f6ef8', 'hero', 0, true, '{"title": "Massage Assis", "ctaLink": "#/contact", "ctaText": "Réserver une séance", "subtitle": "Détente immédiate pour votre dos, nuque et épaules"}'::jsonb, '2025-11-18 10:12:52.533146+00', '2025-11-18 10:12:52.533146+00'),
('c742ea7b-4f4d-41f3-99aa-31c419982066', '76fc9bfa-e850-4810-bf7f-803c908f6ef8', 'about', 1, true, '{"title": "Le massage assis", "content": "Le massage assis est une technique de massage habillé qui se pratique sur une chaise ergonomique. Il cible particulièrement :\n\n• Le dos et les lombaires\n• La nuque et les épaules\n• Les bras et les mains\n\nIdéal pour relâcher les tensions et retrouver de l''énergie en quelques minutes.", "imageAlt": "Massage assis", "imageUrl": "https://raw.githubusercontent.com/taomfnbd/image2/main/2.svg", "subtitle": "Une pause bien-être accessible à tous"}'::jsonb, '2025-11-18 10:12:52.533146+00', '2025-11-18 10:12:52.533146+00'),
('6cbbd315-ded7-409c-9d98-9ff00963631f', '737d6ef0-3faf-465a-9f63-cc89dfadd9e8', 'hero', 0, true, '{"quote": "La force qui est en chacun de nous est notre plus grand médecin", "lastName": "Tavernier", "subtitle": "Massage bien-être", "firstName": "Alaïs", "profession": "Naturopathe", "description": "Éducatrice de la santé, je vous accompagne pour que vous deveniez autonome et acteur de votre bien-être.", "quoteAuthor": "Hippocrate"}'::jsonb, '2025-11-18 10:23:56.70518+00', '2025-11-18 10:23:56.70518+00'),
('a984a202-4c52-4b0a-87d7-de17ba603220', '737d6ef0-3faf-465a-9f63-cc89dfadd9e8', 'about', 1, true, '{"title": "Mon Parcours", "content": "Diplômée en naturopathie de l''École Aesculape à Aix-en-Provence, je vous accompagne avec bienveillance dans votre quête d''équilibre et de vitalité.\n\nMa pratique s''inscrit dans une démarche holistique, prenant en compte votre individualité et votre environnement pour vous proposer des conseils personnalisés et naturels.", "imageAlt": "Formation en naturopathie", "imageUrl": "https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg", "subtitle": "Une formation solide et une approche humaine"}'::jsonb, '2025-11-18 10:23:56.70518+00', '2025-11-18 10:23:56.70518+00'),
('ef677c6c-0fc6-4359-a30f-6fb697b7c9ed', '737d6ef0-3faf-465a-9f63-cc89dfadd9e8', 'services_preview', 2, true, '{"title": "Mes Prestations", "services": [{"title": "Naturopathie", "linkUrl": "#/naturopathie", "linkText": "En savoir plus", "description": "Bilan de vitalité personnalisé et conseils naturels pour retrouver votre équilibre.", "priceLabel1": "Première consultation (1h30)", "priceLabel2": "Séances suivantes (1h)", "priceValue1": "70€", "priceValue2": "50€"}, {"title": "Massage assis", "linkUrl": "#/massage-assis", "linkText": "En savoir plus", "description": "Détente immédiate avec un massage habillé ciblé sur le dos, nuque et épaules.", "priceLabel1": "30 minutes", "priceLabel2": "", "priceValue1": "30€", "priceValue2": ""}], "subtitle": "Des approches naturelles pour votre bien-être"}'::jsonb, '2025-11-18 10:23:56.70518+00', '2025-11-18 10:23:56.70518+00'),
('96ff6ec7-a7c5-4b5b-bc12-338eb19533b5', '737d6ef0-3faf-465a-9f63-cc89dfadd9e8', 'cta', 3, true, '{"title": "Prêt à prendre soin de vous ?", "description": "Réservez votre consultation et commencez votre parcours vers un bien-être naturel", "primaryButtonUrl": "https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras", "primaryButtonText": "Réserver sur Resalib", "secondaryButtonUrl": "tel:0781660929", "secondaryButtonText": "Appeler directement"}'::jsonb, '2025-11-18 10:23:56.70518+00', '2025-11-18 10:23:56.70518+00');

commit;
