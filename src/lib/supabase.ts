/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const STORAGE_KEY = 'dedicaterealite_supabase_config_v1';

// Read config from Vite environment variables or localStorage override
export function getSupabaseConfig(): SupabaseConfig {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = (metaEnv.VITE_SUPABASE_URL as string) || '';
  const envKey = (metaEnv.VITE_SUPABASE_ANON_KEY as string) || '';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: parsed.url.trim(),
          anonKey: parsed.anonKey.trim()
        };
      }
    }
  } catch (e) {
    console.warn('Failed to parse Supabase config from localStorage:', e);
  }

  return {
    url: envUrl.trim(),
    anonKey: envKey.trim()
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        url: url.trim(),
        anonKey: anonKey.trim()
      })
    );
    cachedClient = null; // Reset cached client
  } catch (e) {
    console.error('Failed to save Supabase config:', e);
  }
}

export function clearSupabaseConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    cachedClient = null;
  } catch (e) {
    console.error('Failed to clear Supabase config:', e);
  }
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      cachedClient = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: false
        }
      });
      return cachedClient;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

export function isSupabaseConfigured(): boolean {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

// Test connection
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL atau Anon Key belum dikonfigurasi.'
    };
  }

  try {
    const { error } = await client.from('products').select('id').limit(1);
    if (error) {
      // If table doesn't exist yet
      if (error.code === '42P01') {
        return {
          success: true,
          message: 'Terhubung ke Supabase, namun tabel `products` belum dibuat. Silakan jalankan script SQL schema.'
        };
      }
      return {
        success: false,
        message: `Error Supabase (${error.code}): ${error.message}`
      };
    }
    return {
      success: true,
      message: 'Koneksi ke Supabase Cloud Database berhasil & aktif!'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Gagal menghubungi server Supabase.'
    };
  }
}

/* =========================================================================
   STORAGE HELPERS (Uploads photos to Supabase Storage Bucket 'dedicate-media')
   ========================================================================= */

export async function uploadImageToSupabase(
  file: File | Blob,
  folder: string = 'apparel'
): Promise<string | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = file.type ? file.type.split('/')[1] || 'jpg' : 'jpg';
    const cleanExt = extension.replace('jpeg', 'jpg');
    const fileName = `${folder}/${timestamp}_${random}.${cleanExt}`;

    const { error: uploadError } = await client.storage
      .from('dedicate-media')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type || 'image/jpeg'
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return null;
    }

    const { data } = client.storage
      .from('dedicate-media')
      .getPublicUrl(fileName);

    return data?.publicUrl || null;
  } catch (err) {
    console.error('Failed to upload image to Supabase:', err);
    return null;
  }
}

/* =========================================================================
   DATABASE SYNC HELPERS (Products, Showcase, Lookbook)
   ========================================================================= */

// Product mappers
export function mapProductFromDb(row: any): any {
  return {
    id: Number(row.id),
    name: row.name,
    sku: row.sku,
    category: row.category,
    price: Number(row.price),
    fitType: row.fit_type || row.fitType || 'Boxy Fit',
    fabricMaterial: row.fabric_material || row.fabricMaterial || 'Cotton Combed',
    fabricGsm: Number(row.fabric_gsm || row.fabricGsm || 235),
    printType: row.print_type || row.printType || 'Plastisol',
    status: row.status || 'READY',
    colorTheme: row.color_theme || row.colorTheme || '#0d0d0f',
    graphicAccent: row.graphic_accent || row.graphicAccent || '#7A0006',
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    description: row.description || '',
    sizes: Array.isArray(row.sizes) ? row.sizes : []
  };
}

export function mapProductToDb(p: any) {
  return {
    id: p.id,
    name: p.name,
    sku: p.sku,
    category: p.category,
    price: p.price,
    fit_type: p.fitType,
    fabric_material: p.fabricMaterial,
    fabric_gsm: p.fabricGsm,
    print_type: p.printType,
    status: p.status,
    color_theme: p.colorTheme,
    graphic_accent: p.graphicAccent,
    image: p.image,
    gallery: p.gallery || [],
    description: p.description,
    sizes: p.sizes || [],
    updated_at: new Date().toISOString()
  };
}

// Fetch all products from Supabase
export async function syncProductsFromSupabase(): Promise<any[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase products fetch warning:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(mapProductFromDb);
    }
    return [];
  } catch (err) {
    console.error('Failed to sync products from Supabase:', err);
    return null;
  }
}

// Save/Upsert product to Supabase
export async function saveProductToSupabase(product: any): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = mapProductToDb(product);
    const { error } = await client
      .from('products')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save product error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to save product to Supabase:', err);
    return false;
  }
}

// Delete product from Supabase
export async function deleteProductFromSupabase(productId: number): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Supabase delete product error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete product from Supabase:', err);
    return false;
  }
}

// Showcase mappers
export function mapShowcaseFromDb(row: any): any {
  return {
    id: String(row.id),
    dropCode: row.drop_code || row.dropCode || '',
    title: row.title || '',
    description: row.description || '',
    actionText: row.action_text || row.actionText || 'Lihat Detail Kaos',
    image: row.image || '',
    linkedProductId: row.linked_product_id ?? row.linkedProductId ?? undefined
  };
}

export function mapShowcaseToDb(s: any) {
  return {
    id: String(s.id),
    drop_code: s.dropCode,
    title: s.title,
    description: s.description,
    action_text: s.actionText,
    image: s.image,
    linked_product_id: s.linkedProductId ?? null,
    updated_at: new Date().toISOString()
  };
}

export async function syncShowcaseFromSupabase(): Promise<any[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('showcase_slides')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase showcase fetch warning:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(mapShowcaseFromDb);
    }
    return [];
  } catch (err) {
    console.error('Failed to sync showcase from Supabase:', err);
    return null;
  }
}

export async function saveShowcaseToSupabase(slide: any): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = mapShowcaseToDb(slide);
    const { error } = await client
      .from('showcase_slides')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save showcase error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to save showcase to Supabase:', err);
    return false;
  }
}

export async function deleteShowcaseFromSupabase(slideId: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('showcase_slides')
      .delete()
      .eq('id', slideId);

    if (error) {
      console.error('Supabase delete showcase error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete showcase from Supabase:', err);
    return false;
  }
}

// Lookbook mappers
export function mapLookbookFromDb(row: any): any {
  return {
    id: String(row.id),
    tag: row.tag || '',
    title: row.title || '',
    location: row.location || '',
    specs: row.specs || '',
    image: row.image || '',
    caption: row.caption || undefined,
    linkedProductId: row.linked_product_id ?? row.linkedProductId ?? undefined
  };
}

export function mapLookbookToDb(item: any) {
  return {
    id: String(item.id),
    tag: item.tag,
    title: item.title,
    location: item.location,
    specs: item.specs,
    image: item.image,
    caption: item.caption ?? null,
    linked_product_id: item.linkedProductId ?? null,
    updated_at: new Date().toISOString()
  };
}

export async function syncLookbookFromSupabase(): Promise<any[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('lookbook_items')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Supabase lookbook fetch warning:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(mapLookbookFromDb);
    }
    return [];
  } catch (err) {
    console.error('Failed to sync lookbook from Supabase:', err);
    return null;
  }
}

export async function saveLookbookToSupabase(item: any): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = mapLookbookToDb(item);
    const { error } = await client
      .from('lookbook_items')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save lookbook error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to save lookbook to Supabase:', err);
    return false;
  }
}

export async function deleteLookbookFromSupabase(itemId: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('lookbook_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Supabase delete lookbook error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete lookbook from Supabase:', err);
    return false;
  }
}
