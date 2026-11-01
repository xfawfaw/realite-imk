-- =========================================================================
-- DEDICATEREALITE SUPABASE DATABASE & STORAGE SCHEMA
-- Run this script in your Supabase Project: SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: products
CREATE TABLE IF NOT EXISTS public.products (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT NOT NULL,
    category TEXT NOT NULL,
    price BIGINT NOT NULL,
    fit_type TEXT NOT NULL DEFAULT 'Boxy Fit',
    fabric_material TEXT NOT NULL DEFAULT 'Heavyweight Cotton Combed 16s',
    fabric_gsm INTEGER NOT NULL DEFAULT 235,
    print_type TEXT NOT NULL DEFAULT 'Plastisol Curing',
    status TEXT NOT NULL DEFAULT 'READY',
    color_theme TEXT NOT NULL DEFAULT '#0d0d0f',
    graphic_accent TEXT NOT NULL DEFAULT '#7A0006',
    image TEXT NOT NULL,
    gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT NOT NULL DEFAULT '',
    sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE TABLE: showcase_slides
CREATE TABLE IF NOT EXISTS public.showcase_slides (
    id TEXT PRIMARY KEY,
    drop_code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_text TEXT NOT NULL DEFAULT 'Lihat Detail Kaos',
    image TEXT NOT NULL,
    linked_product_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE TABLE: lookbook_items
CREATE TABLE IF NOT EXISTS public.lookbook_items (
    id TEXT PRIMARY KEY,
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    specs TEXT NOT NULL,
    image TEXT NOT NULL,
    caption TEXT,
    linked_product_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows public read & full admin CRUD access via anon public API key
-- =========================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lookbook_items ENABLE ROW LEVEL SECURITY;

-- Products Policies
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify products" ON public.products;
CREATE POLICY "Public can modify products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Showcase Slides Policies
DROP POLICY IF EXISTS "Public can view showcase" ON public.showcase_slides;
CREATE POLICY "Public can view showcase" ON public.showcase_slides FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify showcase" ON public.showcase_slides;
CREATE POLICY "Public can modify showcase" ON public.showcase_slides FOR ALL USING (true) WITH CHECK (true);

-- Lookbook Items Policies
DROP POLICY IF EXISTS "Public can view lookbook" ON public.lookbook_items;
CREATE POLICY "Public can view lookbook" ON public.lookbook_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can modify lookbook" ON public.lookbook_items;
CREATE POLICY "Public can modify lookbook" ON public.lookbook_items FOR ALL USING (true) WITH CHECK (true);

-- =========================================================================
-- STORAGE BUCKET: dedicate-media
-- =========================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('dedicate-media', 'dedicate-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage bucket access policies
DROP POLICY IF EXISTS "Public Access to dedicate-media" ON storage.objects;
CREATE POLICY "Public Access to dedicate-media" ON storage.objects
FOR SELECT USING (bucket_id = 'dedicate-media');

DROP POLICY IF EXISTS "Allow Public Upload to dedicate-media" ON storage.objects;
CREATE POLICY "Allow Public Upload to dedicate-media" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'dedicate-media');

DROP POLICY IF EXISTS "Allow Public Update to dedicate-media" ON storage.objects;
CREATE POLICY "Allow Public Update to dedicate-media" ON storage.objects
FOR UPDATE USING (bucket_id = 'dedicate-media');

DROP POLICY IF EXISTS "Allow Public Delete in dedicate-media" ON storage.objects;
CREATE POLICY "Allow Public Delete in dedicate-media" ON storage.objects
FOR DELETE USING (bucket_id = 'dedicate-media');

-- =========================================================================
-- INITIAL SEED DATA
-- Populates the database with existing authentic products, showcase & lookbook
-- =========================================================================

-- Seed Products
INSERT INTO public.products (id, name, sku, category, price, fit_type, fabric_material, fabric_gsm, print_type, status, color_theme, graphic_accent, image, gallery, description, sizes)
VALUES
(
  1,
  'DEDICATE "YOU ARE SICK" Boxy Tee',
  'DDC-TC-001',
  'Boxy Tee',
  195000,
  'Boxy Fit',
  'Heavyweight Cotton Combed 16s',
  235,
  'High-Density Plastisol + Glossy Overlay',
  'READY',
  '#0d0d0f',
  '#A60009',
  '/images/you-are-sick-front.jpg',
  '["/images/you-are-sick-front.jpg", "/images/you-are-sick-alley-bike.jpg", "/images/you-are-sick-detail.jpg"]'::jsonb,
  'Siluet boxy signature dengan potongan bahu drop-shoulder dan rib leher tebal anti-melar. Menggunakan katun combed 16s seberat 235 GSM berkarakter kokoh dan jatuh sempurna. Dihiasi tipografi provokatif dan artwork kumbang tanduk stag beetle.',
  '[{"size": "S", "stock": 8, "available": true}, {"size": "M", "stock": 14, "available": true}, {"size": "L", "stock": 18, "available": true}, {"size": "XL", "stock": 7, "available": true}, {"size": "XXL", "stock": 4, "available": true}]'::jsonb
),
(
  2,
  'NERO X DEDICATE Dragon Artwork Tee',
  'DDC-TC-002',
  'Heavyweight Tee',
  210000,
  'Boxy Fit',
  'Ultra-Combed Cotton 16s',
  240,
  'Multi-layer Halftone Discharge Print',
  'READY',
  '#18181b',
  '#dc2626',
  '/images/nero-rooftop-duo.png',
  '["/images/nero-rooftop-duo.png", "/images/nero-front-dragon.jpg", "/images/nero-crew-studio.jpg", "/images/nero-dragon-print.jpg"]'::jsonb,
  'Karya kolaborasi eksklusif dengan N.E.R.O Crew. Menampilkan artwork naga oriental beresolusi tinggi di dada serta tipografi bold kolaboratif di bagian punggung.',
  '[{"size": "S", "stock": 4, "available": true}, {"size": "M", "stock": 10, "available": true}, {"size": "L", "stock": 12, "available": true}, {"size": "XL", "stock": 5, "available": true}, {"size": "XXL", "stock": 0, "available": false}]'::jsonb
),
(
  3,
  'DEDICATEREALITE Noir Sacrifice Boxy Tee',
  'DDC-TC-003',
  'Boxy Tee',
  195000,
  'Boxy Fit',
  'Heavyweight Cotton Combed 16s',
  240,
  'High-Density Blood Red Handprint & Minimal Typography',
  'READY',
  '#0d0d0f',
  '#7A0006',
  '/images/dedicate-black-front.png',
  '["/images/dedicate-black-front.png", "/images/dedicate-black-back.png", "/images/dedicate-duo-street.jpg", "/images/dedicate-sacrifice-vespa.jpg"]'::jsonb,
  'Siluet signature boxy cut dengan katun combed 16s warna hitam pekat 240 GSM. Menampilkan logo minimal Dëdicaté di dada kiri dan sablon cap tangan merah darah Sacrifice di punggung lengkap dengan teks filosofi brand.',
  '[{"size": "S", "stock": 6, "available": true}, {"size": "M", "stock": 12, "available": true}, {"size": "L", "stock": 16, "available": true}, {"size": "XL", "stock": 8, "available": true}, {"size": "XXL", "stock": 3, "available": true}]'::jsonb
),
(
  4,
  'DEDICATE SACRIFICE Limited White Tee',
  'DDC-TC-004',
  'Heavyweight Tee',
  185000,
  'Boxy Fit',
  'Heavyweight Cotton Combed 16s',
  235,
  'High-Density Blood Red Handprint & Typography',
  'READY',
  '#f4f4f0',
  '#b91c1c',
  '/images/dedicate-white-flatlay.png',
  '["/images/dedicate-white-flatlay.png", "/images/dedicate-duo-street.jpg", "/images/dedicate-sacrifice-vespa.jpg", "/images/dedicate-sacrifice-skate.jpg"]'::jsonb,
  'Edisi filosofis terbatas Dedicaterealite Sacrifice warna putih. Menggunakan katun combed 16s 235 GSM tebal dengan artwork sablon cap tangan merah darah dan teks manifestasi dedikasi. Dilengkapi rib leher tebal anti melar.',
  '[{"size": "S", "stock": 5, "available": true}, {"size": "M", "stock": 10, "available": true}, {"size": "L", "stock": 14, "available": true}, {"size": "XL", "stock": 6, "available": true}, {"size": "XXL", "stock": 2, "available": true}]'::jsonb
),
(
  5,
  'REALITE CYBERNETIC Longsleeve',
  'DDC-LS-005',
  'Longsleeve',
  225000,
  'Boxy Fit',
  'Heavyweight Cotton Combed 16s',
  235,
  'High-Density Sleeve Tribal & Minimal Chest',
  'READY',
  '#3b0707',
  '#f4f4f0',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Kaos lengan panjang warna deep burgundy crimson dengan sablon tribal gothic di kedua lengan serta logo minimal di dada. Dilengkapi rib elastis tebal di pergelangan tangan.',
  '[{"size": "S", "stock": 3, "available": true}, {"size": "M", "stock": 5, "available": true}, {"size": "L", "stock": 7, "available": true}, {"size": "XL", "stock": 4, "available": true}, {"size": "XXL", "stock": 0, "available": false}]'::jsonb
),
(
  6,
  'VOID DIVISION Heavy Boxy Zip Hoodie',
  'DDC-HD-006',
  'Outerwear',
  340000,
  'Loose Oversized',
  'Heavyweight Cotton Fleece',
  380,
  'Puff Embroidery + Screenprint on Back',
  'SOLDOUT',
  '#141416',
  '#7A0006',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Hoodie zipper siluet oversized lebar dengan bobot katun fleece 380 GSM yang kokoh dan tebal. Bordir timbul (puff embroidery) logo Dedicaterealite di dada dan sablon punggung artistik.',
  '[{"size": "S", "stock": 0, "available": false}, {"size": "M", "stock": 0, "available": false}, {"size": "L", "stock": 0, "available": false}, {"size": "XL", "stock": 0, "available": false}, {"size": "XXL", "stock": 0, "available": false}]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  sku = EXCLUDED.sku,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  fit_type = EXCLUDED.fit_type,
  fabric_material = EXCLUDED.fabric_material,
  fabric_gsm = EXCLUDED.fabric_gsm,
  print_type = EXCLUDED.print_type,
  status = EXCLUDED.status,
  color_theme = EXCLUDED.color_theme,
  graphic_accent = EXCLUDED.graphic_accent,
  image = EXCLUDED.image,
  gallery = EXCLUDED.gallery,
  description = EXCLUDED.description,
  sizes = EXCLUDED.sizes,
  updated_at = NOW();

-- Seed Showcase Slides
INSERT INTO public.showcase_slides (id, drop_code, title, description, action_text, image, linked_product_id)
VALUES
(
  'nero-collab',
  'DROP 01 // NERO CREW COLLAB',
  'NERO X DEDICATE — Heavyweight Collab Drop.',
  '240 GSM ultra-combed cotton with front dragon artwork & bold N.E.R.O CREW backprint. Edisi kolaborasi terbatas Yogyakarta streetwear.',
  'Lihat Detail Kaos',
  '/images/nero-rooftop-duo.png',
  2
),
(
  'you-are-sick',
  'DROP 02 // 235 GSM BOXY',
  'YOU ARE SICK — Signature 235 GSM Boxy Cut.',
  'Drop shoulder silhouette dengan grafis kumbang tanduk stag beetle dan tipografi brutalist. 235 GSM heavyweight cotton combed 16s.',
  'Lihat Detail Kaos',
  '/images/you-are-sick-alley-bike.jpg',
  1
),
(
  'sacrifice-drop',
  'DROP 03 // SACRIFICE COLLECTION',
  'SACRIFICE — Manifestasi Dedikasi & Passion.',
  'Heavyweight 16s cotton dengan artwork cap tangan merah darah dan teks manifesto keteguhan hati di jalanan.',
  'Lihat Detail Kaos',
  '/images/dedicate-sacrifice-skate.jpg',
  4
)
ON CONFLICT (id) DO UPDATE SET
  drop_code = EXCLUDED.drop_code,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  action_text = EXCLUDED.action_text,
  image = EXCLUDED.image,
  linked_product_id = EXCLUDED.linked_product_id,
  updated_at = NOW();

-- Seed Lookbook Items
INSERT INTO public.lookbook_items (id, tag, title, location, specs, image, caption, linked_product_id)
VALUES
(
  'lb-01',
  'DROP 01 // ROOFTOP SESSION',
  'NERO CREW MIDNIGHT HANGOUT',
  'Rooftop Lounge, Yogyakarta',
  '240 GSM • Front Dragon & Back Bold Print',
  '/images/nero-rooftop-duo.png',
  'Suasana santai malam hari menampilkan siluet depan naga dan sablon punggung N.E.R.O CREW.',
  2
),
(
  'lb-02',
  'EDITORIAL // YOU ARE SICK',
  'ALLEYWAY MIDNIGHT RIDERS',
  'Lorong Bersejarah, Yogyakarta',
  '235 GSM • Stag Beetle Boxy Tee',
  '/images/you-are-sick-alley-bike.jpg',
  'Dua model mengenakan kaos hitam YOU ARE SICK di atas motor trail malam hari.',
  1
),
(
  'lb-03',
  'SKATE ARCHIVE // CAR WASH',
  'CAR WASH SKATE SESSION',
  'Laxy Car Wash, Yogyakarta',
  'Heavyweight Combed 16s • Balaclava Look',
  '/images/dedicate-sacrifice-skate.jpg',
  'Sesi skate malam hari dengan balaclava dan kaos Dedicate Sacrifice cap tangan merah.',
  4
),
(
  'lb-04',
  'SCOOTER CULTURE // NIGHT RUN',
  'VESPA SPRINT MIDNIGHT RUN',
  'Tugu & Malioboro Outer Circle, Yogyakarta',
  '235 GSM • Red Handprint Backprint',
  '/images/dedicate-sacrifice-vespa.jpg',
  'Riding santai malam hari mengendarai Vespa Sprint mengenakan kaos Dedicate Sacrifice.',
  4
),
(
  'lb-05',
  'STUDIO ARCHIVE // CREW',
  'CONCRETE STUDIO & TWO-TONE CREW',
  'Underground Creative Studio, Yogyakarta',
  'Heavy Cotton Combed 16s • Bold Back Print',
  '/images/nero-crew-studio.jpg',
  'Dua model menampilkan artwork punggung N.E.R.O CREW dengan kontras warna merah dan hitam.',
  2
),
(
  'lb-06',
  'FIT CHECK // FULL BODY',
  'YOU ARE SICK FIT CHECK',
  'Billiard Lounge, Yogyakarta',
  '235 GSM Boxy Cut • Light Blue Denim',
  '/images/you-are-sick-front.jpg',
  'Proporsi siluet boxy cut jatuh sempurna di bahu dipadukan denim biru terang.',
  1
),
(
  'lb-07',
  'DETAIL // STAG BEETLE PRINT',
  'YOU ARE SICK TEXTURE',
  'Dedicate Screenprint Workshop',
  'High-Density Plastisol • Glossy Beetle Overlay',
  '/images/you-are-sick-detail.jpg',
  'Close-up tipografi YOU ARE SICK dengan overlay artwork kumbang tanduk hitam mengkilap.',
  1
),
(
  'lb-08',
  'PRINT ARCHIVE // DRAGON',
  'HIGH-DENSITY HALFTONE DRAGON',
  'Screenprint Workshop, Yogyakarta',
  'Plastisol Curing • Halftone Micro Dot-Work',
  '/images/nero-dragon-print.jpg',
  'Detail ketajaman sisik naga dengan teknik raster dot-work presisi tinggi pada katun tebal.',
  2
),
(
  'lb-09',
  'STREET ARCHIVE // DUO',
  'SACRIFICE STREET SESSION',
  'Malioboro Outer Streets, Yogyakarta',
  'Front Chest Minimal & Back Blood Handprint',
  '/images/dedicate-duo-street.jpg',
  'Dua model menampilkan tampak depan minimal dan tampak punggung cap tangan merah berfilosofi dedikasi.',
  4
),
(
  'lb-10',
  'NOIR ARCHIVE // BACKPRINT',
  'NOIR SACRIFICE MANIFEST',
  'Dedicate Creative Archive, Yogyakarta',
  '240 GSM Boxy • Blood Red Handprint',
  '/images/dedicate-black-back.png',
  'Karya tipografi manifestasi dedikasi dengan latar grafis cap tangan merah darah di atas katun hitam.',
  3
)
ON CONFLICT (id) DO UPDATE SET
  tag = EXCLUDED.tag,
  title = EXCLUDED.title,
  location = EXCLUDED.location,
  specs = EXCLUDED.specs,
  image = EXCLUDED.image,
  caption = EXCLUDED.caption,
  linked_product_id = EXCLUDED.linked_product_id,
  updated_at = NOW();
